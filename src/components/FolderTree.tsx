import { TreeView } from '@progress/kendo-react-treeview'

export const FolderTree = (props: any) => {
    const handleExpandChange = (event: any) => {
        event.item.expanded = !event.item.expanded;
    }

    return (
        <div>
            <TreeView
                className="k-filemanager-treeview"
                data={props.data}
                expandIcons={true}
                onExpandChange={handleExpandChange}
                // Add for test purposes
                // animate={false}
            /> 
        </div>
    )
}
