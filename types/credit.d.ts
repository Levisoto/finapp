export interface Credit {
  begin_credit_date: string;
  price: number;
  type_rate: string;
  rate: number;
  porte: number;
  installments: number;
  begin_amount_rate: number;
  type_grace: string;
  grace_period?: number;
}

export interface CreditColumns {
  month: number;
  date: string;
  amortizacion: number;
  interest: number;
  installment: number;
  saldo: number;
  degravamen: number;
  seguro: number;
}

export type AddCreditFormValues = Credit;
