import { FC } from "react";
import { CreditColumns as Columns } from "types";
import { Schedule as ScheduleTable } from "reports";

interface ScheduleProps {
  schedule: Columns[];
  van: number;
  tir: (a?: number, b?: number, c?: number) => number;
  // tir: number;
}

export const Schedule: FC<ScheduleProps> = ({ schedule, van, tir }) => {
  return (
    <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto">
      <ScheduleTable
        rows={schedule.map((i) => ({
          saldo: parseFloat(i.saldo.toFixed(2)),
          installment: parseFloat(i.installment.toFixed(2)),
          interest: parseFloat(i.interest.toFixed(2)),
          amortizacion: parseFloat(i.amortizacion.toFixed(2)),
          seguro: parseFloat(i.seguro.toFixed(2)),
          degravamen: parseFloat(i.degravamen.toFixed(2)),
          date: i.date,
          month: i.month,
        }))}
      />
      <div className="flex gap-6 mx-auto mt-10">
        <div className="flex gap-2 items-center">
          <p className="text-body-large">VAN</p>
          <p className="bg-[#4C49ED] text-white p-2 rounded-md">
            {van.toFixed(3)}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-body-large">TIR</p>
          <p className="bg-[#4C49ED] text-white p-2 rounded-md">
            {tir().toFixed(6)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
