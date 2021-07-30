
import { DataModel, TreeDataModel, GridDataModel } from '../interfaces/FileManagerModels';

export const convertToTreeData = (data: DataModel[]) => {
    const treeData = [] as TreeDataModel[];
  
    data.forEach( item => {
      if (!item.name.includes('.')) {
        treeData.push({
          name: item.name,
          expanded: item.expanded,
          items: item.items && item.items.length ? convertToTreeData(item.items) : []
        })
      }
    })
    return treeData;
}

export const convertToGridData = (data, intl, selectedItem?: DataModel) => {
    const newGridData = [] as GridDataModel[];

    const index: number = selectedItem ? data.findIndex(item => item.name === selectedItem.name) : 0;
    const hasItems: boolean = !!selectedItem?.items?.length;

    let curData = data;


    if (index >= 0) {
      curData = data[index].items ? data[index].items : null;
    }

    if (curData && hasItems) {
      curData.forEach(item => {
        // TODO
        // set the icon depending on the extension
        
        newGridData.push({
          name: item.name,
          dateCreated: intl.DateTimeFormat(item.dateCreated, 
            { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit',minute: '2-digit', second: '2-digit' }),
          size: item.size,
          icon: 'k-i-file'
        })
      });
    }

    return newGridData;
}
