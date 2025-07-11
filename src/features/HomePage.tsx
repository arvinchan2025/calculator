import Grid from "@mui/material/Grid2";
import {Button, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useCalculatorContext} from "@/providers/CalculatorProvider";


const HomePage = () => {
  const {t} = useTranslation();
  const {calculators} = useCalculatorContext()
  const navigate = useNavigate()
  return (
    <Grid container sx={{
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Grid size={12} spacing={2} container>
        {Object.keys(calculators).map((key: string) => (
          calculators[key].map((calculator: any) => {
            return <Grid size={{xs: 6, md: 4, lg: 3}}>
              <Button
                key={`${calculator.key}`}
                sx={{
                  width: '100%',
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
            </Grid>
          })
        ))}
      </Grid>
    </Grid>
  )
}
export default HomePage