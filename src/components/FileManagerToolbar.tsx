import * as React from 'react';
import {
    Toolbar,
    Button,
    ButtonGroup,
    SplitButton
} from '@progress/kendo-react-buttons';
import { Switch, Input } from "@progress/kendo-react-inputs";
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Upload } from '@progress/kendo-react-upload';
import { toggleViewBtnGroup, toggleSortBtnGroup } from '../helpers/helperMethods';
import { GridViewBtnGroup, SortingBtnGroup } from '../interfaces/FileManagerModels';

export const FileManagerToolbar = (props: any) => {
    const [viewBtnGroup, setViewBtnGroup] = React.useState<GridViewBtnGroup>({ gridView: true, listView: false });
    const [sortBtnGroup, setSortBtnGroup] = React.useState<SortingBtnGroup>({ sortAsc: true, sortDesc: false });

    const handleInputChange = event => {
        props.onInputChange.call(undefined, {
            inputValue: event.value,
            target: event.target,
            event: event
        });
    };

    const handleSwitchChange = event => {
        props.onSwitchChange.call(undefined, {
            switchValue: event.value,
            target: event.target,
            event: event
        });
    };

    const handleGridViewBtnClick = event => {
        if (event) {
            const newBtnGroupState = toggleViewBtnGroup(viewBtnGroup, 'grid');
            setViewBtnGroup(newBtnGroupState);

            props.onViewBtnSelection.call(undefined, {
                viewValue: newBtnGroupState,
                target: event.target,
                event: event
            });
        }
    };

    const handleListViewBtnClick = event => {
        if (event) {
            const newBtnGroupState = toggleViewBtnGroup(viewBtnGroup, 'list');
            setViewBtnGroup(newBtnGroupState);

            props.onViewBtnSelection.call(undefined, {
                viewValue: newBtnGroupState,
                target: event.target,
                event: event
            });
        }
    };

    const handleAscBtnClick = event => {
        if (event) {
            const newBtnGroupState = toggleSortBtnGroup(sortBtnGroup, 'asc');
            setSortBtnGroup(newBtnGroupState);

            props.onSortBtnSelection.call(undefined, {
                sortValue: newBtnGroupState,
                target: event.target,
                event: event
            });
        } 
    };

    const handleDescSortBtnClick = event => {
        if (event) {
            const newBtnGroupState = toggleSortBtnGroup(sortBtnGroup, 'desc');
            setSortBtnGroup(newBtnGroupState);

            props.onSortBtnSelection.call(undefined, {
                sortValue: newBtnGroupState,
                target: event.target,
                event: event
            });
        } 
    };

    const handleItemClick = event => {
        props.onSplitBtnItemClick.call(undefined, {
            sortType: event.item.text,
            target: event.target,
            event: event
        });
    };

    const handleUploadDialog = event => {
        props.onUploadDialog.call(undefined, {
            target: event.target,
            event: event
        }); 
    };

    const handleClearList = event => {
        props.onClearFileList.call(undefined, {
            target: event.target,
            event: event
        }); 
    };

    const onAdd = event => {
        props.onFileAdd.call(undefined, {
            files: event.newState,
            target: event.target,
            event: event
        });
    };
    
    const onRemove = event => {
        props.onFileAdd.call(undefined, {
            files: event.newState,
            target: event.target,
            event: event
        });
    };

    const onProgress = event => {
        props.onFileProgress.call(undefined, {
            files: event.newState,
            target: event.target,
            event: event
        });
    };

    const onStatusChange = event => {
        props.onFileStatusChange.call(undefined, {
            files: event.newState,
            target: event.target,
            event: event
        });
    };

    const handleDoneClick = event => {
        props.onDoneBtnClick.call(undefined, {
            files: event.newState,
            target: event.target,
            event: event
        });
    };

    return (
        <Toolbar className="k-filemanager-toolbar">
            <Button className="k-toolbar-first-visible">New Folder</Button>
            <Button onClick={handleUploadDialog}>Upload</Button>
            { props.visible &&
                <Dialog  
                    title={'Upload Files'}
                    className={'k-filemanager-upload-dialog'}
                    onClose={handleUploadDialog}
                    contentStyle={{ width: '530px' }}
                    >
                    <Upload
                        batch={false}
                        multiple={true}
                        files={props.files}
                        withCredentials={false}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onProgress={onProgress}
                        onStatusChange={onStatusChange}
                        saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                        removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                        />
                    <DialogActionsBar layout={'end'}>
                        <Button onClick={handleClearList} > Clear List</Button>
                        <Button primary={true} onClick={handleDoneClick}> Done </Button>
                    </DialogActionsBar>
                </Dialog >
            }

            <ButtonGroup>
                <Button
                    className="k-toggle-button k-button-icon k-group-start"
                    togglable={true}
                    selected={sortBtnGroup.sortAsc}
                    onClick={handleAscBtnClick}
                    >
                    <span className="k-icon k-i-sort-asc-sm"></span>
                </Button>
                <Button
                    className="k-toggle-button k-button k-button-icon k-group-end"
                    togglable={true}
                    selected={sortBtnGroup.sortDesc}
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
                    onClick={handleGridViewBtnClick}
                    >
                    <span className="k-icon k-i-grid-layout"></span>
                </Button>
                <Button 
                    className={"k-toggle-button k-button-icon k-group-end"}
                    togglable={true}
                    selected={viewBtnGroup.listView}
                    onClick={handleListViewBtnClick}
                    >
                    <span className="k-icon k-i-grid"></span>
                </Button>
            </ButtonGroup>
            <div className="k-spacer">&nbsp;</div>
            <div className="k-filemanager-details-toggle">
                <label>View Details</label>
                <Switch defaultChecked={true} onChange={handleSwitchChange} >
                    <Input type="checkbox"/>
                    <span className="k-switch-container">
                        <span className="k-switch-label-on">On</span>
                        <span className="k-switch-label-off">Off</span>
                        <span className="k-switch-handle"></span>
                    </span>
                </Switch>
            </div>
            <div className="k-filemanager-search-tool k-textbox k-toolbar-last-visible" >
                <Input className="k-input" placeholder="Search" onChange={handleInputChange}/>
                <span className="k-input-icon">
                    <span className="k-icon k-i-search"></span>
                </span>
            </div>
        </Toolbar>
    );
}
