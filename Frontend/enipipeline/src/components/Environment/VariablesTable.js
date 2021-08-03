import { Container } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { 
    field: 'name',
    minWidth: 200,
    headerName: 'Environment',
    editable: false
  },
  { 
    field: 'variable',
    minWidth: 200,
    headerName: 'Variable',
    editable: true
  },
  {
    field: 'value',
    headerName: 'Value',
    minWidth: 200,
    editable: true,
  },
  {
    field: 'last_updated',
    headerName: 'Last Updated',
    minWidth: 200,
    editable: false,
  }
];

const VariablesTable = (props) => {
  return (
    <Container style={{ height: 300, width: '100%' }}>
      <DataGrid
        autoHeight
        checkboxSelection
        onSelectionModelChange={(selectedRows) => {props.selectedServices.selected = selectedRows}}
        rows={props.variables}
        columns={columns}
        pageSize={5}
      />
    </Container>
  );
}

export default VariablesTable;