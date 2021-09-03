import { 
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridKeyDownEvent,
  GridSelectionChangeEvent,
  GridSortChangeEvent,
  GRID_COL_INDEX_ATTRIBUTE
} from '@progress/kendo-react-grid';
import { useTableKeyboardNavigation } from "@progress/kendo-react-data-tools";
import { formatBytes } from '../helpers/helperMethods';

const SizeCell = (props: GridCellProps) => {
  const field = props.field || "";
  const value = props.dataItem[field];
  const navigationAttributes = useTableKeyboardNavigation(props.id);

  return (
    <td
      {...{ [GRID_COL_INDEX_ATTRIBUTE]: props.columnIndex }}
      {...navigationAttributes}
    >
      {value === null ? "" : formatBytes(value)}
    </td>
  );
};

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
      style={{ height: '100%' }}
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
      <Column field="size" title="Size" cell={SizeCell} />
    </Grid>
  );
}
