import * as React from 'react';
import { FileManagerToolbar } from './components/FileManagerToolbar';
import { Splitter } from '@progress/kendo-react-layout';
import { FolderTree } from './components/FolderTree';
import { FolderStructure } from './components/FolderStructure';
import { initialData } from './data/data';
import { FileInformation } from './components/FileInformation';
import { Breadcrumb } from './components/Breadcrumb';

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

export interface DataModel {
  name: string,
  size: number,
  dateCreated: Date,
  dateModified: Date | null,
  items?: DataModel[],
  length?: number
}

export interface TreeDataModel {
  text: string,
  expanded?: boolean,
  items?: DataModel[]
}

const convertToTreeData = (data: DataModel[]) => {

  return data.map((dataItem) => {
    return {
      text: dataItem.name,
      items: convertToTreeData(dataItem.items || [])
    }
  })
}

const App = () => {
  const [treeData, setTreeData] = React.useState<DataModel[]>(initialData);
  const [panes, setPanes] = React.useState(splitterPanes);

  // const mappedTreeViewData = convertToTreeData(treeData);

  const handleChange = (event: any) => {
    setPanes(event.newState);
  };

  return (
     <div className="k-widget k-filemanager k-filemanager-resizable">
        <div className="k-filemanager-header">
          <FileManagerToolbar data={treeData} />
        </div>

      <div className="k-filemanager-content-container">
        <Splitter 
          panes={panes} 
          onChange={handleChange} 
        >
          <FolderTree data={treeData} />

          <div className="k-filemanager-content">
            <Breadcrumb data={treeData}/>
            <FolderStructure data={treeData} />
          </div>

          <FileInformation data={treeData} />
        </Splitter>
      </div>
    </div>
  );
}

export default App;
