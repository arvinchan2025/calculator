import {Box, Typography} from "@mui/material";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import validator from '@rjsf/validator-ajv8';
import RJSFForm from "../components/rjsf/RJSFForm";
import CustomObjectFieldTemplate from "./ObjectFieldTemplate";
import {useRef, useState} from "react";


const BMICalculator = () => {
  const formRef = useRef<any>(null);
  const [bmi, setBmi] = useState<number>(0)
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      age: {
        type: "number",
        title: "Age"
      },
      weight: {
        type: "number",
        title: "Weight"
      },
      height: {
        type: "number",
        title: "Height"
      }
    }
  }

  const uiSchema: UiSchema = {
    'ui:ObjectFieldTemplate': CustomObjectFieldTemplate,
    height: {
      'ui:options': {
        suffix: "cm"
      }
    },
    weight: {
      'ui:options': {
        suffix: "kg"
      }
    }
  }

  const onSubmit = async () => {
    const isValid = formRef.current?.validateForm()
    if (isValid) {
      const formData = formRef.current?.state.formData
      const height = formData?.height / 100
      console.log(formData.weight, formData.height)
      const ret = formData.weight / (height * height)
      console.log(formRef.current, formData, ret)
      setBmi(ret)
    }
  }

  return (
    <Box>
      <Typography variant={"h5"} sx={{mb: 2}}>BMI Calculator</Typography>
      <RJSFForm
        ref={formRef}
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onSubmit={onSubmit}
      />
      <Typography variant={"h5"} sx={{mt: 2}}>BMI: {bmi}</Typography>
    </Box>
  )
}
export default BMICalculator