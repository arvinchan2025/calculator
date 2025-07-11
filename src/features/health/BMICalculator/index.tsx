import {Stack, Typography} from "@mui/material";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import React, {useRef, useState} from "react";
import Grid from "@mui/material/Grid2";
import {useTranslation} from "react-i18next";
import CalculatorForm from "@/layout/CalculatorForm";
import Calculator from "@/layout/Calculator";


const BMICalculator = () => {
  const {t} = useTranslation();
  const formRef = useRef<any>(null);
  const [result, setResult] = useState<any>(null)
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      height: {
        type: "number",
        title: t('bmi.height')
      },
      weight: {
        type: "number",
        title: t('bmi.weight')
      },
      bmi: {
        type: "string",
        title: t('bmi.bmi')
      },
      bmiPrime: {
        type: "string",
        title: t('bmi.bmiPrime')
      }
    },
    required: ['weight', 'height'],
  }

  const uiSchema: UiSchema = {
    // 'ui:ObjectFieldTemplate': CustomObjectFieldTemplate,
    height: {
      'ui:options': {
        suffix: t("calculator.unit.cm")
      }
    },
    weight: {
      'ui:options': {
        suffix: t("calculator.unit.kg")
      }
    },
    bmi: {
      'ui:readonly': true,
      'ui:options': {
        suffix: <Typography>kg/cm<sup>2</sup></Typography>
      }
    },
    bmiPrime: {
      'ui:readonly': true,
      'ui:options': {
        suffix: <Typography>BMI/25</Typography>
      }
    }
  }

  const getBMILevel = (bmi: any) => {
    const value = parseFloat(bmi)
    if (value < 16) {
      return {lv: 'error', label: t('bmi.severeThinness')}
    } else if (value < 17) {
      return {lv: 'error', label: t('bmi.moderateThinness')}
    } else if (value < 18.5) {
      return {lv: 'warning', label: t('bmi.mildThinness')}
    } else if (value < 15) {
      return {lv: 'info', label: t('bmi.normal')}
    } else if (value < 30) {
      return {lv: 'warning', label: t('bmi.overweight')}
    } else if (value < 35) {
      return {lv: 'warning', label: t('bmi.obeseClassI')}
    } else if (value < 40) {
      return {lv: 'error', label: t('bmi.obeseClassII')}
    } else {
      return {lv: 'error', label: t('bmi.obeseClassIII')}
    }
  }

  const onCalculate = (formData: any) => {
    if (formData?.height && formData.weight) {
      const height = formData?.height / 100
      const bmi = (formData.weight / (height * height))
      const bmiPrime = (bmi / 25)
      // const result = getBMILevel(bmi)
      // setResult(result)
      return {
        bmi: bmi.toFixed(1),
        bmiPrime: bmiPrime.toFixed(1),
      }
    }
    return {bmi: '', bmiPrime: ''}
  }

  const onChange = (data: any, id?: string) => {
    if (id === 'root_height' || id === 'root_weight') {
      return onCalculate(data.formData)
    }
    return {}
  }

  return (
    <Calculator
      name={t('calculator.bmi')}
      category={'HealthApplication'}
      title={t('bmi.title')}
      description={t('bmi.description')}
    >
      <Grid size={{xs: 12, md: 6}}>
        <CalculatorForm
          schema={schema}
          uiSchema={uiSchema}
          onCalculate={onCalculate}
          onChange={onChange}
        />
      </Grid>
      <Grid size={12}>
        <Stack spacing={4}>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              What is BMI?
            </Typography>
            <Typography variant={"body1"}>
              Body Mass Index (BMI) is a measure of body fat based on height and weight. It's a quick tool to evaluate your fitness level.
            </Typography>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              How to Use BMI Calculator
            </Typography>
            <Typography variant={"body1"}>
              Enter your height and weight, click calculate. Our BMI calculator gives you your BMI instantly.
            </Typography>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              Example
            </Typography>
            <Typography variant={"body1"}>
              Height: 175 cm, Weight: 70 kg → BMI = 70 / (1.75 × 1.75) = 22.86
            </Typography>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              FAQ
            </Typography>
            <Typography variant={"h3"}>
              What is a normal BMI?
            </Typography>
            <Typography variant={"body1"}>
              Normal BMI range is 18.5–24.9. Below or above may indicate underweight or overweight.
            </Typography>
            <Typography variant={"h3"}>
              Is BMI accurate for athletes?
            </Typography>
            <Typography variant={"body1"}>
              Not always. Muscular individuals may show high BMI despite having low body fat.
            </Typography>
            <Typography variant={"h3"}>
              How often should I check my BMI?
            </Typography>
            <Typography variant={"body1"}>
              Check monthly or quarterly to track trends rather than small changes.
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Calculator>
  )
}
export default BMICalculator