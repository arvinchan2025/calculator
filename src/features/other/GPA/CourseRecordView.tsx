import {ObjectFieldTemplateProps} from "@rjsf/utils";
import Grid from "@mui/material/Grid2";


const CourseRecordView = (props: ObjectFieldTemplateProps) => {
  const fields: Record<string, any> = {}
  props.properties?.forEach((element: any) => {
    fields[element.name] = element.content
  })

  return (
    <Grid size={12} container spacing={1}>
      <Grid size={{xs: 12, md: 12, lg: 5}}>
        {fields.name}
      </Grid>
      <Grid size={{xs: 12, md: 12, lg: 3}}>
        {fields.credit}
      </Grid>
      <Grid size={{xs: 12, md: 12, lg: 4}}>
        {fields.grade}
      </Grid>
    </Grid>
  )
}
export default CourseRecordView