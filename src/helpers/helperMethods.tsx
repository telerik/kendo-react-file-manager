
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

    let curData;


    if (index >= 0) {
      curData = data[index].items ? data[index].items : null;
    }

    if (curData && hasItems) {
      curData.forEach(item => {
        // TODO
        // set the icon depending on the extension
        
        newGridData.push({
          name: item.name,
          dateCreated: item.dateCreated,
          size: item.size,
          items: item.items,
          icon: 'k-i-file'
        })
      });
    }

    return newGridData;
}
