import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import Calculator from "@/layout/Calculator";
import Grid from "@mui/material/Grid2";
import CalculatorForm from "@/layout/CalculatorForm";
import {Stack, TextField} from "@mui/material";
import ServiceTips from "@/features/other/TipCalculator/ServiceTips";


const TipCalculator = () => {
  const {t} = useTranslation();
  const [bill, setBill] = useState<any>()
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      bill: {
        type: "number",
        title: t('tip.bill'),
        default: 100
      },
      tip: {
        type: "number",
        title: t('tip.tip'),
        default: 15
      },
    },
    required: ["bill", 'tip'],
  }

  const uiSchema: UiSchema = {
    tip: {
      'ui:options': {
        suffix: '%'
      }
    },
  }

  const onCalculate = async (formData: any) => {
    const tip = formData.bill * formData.tip / 100
    const total = formData.bill + tip
    setBill({
      tip,
      total
    })
  }

  return (
    <Calculator
      title={t('tip.calculator')}
      description={t('tip.calculator.description')}
    >
      <Grid size={6}>
        <CalculatorForm
          schema={schema}
          uiSchema={uiSchema}
          onCalculate={onCalculate}
        />
        {bill && <Stack spacing={2} sx={{padding: "16px 0"}}>
            <TextField
                label={t('tip.tip')}
                fullWidth
                value={bill.tip.toFixed(2)}
            />
            <TextField
                label={t('tip.total')}
                fullWidth
                value={bill.total.toFixed(2)}
            />
        </Stack>}
      </Grid>
      <Grid size={12}>
        <ServiceTips />
      </Grid>
    </Calculator>
  )
}
export default TipCalculator;