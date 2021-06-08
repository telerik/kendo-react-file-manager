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
            <SplitButton text={'Sort By'}>
            </SplitButton>

            <ButtonGroup>
                {/* TODO: toggle selected class on condition */}
                <Button className="k-toggle-button k-state-selected k-button-icon k-group-start">
                    <span className="k-icon k-i-grid-layout"></span>
                </Button>
                <Button className="k-toggle-button k-button-icon k-group-end">
                    <span className="k-icon k-i-grid"></span>
                </Button>
            </ButtonGroup>
            
            <div className="k-spacer">&nbsp;</div>
            
            <div className="k-filemanager-details-toggle">
                <label>View Details</label>
                <Switch>
                    <Input type="checkbox"/>
                    <span className="k-switch-container">
                        <span className="k-switch-label-on">On</span>
                        <span className="k-switch-label-off">Off</span>
                        <span className="k-switch-handle"></span>
                    </span>
                </Switch>
            </div>
            
            <div className="k-filemanager-search-tool k-textbox k-toolbar-last-visible" >
                <input className="k-input" placeholder="Search"/>
                <span className="k-input-icon">
                    <span className="k-icon k-i-search"></span>
                </span>
            </div>
        </Toolbar>
    );
}
