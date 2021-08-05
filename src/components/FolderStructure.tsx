import * as React from 'react';
import { 
  Grid,
  GridColumn as Column,
  getSelectedState,
  getSelectedStateFromKeyDown
} from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';
import { getter } from '@progress/kendo-react-common';

const initialSort = [{
  field: 'Name',
  dir: 'asc'
}];

const DATA_ITEM_KEY = 'name';
const SELECTED_FIELD = 'selected';
const idGetter = getter(DATA_ITEM_KEY);

export const FolderStructure = (props: any) => {
    const [sort, setSort] = React.useState<any>(initialSort);
    const [selected, setSelected] = React.useState({});

    const data = React.useMemo(
      () => {
        return (props.data 
          ? props.data.map(item => ({
            ...item,
            [SELECTED_FIELD]: selected[idGetter(item)]
          }))
          : props.data);
      },
      [props.data, selected]
    );

    const handleOnSortChange = event => {
      if (event.sort) {
        setSort(event.sort);
      }
    }

    const handleOnSelectionChange = event => {
      const selectedState = getSelectedState({
        event,
        selectedState: selected,
        dataItemKey: DATA_ITEM_KEY
      });
      setSelected(selectedState);

      props.onSelectionChange.call(undefined, {
        selected: selectedState,
        target: event.target,
        event: event
      });
    };

    const handleOnKeyDown = event => {
      const selectedState = getSelectedStateFromKeyDown({
        event,
        selectedState: selected,
        dataItemKey: DATA_ITEM_KEY
      });
      setSelected(selectedState);
    };

    return (
      <Grid 
        className="k-filemanager-grid k-grid-display-block k-editable" 
        data={data ? orderBy(data, sort) : null}
        sortable={true}
        sort={sort}
        selectedField={SELECTED_FIELD}
        selectable={{
          enabled: true,
          drag: true,
          mode: 'multiple'
        }}
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
