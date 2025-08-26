import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  gender: Yup.string().required(),
  grNumber: Yup.number().integer().required().typeError("Number Only"),
  department: Yup.string().required(),
  address: Yup.string().required(),
  class: Yup.string().required(),
});
