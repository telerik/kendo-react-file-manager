import * as React from 'react';
import {
    Toolbar,
    Button,
    ButtonGroup,
    SplitButton
} from '@progress/kendo-react-buttons';
// import { Upload } from '@progress/kendo-react-upload';
import { Switch, Input } from "@progress/kendo-react-inputs";

export const FileManagerToolbar = (props: any) => {
    const [selectedBtn, setSelectedBtn] = React.useState<{gridView: boolean, listView: boolean}>({
        gridView: true,
        listView: false
    });

    const splitBtnItems = [
        { text: 'Name' },
        { text: 'Type' },
        { text: 'File Size'},
        { text: 'Date Created'},
        { text: 'Date Modified'}
    ]

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
            let newBtnGroupState;
            if (selectedBtn.gridView) {
                newBtnGroupState = {
                    gridView: false,
                    listView: true
                }
                setSelectedBtn(newBtnGroupState);
            } else {
                newBtnGroupState = {
                    gridView: true,
                    listView: false
                }
                setSelectedBtn(newBtnGroupState);
            }

            props.onViewBtnSelection.call(undefined, {
                viewValue: newBtnGroupState,
                target: event.target,
                event: event
            });
        }
    }

    const handleListViewBtnClick = event => {
        if (event) {
            let newBtnGroupState;
            if (selectedBtn.listView) {
                newBtnGroupState = {
                    gridView: true,
                    listView: false
                }
                setSelectedBtn(newBtnGroupState);
            } else {
                newBtnGroupState = {
                    gridView: false,
                    listView: true
                }
                setSelectedBtn(newBtnGroupState);
            }

            props.onViewBtnSelection.call(undefined, {
                viewValue: newBtnGroupState,
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
                {/* TODO: toggle selected class on condition */}
                <Button className="k-toggle-button k-state-selected k-button-icon k-group-start">
                    <span className="k-icon k-i-sort-asc-sm"></span>
                </Button>
                <Button className="k-toggle-button k-button k-button-icon k-group-end">
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
                    selected={selectedBtn.gridView}
                    onClick={handleGridViewBtnClick}
                    >
                    <span className="k-icon k-i-grid-layout"></span>
                </Button>
                <Button 
                    className={"k-toggle-button k-button-icon k-group-end"}
                    togglable={true}
                    selected={selectedBtn.listView}
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
