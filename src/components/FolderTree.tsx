import { TreeView } from '@progress/kendo-react-treeview'

export const FolderTree = (props: any) => {
    const handleExpandChange = (event: any) => {
        event.item.expanded = !event.item.expanded;
    }

    return (
        <TreeView
            className="k-filemanager-treeview"
            data={props.data}
            textField="name"
            expandIcons={true}
            onExpandChange={handleExpandChange}
            // Add for test purposes
            // animate={false}
        /> 
    )
}
