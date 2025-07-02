import {AppBar, Toolbar, Typography} from "@mui/material";
import Language from "./Language";


const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                sx={{flex: 1}}
              >
                Calculator Now
              </Typography>
              <Language />
            </Toolbar>
        </AppBar>
    )
}
export default Header