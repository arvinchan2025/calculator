import {ArrayFieldTemplateItemType} from "@rjsf/utils";


const CourseTemplate = (props: any) => {
  const {index, onDropIndexClick} = props
  console.log(props)
  return (
    <>{props.children}</>
  )
}
export default CourseTemplate