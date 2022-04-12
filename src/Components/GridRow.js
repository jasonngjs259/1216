import React from "react";
import GridData from "./GridData";

const GridRow = (y) => {
    // console.log(y);
    // const renderCol = () => {
    //     for (let b = 0; b < y; b++) {
    //         <GridCol key={b} />;
    //     }
    // };

    return (
        <>
            <div className="grid-y">
                {y?.data.map((e) => (
                    <GridData key={e.id} data={e.Data} />
                ))}
            </div>
            {/* <div className="grid-y">{y.data}</div> */}
        </>
    );
};

export default GridRow;
