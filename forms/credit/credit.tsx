import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AddCreditFormValues as FormValues } from "types";
import { Form, FormField, InputCustom } from "components/ui";
import { Input, SelectInput, Button } from "components/ui";
import { useCreateCredit } from "hooks";

interface IClientProps {
  prop?: string;
}

const schema = yup.object().shape({
  begin_credit_date: yup.string().required("required"),
  price: yup.number().typeError("invalid").required("required"),
  rate: yup.number().typeError("invalid").required("required"),
  type_rate: yup.string().required("required"),
  porte: yup.number().typeError("invalid").required("required"),
  installments: yup
    .number()
    .typeError("invalid")
    .max(7, "maximo 7")
    .min(1)
    .required("required"),
  begin_amount: yup.number().typeError("invalid").required("required"),
  grace_period: yup.number().typeError("invalid").required("required"),
});

export const CreateClient: FC<IClientProps> = () => {
  const [createCredit] = useCreateCredit();
  const form = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit = (data: FormValues) => {
    try {
      createCredit(data);
      reset({
        begin_credit_date: "",
        price: 0,
        rate: 0,
        porte: 0,
        installments: 0,
        begin_amount: 0,
        grace_period: 0,
      });
    } catch (err) {
      console.error("Form Client:", err);
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 gap-2 text-primary"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <FormField
          control={control}
          name="begin_credit_date"
          render={({ field }) => (
            <Input
              className="col-span-2"
              type="date"
              label="Fecha de inicio del credito"
              {...field}
            />
          )}
        />
        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <Input
              className="col-span-2"
              type="number"
              label="Precio del Vehiculo"
              {...field}
            />
          )}
        />
        <FormField
          control={control}
          name="type_rate"
          render={({ field }) => (
            <SelectInput
              label="Tipo de Tasa"
              options={[
                {
                  label: "Nominal",
                  value: "nominal",
                },
                {
                  label: "Efectiva",
                  value: "efective",
                },
              ]}
              {...field}
            />
          )}
        />
        <FormField
          control={control}
          name="rate"
          render={({ field }) => (
            <Input type="number" label="Tasa" {...field} />
          )}
        />
        <FormField
          control={control}
          name="porte"
          render={({ field }) => (
            <Input
              className="col-span-2"
              type="number"
              label="Porte"
              {...field}
            />
          )}
        />
        <FormField
          control={control}
          name="installments"
          render={({ field }) => (
            <Input
              className="col-span-2"
              type="number"
              label="Plazos del Periodo"
              {...field}
            />
          )}
        />
        <FormField
          control={control}
          name="begin_amount"
          render={({ field }) => (
            <Input
              className="col-span-2"
              type="number"
              label="Cuota inicial"
              {...field}
            />
          )}
        />

        <FormField
          control={control}
          name="grace_period"
          render={({ field }) => (
            <Input
              className="col-span-2"
              type="number"
              label="Periodos de gracia"
              {...field}
            />
          )}
        />
        <Button className="col-span-2 w-full mt-4" type="submit">
          Ver cronograma de pagos
        </Button>
      </form>
    </Form>
  );
};

export default CreateClient;
