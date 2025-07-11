import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {CalculatorContext} from "@/providers/CalculatorProvider";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import Grid from "@mui/material/Grid2";
import CalculatorForm from "@/layout/CalculatorForm";
import Summary from "@/features/financial/components/Summary";
import MonthlyPayments from "@/features/financial/components/MonthPayments";
import Calculator from "@/layout/Calculator";
import {Stack, Typography} from "@mui/material";


const LoanPayOffCalculator = () => {
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
      monthlyPayment: {
        type: "number",
        title: t('payment.monthlyPayment'),
      }
    },
    required: ['loanAmount', 'annualRate', 'monthlyPayment'],
  }

  const uiSchema: UiSchema = {
    annualRate: {
      'ui:options': {
        suffix: '%'
      }
    },
  }

  const onCalculate = (formData: any) => {
    if (formData.loanAmount && formData.annualRate && formData.monthlyPayment) {
      const mr = formData.annualRate / 12 / 100
      const mp = formData.monthlyPayment
      if (mp <= formData.loanAmount * mr) {
        setResult(null)
        return {}
      }
      const months = Math.log(mp / (mp - formData.loanAmount * mr)) / Math.log(1 + mr)
      const payments = []
      let remainingPrincipal = formData.loanAmount
      for (let i = 1; i <= Math.ceil(months); i++) {
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
        amount: formData.loanAmount,
        months: months.toFixed(2),
        years: (months / 12).toFixed(2),
        totalAmount: (mp * months),
        totalInterest: (mp * months - formData.loanAmount),
        monthlyPayment: mp,
        payments,
      })
    } else {
      setResult(null)
    }
    return {}
  }

  const onChange = (data: any, id?: string) => {
    onCalculate(data.formData)
  }

  return (
    <CalculatorContext.Provider value={{
      result,
      setResult
    }}>
      <Calculator
        name={t('calculator.loanPayoff')}
        category={'FinancialApplication'}
        title={t('loanPayoff.title')}
        description={t('loanPayoff.description')}
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
          <Stack spacing={4}>
            <Stack spacing={2} component={"section"}>
              <Typography variant={"h2"}>
                Why Use a Loan Payoff Calculator?
              </Typography>
              <Typography variant={"body1"}>
                This tool helps you plan your debt-free journey by estimating how long it will take to pay off your loan
                based on monthly payments and interest rate.
              </Typography>
            </Stack>
            <Stack spacing={2} component={"section"}>
              <Typography variant={"h2"}>
                Example
              </Typography>
              <Typography variant={"body1"}>
                Loan: $10,000, Interest: 4.5%, Payment: $250/month → ~44 months to pay off.
              </Typography>
            </Stack>

            <Stack spacing={2} component={"section"}>
              <Typography variant={"h2"}>
                FAQ
              </Typography>
              <Typography variant={"h3"}>
                How is loan payoff time calculated?
              </Typography>
              <Typography variant={"body1"}>
                It uses the loan amount, interest rate, and monthly payment to estimate the number of months needed.
              </Typography>
              <Typography variant={"h3"}>
                What happens if I pay more than the minimum?
              </Typography>
              <Typography variant={"body1"}>
                Paying extra reduces the total interest and shortens the loan term.
              </Typography>
              <Typography variant={"h3"}>
                Can I include extra payments in the calculation?
              </Typography>
              <Typography variant={"body1"}>
                This calculator assumes fixed monthly payments. Advanced calculators support extra payment plans.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Calculator>
    </CalculatorContext.Provider>
  )
}
export default LoanPayOffCalculator