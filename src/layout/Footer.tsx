import {Box, Link, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useCalculatorContext} from "@/providers/CalculatorProvider";


const Footer = () => {
  const {calculators} = useCalculatorContext()
  return (
    <Box
      component={'footer'}
      sx={{
        width: "100%",
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0
      }}
    >
      <Grid container sx={{width: '100%'}}>
        <Grid size={{xs: 0, md: 2}}/>
        <Grid size={{xs: 12, md: 8}} container>
          {Object.keys(calculators).map((key: string) => {
            return <Grid key={key} size={{xs: 6, md: 3}} sx={{p: 2}}>
              <Stack spacing={0.5}>
                {calculators[key].map((calculator: any) => {
                  return <Link key={calculator.key} href={calculator.href}>{calculator.label}</Link>
                })}
              </Stack>
            </Grid>
          })}
        </Grid>
        <Grid size={{xs: 0, md: 2}}/>
      </Grid>
      <Typography sx={{padding: "8px 0"}}>© {new Date().getFullYear()} calculator-now.com. All rights
        reserved.</Typography>
    </Box>
  )
}
export default Footer