import * as React from 'react';
import { TreeView, TreeViewItemClickEvent } from '@progress/kendo-react-treeview'

export const FolderTree = (props: any) => {
    let selectedItem: any = React.useMemo(
        () => props.selectedItem,
        [props.selectedItem]
    )

    const handleExpandChange = (event: any) => {
        event.item.expanded = !event.item.expanded;
    }

    const handleItemClick = (event: TreeViewItemClickEvent) => {
        if (event.item) {
            props.onItemClick.call(undefined, {
                item: event.item,
                target: event.target,
                event: event
            });
        }
    }

    // console.log('props inside the tree', props)

    return (
        <TreeView
            className="k-filemanager-treeview"
            data={props.data}
            textField="name"
            expandIcons={true}
            onExpandChange={handleExpandChange}
            onItemClick={handleItemClick}
            // Add for test purposes
            // animate={false}
        /> 
    )
}
