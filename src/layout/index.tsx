import Header from "./Header";
import Grid from "@mui/material/Grid2";
import {Outlet} from "react-router-dom";
import Footer from "@/layout/Footer";
import {Box} from "@mui/material";


const MainLayout = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Header/>
      <Grid container sx={{flexGrow: 1}}>
        <Grid size={{xs: 0, md: 1, lg: 2}}/>
        <Grid
          size={{xs: 12, md: 10, lg: 8}}
          sx={{
            p: 2,
          }}>
          <Outlet/>
        </Grid>
        <Grid size={{xs: 0, md: 1, lg: 2}}/>
      </Grid>
      <Footer/>
    </Box>
  )
}
export default MainLayout