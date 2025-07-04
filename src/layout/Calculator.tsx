import Grid from "@mui/material/Grid2";
import {Breadcrumbs, Link, Typography} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";


const Calculator = (props: Record<string, any>) => {
  const {t} = useTranslation();
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/home"
          >
            {t('calculator.home')}
          </Link>
          <Typography sx={{color: 'text.primary'}}>{props.title}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid size={12}>
        <Typography variant={"h5"} sx={{mb: 2}}>
          {props.title}
        </Typography>
      </Grid>
      {props.children}
    </Grid>
  )
}
export default Calculator