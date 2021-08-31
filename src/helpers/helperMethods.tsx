
import { DataModel, TreeDataModel, GridDataModel } from '../interfaces/FileManagerModels';

// .xlsx && .xls  => excel
// .jpg && .png   => picture
// .txt && .doc/x => text
// no extension   => folder
export const convertExtensionToIcon = (item: string) => {
  const extension = item?.split('.')[1];

  switch (extension) {
    case 'xlsx': case 'xls':
      return {
        icon: 'k-i-file-data',
        type: 'Data'
      };
    case 'jpg': case 'png':
      return {
        icon: 'k-i-file-image',
        type: 'Image'
      };
    case 'txt': case 'doc': case 'docx':
      return {
        icon: 'k-i-file-txt',
        type: 'Text'
      };
    default:
      return {
        icon: 'k-i-folder',
        type: 'Folder'
      };
  };
}

export const convertDateFormat = (date, intl) => {
  return intl.formatDate(date, 'd.MM.y  h:mm:ss aa  EEEE');
}

const addNewData = (data, intl) => {
  const newData = [] as GridDataModel[];

  if (data) {
    data.forEach(item => {
      const itemDate = convertDateFormat(item.dateCreated, intl);
  
      newData.push({
        name: item.name,
        dateCreated: itemDate,
        size: item.size,
        items: item.items,
        icon: item.icon
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

export const toggleViewBtnGroup = (btnGroupState, view: string) => {
  if (!btnGroupState.listView && view !== 'grid') {
    return { gridView: false, listView: true };
  }
  if (!btnGroupState.gridView && view !== 'list') {
    return { gridView: true, listView: false };
  }
  return { gridView: false, listView: false };
}

export const toggleSortBtnGroup = (btnGroupState, curState: string) => {
  if (!btnGroupState.sortDesc && curState !== 'asc') {
    return { sortAsc: false, sortDesc: true };
  }
  if (!btnGroupState.sortAsc && curState !== 'desc') {
    return { sortAsc: true, sortDesc: false };
  }
  return { sortAsc: false, sortDesc: false };
}

export const getSortField = (typeString: string) => {
  switch(typeString) {
    case 'Name':
      return 'name';
    case 'Type':
      return 'type';
    case 'File Size':
      return 'size';
    case 'Date Created':
      return 'dateCreated';
    case 'Date Modified':
      return 'dateModified';
    default:
      return '';
  }
}
