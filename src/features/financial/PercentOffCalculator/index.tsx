import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import Calculator from "@/layout/Calculator";
import Grid from "@mui/material/Grid2";
import CalculatorForm from "@/layout/CalculatorForm";
import {Stack, TextField} from "@mui/material";


const PercentOffCalculator = () => {
  const {t} = useTranslation();
  const [result, setResult] = useState<any>()
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      price: {
        type: "number",
        title: t('percentOff.price'),
        default: 39.99
      },
      discount: {
        type: "number",
        title: t('percentOff.discount'),
        default: 15
      },
    },
    required: ["price", 'discount'],
  }

  const uiSchema: UiSchema = {
    discount: {
      'ui:options': {
        suffix: '%'
      }
    },
  }

  const onCalculate = async (formData: any) => {
    const saved = formData.price * formData.discount / 100
    const finalPrice = formData.price - saved
    setResult({
      finalPrice,
      saved
    })
  }

  return (
    <Calculator
      title={t('percentOff.calculator')}
      description={t('percentOff.calculator.description')}
    >
      <Grid size={6}>
        <CalculatorForm
          schema={schema}
          uiSchema={uiSchema}
          onCalculate={onCalculate}
        />
        {result && <Stack spacing={2} sx={{padding: "16px 0"}}>
            <TextField
                label={t('percentOff.finalPrice')}
                fullWidth
                value={result.finalPrice.toFixed(2)}
                slotProps={{
                  input: {
                    readOnly: true
                  }
                }}
            />
            <TextField
                label={t('percentOff.saved')}
                fullWidth
                value={result.saved.toFixed(2)}
                slotProps={{
                  input: {
                    readOnly: true
                  }
                }}
            />
        </Stack>}
      </Grid>
    </Calculator>
  )
}
export default PercentOffCalculator;