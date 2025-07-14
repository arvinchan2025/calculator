import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useTranslation} from "react-i18next";

const LetterGradeTable = () => {
  const {t} = useTranslation();
  const columns: GridColDef[] = [
    {field: 'gradeLetter', headerName: t('gpa.gradeLetter'), flex: 1},
    {field: 'gradePoints', headerName: t('gpa.gradePoints'), flex: 1},
  ]

  const rows = [
    {id: 1, gradeLetter: 'A+', gradePoints: '4,3'},
    {id: 2, gradeLetter: 'A', gradePoints: '4,0'},
    {id: 3, gradeLetter: 'A-', gradePoints: '3.7'},
    {id: 4, gradeLetter: 'B+', gradePoints: '3.3'},
    {id: 5, gradeLetter: 'B', gradePoints: '3.0'},
    {id: 6, gradeLetter: 'B-', gradePoints: '2.7'},
    {id: 7, gradeLetter: 'C+', gradePoints: '2.3'},
    {id: 8, gradeLetter: 'C', gradePoints: '2.0'},
    {id: 9, gradeLetter: 'C-', gradePoints: '1.7'},
    {id: 10, gradeLetter: 'D+', gradePoints: '1.3'},
    {id: 11, gradeLetter: 'D', gradePoints: '1.0'},
    {id: 12, gradeLetter: 'D-', gradePoints: '0.7'},
    {id: 13, gradeLetter: 'F', gradePoints: '0.0'},
  ]

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowCount={12}
      density={'compact'}
      paginationMode={'server'}
      hideFooter={true}
      sx={{
        backgroundColor: 'inherit'
      }}
    />
  )
}
export default LetterGradeTable