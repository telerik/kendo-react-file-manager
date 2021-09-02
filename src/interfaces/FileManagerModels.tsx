import { SplitButtonItemClickEvent } from "@progress/kendo-react-buttons";
import { TableSelectionChangeEvent } from "@progress/kendo-react-data-tools";
import { GridSelectionChangeEvent, GridSortChangeEvent } from "@progress/kendo-react-grid";
import { UploadFileInfo, UploadOnAddEvent } from "@progress/kendo-react-upload";

export interface DataModel {
    name?: string;
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

export interface BreadcrumbDataModel {
    id: string;
    text?: string;
    icon?: React.ReactNode;
    iconClass?: string;
}
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

export interface UploadAddEvent extends UploadOnAddEvent {
    event?: UploadOnAddEvent;
    files?: Array<UploadFileInfo>;
};

export interface ViewChangeEvent extends React.MouseEvent<HTMLButtonElement, MouseEvent> {
    viewValue: {
        gridView?: string;
        listView?: string;
    };
};

export interface SortChangeEvent extends GridSortChangeEvent {
    event?: SplitButtonItemClickEvent;
    direction?: 'asc' | 'desc';
    item?: any;
};
