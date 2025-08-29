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

const today = new Date()
today.setHours(0, 0, 0 , 0)

export const LeaveSchema = Yup.object().shape({
  startDate: Yup.string().required().test("is-after-today", "Start date must be greater then today", (value) => {
    if(!value) return false
    const selected = new Date(value)
    selected.setHours(0 ,0 , 0 ,0)
    return selected.getTime() >= today.getTime()
  }),
  endDate: Yup.string().required().test("is-after-today", "End date must be greater then today", (value) => {
    if(!value) return false
    const selected = new Date(value)
    selected.setHours(0 ,0 , 0 ,0)
    return selected.getTime() >= today.getTime()
  }),
  requestToId: Yup.string().required(),
  reason: Yup.string().required(),
  leaveType: Yup.string().oneOf(['firstHalf','secondeHalf','fullDay']).required(),
})