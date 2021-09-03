import * as React from 'react';

import { Splitter, SplitterOnChangeEvent } from '@progress/kendo-react-layout';
import { useInternationalization } from '@progress/kendo-react-intl';
import { process, orderBy, SortDescriptor, State } from '@progress/kendo-data-query';
import { getter, clone } from '@progress/kendo-react-common';
import { getSelectedState, getSelectedStateFromKeyDown } from '@progress/kendo-react-grid';
import { UploadFileInfo } from '@progress/kendo-react-upload';
import { TreeViewItemClickEvent } from '@progress/kendo-react-treeview';
import { InputChangeEvent } from '@progress/kendo-react-inputs';

import { FileManagerToolbar } from './components/FileManagerToolbar';
import { GridView } from './components/GridView';
import { ListView } from './components/ListView';
import { FileInformation } from './components/FileInformation';
import { FolderTree } from './components/FolderTree';
import { BreadcrumbComponent } from './components/Breadcrumb';

import { initialData } from './data/data';
import { 
  DataModel, 
  PanesModel,
  SplitBtnItems,
  SelectedItemType,
  TreeDataModel,
  SelectionChangeEvent,
  UploadAddEvent,
  ViewChangeEvent,
  BreadcrumbDataModel,
  SortChangeEvent,
  AppSwitchChangeEvent
} from './interfaces/FileManagerModels';
import {
  formatData,
  convertToTreeData, 
  searchTreeItem,
  addToData
} from './helpers/helperMethods';

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


const initialBreadcrumbItems: BreadcrumbDataModel[] = [
  {
      id: 'home',
      text: 'Home',
      iconClass: 'k-i-home'
  },
  {
      id: 'products',
      text: 'Products'
  },
  {
      id: 'computer',
      text: 'Computer'
  },
  {
      id: 'gaming',
      text: 'Gaming'
  },
  {
      id: 'keyboard',
      text: 'Keyboard'
  }
];


const DATA_ITEM_KEY = 'name';
const SELECTED_FIELD = 'selected';
const idGetter = getter(DATA_ITEM_KEY);

const App = () => {
  const intl = useInternationalization();

  const [data, setData] = React.useState<DataModel[]>(formatData(initialData, intl));
  const [panes, setPanes] = React.useState<PanesModel[]>(splitterPanes);
  const [breadcrumbData, setBreadcrumbData] = React.useState<BreadcrumbDataModel[]>(initialBreadcrumbItems);
 
  const [selected, setSelected] = React.useState<SelectedItemType>({});
  // TODO: refactor the usage
  const [selectedTreeItem, setSelectedTreeItem] = React.useState<TreeDataModel | null>(null);

  const [fileDetailsData, setFileDetailsData] = React.useState<null | number | Object>(null);
  const [files, setFiles] = React.useState<UploadFileInfo[]>([]);
  const [contentView, setContentView] = React.useState<string>("grid");

  const splitBtnItems: SplitBtnItems[] = [
    { text: 'Name', value: 'name' },
    { text: 'File Size', value: 'size'},
    { text: 'Date Created', value: 'dateCreated'}
  ];

  const initialLogic: "and" | "or" = "and";
 
  const [stateContentData, setStateContentData] = React.useState<State>({
    sort: initialSort,
    filter: {
      logic: initialLogic,
      filters: [
        { field: 'name', operator: 'contains', value: '' }
      ]
    }
  });
  
  const updateFileDetailsData = React.useCallback(
    (selection: SelectedItemType) => {
      const numberOfSelectedItems: number = Object.keys(selection).length;

      if (numberOfSelectedItems > 1) {
        setFileDetailsData(Object.keys(selection).length);
      } else if (numberOfSelectedItems === 1) {
        const curSelectedItem = { name: Object.keys(selection)[0] };
        const newFileData: TreeDataModel = searchTreeItem(data, curSelectedItem);
        setFileDetailsData(newFileData)
      } else {
        setFileDetailsData(null);
      }
    },
    [data]
  );

  const expandItem = (event: TreeViewItemClickEvent) => {
    if (event.item.items.length) {
      const itemIndex: number = data.findIndex(item => item.name === event.item.name);
      const newData: DataModel[] = data.slice();

      event.item.expanded = true;

      if (newData[itemIndex]) {
        newData[itemIndex].expanded = true;
        setData(newData);
      }
    }
  };

  const handleTreeItemClick = (event: TreeViewItemClickEvent) => {
    const newSelectedItem: TreeDataModel = searchTreeItem(data, event.item);

    expandItem(event);
    setSelectedTreeItem(newSelectedItem); 
    setFileDetailsData(event.item);
  };

  const handleSplitterChange = (event: SplitterOnChangeEvent) => {
    setPanes(event.newState);
  };

  const handleSelectionChange = (event: SelectionChangeEvent) => {
    let selectedState: SelectedItemType;

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

  const handleSortChange = (event: SortChangeEvent) => {
    const newSortedData = clone(stateContentData);
    
    if (event.direction === 'asc' || event.direction === 'desc') {
      newSortedData.sort[0].dir = event.direction;
    }

    if (event.event && event.event.item) {
      newSortedData.sort[0].field = event.event.item.value;
    }

    if (event.sort) {
      newSortedData.sort = event.sort;
    }
    setStateContentData(newSortedData);
  };

  const handleSearchChange = (event: InputChangeEvent) => {
    setStateContentData({
        ...stateContentData,
        filter: {
          logic: initialLogic,
          filters: [
            { field: 'name', operator: 'contains', value: event.value }
          ]
        }
    });
  };

  const handleSwitchChange = (event: AppSwitchChangeEvent) => {
    const newPanes: PanesModel[] = panes.slice(0)
    if (event.event.value) {
      newPanes[2].size = '30%';
      setPanes(newPanes)
    } else {
      newPanes[2].size = '0%';
      setPanes(newPanes)
    }
  };

  const handleViewChange = (event: ViewChangeEvent) => {
    if (event.viewValue.gridView) {
      setContentView('grid');
    }
    if (event.viewValue.listView) {
      setContentView('list');
    }
  };

  const handleFileChange = (event: UploadAddEvent) => {
    if (event.files) {
      setFiles(event.files);
    }
  };

  const handleClearFileList = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event) {
      setFiles([]);
    }
  };


  const handleUploadDone = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // const newContentData: DataModel[] | null = addToData(contentData, files, intl);

    // // setContentData(newContentData);
    // updateContentData(selected, newContentData);
    // setFiles([]);
    setData(addToData(selectedTreeItem as any, files, intl));
  };

  return (
     <div className="k-widget k-filemanager k-filemanager-resizable">
        <div className="k-filemanager-header">
          <FileManagerToolbar 
            sort={stateContentData.sort}
           
            splitItems={splitBtnItems}
            files={files}
            onSearchChange={handleSearchChange}
            onSwitchChange={handleSwitchChange}
            onViewChange={handleViewChange}
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
            data={convertToTreeData(data)}
            selectedItem={selectedTreeItem}
            onItemClick={handleTreeItemClick}
            />
          <div className="k-filemanager-content">
            <BreadcrumbComponent data={breadcrumbData}/>
            {contentView === 'grid'
              ? <GridView
                  sort={stateContentData.sort}
                  selected={SELECTED_FIELD}
                  data={process((selectedTreeItem !==null )? (selectedTreeItem.items || []).slice() : [], stateContentData)}
                  onSelectionChange={handleSelectionChange}
                  onSortChange={handleSortChange}
                  />
              : <ListView
                  data={process(data.slice(0), stateContentData)}
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
