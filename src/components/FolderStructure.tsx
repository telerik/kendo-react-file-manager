import * as React from 'react';
import { 
  Grid,
  GridColumn as Column,
  getSelectedState,
  getSelectedStateFromKeyDown
} from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';
import { getter, classNames } from '@progress/kendo-react-common';
import { convertExtensionToIcon } from '../helpers/helperMethods';
import { GridDataModel } from '../interfaces/FileManagerModels';

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
      () => 
        (props.data.data 
          ? orderBy(props.data.data.map(item => ({
            ...item,
            [SELECTED_FIELD]: selected[idGetter(item)]
            })), sort)
          : null),
      [props.data, selected, sort]
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
      props.view === 'grid' 
        ?
          <Grid 
            className={"k-filemanager-grid k-grid-display-block k-editable"}
            data={data}
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
        :
          <div className="k-listview k-selectable k-filemanager-listview">
          <div className="k-listview-content k-d-flex k-flex-row k-flex-wrap">
              { data ? data.map((item: any) => {
                const iconObject: { icon?: string; type?: string } = convertExtensionToIcon(item.name);
                return (
                  <>
                  {/* k-state-selected */}
                    <div className="k-listview-item">
                      <span className="k-file-preview">
                        <span className={classNames("k-file-icon k-icon", iconObject ? iconObject.icon : '')} />
                      </span>
                      <span className="k-file-name">{item.name}</span>
                    </div>
                  </>
                )
              }) : '' }
              </div>
          </div>
    );
}
