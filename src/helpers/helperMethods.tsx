
import { DataModel, TreeDataModel, GridDataModel } from '../interfaces/FileManagerModels';

const addNewData = (data, intl) => {
  const newData = [] as GridDataModel[];

  if (data) {
    data.forEach(item => {
      // TODO
      // set the icon depending on the extension
      const itemDate = convertDateFormat(item.dateCreated, intl);
  
      newData.push({
        name: item.name,
        dateCreated: itemDate,
        size: item.size,
        items: item.items,
        icon: 'k-i-file'
      })
    });
  }
  return newData;
}

export const formatData = (data: DataModel[], intl) => {
  if (data) {
    return addNewData(data, intl);
  }
  return [];
}

export const convertToGridData = (selectedItem: DataModel | null = null, intl) => {
  if (selectedItem?.items) {
    return addNewData(selectedItem.items, intl);
  }
  return [];
}

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

export const searchTreeItem = (data, curItem) => {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      let item = searchTreeItem(data[i], curItem);
      if (item) {
        return item;
      }
    }
  } else if (typeof data === 'object') {
    if (data.name !== undefined && data.name === curItem.name) {
      return data;
    }
  }
  if (data.items !== undefined && data.items.length > 0) {
    return searchTreeItem(data.items, curItem);
  } else {
    return null;
  }
}

export const convertDateFormat = (date, intl) => {
  return intl.formatDate(date, 'd.MM.y  h:mm:ss aa  EEEE');
}
