import * as React from 'react';
import { FileManagerToolbar } from './components/FileManagerToolbar';
import { Splitter } from '@progress/kendo-react-layout';
import { FolderTree } from './components/FolderTree';
import { FolderStructure } from './components/FolderStructure';
import { initialData } from './data/data';
import { FileInformation } from './components/FileInformation';

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
  const [treeData, setTreeData] = React.useState(initialData);
  const [gridData, setGridData] = React.useState(treeData);
  const [fileData, setFileData] = React.useState(gridData);

  const [panes, setPanes] = React.useState(splitterPanes);


  const handleChange = (event: any) => {
    setPanes(event.newState);
  };

  console.log(treeData)
  return (
     <div className="k-widget k-filemanager">
        <div className="k-filemanager-header">
          <FileManagerToolbar data={gridData} />
        </div>

      <div>
        <Splitter 
          panes={panes} 
          onChange={handleChange} 
        >
          <div>
            <FolderTree data={treeData} />
          </div>

          <div>
            <h4>** Breadcrumb component **</h4>
            <FolderStructure data={gridData} />
          </div>

          <div >
            <FileInformation data={fileData} />
          </div>
        </Splitter>
      </div>
    </div>
  );
}

export default App;

