import Calculator from "@/layout/Calculator";
import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import CalculatorForm from "@/layout/CalculatorForm";
import Grid from "@mui/material/Grid2";
import Summary from "@/features/financial/components/Summary";
import MonthlyPayments from "@/features/financial/components/MonthPayments";
import {Stack, Typography} from "@mui/material";


const MortgageCalculator = () => {
  const {t} = useTranslation();
  const [result, setResult] = useState<any>(null);
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      loanAmount: {
        type: "number",
        title: t('payment.loanAmount'),
        default: 200000
      },
      annualRate: {
        type: "number",
        title: t('payment.annualRate'),
        default: 6
      },
      termYears: {
        type: "number",
        title: t('payment.termYears'),
      },
      propertyTax: {
        type: "number",
        title: t('payment.propertyTax'),
        default: 0
      },
      homeInsurance: {
        type: "number",
        title: t('payment.homeInsurance'),
        default: 0
      },
      hoaFees: {
        type: "number",
        title: t('payment.hoaFees'),
        default: 0
      }
    },
    required: ['loanAmount', 'annualRate', 'termYears'],
  }

  const uiSchema: UiSchema = {
    annualRate: {
      'ui:options': {
        suffix: '%'
      }
    },
    termYears: {
      'ui:options': {
        suffix: t("calculator.unit.year")
      }
    }
  }

  const onCalculate = (formData: any) => {
    if (formData.loanAmount && formData.annualRate && formData.termYears) {
      const loanAmount = formData.loanAmount
      const monthlyRate = formData.annualRate / 12 / 100
      const months = formData.termYears * 12
      const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
      const denominator = Math.pow(1 + monthlyRate, months) - 1;
      const monthlyPropertyTax = formData.propertyTax? formData.propertyTax / 12: 0
      const monthlyInsurance = formData.homeInsurance? formData.homeInsurance / 12: 0
      const monthlyPayment = loanAmount * (numerator / denominator) + monthlyPropertyTax + monthlyInsurance + formData.hoaFees

      let remainingPrincipal = loanAmount
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
        amount: loanAmount,
        months,
        years: formData.term,
        totalAmount: (monthlyPayment * months),
        totalInterest: (monthlyPayment * months - loanAmount),
        monthlyPayment,
        payments,
      })
    }else{
      setResult(null)
    }
    return {}
  }

  const onChange = (data: any, id?: string) => {
    onCalculate(data.formData)
  }

  return (
    <Calculator
      name={t('calculator.mortgage')}
      category={'FinancialApplication'}
      title={t('mortgage.title')}
      description={t('mortgage.description')}
    >
      <Grid size={{xs: 12, md: 6}}>
        <CalculatorForm
          schema={schema}
          uiSchema={uiSchema}
          onCalculate={onCalculate}
          onChange={onChange}
        />
      </Grid>
      {result && <Grid size={12}>
            <Summary result={result}/>
            <MonthlyPayments result={result}/>
        </Grid>}
      <Grid size={12} sx={{mt: 2}}>
        <Stack spacing={3}>
          <Stack component={"section"} spacing={2}>
            <Typography variant={"h2"}>
              {t("What is a mortgage calculator?")}
            </Typography>
            <Typography variant={"body1"}>
              {t("A tool that helps you calculate your expected monthly mortgage payments based on loan amount, interest rate, and loan term.")}
            </Typography>
          </Stack>
          <Stack component={"section"} spacing={2}>
            <Typography variant={"h2"}>
              {t("How is the interest calculated?")}
            </Typography>
            <Typography variant={"body1"}>
              {t("It uses compound interest formulas with fixed monthly payment.")}
            </Typography>
          </Stack>
          <Stack component={"section"} spacing={2}>
            <Typography variant={"h2"}>
              {t("What’s included in total monthly payment?")}
            </Typography>
            <Typography variant={"body1"}>
              {t("Principal + interest, and optionally property tax, insurance, and HOA fees.")}
            </Typography>
          </Stack>
          <Stack component={"section"} spacing={2}>
            <Typography variant={"h2"}>
              {t("What loan term is best?")}
            </Typography>
            <Typography variant={"body1"}>
              {t("30-year loans have lower monthly payments, but 15-year loans save interest in the long run.")}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Calculator>
  )
}
export default MortgageCalculator