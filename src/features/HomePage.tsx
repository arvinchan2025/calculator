import Grid from "@mui/material/Grid2";
import {Link} from "@mui/material";
import {useTranslation} from "react-i18next";


const HomePage = () => {
  const {t} = useTranslation();
  return (
    <Grid container>
      <Grid size={12}>
        <Link href={'/bmi-calculator'}>{t("bmi.calculator")}</Link>
      </Grid>
    </Grid>
  )
}
export default HomePage