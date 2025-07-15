import {RJSFSchema} from "@rjsf/utils";
import {useTranslation} from "react-i18next";


const CalorieBurnCalculator = () => {
  const {t} = useTranslation();
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      activity: {
        type: "number",

      }
    }
  }
  return (
    <></>
  )
}
export default CalorieBurnCalculator