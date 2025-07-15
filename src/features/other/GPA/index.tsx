import {useTranslation} from "react-i18next";
import {RJSFSchema} from "@rjsf/utils";
import Calculator from "@/layout/Calculator";
import Grid from "@mui/material/Grid2";
import CalculatorForm from "@/layout/CalculatorForm";
import CoursesFieldTemplate from "@/features/other/GPA/CoursesFieldTemplate";
import CourseRecordView from "@/features/other/GPA/CourseRecordView";
import LetterGradeTable from "@/features/other/GPA/LetterGradeTable";
import {Stack, Typography} from "@mui/material";
import React from "react";


const GPACalculator = () => {
  const {t} = useTranslation();
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      courses: {
        type: "array",
        title: t('gpa.courses'),
        items: {
          type: "object",
          properties: {
            name: {
              type: "number",
              title: t('gpa.courseName')
            },
            grade: {
              type: "number",
              title: t('gpa.grade'),
              enum: [
                4., 4.0, 3.7,
                3.3, 3.0, 2.7,
                2.3, 2.0, 1.7,
                1.3, 1.0, 0.7,
                0.0
              ]
            },
            credit: {
              type: "number",
              title: t('gpa.credit')
            },
            isHonors: {
              type: "boolean",
              title: t('gpa.honors')
            }
          },
          required: ['grade', 'credit']
        }
      },
      gpa: {
        type: "string",
        title: "GPA"
      }
    }
  }

  const uiSchema = {
    courses: {
      "ui:ArrayFieldTemplate": CoursesFieldTemplate,
      items: {
        'ui:ObjectFieldTemplate': CourseRecordView,
        grade: {
          'ui:enumNames': [
            'A+', 'A', 'A-',
            'B+', 'B', 'B-',
            'C+', 'C', 'C-',
            'D+', 'D', 'D-',
            'F',
          ]
        }
      }
    },
    gps: {
      'ui:readonly': true,
    }
  }

  const onCalculate = (formData: any) => {
    console.log("onCalculate", formData)
    const courses = formData.courses.filter((course: any) => course.grade && course.credit)
    const courseSummary = courses.reduce(
      (summary: number, course: any) => course.grade * course.credit + summary, 0)
    const creditSummary = courses.reduce(
      (summary: number, course: any) => course.credit + summary, 0)
    const GPA = courseSummary / creditSummary
    console.log("onCalculate", formData, courseSummary, creditSummary, GPA)
    return {
      gpa: GPA.toFixed(2)
    }
  }


  const onChange = (data: any) => {
    return onCalculate(data.formData)
  }

  return (
    <Calculator
      name={t('calculator.gpa')}
      category={'CalculationApplication'}
      title={t('gpa.title')}
      description={t('gpa.description')}
    >
      <Grid size={{xs: 12, md: 6}}>
        <CalculatorForm
          schema={schema}
          uiSchema={uiSchema}
          onCalculate={onCalculate}
          onChange={onChange}
          formData={{
            courses: [
              {name: 'Math', grade: 4.0, credit: 3}
            ]
          }}
        />
      </Grid>
      <Grid
        size={12}
        component={'section'}
      >
        <Stack spacing={3}>
          <Stack component={"section"} spacing={2}>
            <Typography variant={"h2"}>
              {t("What is GPA?")}
            </Typography>
            <Typography variant={"body1"}>
              {t("GPA stands for Grade Point Average — a weighted or unweighted average of your grades.")}
            </Typography>
          </Stack>
          <Stack component={"section"} spacing={2}>
            <Typography variant={"h2"}>
              {t("What’s the difference between weighted and unweighted GPA?")}
            </Typography>
            <Typography variant={"body1"}>
              {t("Weighted GPA gives extra points for harder courses (like Honors or AP), while unweighted treats all courses equally.")}
            </Typography>
          </Stack>
          <Stack component={"section"} spacing={2}>
            <Typography variant={"h2"}>
              {t("How do I convert a letter grade to GPA?")}
            </Typography>
            <Typography variant={"body1"}>
              {t("Each grade maps to a GPA point (e.g., A = 4.0, B+ = 3.3, etc.).")}
            </Typography>
          </Stack>
          <Stack component={"section"} spacing={2}>
            <Typography variant={'h2'}>
              {t('gpa.letterGradeTable')}
            </Typography>
            <LetterGradeTable/>
          </Stack>
        </Stack>
      </Grid>
    </Calculator>
  )
}
export default GPACalculator