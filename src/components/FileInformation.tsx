export const FileInformation = (props: any) => {
    return (
        !props.data
            ? NoDataRendering()
            : props.data.length > 1
                ? MultipleSelectionRendering(props.data)
                : FileSelectionRendering(props.data)
    )
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

const FileSelectionRendering = data => {
    return (
        <div className="k-filemanager-preview" style={{ width: '100%', border: 0 }}>
            <div className="k-file-info">
                <span className="k-file-preview">
                    <span className="k-file-icon k-icon k-i-file-image"></span>
                </span>
                <span className="k-file-name k-single-file-selected">{data.name}</span>
                <dl className="k-file-meta">
                    <dt className="k-file-meta-label">Type:  </dt>
                    <dd className="k-file-meta-value k-file-type"> image</dd>
                    <dd className="k-line-break"></dd>
                    <dt className="k-file-meta-label">Size:  </dt>
                    <dd className="k-file-meta-value k-file-size"> {data.size}</dd>
                    <dd className="k-line-break"></dd>
                    <dt className="k-file-meta-label">Date Created:  </dt>
                    <dd className="k-file-meta-value k-file-created"> {data.dateCreated}</dd>
                    <dd className="k-line-break"></dd>
                    <dt className="k-file-meta-label">Date Modified:  </dt>
                    <dd className="k-file-meta-value k-file-modified"> {data.dateModified}</dd>
                    <dd className="k-line-break"></dd>
                </dl>
            </div>
        </div>
    );
}

const MultipleSelectionRendering = data => {
    return (
        <div className="k-filemanager-preview" style={{ width: '100%', border: 0 }}>
            <div className="k-file-info">
                <span className="k-file-preview" style={{ width: '100%', border: 0 }}>
                    <span className="k-file-icon k-icon k-i-file"></span></span>
                <span className="k-file-name k-multiple-files-selected">{data.length} items</span>
            </div>
        </div>
    );
}
