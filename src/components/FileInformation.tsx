import { useInternationalization } from '@progress/kendo-react-intl';
import { convertDateFormat, convertExtensionToIcon, formatBytes } from '../helpers/helperMethods';
import { classNames } from '@progress/kendo-react-common';
import { DataModel, IconType } from '../interfaces/FileManagerModels';

export const FileInformation = (props) => {
    return (
        props.data
            ? typeof props.data === 'number' ? MultipleSelectionRendering(props.data) : FileSelectionRendering(props.data)
            : NoDataRendering());
}

const NoDataRendering = () => {
    return (
        <div className="k-filemanager-preview" style={{ width: '100%', border: 0 }}>
            <div className="k-file-info">
                <span className="k-file-preview"><span className="k-file-icon k-icon k-i-none"></span></span>
                <span className="k-file-name k-no-file-selected">No File Selected</span>
            </div>
        </div>
    )
}

const FileSelectionRendering = (data: DataModel) => {
    const intl = useInternationalization();
    const dateCreated: Date = convertDateFormat(data.dateCreated ? data.dateCreated : null, intl);
    const dateModified: Date = convertDateFormat(data.dateModified ? data.dateModified : null, intl);
    const iconObject: IconType | null = convertExtensionToIcon(data.name ? data.name : null);
    return (
        <div className="k-filemanager-preview" style={{ width: '100%', border: 0 }}>
            <div className="k-file-info">
                <span className="k-file-preview">
                    <span className={classNames("k-file-icon k-icon", iconObject?.icon ? iconObject.icon : '')}></span>
                </span>
                <span className="k-file-name k-single-file-selected">{data.name? data.name : ''}</span>
                <dl className="k-file-meta">
                    <dt className="k-file-meta-label">Type:  </dt>
                    <dd className= {"k-file-meta-value k-file-type"}> {iconObject?.type ? iconObject.type : ''}</dd>
                    <dd className="k-line-break"></dd>
                    <dt className="k-file-meta-label">Size:  </dt>
                    <dd className="k-file-meta-value k-file-size"> {data.size ? formatBytes(data.size) : ''}</dd>
                    <dd className="k-line-break"></dd>
                    <dt className="k-file-meta-label">Date Created:  </dt>
                    <dd className="k-file-meta-value k-file-created"> {dateCreated ? dateCreated.toString() : ''}</dd>
                    <dd className="k-line-break"></dd>
                    <dt className="k-file-meta-label">Date Modified:  </dt>
                    <dd className="k-file-meta-value k-file-modified"> {dateModified ? dateModified.toString() : ''}</dd>
                    <dd className="k-line-break"></dd>
                </dl>
            </div>
        </div>
    );
}

const MultipleSelectionRendering = (length: number) => {
    return (
        <div className="k-filemanager-preview" style={{ width: '100%', border: 0 }}>
            <div className="k-file-info">
                <span className="k-file-preview" style={{ width: '100%', border: 0 }}>
                    <span className="k-file-icon k-icon k-i-file"></span></span>
                <span className="k-file-name k-multiple-files-selected">{length} items</span>
            </div>
        </div>
    );
}
