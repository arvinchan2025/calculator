import {Box, Divider, Link, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid2";


const Footer = () => {
  const {t} = useTranslation()
  const calculators = [
    [
      {label: t('bmi.calculator'), href: '/bmi-calculator'},
      {label: t('payment.calculator'), href: '/loan-payoff-calculator'},
      {label: t('tip.calculator'), href: '/tip-calculator'},
    ],
    [
      {label: t('percentOff.calculator'), href: '/percent-off-calculator'},
      {label: t('circumference.calculator'), href: '/circumference-calculator'},
      {label: t('peptide.calculator'), href: '/peptide-calculator'},
    ],
    [
      {label: t('asphaltTonnage.calculator'), href: '/asphalt-tonnage-calculator'},
    ]
  ]
  return (
    <Box
      component={'footer'}
      sx={{
        minHeight: '128px',
        width: "100%",
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0
      }}
    >
      <Grid container sx={{width: '100%'}}>
        <Grid size={{xs: 0, md: 2}}/>
        <Grid size={{xs: 12, md: 8}} container>
          {calculators.map((calculator: any[]) => (
            <Grid size={{xs: 6, md: 3}} sx={{p: 2}}>
              <Stack spacing={0.5}>
                {calculator.map((item: any) => (
                  <Link href={item.href}>{item.label}</Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Grid size={{xs: 0, md: 2}}/>
      </Grid>
      <Typography sx={{padding: "8px 0"}}>© {new Date().getFullYear()} calculator-now.com. All rights
        reserved.</Typography>
    </Box>
  )
}
export default Footer