import * as React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';

const initialSort = [{
    field: 'Name',
    dir: 'asc'
  }];

export const FolderStructure = (props: any) => {
    const [sort, setSort] = React.useState<any>(initialSort);
    
    // console.log(props.data)
    return (
      <Grid 
        className="k-filemanager-grid k-grid-display-block k-editable"
        style={{
          height: '400px'
        }} 
        data={orderBy(props.data, sort)} sortable={true} sort={sort} onSortChange={e => {
            setSort(e.sort)}}
      >
        <Column field="name" title="Name" />
        <Column field="dateCreated" title="Date Created" />
        <Column field="size" title="File Size" />
      </Grid>
    );
}
