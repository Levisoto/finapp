import { ColumnDef } from "@tanstack/react-table";
import { CreditColumns as Columns } from "types";

export const columns: ColumnDef<Columns>[] = [
  {
    accessorKey: "month",
    header: "Mes",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "date",
    header: "Fecha de Pago",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "installment",
    header: "Cuota",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "interest",
    header: "Interes",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "amortizacion",
    header: "Amortizacion",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "degravamen",
    header: "Degravamen",
    cell: (info) => info.getValue() || "--",
  },
  {
    accessorKey: "seguro",
    header: "Seguro",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "saldo",
    header: "Saldo",
    cell: (info) => info.getValue(),
  },
];
