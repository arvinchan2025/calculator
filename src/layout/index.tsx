import Header from "./Header";
import BMICalculator from "../features/BMICalculator";
import Grid from "@mui/material/Grid2";


const MainLayout = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <Header/>
      </Grid>
      <Grid size={3}/>
      <Grid size={6} sx={{p: 2}}>
        <BMICalculator/>
      </Grid>
      <Grid size={3}/>
    </Grid>
  )
}
export default MainLayout