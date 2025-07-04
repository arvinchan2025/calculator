import {Box, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useTranslation} from "react-i18next";


const Summary = (props: Record<string, any>) => {
  const {t} = useTranslation()
  const formatAmount = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value || 0.00)
  }

  return (
    <Grid container sx={{padding: "32px 0"}}>
      <Grid size={4}>
        <Stack sx={{
          p: 2,
          borderLeft: "1px solid #ccc",
          borderTop: "1px solid #ccc"
        }}>
          <Typography>{t('payment.monthlyPayment')}</Typography>
          <Typography variant={'h4'}>{formatAmount(props.result?.monthlyPayment)}</Typography>
        </Stack>
      </Grid>
      <Grid size={4}>
        <Stack sx={{
          p: 2,
          borderLeft: "1px solid #ccc",
          borderRight: "1px solid #ccc",
          borderTop: "1px solid #ccc"
        }}>
          <Typography>{t('payment.paymentMonths')}</Typography>
          <Typography variant={'h4'}>{`${props.result?.months}`}</Typography>
        </Stack>
      </Grid>
      <Grid size={4}/>
      <Grid size={4}>
        <Stack sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRight: 0
        }}>
          <Typography>{t('payment.totalInterestPaid')}</Typography>
          <Typography variant={'h4'}>{formatAmount(props.result?.totalInterest)}</Typography>
        </Stack>
      </Grid>
      <Grid size={4}>
        <Stack sx={{
          p: 2,
          border: "1px solid #ccc",
        }}>
          <Typography>{t('payment.totalPaid')}</Typography>
          <Typography variant={'h4'}>{formatAmount(props.result?.totalAmount)}</Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}
export default Summary