import {useTranslation} from "react-i18next";
import React from "react";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import Calculator from "@/layout/Calculator";
import Grid from "@mui/material/Grid2";
import CalculatorForm from "@/layout/CalculatorForm";
import ServiceTips from "@/features/other/TipCalculator/ServiceTips";
import {Stack, Typography} from "@mui/material";


const TipCalculator = () => {
  const {t} = useTranslation();
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      bill: {
        type: "number",
        title: t('tip.bill'),
        default: 100
      },
      tipRate: {
        type: "number",
        title: t('tip.tipRate'),
        default: 15
      },
      people: {
        type: "number",
        title: t('tip.people'),
        default: 1
      },
      total: {
        type: "string",
        title: t('tip.total'),
        default: ''
      },
      tipAmount: {
        type: "string",
        title: t('tip.tipAmount'),
        default: ''
      },
      perPerson: {
        type: "string",
        title: t('tip.perPerson'),
        default: ''
      },
    },
    required: ["bill", 'tipRate', 'people'],
  }

  const uiSchema: UiSchema = {
    tipAmount: {
      'ui:readonly': true,
    },
    tipRate: {
      'ui:readonly': true,
      'ui:options': {
        suffix: '%'
      }
    },
  }

  const onCalculate = (formData: any) => {
    if (formData.bill && formData.tipRate) {
      const tipAmount = formData.bill * formData.tipRate / 100
      const total = formData.bill + tipAmount
      const perPerson = total / formData.people
      return {
        total: total.toFixed(2),
        tipAmount: tipAmount.toFixed(2),
        perPerson: perPerson.toFixed(2)
      }
    }
    return {tipAmount: '', total: '', perPerson: ''}
  }

  const onChange = (data: any, id?: string) => {
    if (id === 'root_bill' || id === 'root_tipRate' || id === 'root_people') {
      return onCalculate(data.formData)
    }
    return {}
  }

  return (
    <Calculator
      name={t('calculator.tip')}
      category={'CalculationApplication'}
      title={t('tip.title')}
      description={t('tip.description')}
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
              Why Use a Tip Calculator?
            </Typography>
            <Typography variant={"body1"}>
              It ensures you tip fairly based on your total bill and service quality. It also helps split bills among
              multiple people easily.
            </Typography>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              Example
            </Typography>
            <Typography variant={"body1"}>
              Your total is $75 and you want to tip 15%. That’s $11.25 and total is $86.25.
            </Typography>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              Service & Typical Tip
            </Typography>
            <ServiceTips/>
          </Stack>
        </Stack>
      </Grid>
    </Calculator>
  )
}
export default TipCalculator;