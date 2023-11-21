import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AddCreditFormValues as FormValues } from "types";
import { Form, FormField } from "components/ui";
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
  begin_amount_rate: yup.number().typeError("invalid").required("required"),
  type_grace: yup.string().required("required"),
  grace_period: yup.number().typeError("invalid"),
});

export const CreateClient: FC<IClientProps> = () => {
  const [createCredit] = useCreateCredit();
  const form = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { control, handleSubmit, watch, reset } = form;

  const type_grace = watch("type_grace", "none");

  const onSubmit = (data: FormValues) => {
    try {
      createCredit(data);
      // reset({
      //   begin_credit_date: "",
      //   price: 0,
      //   rate: 0,
      //   porte: 0,
      //   installments: 0,
      //   begin_amount_rate: 0,
      //   grace_period: 0,
      // });
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
          defaultValue="2023-09-22"
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
          defaultValue={30000.0}
          render={({ field }) => (
            <Input
              className="col-span-2"
              type="number"
              label="Precio del Vehiculo (S/)"
              {...field}
            />
          )}
        />
        <FormField
          control={control}
          name="type_rate"
          defaultValue="efective"
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
          defaultValue={0.1357}
          render={({ field }) => (
            <Input type="number" label="Tasa Anual (%)" {...field} />
          )}
        />
        <FormField
          control={control}
          name="porte"
          defaultValue={5}
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
          defaultValue={2}
          render={({ field }) => (
            <Input
              className="col-span-2"
              type="number"
              label="Plazos del Periodo (años)"
              {...field}
            />
          )}
        />
        <FormField
          control={control}
          name="begin_amount_rate"
          defaultValue={0.15}
          render={({ field }) => (
            <Input
              className="col-span-2"
              type="number"
              label="Cuota inicial (%)"
              {...field}
            />
          )}
        />
        <FormField
          control={control}
          name="type_grace"
          defaultValue="none"
          render={({ field }) => (
            <SelectInput
              label="Tipo de Periodo de Gracia"
              options={[
                {
                  label: "Ninguno",
                  value: "none",
                },
                {
                  label: "Parcial",
                  value: "partial",
                },
                {
                  label: "total",
                  value: "Total",
                },
              ]}
              {...field}
            />
          )}
        />
        <FormField
          control={control}
          name="grace_period"
          defaultValue={0}
          disabled={type_grace === "none"}
          render={({ field }) => (
            <Input type="number" label="Periodos de gracia" {...field} />
          )}
        />
        <Button className="bg-[#4C49ED] col-span-2 w-full mt-4" type="submit">
          Ver cronograma de pagos
        </Button>
      </form>
    </Form>
  );
};

export default CreateClient;
