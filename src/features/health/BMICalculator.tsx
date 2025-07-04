import {Stack, Typography} from "@mui/material";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import CustomObjectFieldTemplate from "../ObjectFieldTemplate";
import React, {useRef, useState} from "react";
import Grid from "@mui/material/Grid2";
import {useTranslation} from "react-i18next";
import CalculatorForm from "@/layout/CalculatorForm";
import Calculator from "@/layout/Calculator";


const BMICalculator = () => {
  const {t} = useTranslation();
  const formRef = useRef<any>(null);
  const [bmi, setBmi] = useState<any>(0)
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

  const getBMILevel = () => {
    const value = parseFloat(bmi)
    if (value < 16) {
      return t('bmi.severeThinness')
    } else if (value < 17) {
      return t('bmi.moderateThinness')
    } else if (value < 18.5) {
      return t('bmi.mildThinness')
    } else if (value < 15) {
      return t('bmi.normal')
    } else if (value < 30) {
      return t('bmi.overweight')
    } else if (value < 35) {
      return t('bmi.obeseClassI')
    } else if (value < 40) {
      return t('bmi.obeseClassII')
    } else {
      return t('bmi.obeseClassIII')
    }
  }

  const onCalculate = async (formData: any) => {
    const height = formData?.height / 100
    const ret = (formData.weight / (height * height)).toFixed(1)
    setBmi(ret)
  }

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
      </Grid>
      <Grid size={12}>
        {bmi > 0 && <Typography variant={"h5"} sx={{mt: 2}} color={"info"}>
          BMI = {bmi} kg/m<sup>2</sup> ({getBMILevel()})
        </Typography>}
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