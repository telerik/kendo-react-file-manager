import { 
  Grid,
  GridColumn as Column,
} from '@progress/kendo-react-grid';

export const GridView = (props: any) => {
  const handleOnSortChange = event => {
    props.onSortChange.call(undefined, {
      sort: event.sort,
      event: event,
      target: event.target
    });
  }

  const handleOnSelectionChange = event => {
    props.onSelectionChange.call(undefined, {
      event: event,
      target: event.target
    });
  };

  const handleOnKeyDown = event => {
    props.onSelectionChange.call(undefined, {
      pressedKey: true,
      event: event,
      target: event.target
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
