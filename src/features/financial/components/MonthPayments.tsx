import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useTranslation} from "react-i18next";


const MonthlyPayments = (props: Record<string, any>) => {
  const {t} = useTranslation();
  const amountRender = (param: any) => {
    return new Intl.NumberFormat("en-US", {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(param.value || 0.00)
  }
  const columns: GridColDef[] = [
    {field: 'month', headerName: t('payment.month'), width: 64},
    {
      field: 'monthlyPayment',
      headerName: t('payment.payment'),
      flex: 1,
      renderCell: amountRender
    },
    {
      field: 'interest',
      headerName: t('payment.interest'),
      flex: 1,
      renderCell: amountRender
    },
    {
      field: 'principal',
      headerName: t('payment.principal'),
      flex: 1,
      renderCell: amountRender
    },
    {
      field: 'remainingPrincipal',
      headerName: t('payment.remainingPrincipal'),
      flex: 1,
      renderCell: amountRender
    },
  ]

  return (
    <DataGrid
      columns={columns}
      rows={props.result ? props.result.payments : []}
      rowCount={props.result?.months || 0}
      getRowId={(row) => row.month}
      density={'compact'}
      paginationMode={'server'}
      hideFooter={true}
      sx={{
        height: "50vh",
        backgroundColor: 'inherit'
      }}
    />
  )
}
export default MonthlyPayments;