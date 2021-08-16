import * as React from 'react';
import {
    Toolbar,
    Button,
    ButtonGroup,
    SplitButton
} from '@progress/kendo-react-buttons';
// import { Upload } from '@progress/kendo-react-upload';
import { Switch, Input } from "@progress/kendo-react-inputs";
import { toggleViewBtnGroup, toggleSortBtnGroup } from '../helpers/helperMethods';

export const FileManagerToolbar = (props: any) => {
    const [viewBtnGroup, setViewBtnGroup] = React.useState<{gridView: boolean, listView: boolean}>({
        gridView: true,
        listView: false
    });

    const [sortBtnGroup, setSortBtnGroup] = React.useState<{sortAsc: boolean, sortDesc: boolean}>({
        sortAsc: true,
        sortDesc: false
    });

    const splitBtnItems = [
        { text: 'Name' },
        { text: 'Type' },
        { text: 'File Size'},
        { text: 'Date Created'},
        { text: 'Date Modified'}
    ];

    const handleInputChange = event => {
        props.onInputChange.call(undefined, {
            inputValue: event.value,
            target: event.target,
            event: event
        });
    }

    const handleSwitchChange = event => {
        props.onSwitchChange.call(undefined, {
            switchValue: event.value,
            target: event.target,
            event: event
        });
    }

    const handleGridViewBtnClick = event => {
        if (event) {
            const newBtnGroupState = toggleViewBtnGroup(viewBtnGroup);
            setViewBtnGroup(newBtnGroupState);

            props.onViewBtnSelection.call(undefined, {
                viewValue: newBtnGroupState,
                target: event.target,
                event: event
            });
        }
    }

    const handleListViewBtnClick = event => {
        if (event) {
            const newBtnGroupState = toggleViewBtnGroup(viewBtnGroup);
            setViewBtnGroup(newBtnGroupState);

            props.onViewBtnSelection.call(undefined, {
                viewValue: newBtnGroupState,
                target: event.target,
                event: event
            });
        }
    }

    const handleAscBtnClick = event => {
        if (event) {
            const newBtnGroupState = toggleSortBtnGroup(sortBtnGroup);
            setSortBtnGroup(newBtnGroupState);

            props.onSortBtnSelection.call(undefined, {
                sortValue: newBtnGroupState,
                target: event.target,
                event: event
            });
        } 
    }

    const handleDescSortBtnClick = event => {
        if (event) {
            const newBtnGroupState = toggleSortBtnGroup(sortBtnGroup);
            setSortBtnGroup(newBtnGroupState);

            props.onSortBtnSelection.call(undefined, {
                sortValue: newBtnGroupState,
                target: event.target,
                event: event
            });
        } 
    }

    const handleItemClick = event => {
        props.onSplitBtnItemClick.call(undefined, {
            sortType: event.item.text,
            target: event.target,
            event: event
        });
    }

    return (
        <Toolbar className="k-filemanager-toolbar">
            <Button className="k-toolbar-first-visible">New Folder</Button>
            <Button>Upload</Button>

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
                items={splitBtnItems}
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
