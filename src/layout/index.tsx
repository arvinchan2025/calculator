import Header from "./Header";
import Grid from "@mui/material/Grid2";
import {Outlet} from "react-router-dom";
import Footer from "@/layout/Footer";


const MainLayout = () => {
  return (
    <Grid
      container
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Grid size={12} sx={{height: "64px"}}>
        <Header/>
      </Grid>
      <Grid size={12} container sx={{height: 'calc(100%-64px-128px)'}}>
        <Grid size={2}/>
        <Grid
          size={8}
          sx={{
            p: 2,
          }}>
          <Outlet/>
        </Grid>
        <Grid size={2}/>
      </Grid>
      <Grid size={12}>
        <Footer/>
      </Grid>
    </Grid>
  )
}
export default MainLayout