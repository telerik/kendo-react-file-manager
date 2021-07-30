import * as React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';

const initialSort = [{
  field: 'Name',
  dir: 'asc'
}];

export const FolderStructure = (props: any) => {
    const [sort, setSort] = React.useState<any>(initialSort);

    return (
      <Grid 
          className="k-filemanager-grid k-grid-display-block k-editable"
          style={{
            
          }} 
          data={props.data ? orderBy(props.data, sort) : null}
          sortable={true}
          sort={sort}
          onSortChange={event => {
            if (event.sort) {
              setSort(event.sort);
            }
          }}>
          <Column field="name" title="Name" />
          <Column field="dateCreated" title="Date Created" />
          <Column field="size" title="File Size" />
        </Grid>
    );
}
