import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";

const ServiceTips = () => {
  const columns: GridColDef[] = [
    {field: 'name', headerName: 'Services', flex: 1},
    {field: 'tip', headerName: 'Typical Tip', flex: 1},
  ]
  const services = [
    {id: 1, name: 'Restaurants, Bartenders', tip: '15%-20%'},
    {id: 2, name: 'Food Delivery', tip: '15%-20% depending on the distance, total price, etc.'},
    {id: 3, name: 'Hotel Room Service', tip: 'Normally the charge is included in the price already. If not, 15-20%'},
    {id: 4, name: 'Hotel Housekeeping', tip: '	Not expected, $1-$2 per person per night.'},
    {id: 5, name: 'Automotive Services, Mechanic', tip: 'Not expected, Or a few dollars depending on the amount'},
    {
      id: 6,
      name: 'Mover, Furniture, or Appliance Delivery',
      tip: 'Not expected, Or $5, $10, $20 each depending on the amount'
    },
    {
      id: 7,
      name: 'Plumber, Handyman, Electrician, Cleaner, or Other Home Services',
      tip: 'Not expected, Or $5, $10, $20 each depending on the amount'
    },
    {id: 8, name: 'Hairstylists, Barber, Nail Service, etc.', tip: '10%-20%'},
    {id: 9, name: 'Massage', tip: '10%-20%'},
    {id: 10, name: 'Taxi or Limo Drivers', tip: '15%-20%'},
    {id: 11, name: 'Shuttle Drivers, Parking Attendant', tip: '$1-$3'},
    {id: 12, name: 'Tour Guides', tip: '$1-$5 depending on the length of the tour'},
  ]
  return (
    <DataGrid
      columns={columns}
      rows={services}
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
export default ServiceTips