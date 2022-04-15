import React, { useEffect, useState } from "react";

const GridData = (x) => {
    const [className, setClassName] = useState();
    const data = x.data;

    useEffect(() => {
        if (data === 0 || x.display === true) {
            setClassName("grid-x color0-tile");
        } else if (x.display === false && data === 1) {
            setClassName("grid-x color1-tile");
        } else if (x.display === false && data === 2) {
            setClassName("grid-x color2-tile");
        } else if (x.display === false && data === 3) {
            setClassName("grid-x color1-scored-tile");
        } else if (x.display === false && data === 4) {
            setClassName("grid-x color2-scored-tile");
        } else if (x.display === false && data === 5) {
            setClassName("grid-x hidden-tile");
        }
    }, [data, x.display]);

    return <div className={className}>{x.display === true && data}</div>;
};

export default GridData;
