import React from "react";

const GridData = (x) => {
    let className = null;
    const data = x.data;

    if (data === 0 || x.display === true) {
        className = "grid-x";
    } else if (x.display === false && data === 1) {
        className = "grid-x color1-tile";
    } else if (x.display === false && data === 2) {
        className = "grid-x color2-tile";
    } else if (x.display === false && data === 3) {
        className = "grid-x color1-scored-tile";
    } else if (x.display === false && data === 4) {
        className = "grid-x color2-scored-tile";
    }

    return <div className={className}>{x.display === true && data}</div>;
};

export default GridData;
