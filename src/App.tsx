import * as React from 'react';
import { Splitter } from '@progress/kendo-react-layout';

import { FileManagerToolbar } from './components/FileManagerToolbar';
import { FolderStructure } from './components/FolderStructure';
import { FileInformation } from './components/FileInformation';
import { FolderTree } from './components/FolderTree';
import { Breadcrumb } from './components/Breadcrumb';

import { initialData } from './data/data';
import { DataModel, GridDataModel } from './interfaces/FileManagerModels';
import { convertToTreeData, convertToGridData } from './helpers/helperMethods';
import { useInternationalization } from '@progress/kendo-react-intl';

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
  const [data, setData] = React.useState<DataModel[]>(initialData);
  const [panes, setPanes] = React.useState(splitterPanes);
  const [gridData, setGridData] = React.useState<GridDataModel[] | DataModel[] | null>(data);
  const intl = useInternationalization();

  const treeData = React.useMemo(
    () => convertToTreeData(data),
    [data]
  );
  
  const updateGridData = React.useCallback(
    (curItem?: DataModel) => {
      const newGridData = curItem && gridData ? convertToGridData(gridData, intl, curItem) : convertToGridData(data, intl);
      // console.log('new data', newGridData)
      if (newGridData) {
        setGridData(newGridData);
      }
    },
    [data, gridData, intl]
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
      expandItem(event);
      updateGridData(event.item);
    }
  };

  const handleSplitterChange = (event) => {
    if (event) {
      setPanes(event.newState);
    }
  };
  
  return (
     <div className="k-widget k-filemanager k-filemanager-resizable">
        <div className="k-filemanager-header">
          <FileManagerToolbar data={data} />
        </div>

      <div className="k-filemanager-content-container">
        <Splitter 
          panes={panes} 
          onChange={handleSplitterChange} 
        >
          <FolderTree 
            data={treeData}
            onItemClick={handleItemClick}
            />

          <div className="k-filemanager-content">
            <Breadcrumb data={data}/>
            <FolderStructure data={gridData} />
          </div>

          <FileInformation data={data} />
        </Splitter>
      </div>
    </div>
  );
}

export default App;
