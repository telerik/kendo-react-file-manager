import * as React from 'react';
import {
  Toolbar,
  Button,
  ButtonGroup,
  SplitButton,
  SplitButtonItemClickEvent
} from '@progress/kendo-react-buttons';
import { Switch, Input, InputChangeEvent, SwitchChangeEvent } from "@progress/kendo-react-inputs";
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Upload } from '@progress/kendo-react-upload';
import { BaseEvent } from '@progress/kendo-react-common';
import { toggleViewBtnGroup, toggleSortBtnGroup } from '../helpers/helperMethods';
import { GridViewBtnGroup, UploadAddEvent } from '../interfaces/FileManagerModels';

export const FileManagerToolbar = (props) => {
  const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);
  const [viewBtnGroup, setViewBtnGroup] = React.useState<GridViewBtnGroup>({ gridView: true, listView: false });

  const handleSearchChange = (event: InputChangeEvent) => {
    props.onSearchChange(event);
  };

  const handleSwitchChange = (event: SwitchChangeEvent) => {
    props.onSwitchChange(event);
  };

  const handleGridViewChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event) {
      const newBtnGroupState = toggleViewBtnGroup(viewBtnGroup, 'grid');
      setViewBtnGroup(newBtnGroupState);

      props.onViewChange({
        viewValue: newBtnGroupState,
        event: event
      });
    }
  };

  const handleAscBtnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event) {
      const newBtnGroupState = toggleSortBtnGroup(props.sort[0].dir, 'asc');
      props.onSortChange({
        direction: 'asc',
        sortValue: newBtnGroupState,
        event: event
      });
    }
  };

  const handleDescSortBtnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newBtnGroupState = toggleSortBtnGroup(props.sort[0].dir, 'desc');
    props.onSortChange({
      direction: 'desc',
      sortValue: newBtnGroupState,
      event: event
    });
  };

  const handleListViewChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event) {
      const newBtnGroupState = toggleViewBtnGroup(viewBtnGroup, 'list');
      setViewBtnGroup(newBtnGroupState);

      props.onViewChange({
        viewValue: newBtnGroupState,
        event: event
      });
    }
  };

  const handleItemClick = (event: SplitButtonItemClickEvent) => {
    props.onSortChange(event);
  };

  const handleNewFolderClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onNewFolderClick(event);
  }

  const handleDialogVisibility = (event: BaseEvent<Dialog> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setDialogVisible(!dialogVisible);
  };

  const handleFileChange = (event: UploadAddEvent) => {
    props.onFileChange({
      files: event.newState,
      event: event
    });
  };

  const handleUploadClearList = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onClearFileList(event);
  };

  const handleUploadDone = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setDialogVisible(!dialogVisible);
    props.onUploadComplete(event);
  };

  return (
    <Toolbar className="k-filemanager-toolbar">
      <Button onClick={handleNewFolderClick}>New Folder</Button>
      <Button onClick={handleDialogVisibility}>Upload</Button>
      {dialogVisible &&
        <Dialog
          title={'Upload Files'}
          className={'k-filemanager-upload-dialog'}
          onClose={handleDialogVisibility}
          contentStyle={{ width: '530px' }}
        >
          <Upload
            batch={false}
            multiple={true}
            files={props.files}
            withCredentials={false}
            onAdd={handleFileChange}
            onRemove={handleFileChange}
            onProgress={handleFileChange}
            onStatusChange={handleFileChange}
            saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
            removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
          />
          <DialogActionsBar layout={'end'}>
            <Button onClick={handleUploadClearList} > Clear List</Button>
            <Button themeColor={'primary'} onClick={handleUploadDone}> Done </Button>
          </DialogActionsBar>
        </Dialog >
      }
      <ButtonGroup>
        <Button
          className="k-toggle-button k-button-icon k-group-start"
          togglable={true}
          selected={props.sort[0].dir === 'asc'}
          onClick={handleAscBtnClick}
        >
          <span className="k-icon k-i-sort-asc-sm"></span>
        </Button>
        <Button
          className="k-toggle-button k-button k-button-icon k-group-end"
          togglable={true}
          selected={props.sort[0].dir === 'desc'}
          onClick={handleDescSortBtnClick}
        >
          <span className="k-icon k-i-sort-desc-sm"></span>
        </Button>
      </ButtonGroup>
      <SplitButton
        text={'Sort By'}
        items={props.splitItems}
        onItemClick={handleItemClick}
      >
      </SplitButton>
      <ButtonGroup>
        <Button
          className={"k-toggle-button k-button-icon k-group-start"}
          togglable={true}
          selected={viewBtnGroup.gridView}
          onClick={handleGridViewChange}
        >
          <span className="k-icon k-i-grid-layout"></span>
        </Button>
        <Button
          className={"k-toggle-button k-button-icon k-group-end"}
          togglable={true}
          selected={viewBtnGroup.listView}
          onClick={handleListViewChange}
        >
          <span className="k-icon k-i-grid"></span>
        </Button>
      </ButtonGroup>
      <div className="k-spacer">&nbsp;</div>
      <div className="k-filemanager-details-toggle">
        <label>View Details</label>
        <Switch defaultChecked={true} onChange={handleSwitchChange} />
      </div>
      <div className="k-filemanager-search-tool k-textbox k-toolbar-last-visible" >
        <Input className="k-input" placeholder="Search" onChange={handleSearchChange} />
        <span className="k-input-icon">
          <span className="k-icon k-i-search"></span>
        </span>
      </div>
    </Toolbar>
  );
}
