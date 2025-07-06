import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import Calculator from "@/layout/Calculator";
import Grid from "@mui/material/Grid2";
import CalculatorForm from "@/layout/CalculatorForm";


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
      finalPrice: {
        type: "string",
        title: t('percentOff.finalPrice'),
      },
      saved: {
        type: "string",
        title: t('percentOff.saved'),
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

  const onCalculate = (formData: any) => {
    if (formData.price && formData.discount) {
      const saved = formData.price * formData.discount / 100
      const finalPrice = formData.price - saved
      return {
        saved: saved.toFixed(2),
        finalPrice: finalPrice.toFixed(2)
      }
    }
    return {saved: '', finalPrice: ''}
  }

  const onChange = (data: any, id?: string) => {
    if (id === 'root_price' || id === 'root_discount') {
      return onCalculate(data.formData)
    }
    return {}
  }

  return (
    <Calculator
      pageTitle={t('percentOff.pageTitle')}
      pageDescription={t('percentOff.pageDescription')}
      title={t('percentOff.calculator')}
      description={t('percentOff.calculator.description')}
    >
      <Grid size={6}>
        <CalculatorForm
          schema={schema}
          uiSchema={uiSchema}
          onCalculate={onCalculate}
          onChange={onChange}
        />
      </Grid>
    </Calculator>
  )
}
export default PercentOffCalculator;