import React from 'react';

const ImageHelper = ({ url, height, width, cursor, clickEvent = () => {} }) => {
    const imageurl = url ? url : `https://bitsofco.de/content/images/2018/12/broken-1.png`;
    return (
        <div className="rounded p-2">
            <img
                onClick={clickEvent}
                className="rounded"
                src={imageurl}
                alt=""
                style={{ height: height, width: width, cursor: cursor }}
            />
        </div>
    )
}

export default ImageHelper;