import * as yup from "yup";

export const studentFormSchema = yup
  .object({
    firstName: yup
      .string()
      .min(3, "Prénom doit comporter au moins 3 caractères")
      .required(),
    lastName: yup
      .string()
      .min(3, "Nom doit comporter au moins 3 caractères")
      .required(),
    code: yup
      .string()
      .matches(/^\d+$/, "CIN ne doit contenir que des chiffres")
      .min(8)
      .max(8)
      .required("CIN ne doit contenir que des chiffres"),
    level: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .required(),
  })
  .required();

export const teachcersFormSchema = yup
  .object({
    firstName: yup
      .string()
      .min(3, "Prénom doit comporter au moins 3 caractères")
      .required(),
    lastName: yup
      .string()
      .min(3, "Nom doit comporter au moins 3 caractères")
      .required(),
    cin: yup
      .string()
      .matches(/^\d+$/, "CIN ne doit contenir que des chiffres")
      .min(8)
      .max(8)
      .required("CIN ne doit contenir que des chiffres"),
    subject: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .required(),
    email: yup.string().email().required(),
    number: yup
      .number()
      .min(10000000, "Numéro doit étre valide")
      .max(99999999, "Numéro doit étre valide")
      .required(),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup.string().email("email must be valid").required(),
    password: yup.string().min(8).required("Please Enter your password"),
  })
  .required();
