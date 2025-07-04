import React, {useRef} from "react";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import {useTranslation} from "react-i18next";
import {Box, Button, Stack} from "@mui/material";
import RJSFForm from "@/components/rjsf/RJSFForm";
import validator from "@rjsf/validator-ajv8";
import {Calculate, Clear} from "@mui/icons-material";
import {usePaymentCalculatorContext} from "@/features/financial/PaymentCalculator/index";


const FixedTerm = () => {
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
      term: {
        type: "number",
        title: t('payment.loanTerm'),
        default: 20
      },
      rate: {
        type: "number",
        title: t('payment.interestRate'),
        default: 6
      }
    },
    required: ['amount', 'term', 'rate'],
  }

  const uiSchema: UiSchema = {
    term: {
      'ui:options': {
        suffix: t("calculator.unit.year")
      }
    },
    rate: {
      'ui:options': {
        suffix: '%'
      }
    },
  }

  const onCalculate = async () => {
    const isValid = await formRef.current?.validateForm()
    if (isValid) {
      const formData = formRef.current?.state.formData
      const amount = formData.amount
      const monthlyRate = formData.rate / 12 / 100
      const months = formData.term * 12
      const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
      const denominator = Math.pow(1 + monthlyRate, months) - 1;
      const monthlyPayment = amount * (numerator / denominator)
      let remainingPrincipal = amount
      const payments = []
      for (let i = 1; i <= months; i++) {
        const interest = remainingPrincipal * monthlyRate;
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
        months,
        years: formData.term,
        totalAmount: (monthlyPayment * months),
        totalInterest: (monthlyPayment * months - amount),
        monthlyPayment,
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
export default FixedTerm