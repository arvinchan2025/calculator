import Grid from "@mui/material/Grid2";
import {Button, Card, CardContent, CardHeader, Link, List, ListItem, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";


const HomePage = () => {
  const {t} = useTranslation();
  const navigate = useNavigate()
  const calculators = [
    {label: t("bmi.calculator"), href: '/bmi-calculator'},
    {label: t("payment.calculator"), href: '/loan-payoff-calculator'},
    {label: t("tip.calculator"), href: '/tip-calculator'},
    {label: t("percentOff.calculator"), href: '/percent-off-calculator'},
    {label: t("circumference.calculator"), href: '/circumference-calculator'},
    {label: t("peptide.calculator"), href: '/peptide-calculator'},
    {label: t("asphaltTonnage.calculator"), href: '/asphalt-tonnage-calculator'},
  ]
  return (
    <Grid container sx={{
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Grid size={12} spacing={2} container>
        {calculators.map((calculator, index) => (
          <Grid size={{xs: 6, md: 4, lg: 3}}>
            <Button
              key={`calculator${index}`}
              sx={{
                width: '100%',
                height: '128px',
                textTransform: 'none'
              }}
              variant={"outlined"}
              onClick={() => navigate(calculator.href)}
            >
              <Stack>
                <Typography>{calculator.label}</Typography>
              </Stack>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
export default HomePage