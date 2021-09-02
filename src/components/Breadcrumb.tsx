import * as React from 'react';
import { Breadcrumb, BreadcrumbLinkMouseEvent, BreadcrumbLinkKeyDownEvent } from '@progress/kendo-react-layout';


export const BreadcrumbComponent = (props) => {

    // const handleItemSelect = (event: BreadcrumbLinkMouseEvent) => {
    //     const itemIndex: number = data.findIndex((curValue) => curValue.id === event.id);
    //     const newData: DataModel[] = data.slice(0, itemIndex + 1);

    //     setData(newData);
    // };

    // const handleButtonClick = (event: React.MouseEvent) => {
    //     if (event) {
    //         setData(items);
    //     }
    // };

    // const handleKeyDown = (event: BreadcrumbLinkKeyDownEvent) => {
    //     if (event.nativeEvent.keyCode === 13) {
    //         const itemIndex = data.findIndex((curValue) => curValue.id === event.id);
    //         const newData = data.slice(0, itemIndex + 1);
    
    //         setData(newData);
    //     }
    // };

    return (
        <Breadcrumb 
          data={props.data}
        //   onItemSelect={handleItemSelect}
        //   onKeyDown={handleKeyDown}
          />
    );
};
