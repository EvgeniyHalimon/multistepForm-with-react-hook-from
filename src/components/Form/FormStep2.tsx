import * as yup from "yup";
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { useData } from "../../context/FormDataContext";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormControlLabel, Typography, Checkbox } from "@mui/material";
import { Form } from "./Form";
import { MainContainer } from "../MainContainer";
import { PrimaryButton } from "../PrimaryButton";
import { Input } from "./Input";


const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is a required field"),
});

const normalizePhoneNumber = (value: any) => {
  const phoneNumber = parsePhoneNumberFromString(value)
  if(!phoneNumber){
    return value
  }

  return (
    phoneNumber.formatInternational() 
  );
};

export const FormStep2 = () => {
  const { data, setValues } = useData()
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: {errors} } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const hasPhone = watch("hasPhone");

  const onSubmit = (data: any) => {
    navigate("/step3");
    setValues(data);
  };

    return (
      <MainContainer>
        <Typography component="h2" variant="h5">
          🦄 Step 2
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input register={register} id={"email"} type={"email"} name={"email"} errors={errors.email}/>
          <FormControlLabel
            control={
              <input defaultValue={data.hasPhone} defaultChecked={data.hasPhone} className="mr-2" color="primary" type="checkbox" {...register("hasPhone")} name="hasPhone" />
            }
            label="Do you have a phone"
          />

          {hasPhone && (
            <Input register={register} id={"phoneNumber"} type={"tel"} name={"phoneNumber"} errors={errors.phoneNumber} onChange={normalizePhoneNumber}/>
          )}
        <PrimaryButton>Next</PrimaryButton>
        </Form>
    </MainContainer>
    )
  }
