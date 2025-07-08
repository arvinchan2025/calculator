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
      <Footer/>
    </Box>
  )
}
export default MainLayout