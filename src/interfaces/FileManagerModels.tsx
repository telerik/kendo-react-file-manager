export interface DataModel {
    name: string,
    expanded?: boolean,
    size?: number,
    dateCreated?: Date,
    dateModified?: Date | null,
    items?: DataModel[],
    length?: number
}

export interface TreeDataModel {
    name: string,
    expanded?: boolean,
    items?: DataModel[] | []
}

export interface GridDataModel {
    name: string,
    dateCreated?: string,
    size?: number,
    icon?: string,
    items?: DataModel[]
}
