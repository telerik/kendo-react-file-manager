import * as React from 'react';
import { 
  Grid,
  GridColumn as Column,
} from '@progress/kendo-react-grid';
import { classNames } from '@progress/kendo-react-common';
import { convertExtensionToIcon } from '../helpers/helperMethods';

export const FolderStructure = (props: any) => {
    const data = React.useMemo(
      () => 
        props.data,
      [props.data]
    );

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
      props.onGridKeyDown.call(undefined, {
        event: event,
        target: event.target
      });
    };
    
    // console.log('grid props', props.selected);
    // sort value is correct but not applied correctly ?
    // console.log(props.sort);

    return (
      props.view === 'grid' 
        ?
          <Grid 
            className={"k-filemanager-grid k-grid-display-block k-editable"}
            data={data}
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
        :
          <div className="k-listview k-selectable k-filemanager-listview">
          <div className="k-listview-content k-d-flex k-flex-row k-flex-wrap">
              { data ? data.map((item: any) => {
                const iconObject: { icon?: string; type?: string } = convertExtensionToIcon(item.name);
                return (
                  <>
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
