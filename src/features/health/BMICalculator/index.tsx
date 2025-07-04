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
      weight: {
        type: "number",
        title: t('bmi.weight')
      },
      height: {
        type: "number",
        title: t('bmi.height')
      }
    },
    required: ['weight', 'height'],
  }

  const uiSchema: UiSchema = {
    'ui:ObjectFieldTemplate': CustomObjectFieldTemplate,
    height: {
      'ui:options': {
        suffix: t("calculator.unit.cm")
      }
    },
    weight: {
      'ui:options': {
        suffix: t("calculator.unit.kg")
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

  const onCalculate = async (formData: any) => {
    const height = formData?.height / 100
    const bmi = (formData.weight / (height * height))
    const bmiPrime = (bmi / 25)
    const checked = getBMILevel(bmi)
    setResult({
      bmi: bmi,
      bmiPrime: bmiPrime,
      ...checked
    })
  }

  // BMI = {bmi} kg/m<sup>2</sup> ({getBMILevel()})

  return (
    <Calculator
      title={t('bmi.calculator')}
    >
      <Grid size={6}>
        <CalculatorForm
          schema={schema}
          uiSchema={uiSchema}
          onCalculate={onCalculate}
        />
        {result &&
            <Stack spacing={2} sx={{padding: "16px 0"}}>
                <Typography variant={'h5'} color={result.lv}>{result.label}</Typography>
                <TextField
                    label={t('bmi.bmi')}
                    fullWidth
                    value={result.bmi.toFixed(1)}
                    slotProps={{
                      input: {
                        endAdornment: <Typography>kg/m<sup>2</sup></Typography>
                      }
                    }}
                />
                <TextField
                    label={t('bmi.bmiPrime')}
                    fullWidth
                    value={result.bmiPrime.toFixed(1)}
                />
            </Stack>

        }
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