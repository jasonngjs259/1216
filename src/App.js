import { useEffect, useState } from "react";
import "./App.scss";
import GridRow from "./Components/GridRow";

const App = () => {
    const emptyTile = 0;

    const nextGridMap = [
        [2, 1],
        [1, 2],
    ];

    const miniGridMap = [
        [1, 2, 0, 0, 0, 0, 0, 0],
        [2, 1, 0, 0, 0, 0, 0, 0],
    ];

    const gridMap = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 2, 0, 0, 1, 0, 3],
        [0, 0, 2, 0, 2, 1, 0, 4],
        [1, 0, 1, 2, 2, 1, 0, 5],
    ];

    const [matrixA] = useState(miniGridMap);
    const [matrixB, setMatrixB] = useState(gridMap);
    const [matrixC] = useState(nextGridMap);

    const CheckMiniGridMap = (matrix) => {
        let row = [];

        matrix.forEach((e, y) => {
            let miniGridData = [];
            e.forEach((data, x) => {
                if (data !== 0) {
                    miniGridData.push([data, [x, y]]);
                }
            });
            row.push(miniGridData);
        });
        return row;
    };

    const CheckGridMap = (value) => {
        let j = 0;
        let row = 0;

        for (let i = 0; i < value.length; i++) {
            row = value[i].length;
            if (j === row) {
                break;
            }

            while (j < row) {
                let temp_tile = [];
                let countEmptyTileRange = 0;

                for (let k = 0; k < value.length; k++) {
                    if (
                        value[k][j] !== emptyTile &&
                        countEmptyTileRange === 0
                    ) {
                        temp_tile.push(value[k][j]);
                    } else if (
                        temp_tile.length !== emptyTile &&
                        value[k][j] === 0 &&
                        k !== value.length - 1
                    ) {
                        countEmptyTileRange += 1;
                        for (let x = 1; x <= temp_tile.length; x++) {
                            value[k - x][j] = 0;
                        }
                        value[k][j] = 0;
                    } else if (
                        value[k][j] !== emptyTile &&
                        countEmptyTileRange !== 0 &&
                        value[k][j] !== 0
                    ) {
                        for (let x = 0; x < temp_tile.length; x++) {
                            value[k - temp_tile.length + x][j] = temp_tile[x];
                            countEmptyTileRange = 0;
                        }
                    } else if (
                        temp_tile.length !== 0 &&
                        countEmptyTileRange !== 0 &&
                        k === value.length - 1
                    ) {
                        for (let x = 0; x < temp_tile.length; x++) {
                            value[k - x][j] =
                                temp_tile[temp_tile.length - 1 - x];
                            countEmptyTileRange = 0;
                        }
                    }
                }
                j += 1;
            }
        }
    };

    const DropTile = () => {
        const tempMiniGridMap = CheckMiniGridMap(matrixA);
        let tempMatrix = matrixB;
        for (let i = 0; i < tempMiniGridMap.length; i++) {
            for (let j = 0; j < tempMiniGridMap.length; j++) {
                const data = tempMiniGridMap[i][j][0];
                const x = tempMiniGridMap[i][j][1][0];
                const y = tempMiniGridMap[i][j][1][1];
                tempMatrix[y][x] = data;
            }
        }
        setMatrixB([...tempMatrix]);
        CheckGridMap(matrixB);
    };

    return (
        <>
            <div className="body">
                <div className="justify-content-center">
                    <div className="grid">
                        <div className="no-border mb-1">
                            {matrixA.map((e, i) => (
                                <GridRow key={i} data={e} display={false} />
                            ))}
                        </div>
                        {matrixB.map((e, i) => (
                            <GridRow key={i} data={e} display={false} />
                        ))}
                    </div>

                    <div className="grid">
                        <div className="mb-1">
                            {matrixA.map((e, i) => (
                                <GridRow key={i} data={e} display={true} />
                            ))}
                        </div>

                        {matrixB.map((e, i) => (
                            <GridRow key={i} data={e} display={true} />
                        ))}
                    </div>

                    <div>
                        <div className="mb-3">Score:</div>
                        <div className="mb-3">
                            <div>Next:</div>
                            <div className="next-grid no-border">
                                {matrixC.map((e, i) => (
                                    <GridRow key={i} data={e} display={false} />
                                ))}
                            </div>
                        </div>

                        <div className="mb-3">
                            <button onClick={DropTile}>Drop it</button>
                        </div>

                        <div>
                            <button>Lever</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
