import * as React from 'react';

import { Splitter } from '@progress/kendo-react-layout';
import { useInternationalization } from '@progress/kendo-react-intl';
import { process } from '@progress/kendo-data-query';

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

const App = () => {
  const intl = useInternationalization();

  const [data, setData] = React.useState<DataModel[]>(formatData(initialData, intl));
  const [panes, setPanes] = React.useState(splitterPanes);
  const [gridData, setGridData] = React.useState<GridDataModel[] | DataModel[] | null>(data);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [fileData, setFileData] = React.useState<null | number | Object>(null);
  const [sortField, setSortField] = React.useState<string>('name');
  const [sortType, setSortType] = React.useState<'asc' | 'desc' | undefined>('asc');

  const initialLogic: "and" | "or" = "and";
 
  const [inputGridData, setInputGridData] = React.useState({
    skip: 0,
    take: 10,
    sort: [{ field: sortField, dir: sortType }],
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
      const newGridData = convertToGridData(curItem, intl);
      if (newGridData) {
        setGridData(newGridData);
      }
    },
    [intl]
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

  const handleItemClick = event => {
    if (event) {
      const newSelectedItem = searchTreeItem(data, event.item);

      expandItem(event);
      setSelectedItem(newSelectedItem);
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
    if (event) {
      updateFileData(event.selected);
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
    setSortField(newSortField);
    setInputGridData(newSortedGrid);
  }

  const handleSortBtnSelection = event => {
    const newSortDir = event.sortValue.sortAsc ? 'asc' : 'desc';
    const newSortedGrid = inputGridData;

    newSortedGrid.sort[0].dir = newSortDir;
    setSortType(newSortDir);
    setInputGridData(newSortedGrid);
  }

  return (
     <div className="k-widget k-filemanager k-filemanager-resizable">
        <div className="k-filemanager-header">
          <FileManagerToolbar 
            data={data}
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
            selectedItem={selectedItem}
            onItemClick={handleItemClick}
            />
          <div className="k-filemanager-content">
            <Breadcrumb data={data}/>
            <FolderStructure 
              view={gridView}
              data={gridData ? process(gridData.slice(0), inputGridData) : null}
              onSelectionChange={handleSelectionChange} 
              />
          </div>
          <FileInformation data={fileData} />
        </Splitter>
      </div>
    </div>
  );
}

export default App;
