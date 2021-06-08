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
          className="k-filemanager-view k-filemanager-view-grid"
          style={{
              height: '400px'
          }} 
          data={orderBy(props.data, sort)} sortable={true} sort={sort} onSortChange={e => {
              setSort(e.sort)}}
        >
        <Column field="Name" title="Name" />
        <Column field="DateCreated" title="Date Created" />
        <Column field="FileSize" title="File Size" />
      </Grid>
    );
}