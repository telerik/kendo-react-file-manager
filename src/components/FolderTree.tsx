import * as React from 'react';
import { TreeView, TreeViewExpandChangeEvent, TreeViewItemClickEvent } from '@progress/kendo-react-treeview'

export const FolderTree = (props) => {
    let selectedItem: any = React.useMemo(
        () => props.selectedTreeItem,
        [props.selectedTreeItem]
    )

    const handleExpandChange = (event: TreeViewExpandChangeEvent) => {
        event.item.expanded = !event.item.expanded;
    }

    const handleItemClick = (event: TreeViewItemClickEvent) => {
        if (selectedItem) {
            selectedItem.selected = false;
        }
        event.item.selected = true;
        // selectedItem = event.item;

        if (event.item) {
            props.onItemClick.call(undefined, {
                item: event.item,
                event: event
            });
        }
    }

    return (
        <TreeView
            className="k-filemanager-treeview"
            data={props.data}
            textField="name"
            expandIcons={true}
            onExpandChange={handleExpandChange}
            onItemClick={handleItemClick}
        /> 
    )
}
