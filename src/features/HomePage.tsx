import Grid from "@mui/material/Grid2";
import {Card, CardContent, CardHeader, Link, List, ListItem} from "@mui/material";
import {useTranslation} from "react-i18next";


const HomePage = () => {
  const {t} = useTranslation();
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
        <List>
          {calculators.map((calculator, index) => (
            <ListItem key={`calculator${index}`}>
              <Link href={calculator.href}>{calculator.label}</Link>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  )
}
export default HomePage