import {useTranslation} from "react-i18next";
import React from "react";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import Calculator from "@/layout/Calculator";
import CalculatorForm from "@/layout/CalculatorForm";
import Grid from "@mui/material/Grid2";
import {Box, Stack, Typography} from "@mui/material";


const CircumferenceCalculator = () => {
  const {t} = useTranslation();
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      radius: {
        type: "string",
        title: t('circumference.radius'),
      },
      diameter: {
        type: "string",
        title: t('circumference.diameter'),
      },
      circumference: {
        type: "string",
        title: t('circumference.circumference'),
      },
      area: {
        type: "string",
        title: t('circumference.area'),
      },
    }
  }

  const uiSchema: UiSchema = {
    radius: {
      'ui:options': {
        suffix: 'cm'
      }
    },
    diameter: {
      'ui:options': {
        suffix: 'cm'
      }
    },
    circumference: {
      // 'ui:readonly': true,
      'ui:options': {
        suffix: 'cm',
        readOnly: true
      }
    },
    area: {
      // 'ui:readonly': true,
      'ui:options': {
        suffix: <Typography>cm<sup>2</sup></Typography>
      }
    },
  }

  const formatMaxDecimals = (value: number, maxDecimals: number = 6) => {
    return parseFloat(value.toFixed(maxDecimals)).toString();
  }

  const calculation = (formData: any, field: string) => {
    let radius = 0
    switch (field) {
      case 'radius':
        if(!formData.radius){
          return
        }
        radius = parseFloat(formData.radius || '0')
        return {
          diameter: formatMaxDecimals(2 * radius),
          circumference: formatMaxDecimals(2 * Math.PI * radius),
          area: formatMaxDecimals(Math.PI * radius * radius)
        }
      case 'diameter':
        if(!formData.diameter){
          return
        }
        radius = parseFloat(formData.diameter) / 2
        return {
          radius: formatMaxDecimals(radius),
          circumference: formatMaxDecimals(2 * Math.PI * radius),
          area: formatMaxDecimals(Math.PI * radius * radius)
        }
      case 'circumference':
        if(!formData.circumference){
          return
        }
        radius = parseFloat((parseFloat(formData.circumference) / Math.PI / 2).toFixed(6))
        return {
          radius: formatMaxDecimals(radius),
          diameter: formatMaxDecimals(2 * radius),
          area: formatMaxDecimals(Math.PI * radius * radius)
        }
      case 'area':
        if(!formData.area){
          return
        }
        radius = parseFloat(Math.sqrt(parseFloat(formData.area) / Math.PI).toFixed(6))
        return {
          radius: formatMaxDecimals(radius),
          diameter: formatMaxDecimals(2 * radius),
          circumference: formatMaxDecimals(2 * Math.PI * radius),
        }
      default:
        return {}
    }
  }

  const onCalculate = (formData: any) => {
    if (formData.radius) {
      return calculation(formData, 'radius')
    } else if (formData.diameter) {
      return calculation(formData, 'diameter')
    } else if (formData.circumference) {
      return calculation(formData, 'circumference')
    } else if (formData.area) {
      return calculation(formData, 'area')
    } else {
      return {}
    }
  }


  const onChange = (data: any, id?: string) => {
    const formData = data.formData
    const field = id?.replace('root_', '') || 'radius'
    return calculation(formData, field)
  }

  return (
    <Calculator
      category={'MathApplication'}
      pageTitle={t('circumference.pageTitle')}
      pageDescription={t('circumference.pageDescription')}
      title={t('circumference.calculator')}
      description={t('circumference.calculator.description')}
    >
      <Grid size={{xs: 12, md: 6}}>
        <CalculatorForm
          schema={schema}
          uiSchema={uiSchema}
          onChange={onChange}
          onCalculate={onCalculate}
        />
      </Grid>
      <Grid size={12} sx={{pt: 2}}>
        <Stack spacing={2}>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"} sx={{fontSize: "22px", fontWeight: 700}}>
              How to use the circumference calculator
            </Typography>
            <Typography>
              The following instructions will help you get the best use out of our circumference calculator:

              Enter either the radius or the diameter of the circle. Ensure you're using the right units before entering
              the values.

              The circle's circumference and area appear instantly in their fields. You can change their units if you
              desire.

              For example, a circle with a 5 cm radius will have a 10 cm diameter and a 31.4159 cm circumference. The
              calculator also gives the area of this circle to be 78.5398 cm².

              We can also use the calculator in reverse — i.e., to find the radius of a circle from its circumference.
              For instance, providing a circumference of 44 cm tells us that the circle has a radius of 7.00282 cm and a
              diameter of 14.00563 cm.

              Please continue reading to learn more about the circumference of a circle, its formula, and the definition
              of pi (π).
            </Typography>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"} sx={{fontSize: "22px", fontWeight: 700}}>
              Definition of circumference
            </Typography>
            <Typography>
              The circumference of a circle is the length of the circle's boundary. It is the same as the perimeter of a
              geometric figure, but the term 'perimeter' is used exclusively for polygons.

              Circumference is often misspelled as circumference.
            </Typography>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"} sx={{fontSize: "22px", fontWeight: 700}}>
              How to find circumference
            </Typography>
            <Box>
              <Typography>
                How to find the circumference of a circle? you can follow the steps below:
              </Typography>
              <ol>
                <li>
                  <p>Determine the radius of a circle. Let's assume it's equal to 14 cm.</p>
                </li>
                <li>
                  <p>Substitute this value to the formula for circumference:</p>
                  <p>C = 2 × π × R = 2 × π × 14 = 87.9646 cm</p>
                </li>
                <li>
                  <p>You can also use it to find the area of a circle:</p>
                  <p>A = π × R² = π × 14² = 615.752 cm²</p>
                </li>
                <li>
                  <p>Finally, you can find the diameter — it is simply double the radius:</p>
                  <p>D = 2 × R = 2 × 14 = 28 cm</p>
                </li>
                <li>
                  <p>Use our circumference calculator to find the radius when you only have the circumference or area of
                    a
                    circle.</p>
                </li>
              </ol>
              <Typography>
                Circumference calculation is important for determining the hoop stress on any rotationally symmetrical
                object.
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Calculator>
  )
}
export default CircumferenceCalculator