import {Button, Stack, Typography} from "@mui/material";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import validator from '@rjsf/validator-ajv8';
import RJSFForm from "../components/rjsf/RJSFForm";
import CustomObjectFieldTemplate from "./ObjectFieldTemplate";
import {useRef, useState} from "react";
import Grid from "@mui/material/Grid2";
import {Calculate, Clear} from "@mui/icons-material";


const BMICalculator = () => {
  const formRef = useRef<any>(null);
  const [formData, setFormData] = useState({})
  const [bmi, setBmi] = useState<any>(0)
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      // age: {
      //   type: "number",
      //   title: "Age"
      // },
      weight: {
        type: "number",
        title: "Weight"
      },
      height: {
        type: "number",
        title: "Height"
      }
    },
    required: ['weight', 'height'],
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

  const getBMILevel = () => {
    const value = parseFloat(bmi)
    if (value < 16) {
      return "Severe Thinness"
    } else if (value < 17) {
      return "Moderate Thinness"
    } else if (value < 18.5) {
      return "Mild Thinness"
    } else if (value < 15) {
      return "Normal"
    } else if (value < 30) {
      return "Overweight"
    } else if (value < 35) {
      return "Obese Class I"
    } else if (value < 40) {
      return "Obese Class II"
    } else {
      return "Obese Class III"
    }
  }

  const onSubmit = async () => {
    const isValid = formRef.current?.validateForm()
    if (isValid) {
      const formData = formRef.current?.state.formData
      const height = formData?.height / 100
      console.log(formData.weight, formData.height)
      const ret = (formData.weight / (height * height)).toFixed(1)
      console.log(formRef.current, formData, ret)
      setBmi(ret)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant={"h5"} sx={{mb: 2}}>BMI Calculator</Typography>
      </Grid>
      <Grid size={6}>
        <RJSFForm
          ref={formRef}
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
        />
        <Stack
          sx={{padding: "16px 0"}}
          spacing={2}
          direction={"row"}
        >
          <Button
            variant={"contained"}
            startIcon={<Calculate/>}
            onClick={onSubmit}
          >
            Calculate
          </Button>
          <Button
            variant={"outlined"}
            startIcon={<Clear/>}
            onClick={() => formRef.current?.reset()}
          >
            Clear
          </Button>
        </Stack>
      </Grid>
      <Grid size={6}>
        <Typography variant={"h5"} sx={{mt: 2}}>
          BMI = {bmi} kg/m<sup>2</sup> ({getBMILevel()})
        </Typography>
      </Grid>
      <Grid size={12}>
        <Stack spacing={2}>
          <Typography variant={"h4"}>BMI introduction</Typography>
          <Typography variant={"body1"}>
            BMI is a measurement of a person's leanness or corpulence based on their height and weight, and is intended
            to
            quantify tissue mass. It is widely used as a general indicator of whether a person has a healthy body weight
            for their height. Specifically, the value obtained from the calculation of BMI is used to categorize whether
            a
            person is underweight, normal weight, overweight, or obese depending on what range the value falls between.
            These ranges of BMI vary based on factors such as region and age, and are sometimes further divided into
            subcategories such as severely underweight or very severely obese. Being overweight or underweight can have
            significant health effects, so while BMI is an imperfect measure of healthy body weight, it is a useful
            indicator of whether any additional testing or action is required. Refer to the table below to see the
            different categories based on BMI that are used by the calculator.
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}
export default BMICalculator