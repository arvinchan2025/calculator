import {RJSFSchema} from "@rjsf/utils";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid2";
import CalculatorForm from "@/layout/CalculatorForm";
import React from "react";
import Calculator from "@/layout/Calculator";
import {Link, Stack, Typography} from "@mui/material";


const CreditCardCalculator = () => {
  const {t} = useTranslation();
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      balance: {
        type: 'number',
        title: t('creditCard.balance'),
      },
      interestRate: {
        type: 'number',
        title: t('creditCard.interestRate'),
      },
      monthlyPayment: {
        type: 'number',
        title: t('creditCard.monthlyPayment'),
      },
      additionalPayment: {
        type: 'number',
        title: t('creditCard.additionalPayment'),
      },
      months: {
        type: 'number',
        title: t('creditCard.months'),
      },
      totalInterest: {
        type: 'string',
        title: t('creditCard.totalInterest'),
      }
    },
    required: ['balance', 'interestRate', 'monthlyPayment']
  }

  const uiSchema = {
    balance: {
      'ui:helpTxt': t('creditCard.balance.helpTxt'),
    },
    interestRate: {
      'ui:helpTxt': t('creditCard.interestRate.helpTxt'),
    },
    monthlyPayment: {
      'ui:helpTxt': t('creditCard.monthlyPayment.helpTxt'),
    },
    additionalPayment: {
      'ui:helpTxt': t('creditCard.additionalPayment.helpTxt'),
      'ui:options': {
        suffix: '%'
      }
    },
    months: {
      'ui:readonly': true,
    },
    totalInterest: {
      'ui:readonly': true,
    }
  }

  const onCalculate = (formData: any) => {
    const monthlyRate = formData.interestRate / 12 / 100;
    const monthlyPayment = formData.monthlyPayment + formData.additionalPayment
    const result = {
      balance: formData.balance,
      totalInterest: 0,
      months: 0
    }
    while (result.balance > 0) {
      const interest = result.balance * monthlyRate;
      const principal = monthlyPayment - interest
      if (principal <= 0) {
        break
      }
      result.balance -= principal
      result.totalInterest += interest
      result.months += 1
    }
    return {
      months: result.months,
      totalInterest: result.totalInterest.toFixed(2),
    }
  }

  const onChange = (data: any) => {
    return onCalculate(data.formData)
  }

  return (
    <Calculator
      name={t('calculator.creditCard')}
      category={'FinancialApplication'}
      title={t('creditCard.title')}
      description={t('creditCard.description')}
    >
      <Grid size={{xs: 12, md: 6}}>
        <CalculatorForm
          schema={schema}
          uiSchema={uiSchema}
          onCalculate={onCalculate}
          onChange={onChange}
          formData={{
            additionalPayment: 0
          }}
        />
      </Grid>
      <Grid size={12}>
        <Stack spacing={3}>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              How to calculator credit card payoff?
            </Typography>
            <Typography variant={"body1"}>
              To calculate how long it will take to pay off your credit card—or how much you need to pay monthly to be
              debt-free—you can use the following steps:
            </Typography>
            <Typography variant={"h3"}>
              You need to know:
            </Typography>
            <ol>
              <li>Your current balance</li>
              <li>Your annual interest rate (APR)</li>
              <li>Your monthly payment amount</li>
            </ol>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              How long will it take to pay off?
            </Typography>
            <Typography variant={"body1"}>
              If you want to know how many months it will take to pay off your card:
            </Typography>
            <Typography variant={"body1"}>
              monthly interest rate = APR ÷ 12 ÷ 100
            </Typography>
            <Typography variant={"body1"}>
              Then use an amortization loop:
            </Typography>
            <ol>
              <li>Subtract interest from your payment</li>
              <li>Deduct principal from your balance</li>
              <li>Repeat monthly until balance reaches zero</li>
            </ol>
            <Typography variant={"body1"}>
              Then will give you total months to pay off and total interest paid.
            </Typography>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              Tips
            </Typography>
            <ul>
              <li>If your monthly payment is too low to cover interest, your balance will grow, not shrink.</li>
              <li>Adding extra monthly payments can dramatically reduce payoff time and total interest.</li>
              <li>Use a <Link href={'https://calculator-now.com/credit-card-payoff-calculator'}>credit card payoff
                calculator</Link> for instant results..
              </li>
            </ul>
          </Stack>
        </Stack>
      </Grid>
    </Calculator>
  )
}
export default CreditCardCalculator