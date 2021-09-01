import { TableKeyDownEvent, TableSelectionChangeEvent } from "@progress/kendo-react-data-tools";
import { GridRowClickEvent, GridSelectionChangeEvent } from "@progress/kendo-react-grid";
import { ChangeEvent } from "react";

export interface DataModel {
    name: string;
    expanded?: boolean;
    size?: number;
    dateCreated?: Date;
    dateModified?: Date | null;
    items?: DataModel[];
    length?: number;
};

export interface TreeDataModel {
    name: string;
    expanded?: boolean;
    items?: DataModel[] | [];
};

export interface IconType {
    icon?: string;
    type?: string;
};
export interface GridDataModel {
    name: string;
    dateCreated?: Date;
    size?: number;
    icon?: IconType;
    items?: DataModel[];
};

export interface PanesModel {
    size?: string;
    min?: string;
    collapsible?: boolean;
};

export interface SplitBtnItems {
    text?: string;
    value?: string;
};
export interface GridViewBtnGroup {
    gridView: boolean;
    listView: boolean;
};

export interface SortingBtnGroup {
    sortAsc: boolean;
    sortDesc: boolean;
};

export interface SelectedItemType {
    [id: string]: boolean | number[];
};

export interface SelectionChangeEvent extends GridSelectionChangeEvent {
    event: TableSelectionChangeEvent<any>;
    pressedKey?: string;
};

export interface ButtonClickEvent {
    event: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index?: number) => void;
    viewState: {
        gridView?: string;
        listView?: string;
    };
}