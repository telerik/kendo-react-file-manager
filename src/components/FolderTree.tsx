import * as React from 'react';
import { TreeView, TreeViewItemClickEvent } from '@progress/kendo-react-treeview'

export const FolderTree = (props: any) => {
    // const [selectedItem, setSelectedItem] = React.useState(undefined);

    const handleExpandChange = (event: any) => {
        event.item.expanded = !event.item.expanded;
    }

    const handleItemClick = (event: TreeViewItemClickEvent) => {
        if (event.item) {
            // event.item.selected = true;
            // setSelectedItem(event.item);
        }
        
        props.onItemClick.call(undefined, {
            item: event.item,
            target: event.target,
            event: event
        })
    }

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
