export interface Credit {
  begin_credit_date: string;
  price: number;
  type_rate: string;
  rate: number;
  porte: number;
  installments: number;
  begin_amount: number;
  grace_period: number;
}

export type AddCreditFormValues = Credit;
