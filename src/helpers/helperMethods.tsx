import { DataModel, TreeDataModel, GridDataModel, GridViewBtnGroup, SortingBtnGroup } from '../interfaces/FileManagerModels';

// .xlsx && .xls  => excel
// .jpg && .png   => picture
// .txt && .doc/x => text
// no extension   => folder
export const convertExtensionToIcon = (item: string | null) => {
  if (!item) { return null; }
  const extension: string = item.split('.')[1];

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
};

export const convertDateFormat = (date: Date | null, intl) => {
  return date ? intl.formatDate(date, 'd.MM.y  h:mm:ss aa  EEEE') : date;
};

const addNewData = (data: DataModel[] | GridDataModel[] | null, intl) => {
  const newData = [] as GridDataModel[];

  if (data) {
    data.forEach(item => {
      const itemDate: Date = convertDateFormat(item.dateCreated, intl);
  
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
};

export const formatData = (data: DataModel[], intl) => {
  if (data) {
    return addNewData(data, intl);
  }
  return [];
};

export const convertToGridData = (selectedItem: DataModel | null = null, intl) => {
  if (selectedItem?.items) {
    return addNewData(selectedItem.items, intl);
  }
  return [];
};

export const convertToTreeData = (data: DataModel[]) => {
    const treeData = [] as TreeDataModel[];
  
    data.forEach( item => {
      if (item.name && !item.name.includes('.')) {
        treeData.push({
          name: item.name,
          expanded: item.expanded,
          items: item.items && item.items.length ? convertToTreeData(item.items) : []
        })
      }
    })
    return treeData;
};

export const searchTreeItem = (data: DataModel, curItem: { name: Object}) => {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      let item: DataModel = searchTreeItem(data[i], curItem);
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
};

export const toggleViewBtnGroup = (btnGroupState: GridViewBtnGroup, view: string) => {
  if (!btnGroupState.listView && view !== 'grid') {
    return { gridView: false, listView: true };
  }
  if (!btnGroupState.gridView && view !== 'list') {
    return { gridView: true, listView: false };
  }
  return { gridView: false, listView: false };
};

export const toggleSortBtnGroup = (btnGroupState: SortingBtnGroup, curState: string) => {
  if (!btnGroupState.sortDesc && curState !== 'asc') {
    return { sortAsc: false, sortDesc: true };
  }
  if (!btnGroupState.sortAsc && curState !== 'desc') {
    return { sortAsc: true, sortDesc: false };
  }
  return { sortAsc: false, sortDesc: false };
};

export const formatBytes = (bytes: number, decimals: number = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k: number = 1024;
  const dm: number = decimals < 0 ? 0 : decimals;
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i: number = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
