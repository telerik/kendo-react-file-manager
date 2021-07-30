import * as React from 'react';
import { TreeView, TreeViewItemClickEvent } from '@progress/kendo-react-treeview'

export const FolderTree = (props: any) => {
    let selectedItem: any = undefined;

    const handleExpandChange = (event: any) => {
        event.item.expanded = !event.item.expanded;
    }

    const handleItemClick = (event: TreeViewItemClickEvent) => {
        if (selectedItem) {
          selectedItem.selected = false;
        }
        event.item.selected = true;
        selectedItem = event.item;
        
        props.onItemClick.call(undefined, {
            item: event.item,
            target: event.target,
            event: event
        })
    }

    console.log('data inside tree', props.data)
    return (
        <TreeView
            className="k-filemanager-treeview"
            data={props.data}
            expandIcons={true}
            onExpandChange={handleExpandChange}
            onItemClick={handleItemClick}
        /> 
    )
}
