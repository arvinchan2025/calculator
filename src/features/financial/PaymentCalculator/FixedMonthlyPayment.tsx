import {useTranslation} from "react-i18next";
import React, {useRef} from "react";
import {CustomValidator, RJSFSchema, UiSchema} from "@rjsf/utils";
import RJSFForm from "@/components/rjsf/RJSFForm";
import validator from "@rjsf/validator-ajv8";
import {Box, Button, Stack} from "@mui/material";
import {Calculate, Clear} from "@mui/icons-material";
import {usePaymentCalculatorContext} from "@/features/financial/PaymentCalculator/index";


const FixedMonthlyPayment = () => {
  const {t} = useTranslation();
  const {setResult} = usePaymentCalculatorContext()
  const formRef = useRef<any>(null);
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      amount: {
        type: "number",
        title: t('payment.loanAmount'),
        default: 200000
      },
      monthlyPayment: {
        type: "number",
        title: t('payment.monthlyPayment'),
        default: 2000
      },
      rate: {
        type: "number",
        title: t('payment.interestRate'),
        default: 6
      }
    },
    required: ['amount', 'monthlyPayment', 'rate'],
  }

  const uiSchema: UiSchema = {
    rate: {
      'ui:options': {
        suffix: '%'
      }
    },
  }

  const customValidate: CustomValidator = (formData, errors, uiSchema) => {
    if(formData.amount && formData.rate && formData.monthlyPayment){
      const mr = formData.rate / 12 / 100
      const interest = formData.amount * mr
      if(formData.monthlyPayment <= interest){
        errors.monthlyPayment?.addError('Monthly payment can not lese than interest.')
      }
    }
    return errors
  }

  const onCalculate = async () => {
    const isValid = await formRef.current?.validateForm()
    if (isValid) {
      const formData = formRef.current?.state.formData
      const amount = formData.amount
      const mr = formData.rate / 12 / 100
      const mp = formData.monthlyPayment
      const months = Math.log(mp / (mp - amount * mr)) / Math.log(1 + mr)
      const payments = []
      let remainingPrincipal = amount
      for(let i=1; i<=Math.ceil(months);i++){
        const interest = remainingPrincipal * mr;
        const monthlyPayment = Math.min(mp, (remainingPrincipal + interest))
        const principalPart = monthlyPayment - interest;
        remainingPrincipal -= principalPart;
        payments.push({
          month: i,
          monthlyPayment: monthlyPayment.toFixed(2),
          principal: principalPart.toFixed(2),
          interest: interest.toFixed(2),
          remainingPrincipal: remainingPrincipal > 0 ? remainingPrincipal.toFixed(2) : '0.00'
        })
      }
      setResult({
        amount: amount,
        months: months.toFixed(2),
        years: (months / 12).toFixed(2),
        totalAmount: (mp * months),
        totalInterest: (mp * months - amount),
        monthlyPayment: mp,
        payments,
      })
    }
  }

  return (
    <Box>
      <RJSFForm
        ref={formRef}
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        customValidate={customValidate}
      />
      <Stack
        sx={{padding: "16px 0"}}
        spacing={2}
        direction={"row"}
      >
        <Button
          variant={"contained"}
          startIcon={<Calculate/>}
          onClick={onCalculate}
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
    </Box>
  )
}
export default FixedMonthlyPayment