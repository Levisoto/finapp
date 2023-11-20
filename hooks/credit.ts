import { AddCreditFormValues as AddCredit, CreditColumns } from "types";
import _ from "lodash";
import { useDialog } from "utils/dialog";
import { parse, addMonths, format } from "date-fns";

const getEfectiveRate = (type: string, a: number, n: number) => {
  if (type === "nominal") {
    return Math.pow(1 + a / n, n - 1);
  }
  return a;
};

const getAmountMonth = (a: number, n: number, r: number) => {
  const m = Math.pow(1 + r, n * -1);
  return (a * r) / (1 - m);
};

const getPaymentMonth = (
  m: AddCredit,
  s: number,
  a: number,
  n: number,
  r: number
) => {
  const amount = getAmountMonth(a, n, r);
  const amount_seguro = amount + s * m.price;
  const amount_port = amount_seguro + m.porte;

  return amount_port;
};

const flujo_efectivo = [-1000, 200, 300, 400, 500];

export const useCreateCredit = (): [(a: AddCredit) => void] => {
  const { openDialog } = useDialog();

  const createCredit = (a: AddCredit) => {
    const [degravamen, seguro] = useGetParameters();

    const begin_date = parse(a.begin_credit_date, "yyyy-MM-dd", new Date());

    const begin_amount = a.price * a.begin_amount_rate;
    const import_prestamo = a.price - begin_amount;
    const installments_month = a.installments * 12;

    const amount_seguro = a.price * seguro;
    const efective_rate = getEfectiveRate(a.type_rate, a.rate, a.installments);

    const rate_month = Math.pow(1 + efective_rate, 30 / 360) - 1;

    const rate_interest = rate_month + degravamen;
    const payment_month = getPaymentMonth(
      a,
      seguro,
      import_prestamo,
      installments_month,
      rate_interest
    );
    const schedule = _.chain(_.range(0, installments_month))
      .map((_) => {
        return getAmountMonth(import_prestamo, installments_month, rate_month);
      })
      .map((v, k) => {
        const current_prestamo = _.range(0, k)
          .map((_) => v)
          .reduce((m, n) => {
            const r = m * rate_month;
            return m - (n - r);
          }, import_prestamo);

        const rate_amount_month = current_prestamo * rate_month;
        const degravamen_amount_month = current_prestamo * degravamen;
        const amortizacion_amount_month =
          payment_month -
          a.porte -
          degravamen_amount_month -
          amount_seguro -
          rate_amount_month;

        return {
          month: k + 1,
          date: format(addMonths(begin_date, k + 1), "dd.MM.yyyy"),
          amortizacion: amortizacion_amount_month,
          interest: rate_amount_month,
          installment: payment_month,
          saldo: current_prestamo - (v - rate_amount_month),
          degravamen: degravamen_amount_month,
          seguro: amount_seguro,
        };
      })
      .value();

    const van =
      schedule.reduce((a, b) => {
        return a + b.installment / Math.pow(1 + rate_interest, b.month);
      }, 0) - import_prestamo;

    const tir = (
      initial_rate: number = 0.1,
      tolerancia: number = 1e-6,
      max_iterations: number = 1000
    ) => {
      let i = 0;
      let tir_actual = initial_rate;
      let tir_anterior = initial_rate + 0.1;

      while (i < max_iterations) {
        const npv_actual = flujo_efectivo.reduce((a, b, i) => {
          return a + b / Math.pow(1 + tir_actual, i);
        }, 0);
        const npv_anterior = flujo_efectivo.reduce((a, b, i) => {
          return a + b / Math.pow(1 + tir_anterior, i);
        }, 0);

        const nuev_tir =
          tir_actual -
          (npv_actual * (tir_actual - tir_anterior)) /
            (npv_actual - npv_anterior);

        if (Math.abs(npv_anterior - tir_actual) < tolerancia) {
          return nuev_tir;
        }
        tir_anterior = tir_actual;
        tir_actual = nuev_tir;
        i++;
      }
      return 0;
    };
    console.log(tir())

    openDialog("open-schedule", { schedule, van, tir: tir() });
  };

  return [createCredit];
};

export const useGetParameters = (): [number, number] => {
  return [0.00015, 0.001];
};
