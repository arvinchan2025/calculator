import {ArrayFieldTemplateProps} from "@rjsf/utils";
import {Box, Button, Stack} from "@mui/material";
import {Add} from "@mui/icons-material";
import CourseTemplate from "@/features/other/GPA/CourseTemplate";


const CoursesFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const {items, onAddClick} = props
  return (
    <Box>
      <Stack spacing={2}>
        {items.map((item: any) => <CourseTemplate {...item}/>)}
      </Stack>
      <Button
        fullWidth
        variant={"outlined"}
        onClick={onAddClick}
        sx={{mt: 2}}
      >
        <Add/>
      </Button>
    </Box>
  )
}
export default CoursesFieldTemplate