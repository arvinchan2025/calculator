import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import Calculator from "@/layout/Calculator";
import Grid from "@mui/material/Grid2";
import CalculatorForm from "@/layout/CalculatorForm";
import {Stack, Typography} from "@mui/material";


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
      name={t('calculator.percentOff')}
      category={"FinancialApplication"}
      title={t('percentOff.title')}
      description={t('percentOff.description')}
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
            <Typography variant={'h2'}>
              Why Use a Percent Off Calculator?
            </Typography>
            <Typography variant={'body1'}>
              This tool helps you instantly find out how much you save during discounts or sales, and calculate the final price.
            </Typography>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={'h2'}>
              How to Use a Percent Off Calculator?
            </Typography>
            <Typography variant={'body1'}>
              Enter the price and percent off to get the final price and saved money.
            </Typography>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={'h2'}>
              Example
            </Typography>
            <Typography variant={'body1'}>
              Original price $120, 25% off — you save $30, pay $90.
            </Typography>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              FAQ
            </Typography>
            <Typography variant={"h3"}>
              How is the discount calculated?
            </Typography>
            <Typography variant={"body1"}>
              Discount = Original Price × (Discount % / 100). Final Price = Original Price - Discount.
            </Typography>
            <Typography variant={"h3"}>
              Can I apply multiple discounts?
            </Typography>
            <Typography variant={"body1"}>
              Yes, but they apply sequentially. For example, 20% off then another 10% is not a total of 30%.
            </Typography>
            <Typography variant={"h3"}>
              How do I calculate the original price if I know the sale price and discount?
            </Typography>
            <Typography variant={"body1"}>
              Use: Original Price = Sale Price / (1 - Discount %)
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Calculator>
  )
}
export default PercentOffCalculator;