import {useTranslation} from "react-i18next";
import React, {useContext, useState} from "react";
import Grid from "@mui/material/Grid2";
import {Box, Stack, Tab, Tabs, Typography} from "@mui/material";
import MonthlyPayments from "@/features/financial/PaymentCalculator/MonthPayments";
import Summary from "@/features/financial/PaymentCalculator/Summary";
import FixedTerm from "@/features/financial/PaymentCalculator/FixedTerm";
import FixedMonthlyPayment from "@/features/financial/PaymentCalculator/FixedMonthlyPayment";
import Calculator from "@/layout/Calculator";


type PaymentCalculatorContextProps = Record<string, any>

const PaymentCalculatorContext = React.createContext<PaymentCalculatorContextProps>({
  direction: "ltr",
});

export const usePaymentCalculatorContext = () => {
  const context = useContext(PaymentCalculatorContext)
  if (!context) {
    throw new Error('The snackbar provider not found!')
  }
  return context
}


const CustomTabPanel = (props: any) => {
  console.log("props", props)
  return (
    <Box
      role="tabpanel"
      hidden={props.tab !== props.value}
    >
      {props.children}
    </Box>
  )
}

const PaymentCalculator = () => {
  const {t} = useTranslation();
  const [result, setResult] = useState<any>(null);
  const [tab, setTab] = useState(0);

  return (
    <PaymentCalculatorContext.Provider
      value={{
        result,
        setResult
      }}
    >
      <Calculator
        category={"FinancialApplication"}
        pageTitle={t('payment.pageTitle')}
        pageDescription={t('payment.pageDescription')}
        title={t('payment.calculator')}
        description={t('payment.calculator.description')}
      >
        <Grid size={6}>
          <Tabs
            value={tab}
            onChange={(event, value) => {
              setResult(null)
              setTab(value)
            }}>
            <Tab
              label={t("payment.fixedTerm")}
              value={0}
            />
            <Tab
              label={t("payment.fixedPayment")}
              value={1}
            />
          </Tabs>
          <CustomTabPanel tab={tab} value={0}>
            <FixedTerm/>
          </CustomTabPanel>
          <CustomTabPanel tab={tab} value={1}>
            <FixedMonthlyPayment/>
          </CustomTabPanel>
        </Grid>
        {result && <Grid size={12}>
            <Summary result={result}/>
            <MonthlyPayments result={result}/>
        </Grid>}
        <Grid size={12} sx={{mt: 2}}>
          <Stack spacing={4}>
            <Stack spacing={2} component={'section'}>
              <Typography variant={'h2'}>
                Why Use a Loan Payoff Calculator?
              </Typography>
              <Typography variant={'body1'}>
                This tool helps you plan your debt-free journey by estimating how long it will take to pay off your loan based on monthly payments and interest rate.
              </Typography>
            </Stack>
            <Stack spacing={2} component={'section'}>
              <Typography variant={'h2'}>
                Example: Fixed Term
              </Typography>
              <Typography variant={'body1'}>
                Loan: $200,000, Interest: 6%, Term: 20 years(240 months) → Payment: $1,432.86/month to pay off.
              </Typography>
            </Stack>
            <Stack spacing={2} component={'section'}>
              <Typography variant={'h2'}>
                Example: Fixed Payment
              </Typography>
              <Typography variant={'body1'}>
                Loan: $200,000, Interest: 6%, Payment: $1500/month → ~139 months to pay off.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Calculator>
    </PaymentCalculatorContext.Provider>
  )
}
export default PaymentCalculator