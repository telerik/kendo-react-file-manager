import * as React from 'react';

import { Splitter } from '@progress/kendo-react-layout';
import { useInternationalization } from '@progress/kendo-react-intl';
import { process, orderBy, SortDescriptor, State } from '@progress/kendo-data-query';
import { getter } from '@progress/kendo-react-common';
import { getSelectedState, getSelectedStateFromKeyDown } from '@progress/kendo-react-grid';
import { UploadFileInfo } from '@progress/kendo-react-upload';

import { FileManagerToolbar } from './components/FileManagerToolbar';
import { GridView } from './components/GridView';
import { ListView } from './components/ListView';
import { FileInformation } from './components/FileInformation';
import { FolderTree } from './components/FolderTree';
import { Breadcrumb } from './components/Breadcrumb';

import { initialData } from './data/data';
import { DataModel, GridDataModel, PanesModel, SplitBtnItems } from './interfaces/FileManagerModels';
import {
  formatData,
  convertToTreeData,
  convertToGridData,
  searchTreeItem
} from './helpers/helperMethods';
// import { SplitButtonItem } from '@progress/kendo-react-buttons';

const splitterPanes: PanesModel[] = [
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

const initialSort: SortDescriptor[] = [{
  field: 'Name',
  dir: 'asc'
}];

const DATA_ITEM_KEY = 'name';
const SELECTED_FIELD = 'selected';
const idGetter = getter(DATA_ITEM_KEY);

const App = () => {
  const intl = useInternationalization();

  const [data, setData] = React.useState<DataModel[]>(formatData(initialData, intl));
  const [panes, setPanes] = React.useState<PanesModel[]>(splitterPanes);

  const [gridData, setGridData] = React.useState<GridDataModel[] | DataModel[] | null>(data);
  
  const [selected, setSelected] = React.useState({});
  // TODO: refactor the usage
  const [selectedTreeItem, setSelectedTreeItem] = React.useState(null);

  const [fileDetailsData, setFileDetailsData] = React.useState<null | number | Object>(null);
  const [files, setFiles] = React.useState<UploadFileInfo[]>([]);

  const splitBtnItems: SplitBtnItems[] = [
    { text: 'Name', value: 'name' },
    { text: 'Type', value: 'type' },
    { text: 'File Size', value: 'size'},
    { text: 'Date Created', value: 'dateCreated'},
    { text: 'Date Modified', value: 'dateModified'}
  ];

  const initialLogic: "and" | "or" = "and";
 
  const [inputGridData, setInputGridData] = React.useState<State>({
    sort: initialSort,
    filter: {
      logic: initialLogic,
      filters: [
        { field: 'name', operator: 'contains', value: '' }
      ]
    }
  });

  const [contentView, setContentView] = React.useState<string>("grid");

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
        ), inputGridData.sort)

        setGridData(newGridData);
      }
    },
    [intl, selected, inputGridData]
  );
  
  const updateFileDetailsData = React.useCallback(
    (selection) => {
      const numberOfSelectedItems = Object.keys(selection).length;

      if (numberOfSelectedItems > 1) {
        setFileDetailsData(Object.keys(selection).length);
      } else if (numberOfSelectedItems === 1) {
        const curSelectedItem = { name: Object.keys(selection)[0] };
        const newFileData = searchTreeItem(data, curSelectedItem);
        setFileDetailsData(newFileData)
      } else {
        setFileDetailsData(null);
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

      expandItem(event);
      setSelectedTreeItem(newSelectedItem);
      updateGridData(newSelectedItem);
      setFileDetailsData(event.item);
    }
  };

  const handleSplitterChange = (event) => {
    if (event) {
      setPanes(event.newState);
    }
  };

  const handleSelectionChange = event => {
    let selectedState;
    if (event.pressedKey) {
      selectedState = getSelectedStateFromKeyDown({
        event: event.event,
        selectedState: selected,
        dataItemKey: DATA_ITEM_KEY
      });
        
    } else {
      selectedState = getSelectedState({
        event: event.event,
        selectedState: selected,
        dataItemKey: DATA_ITEM_KEY
      });
      
    }
    
    setSelected(selectedState);
    updateFileDetailsData(selectedState);
  };

  const handleSortChange = event => {
    if (event.sort) {
      setInputGridData(
        {
          sort: event.sort,
          filter: {
            logic: initialLogic,
            filters: inputGridData.filter.filters
          }
        }  
      );
    }
  };
  
  const handleSearchChange = event => {
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
  };

  const handleViewBtnSelection = event => {
    if (event.viewValue.gridView) {
      setContentView('grid');
    }
    if (event.viewValue.listView) {
      setContentView('list');
    }
  };

  // const handleSplitBtnItemClick = event => {
  //   const newSortField = getSortField(event.sortType)
  //   const newSortedGrid = inputGridData;

  //   newSortedGrid.sort[0].field = newSortField;
    
  //   setInputGridData(
  //     {
  //       sort: [{
  //         field: newSortField,
  //         dir: inputGridData.sort[0].dir
  //       }],
  //       filter: {
  //         logic: initialLogic,
  //         filters: inputGridData.filter.filters
  //       }
  //     }  
  //   );
  //   setInputGridData(newSortedGrid);
  // };

  // const handleSortBtnSelection = event => {
  //   const newSortDir = event.sortValue.sortAsc ? 'asc' : 'desc';
  //   const newSortedGrid = inputGridData;

  //   newSortedGrid.sort[0].dir = newSortDir;
  //   const newSort = [{
  //     field: sort[0].field,
  //     dir: newSortDir
  //   }];

  //   setSort(newSort);
  //   setInputGridData(newSortedGrid);
  // };

  const handleFileChange = event => {
    setFiles(event.files);
  };

  const handleClearFileList = event => {
    if (event) {
      setFiles([]);
    }
  };


  const handleUploadDone = event => {
    console.log('done event', event);
    console.log('files', files);
    console.log('grid data', gridData);
    
    let newElement = {};
    // map through the elements and cast the to the DataGridModel -> add to grid data
    // newElement['name'] = files.name;
  };

  return (
     <div className="k-widget k-filemanager k-filemanager-resizable">
        <div className="k-filemanager-header">
          <FileManagerToolbar 
            data={data}
            splitItems={splitBtnItems}
            files={files}
            onSearchChange={handleSearchChange}
            onSwitchChange={handleSwitchChange}
            onViewBtnSelection={handleViewBtnSelection}
            onSortChange={handleSortChange}

            onFileChange={handleFileChange}
            onClearFileList={handleClearFileList}
            onUploadDone={handleUploadDone}
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
              {contentView === 'grid' 
                ? <GridView
                    sort={inputGridData.sort}
                    selected={SELECTED_FIELD}
                    data={gridData ? process(gridData.slice(0), inputGridData) : null}
                    onSelectionChange={handleSelectionChange}
                    onSortChange={handleSortChange}
                    />
                : <ListView
                    data={gridData ? process(gridData.slice(0), inputGridData) : null}
                    />
            }
          </div>
          <FileInformation data={fileDetailsData} />
        </Splitter>
      </div>
    </div>
  );
}

export default App;
