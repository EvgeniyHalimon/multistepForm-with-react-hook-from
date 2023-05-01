import * as yup from "yup";

import { useData } from "../../context/FormDataContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MainContainer } from "../MainContainer";
import { Typography } from "@mui/material";
import { Form } from "./Form";
import { PrimaryButton } from "../PrimaryButton";
import { Input } from "./Input";


const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is a required field"),
});

export const FormStep1 = () => {
    const { data, setValues } = useData()
    const navigate = useNavigate();

    const {register, handleSubmit, formState: { errors }} = useForm({
      defaultValues: {firstName: data.firstName, lastName: data.lastName},
      mode: 'onBlur',
      resolver:  yupResolver(schema),
      /* reValidateMode: 'onChange' */
    })

    const onSubmit = (data: any) => {
      navigate("/step2");
      setValues(data);
    };

    return (
      <MainContainer>
        <Typography component="h2" variant="h5">
          🦄 Step 1
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input register={register} id={"firstName"} type={"text"} name={"firstName"} errors={errors.firstName}/>
          <Input register={register} id={"lastName"} type={"text"} name={"lastName"} errors={errors.lastName}/>
        <PrimaryButton>Next</PrimaryButton>
        </Form>
      </MainContainer>
    )
}
