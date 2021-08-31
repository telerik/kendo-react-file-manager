import * as React from 'react';

import { Splitter } from '@progress/kendo-react-layout';
import { useInternationalization } from '@progress/kendo-react-intl';
import { process, orderBy } from '@progress/kendo-data-query';
import { getter } from '@progress/kendo-react-common';
import { 
  getSelectedState,
  getSelectedStateFromKeyDown,
} from '@progress/kendo-react-grid';

import { FileManagerToolbar } from './components/FileManagerToolbar';
import { FolderStructure } from './components/FolderStructure';
import { FileInformation } from './components/FileInformation';
import { FolderTree } from './components/FolderTree';
import { Breadcrumb } from './components/Breadcrumb';

import { initialData } from './data/data';
import { DataModel, GridDataModel } from './interfaces/FileManagerModels';
import {
  formatData,
  convertToTreeData,
  convertToGridData,
  searchTreeItem,
  getSortField
} from './helpers/helperMethods';

const splitterPanes = [
  {
    size: "20%",
    min: "20px",
    collapsible: true,
  },
  {},
  {
    size: "30%",
    min: "20px",
    collapsible: true,
  },
];

const initialSort = [{
  field: 'Name',
  dir: 'asc'
}];

const DATA_ITEM_KEY = 'name';
const SELECTED_FIELD = 'selected';
const idGetter = getter(DATA_ITEM_KEY);

