import {useTranslation} from "react-i18next";
import React, {useContext, useRef, useState} from "react";
import Grid from "@mui/material/Grid2";
import {Box, Breadcrumbs, Link, Tab, Tabs, Typography} from "@mui/material";
import MonthlyPayments from "@/features/financial/PaymentCalculator/MonthPayments";
import Summary from "@/features/financial/PaymentCalculator/Summary";
import FixedTerm from "@/features/financial/PaymentCalculator/FixedTerm";
import FixedMonthlyPayment from "@/features/financial/PaymentCalculator/FixedMonthlyPayment";


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
  console.log("props",  props)
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
      <Grid container spacing={2}>
        <Grid size={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/home"
            >
              {t('calculator.home')}
            </Link>
            <Typography sx={{color: 'text.primary'}}>{t('payment.calculator')}</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid size={12}>
          <Typography variant={"h5"} sx={{mb: 2}}>
            {t('payment.calculator')}
          </Typography>
        </Grid>
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
      </Grid>
    </PaymentCalculatorContext.Provider>
  )
}
export default PaymentCalculator