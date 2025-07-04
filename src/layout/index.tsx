import Header from "./Header";
import Grid from "@mui/material/Grid2";
import {Outlet} from "react-router-dom";


const MainLayout = () => {
  return (
    <Grid
      container
      sx={{
        height: "100%",
      }}
    >
      <Grid size={12}>
        <Header/>
      </Grid>
      <Grid size={2}/>
      <Grid size={8} sx={{p: 2}}>
        <Outlet/>
      </Grid>
      <Grid size={2}/>
    </Grid>
  )
}
export default MainLayout