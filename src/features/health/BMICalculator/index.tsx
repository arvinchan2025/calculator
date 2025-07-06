import {Stack, TextField, Typography} from "@mui/material";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import CustomObjectFieldTemplate from "./ObjectFieldTemplate";
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
      pageTitle={t('bmi.pageTitle')}
      pageDescription={t('bmi.pageDescription')}
      title={t('bmi.calculator')}
      description={t('bmi.calculator.description')}
    >
      <Grid size={6}>
        <CalculatorForm
          schema={schema}
          uiSchema={uiSchema}
          onCalculate={onCalculate}
          onChange={onChange}
        />
      </Grid>
      <Grid size={12}>
        <Stack spacing={2}>
          <Typography variant={"h4"}>
            {t("bmi.introduction")}
          </Typography>
          <Typography variant={"body1"}>
            {t("bmi.introduction.content")}
          </Typography>
        </Stack>
      </Grid>
    </Calculator>
  )
}
export default BMICalculator