import { 
  Grid,
  GridColumn as Column,
  GridKeyDownEvent,
  GridSelectionChangeEvent,
  GridSortChangeEvent
} from '@progress/kendo-react-grid';

export const GridView = (props) => {
  const handleOnSortChange = (event: GridSortChangeEvent) => {
    props.onSortChange.call(undefined, {
      sort: event.sort,
      event: event
    });
  }

  const handleOnSelectionChange = (event: GridSelectionChangeEvent) => {
    props.onSelectionChange.call(undefined, {
      event: event
    });
  };

  const handleOnKeyDown = (event: GridKeyDownEvent) => {
    props.onSelectionChange.call(undefined, {
      pressedKey: true,
      event: event
    });
  };

  return (
    <Grid 
      className={"k-filemanager-grid k-grid-display-block k-editable"}
      data={props.data.data}
      sortable={true}
      sort={props.sort}
      selectedField={props.selected}
      selectable={{ enabled: true, drag: true, mode: 'multiple' }}
      navigatable={true}
      onSortChange={handleOnSortChange}
      onSelectionChange={handleOnSelectionChange}
      onKeyDown={handleOnKeyDown}
      >
      <Column field="name" title="Name" />
      <Column field="dateCreated" title="Date Created" />
      <Column field="size" title="File Size" />
    </Grid>
  );
}
