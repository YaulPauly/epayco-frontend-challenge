import * as yup from "yup";

export const postSchema = yup.object({
  title: yup.string().trim().required("El titulo es requerido"),
  body: yup.string().trim().required("El contenido es requerido"),
  userId: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("El usuario es requerido")
    .required("El usuario es requerido")
    .min(1, "El usuario es requerido"),
});

export type PostFormValues = yup.InferType<typeof postSchema>;
