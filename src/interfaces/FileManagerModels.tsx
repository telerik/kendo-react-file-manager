export interface DataModel {
    name: string,
    expanded?: boolean,
    size?: number,
    dateCreated?: Date,
    dateModified?: Date | null,
    items?: DataModel[],
    length?: number
};

export interface TreeDataModel {
    name: string,
    expanded?: boolean,
    items?: DataModel[] | []
};

export interface GridDataModel {
    name: string,
    dateCreated?: Date,
    size?: number,
    icon?: { icon?: string; type?: string },
    items?: DataModel[]
};

export interface GridViewBtnGroup {
    gridView: boolean,
    listView: boolean
};

export interface SortingBtnGroup {
    sortAsc: boolean,
    sortDesc: boolean
};
