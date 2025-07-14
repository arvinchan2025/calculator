import {useTranslation} from "react-i18next";
import {RJSFSchema} from "@rjsf/utils";
import Calculator from "@/layout/Calculator";
import Grid from "@mui/material/Grid2";
import CalculatorForm from "@/layout/CalculatorForm";
import CoursesFieldTemplate from "@/features/other/GPA/CoursesFieldTemplate";
import CourseRecordView from "@/features/other/GPA/CourseRecordView";
import LetterGradeTable from "@/features/other/GPA/LetterGradeTable";
import {Typography} from "@mui/material";


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
                4.0, 4.0, 3.7,
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
        />
      </Grid>
      <Grid
        size={12}
        component={'section'}
      >
        <Typography variant={'h2'} sx={{padding: "8px 0"}}>
          {t('gpa.letterGradeTable')}
        </Typography>
        <LetterGradeTable />
      </Grid>
    </Calculator>
  )
}
export default GPACalculator