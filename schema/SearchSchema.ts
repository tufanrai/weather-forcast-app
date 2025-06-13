import * as yup from "yup";

export const searchSchema = yup.object({
  city: yup.string().required("please enter the city name"),
});
