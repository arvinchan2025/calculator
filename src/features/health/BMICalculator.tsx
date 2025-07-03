import {Box, Breadcrumbs, Button, Link, Stack, Typography} from "@mui/material";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import validator from '@rjsf/validator-ajv8';
import RJSFForm from "../../components/rjsf/RJSFForm";
import CustomObjectFieldTemplate from "../ObjectFieldTemplate";
import React, {useRef, useState} from "react";
import Grid from "@mui/material/Grid2";
import {Calculate, Clear} from "@mui/icons-material";
import {useTranslation} from "react-i18next";


const BMICalculator = () => {
  const {t} = useTranslation();
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
        suffix: t("bmi.unit.cm")
      }
    },
    weight: {
      'ui:options': {
        suffix: t("bmi.unit.kg")
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
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/home"
          >
            {t('calculator.home')}
          </Link>
          <Typography sx={{color: 'text.primary'}}>{t('bmi.calculator')}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid size={12}>
        <Typography variant={"h5"} sx={{mb: 2}}>
          {t('bmi.calculator')}
        </Typography>
      </Grid>
      <Grid size={6}>
        <RJSFForm
          ref={formRef}
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
        />
        <Box>
          <Typography variant={"h5"} sx={{mt: 2}}>
            BMI = {bmi} kg/m<sup>2</sup> ({getBMILevel()})
          </Typography>
        </Box>
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
            {t("common.button.calculate")}
          </Button>
          <Button
            variant={"outlined"}
            startIcon={<Clear/>}
            onClick={() => formRef.current?.reset()}
          >
            {t("common.button.clear")}
          </Button>
        </Stack>
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
    </Grid>
  )
}
export default BMICalculator