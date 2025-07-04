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
  ]
  return (
    <Grid container sx={{
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Grid size={12}>
        <Stack direction={'row'} spacing={2}>
          {calculators.map((calculator, index) => (
            <Button
              key={`calculator${index}`}
              sx={{
                width: '256px',
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
          ))}
        </Stack>
      </Grid>
    </Grid>
  )
}
export default HomePage