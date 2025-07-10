import Calculator from "@/layout/Calculator";
import {useTranslation} from "react-i18next";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import CalculatorForm from "@/layout/CalculatorForm";
import Grid from "@mui/material/Grid2";
import React from "react";
import {Stack, Typography} from "@mui/material";

const AsphaltTonnageCalculator = () => {
  const {t} = useTranslation();
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      length: {
        type: "number",
        title: t('asphaltTonnage.length'),
        default: 10
      },
      width: {
        type: "number",
        title: t('asphaltTonnage.width'),
        default: 5
      },
      thickness: {
        type: "number",
        title: t('asphaltTonnage.thickness'),
        default: 5
      },
      density: {
        type: "number",
        title: t('asphaltTonnage.density'),
      }
    },
    required: ["length", "width"],
  }

  const uiSchema: UiSchema = {
    length: {
      'ui:options': {
        suffix: 'm',
      }
    },
    width: {
      'ui:options': {
        suffix: 'm',
      }
    },
    thickness: {
      'ui:options': {
        suffix: 'cm',
      }
    },
    density: {
      'ui:options': {
        suffix: <Typography>t/m<sup>3</sup></Typography>,
      }
    },
  }

  const onCalculate = (formData: any, field?: string) => {
    if (formData?.length && formData?.width) {
      switch (field) {
        case 'density':
          const thickness = formData.density / (formData.length * formData.width)
          return {
            thickness: thickness * 100
          }
        default:
          const density = formData.length * formData.width * (formData.thickness / 100)
          return {
            density
          }
      }
    }
    return {}
  }

  const onChange = (data: any, id?: string) => {
    if (id === 'root_density') {
      return onCalculate(data.formData, 'density')
    }
    return onCalculate(data.formData)
  }

  return (
    <Calculator
      category={'ConstructionApplication'}
      title={'Asphalt Tonnage Calculator'}
      description={'Free tool to estimate asphalt volume in tons based on area and thickness. Great for paving and construction.'}
    >
      <Grid size={{xs: 12, md: 6}}>
        <CalculatorForm
          schema={schema}
          uiSchema={uiSchema}
          onCalculate={onCalculate}
          onChange={onChange}
        />
      </Grid>
      <Grid size={12}>
        <Stack spacing={4}>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              How to calculate asphalt tonnage?
            </Typography>
            <ul>
              <li>Area = Length * width (m<sup>2</sup>)</li>
              <li>Thickness = thickness / 100 (m)</li>
              <li>Density = Area * Thickness (t/m<sup>3</sup>)</li>
            </ul>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              How to calculate asphalt tonnage base on area and thickness?
            </Typography>
            <Typography variant={"h3"}>
              Example: Length = 10m, Width = 5m, Thickness=5cm
            </Typography>
            <Typography variant={"h3"}>
              Density = 10* 5 * 5 / 100 = 2.5 t/m<sup>3</sup>
            </Typography>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              How to calculate thickness base on area and asphalt tonnage?
            </Typography>
            <Typography variant={"h3"}>
              Example: Length = 10m, Width = 5m, Density=5 t/m<sup>3</sup>
            </Typography>
            <Typography variant={"h3"}>
              Thickness = 5 / (10 * 5) * 100 = 10cm
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Calculator>
  )
}
export default AsphaltTonnageCalculator