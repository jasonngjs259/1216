import React from "react";

const GridData = (x) => {
    let className = null;
    // const [value, setValue] = useState(x.data);
    // const data = value;
    const data = x.data;

    // useEffect(() => {
    //     if (x.data === 3 || x.data === 4) {
    //         setValue(0);
    //     }
    // }, [x.data]);

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

// const currentTime = new Date().getTime();

// const changeTileData = (value) => {
//     if (x.data === 3 || x.data === 4) {
//         captureTime = currentTime;
//         console.log("Current: " + currentTime);
//         console.log("Capture: " + captureTime);
//     }

//     let timeLength = currentTime - captureTime;

//     console.log("Time length: " + timeLength);

//     return value;
// };

// const timeLength = currentTime - captureTime;
// console.log(timeLength);
