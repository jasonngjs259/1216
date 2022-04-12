import React from "react";
import GridData from "./GridData";

const GridRow = (y) => {
    // console.log(y);

    return (
        <>
            <div className="grid-y">
                {y?.data.map((e) => (
                    <GridData key={e.id} data={e.Data} display={y.display} />
                ))}
            </div>
        </>
    );
};

export default GridRow;
