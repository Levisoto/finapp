import { AddCreditFormValues as AddCredit, CreditColumns } from "types";
import _ from "lodash";
import { useDialog } from "utils/dialog";
import { parse, addMonths, format } from "date-fns";
import {
  getPaymentMonth,
  getSchedule,
  getSchedulePartial,
  getTir,
  getVan,
} from "utils/helpers";

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

    const schedule_p = _.chain(_.range(0, installments_month))
      .map((_c, k) => {
        const all = _.range(0, installments_month).map((_, k) => {
          if (k < (a?.grace_period || 0)) {
            return 0;
          }
          return getAmountMonth(
            import_prestamo,
            installments_month - (a?.grace_period || 0),
            rate_month
          );
        });
        const mmm =
          k < (a?.grace_period || 0)
            ? all.slice(0, k + 1)
            : all.slice(a.grace_period, k + 1);
        const current_prestamo = mmm.reduce((m, n, i) => {
          if (k < (a?.grace_period || 0)) {
            return m;
          }
          const r = m * rate_month;
          const amortizacion = n - r;

          return m - amortizacion;
        }, import_prestamo);

        const payment_month = getPaymentMonth(
          a,
          seguro,
          import_prestamo,
          installments_month - (a?.grace_period || 0),
          rate_interest,
          k
        );

        const interest_amount_month =
          (a.grace_period || 0) > k ? 0 : current_prestamo * rate_month;
        const degravamen_amount_month = current_prestamo * degravamen;

        const amortizacion_amount_month =
          payment_month -
          a.porte -
          ((a.grace_period || 0) > k ? 0 : degravamen_amount_month) -
          amount_seguro -
          interest_amount_month;

        return {
          month: k + 1,
          date: format(addMonths(begin_date, k + 1), "dd.MM.yyyy"),
          amortizacion: amortizacion_amount_month,
          interest: interest_amount_month,
          installment:
            (a.grace_period || 0) > k
              ? payment_month + degravamen_amount_month
              : payment_month,
          saldo: current_prestamo,
          degravamen: degravamen_amount_month,
          seguro: amount_seguro,
        };
      })
      .value();

    const schedule = () => {
      switch (a.type_grace) {
        case "none": {
          return getSchedule(
            a,
            import_prestamo,
            installments_month,
            rate_month,
            rate_interest
          );
        }
        case "partial": {
          return getSchedulePartial(
            a,
            import_prestamo,
            installments_month,
            rate_month,
            rate_interest
          );
        }
        case "total": {
          return schedule_p;
        }

        default: {
          return getSchedule(
            a,
            import_prestamo,
            installments_month,
            rate_month,
            rate_interest
          );
        }
      }
    };

    const flujos_de_efectivo = [
      import_prestamo,
      ...schedule().map((i: CreditColumns) => -i.installment),
    ];

    console.log(flujos_de_efectivo);

    const van = getVan(import_prestamo, schedule(), rate_interest);

    const tir = getTir(flujos_de_efectivo);

    openDialog("open-schedule", { schedule: schedule(), van, tir });
  };

  return [createCredit];
};

export const useGetParameters = (): [number, number] => {
  return [0.00015, 0.001];
};
