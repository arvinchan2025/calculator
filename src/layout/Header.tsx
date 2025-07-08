import {AppBar, Box, Stack, Toolbar, Typography, useTheme} from "@mui/material";
import Language from "./Language";
import {useNavigate} from "react-router-dom";


const Header = () => {
  const theme = useTheme()
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{
      backgroundColor: "white",
      boxShadow: "0 6px 16px 0 rgba(59, 104, 252, 0.1),0px 1px 2.8px 1px rgba(41, 76, 194, 0.06)"
    }}>
      <Toolbar>
        <Stack
          component="a"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
          direction={"row"}
          spacing={0.5}
          href={'/'}
        >
          <img
            width="24px"
            height="24px"
            src={'/favicon.png'}
            alt="logo"
          />
          <Typography
            variant="h6"
            sx={{
              fontSize: 18,
              color: theme.palette.primary.main,
            }}
          >
            Calculator Now
          </Typography>
        </Stack>
        <Box flex={1}/>
        <Language/>
      </Toolbar>
    </AppBar>
  )
}
export default Header