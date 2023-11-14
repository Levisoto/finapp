import { AddCreditFormValues as AddCredit } from "types";

export const useCreateCredit = (): [(a: AddCredit) => void] => {
  const createCredit = (a: AddCredit) => {
    console.log(a);
  };

  return [createCredit];
};

export const useGetParameters = (): [number, number] => {
  return [0.00015, 0.001];
};