const App = () => {
  const intl = useInternationalization();

  const [data, setData] = React.useState<DataModel[]>(formatData(initialData, intl));
  const [panes, setPanes] = React.useState(splitterPanes);
  const [gridData, setGridData] = React.useState<GridDataModel[] | DataModel[] | null>(data);
  
  const [sort, setSort] = React.useState<any>(initialSort);
  
  const [selected, setSelected] = React.useState({});
  const [selectedTreeItem, setSelectedTreeItem] = React.useState(null);

  const [fileData, setFileData] = React.useState<null | number | Object>(null);

  const splitItems = [
    { text: 'Name' },
    { text: 'Type' },
    { text: 'File Size'},
    { text: 'Date Created'},
    { text: 'Date Modified'}
  ];

  const initialLogic: "and" | "or" = "and";
 
  const [inputGridData, setInputGridData] = React.useState({
    skip: 0,
    take: 10,
    sort: sort,
    filter: {
      logic: initialLogic,
      filters: [
        { field: 'name', operator: 'contains', value: '' }
      ]
    }
  });

  const [gridView, setGridView] = React.useState<string>("grid");

  const treeData = React.useMemo(
    () => convertToTreeData(data),
    [data]
  );
  
  const updateGridData = React.useCallback(
    (curItem?: DataModel) => {
      let newGridData = convertToGridData(curItem, intl);
      if (newGridData) {
        newGridData = orderBy(newGridData.map(item => {
          return ({
        ...item,
        [SELECTED_FIELD]: selected[idGetter(item)]
        })}
        ), sort)

        // update the grid state
        setGridData(newGridData);
      }
    },
    [intl, selected, sort]
  );
  
  const updateFileData = React.useCallback(
    (selection) => {
      const numberOfSelectedItems = Object.keys(selection).length;

      if (numberOfSelectedItems > 1) {
        setFileData(Object.keys(selection).length);
      } else if (numberOfSelectedItems === 1) {
        const curSelectedItem = { name: Object.keys(selection)[0] };
        const newFileData = searchTreeItem(data, curSelectedItem);
        setFileData(newFileData)
      } else {
        setFileData(null);
      }
    },
    [data]
  );

  const expandItem = event => {
    if (event.item.items.length) {
      const itemIndex = data.findIndex(item => item.name === event.item.name);
      const newData = data.slice();

      event.item.expanded = true;

      if (newData[itemIndex]) {
        newData[itemIndex].expanded = true;
        setData(newData);
      }
    }
  };

  const handleTreeItemClick = event => {
    if (event) {
      const newSelectedItem = searchTreeItem(data, event.item);

      // sets the tree selection - newSelectedItem
      expandItem(event);
      setSelectedTreeItem(newSelectedItem);
      updateGridData(newSelectedItem);
      setFileData(event.item);
    }
  };

  const handleSplitterChange = (event) => {
    if (event) {
      setPanes(event.newState);
    }
  };

  const handleSelectionChange = event => {
    const selectedState = getSelectedState({
      event: event.event,
      selectedState: selected,
      dataItemKey: DATA_ITEM_KEY
    });
    
    // selection state is update
    setSelected(selectedState);
    updateFileData(selectedState);
  }

  const handelGridKeyDown = event => {
    const selectedState = getSelectedStateFromKeyDown({
      event: event.event,
      selectedState: selected,
      dataItemKey: DATA_ITEM_KEY
    });
    setSelected(selectedState);
  }

  const handleGridSortChange = event => {
    if (event.sort) {
      // The sort variable is updated but the sort is not applied correctly
      setSort(event.sort);
    }
  }
  
  const handleInputChange = event => {
    setInputGridData({
        ...inputGridData,
        filter: {
          logic: initialLogic,
          filters: [
            { field: 'name', operator: 'contains', value: event.inputValue }
          ]
        }
    });
  };

  const handleSwitchChange = event => {
    const newPanes = panes.slice(0)
    if (event.switchValue) {
      newPanes[2].size = '30%';
      setPanes(newPanes)
    } else {
      newPanes[2].size = '0%';
      setPanes(newPanes)
    }
  }

  const handleViewBtnSelection = event => {
    if (event.viewValue.gridView) {
      setGridView('grid');
    }
    if (event.viewValue.listView) {
      setGridView('list');
    }
  }

  const handleSplitBtnItemClick = event => {
    const newSortField = getSortField(event.sortType)
    const newSortedGrid = inputGridData;

    newSortedGrid.sort[0].field = newSortField;
    const newSort = [{
      field: newSortField,
      dir: sort[0].dir
    }];
    
    setSort(newSort);
    setInputGridData(newSortedGrid);
  }

  const handleSortBtnSelection = event => {
    console.log('event inside app', event.sortValue)
    const newSortDir = event.sortValue.sortAsc ? 'asc' : 'desc';
    const newSortedGrid = inputGridData;

    newSortedGrid.sort[0].dir = newSortDir;
    const newSort = [{
      field: sort[0].field,
      dir: newSortDir
    }];

    setSort(newSort);
    setInputGridData(newSortedGrid);
  }

  return (
     <div className="k-widget k-filemanager k-filemanager-resizable">
        <div className="k-filemanager-header">
          <FileManagerToolbar 
            data={data}
            splitItems={splitItems}
            onInputChange={handleInputChange}
            onSwitchChange={handleSwitchChange}
            onViewBtnSelection={handleViewBtnSelection}
            onSplitBtnItemClick={handleSplitBtnItemClick}
            onSortBtnSelection={handleSortBtnSelection}
            />
        </div>
      <div className="k-filemanager-content-container">
        <Splitter 
          panes={panes} 
          onChange={handleSplitterChange} 
        >
          <FolderTree 
            data={treeData}
            selectedItem={selectedTreeItem}
            onItemClick={handleTreeItemClick}
            />
          <div className="k-filemanager-content">
            <Breadcrumb data={data}/>
            <FolderStructure 
              view={gridView}
              sort={sort}
              selected={SELECTED_FIELD}
              data={gridData ? process(gridData.slice(0), inputGridData) : null}
              onSelectionChange={handleSelectionChange}
              onSortChange={handleGridSortChange}
              onGridKeyDown={handelGridKeyDown}
              />
          </div>
          <FileInformation data={fileData} />
        </Splitter>
      </div>
    </div>
  );
}

export default App;
