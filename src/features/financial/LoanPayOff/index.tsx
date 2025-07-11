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
      {/*  <Grid size={12} sx={{mt: 2}}>*/}
      {/*  <Stack spacing={4}>*/}
      {/*    <Stack spacing={2} component={"section"}>*/}
      {/*      <Typography variant={"h2"}>*/}
      {/*        {t("bmi.introduction")}*/}
      {/*      </Typography>*/}
      {/*      <Typography variant={"body1"}>*/}
      {/*        {t("bmi.introduction.content")}*/}
      {/*      </Typography>*/}
      {/*    </Stack>*/}
      {/*  </Stack>*/}
      {/*</Grid>*/}
      </Calculator>
    </CalculatorContext.Provider>
  )
}
export default LoanPayOffCalculator