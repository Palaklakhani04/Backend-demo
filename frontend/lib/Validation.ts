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

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
})

export const LeaveSchema = Yup.object().shape({
  startDate: Yup.string().required(),
  endDate: Yup.string().required(),
  requestToId: Yup.string().required(),
  reason: Yup.string().required(),
  leaveType: Yup.string().oneOf(['firstHalf','secondeHalf','fullDay']).required(),
  // status: Yup.string().default("Pending").oneOf(['Pending','Approved','Rejected']).optional()
})