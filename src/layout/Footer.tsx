import {Box, Divider, Link, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";


const Footer = () => {
  const {t} = useTranslation()
  return (
    <Box
      component={'footer'}
      sx={{
        height: '128px',
        width: "100%",
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0
      }}
    >
      <Stack spacing={2} flex={1} sx={{pt: 2}}>
        <Box>
          <Typography>Calculators</Typography>
          <Stack direction={'row'} spacing={1}>
            <Link href={'/bmi-calculator'}>{t('bmi.calculator')}</Link>
            <Link href={'/loan-payoff-calculator'}>{t('payment.calculator')}</Link>
            <Link href={'/tip-calculator'}>{t('tip.calculator')}</Link>
            <Link href={'/percent-off-calculator'}>{t('percentOff.calculator')}</Link>
            <Link href={'/circumference-calculator'}>{t('circumference.calculator')}</Link>
            <Link href={'/peptide-calculator'}>{t('peptide.calculator')}</Link>
          </Stack>
        </Box>
      </Stack>
      <Typography sx={{padding: "8px 0"}}>© {new Date().getFullYear()} calculator-now.com. All rights reserved.</Typography>
    </Box>
  )
}
export default Footer