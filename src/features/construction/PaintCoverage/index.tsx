import {useTranslation} from "react-i18next";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import Calculator from "@/layout/Calculator";
import CalculatorForm from "@/layout/CalculatorForm";
import Grid from "@mui/material/Grid2";
import React from "react";
import PaintCoverageFieldTemplate from "@/features/construction/PaintCoverage/ObjectFieldTemplate";
import {Typography} from "@mui/material";


const PaintCoverageCalculator = () => {
  const {t} = useTranslation();
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      length: {
        type: "number",
        title: t('paintCoverage.length')
      },
      width: {
        type: "number",
        title: t('paintCoverage.width')
      },
      height: {
        type: "number",
        title: t('paintCoverage.height')
      },
      doors: {
        type: "number",
        title: t('paintCoverage.doors'),
        default: 1
      },
      doorArea: {
        type: "number",
        title: t('paintCoverage.doorArea'),
        default: 1.9
      },
      windows: {
        type: "number",
        title: t('paintCoverage.windows'),
        default: 1
      },
      windowArea: {
        type: "number",
        title: t('paintCoverage.windowArea'),
        default: 1.5
      },
      coats: {
        type: "number",
        title: t('paintCoverage.coats'),
        default: 1
      },
      coveragePerLiter: {
        type: "number",
        title: t('paintCoverage.coveragePerLiter')
      },
      requiredPaint: {
        type: "number",
        title: t('paintCoverage.requiredPaint')
      },
    },
    required: [
      "length", "width", "height",
      "doors", "windows", "doorArea", "windowArea",
      "coats", "coveragePerLiter"
    ],
  }

  const uiSchema: UiSchema = {
    'ui:ObjectFieldTemplate': PaintCoverageFieldTemplate,
    length: {
      'ui:options': {
        suffix: <Typography>m</Typography>,
      }
    },
    width: {
      'ui:options': {
        suffix: <Typography>m</Typography>,
      }
    },
    height: {
      'ui:options': {
        suffix: <Typography>m</Typography>,
      }
    },
    doorArea: {
      'ui:options': {
        suffix: <Typography>m<sup>2</sup></Typography>,
      }
    },
    windowArea: {
      'ui:options': {
        suffix: <Typography>m<sup>2</sup></Typography>,
      }
    },
    coveragePerLiter: {
      'ui:options': {
        suffix: <Typography>m<sup>2</sup>/L</Typography>,
      }
    },
    requiredPaint: {
      'ui:options': {
        suffix: <Typography>L</Typography>,
      }
    }
  }

  const onCalculate = (formData: any) => {
    const wallArea = 2 * formData.height * (formData.length + formData.width)
    const deduction  = formData.doors * formData.doorArea + formData.windows * formData.windowArea
    const netArea = wallArea - deduction
    const requiredPaint = netArea / formData.coveragePerLiter
    return {
      paint: requiredPaint
    }
  }

  const onChange = (data: any) => {
    return onCalculate(data.formData)
  }

  return (
    <Calculator
      name={t('calculator.paintCoverage')}
      category={'ConstructionApplication'}
      title={t('paintCoverage.title')}
      description={t('paintCoverage.description')}
    >
      <Grid size={{xs: 12, md: 6}}>
        <CalculatorForm
          schema={schema}
          uiSchema={uiSchema}
          onCalculate={onCalculate}
          onChange={onChange}
        />
      </Grid>
    </Calculator>
  )
}
export default PaintCoverageCalculator