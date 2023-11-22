import _ from "lodash";
import { parse, addMonths, format } from "date-fns";
import { AddCreditFormValues as AddCredit, CreditColumns } from "types";
import { useGetParameters } from "hooks";

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

export const getSchedule = (
  a: AddCredit,
  importe_prestamo: number,
  installments: number,
  rate_month: number
) => {
  const [degravamen, seguro] = useGetParameters();
  const amount_seguro = a.price * seguro;
  const begin_date = parse(a.begin_credit_date, "yyyy-MM-dd", new Date());

  return _.chain(_.range(0, installments))
    .map((_) => {
      return getAmountMonth(importe_prestamo, installments, rate_month);
    })
    .map((v, k) => {
      const current_prestamo = _.range(0, k)
        .map((_) => v)
        .reduce((m, n) => {
          const r = m * rate_month;
          return m - (n - r);
        }, importe_prestamo);

      const payment_month = getPaymentMonth(
        a,
        seguro,
        importe_prestamo,
        installments,
        rate_month
      );

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
};

export const getVan = (
  importe_prestamo: number,
  schedule: CreditColumns[],
  rate: number
): number =>
  schedule.reduce((a, b) => {
    return a + b.installment / Math.pow(1 + rate, b.month);
  }, 0) - importe_prestamo;

export const getTir =
  (flujos_de_efectivo: number[]) =>
  (
    initial_rate: number = 0.1,
    tolerancia: number = 1e-6,
    max_iterations: number = 1000
  ) => {
    let i = 0;
    let tir_actual = initial_rate;
    let tir_anterior = initial_rate + 0.1;

    while (i < max_iterations) {
      const npv_actual = flujos_de_efectivo.reduce((a, b, i) => {
        return a + b / Math.pow(1 + tir_actual, i);
      }, 0);
      const npv_anterior = flujos_de_efectivo.reduce((a, b, i) => {
        return a + b / Math.pow(1 + tir_anterior, i);
      }, 0);

      const nuev_tir =
        tir_actual -
        (npv_actual * (tir_actual - tir_anterior)) /
          (npv_actual - npv_anterior);

      if (Math.abs(nuev_tir - tir_actual) < tolerancia) {
        return nuev_tir;
      }
      tir_anterior = tir_actual;
      tir_actual = nuev_tir;
      i++;
    }
    return 0;
  };
