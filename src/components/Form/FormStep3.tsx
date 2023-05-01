import { useNavigate } from "react-router";
import { useData } from "../../context/FormDataContext";
import { useForm } from "react-hook-form";
import { MainContainer } from "../MainContainer";
import { PrimaryButton } from "../PrimaryButton";
import { FileInput } from "./FileInput";
import { Form } from "./Form";
import { Typography } from "@mui/material";

export const FormStep3 = () => {
  const navigate = useNavigate();
  const { data, setValues } = useData();
  
  const { register,
    unregister,
    setValue,
    watch, handleSubmit } = useForm({
    defaultValues: {
      files: data.files,
    },
  });

  const onSubmit = (data: any) => {
    navigate("/result");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        🦄 Step 3
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileInput name="files" register={register}
          unregister={unregister}
          setValue={setValue}
          watch={watch}
          accept='image/png, image/jpg, image/jpeg, image/gif'
          multiple
          mode='append'
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}