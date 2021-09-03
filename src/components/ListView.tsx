import { classNames } from '@progress/kendo-react-common';
import { convertExtensionToIcon } from '../helpers/helperMethods';
import { IconType } from './../interfaces/FileManagerModels';

export const ListView = (props: any) => {

    return (
        <div className="k-listview k-selectable k-filemanager-listview">
          <div className="k-listview-content k-d-flex k-flex-row k-flex-wrap">
              { props.data.data 
                ? props.data.data.map((item: any) => {
                    const iconObject: IconType | null = convertExtensionToIcon(item.name);
                    return (
                    <>
                        <div className="k-listview-item">
                        <span className="k-file-preview">
                            <span className={classNames("k-file-icon k-icon", iconObject ? iconObject.icon : '')} />
                        </span>
                        <span className="k-file-name">{item.name}</span>
                        </div>
                    </>
                    )
                }) 
                : '' }
              </div>
          </div>
    );
}
