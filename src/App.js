import { useState } from "react";
import "./App.scss";
import GridRow from "./Components/GridRow";

const App = () => {
    const emptyTile = 0;
    const tile1 = 1;
    const tile2 = 2;
    const scoredTile1 = 11;
    const scoredTile2 = 12;
    let dropCount = 0;
    let comboCount = 1;

    const nextGridMap = [
        [2, 1],
        [1, 2],
    ];

    const miniGridMap = [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
    ];

    const gridMap = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 2, 1, 0, 2, 0, 0],
        [0, 0, 2, 2, 2, 1, 0, 0],
        [1, 1, 1, 2, 2, 1, 0, 10],
    ];

    const [matrixA] = useState(miniGridMap);
    const [matrixB, setMatrixB] = useState(gridMap);
    const [matrixC] = useState(nextGridMap);
    const [score, setScore] = useState(0);

    const CheckMiniGridMap = (matrix) => {
        let row = [];

        matrix.forEach((e, y) => {
            let miniGridData = [];
            e.forEach((data, x) => {
                data !== 0 && miniGridData.push([data, [x, y]]);
            });
            row.push(miniGridData);
        });
        return row;
    };

    const ArrangeTile = (value) => {
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

    const CheckLinkedTile = (matrix, tile, scoredTile, linkedTile) => {
        for (let i = 0; i < matrix.length; i++) {
            let visited = [];
            for (let j = 0; j < matrix[i].length; j++) {
                if (
                    (matrix[i][j] === tile && matrix[i][j + 1] === tile) ||
                    (matrix[i][j] === scoredTile &&
                        matrix[i][j + 1] === scoredTile) ||
                    (matrix[i][j] === tile &&
                        matrix[i][j + 1] === scoredTile) ||
                    (matrix[i][j] === scoredTile && matrix[i][j + 1] === tile)
                ) {
                    if (!visited.includes(j)) {
                        visited.push(j, j + 1);
                        linkedTile.push([i, j], [i, j + 1]);
                    } else {
                        visited.push(j + 1);
                        linkedTile.push([i, j + 1]);
                    }
                }
            }
        }

        return linkedTile;
    };

    const CheckScoredArea = (linkedTile, visitedNode, scoredArea) => {
        for (let a = 0; a < linkedTile.length; a++) {
            for (let b = a + 1; b < linkedTile.length; b++) {
                if (
                    (linkedTile[a][1] === linkedTile[b][1] &&
                        linkedTile[a][0] + 1 === linkedTile[b][0]) ||
                    (linkedTile[a][0] === linkedTile[b][0] &&
                        linkedTile[a][1] + 1 === linkedTile[b][1] + 1)
                ) {
                    if (!visitedNode.includes(linkedTile[a])) {
                        visitedNode.push(linkedTile[a], linkedTile[b]);
                        scoredArea.push(linkedTile[a], linkedTile[b]);
                    } else {
                        visitedNode.push(linkedTile[b]);
                        scoredArea.push(linkedTile[b]);
                    }
                }
            }
        }

        return scoredArea;
    };

    const TransformTile = (matrix, tile, scoredTile) => {
        let linkedTile = [];
        let scoredArea = [];
        let visitedNode = [];

        CheckLinkedTile(matrix, tile, scoredTile, linkedTile);
        CheckScoredArea(linkedTile, visitedNode, scoredArea);

        // console.log(linkedTile);
        // console.log(scoredArea);

        for (let k = 0; k < scoredArea.length; k++) {
            matrix[scoredArea[k][0]][scoredArea[k][1]] = scoredTile;
        }
    };

    TransformTile(matrixB, tile1, scoredTile1);
    TransformTile(matrixB, tile2, scoredTile2);

    const DropCount = () => {};

    const ComboCount = () => {};

    const DropTile = () => {
        const tempMiniGridMap = CheckMiniGridMap(matrixA);
        let tempMatrix = matrixB;
        let gameOver = false;

        tempMiniGridMap.forEach((elem) => {
            elem.forEach((item) => {
                const data = item[0];
                const x = item[1][0];
                const y = item[1][1];

                tempMatrix[y][x] === 0
                    ? (tempMatrix[y][x] = data)
                    : (gameOver = true);
            });
        });

        gameOver === true && console.log("Game Over");

        setMatrixB([...tempMatrix]);
        ArrangeTile(matrixB);
    };

    const PullLever = () => {
        let tempMatrix = matrixB;
        let calculateScoredTile = 0;

        tempMatrix.forEach((elem, i) => {
            elem.forEach((data, j) => {
                if (data === scoredTile1 || data === scoredTile2) {
                    calculateScoredTile += 1;
                    tempMatrix[i][j] = emptyTile;
                }
            });
        });

        let tempScore = score + Math.pow(calculateScoredTile, 2);
        setScore(tempScore);
        setMatrixB([...tempMatrix]);
        ArrangeTile(matrixB);
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
                        <div className="mb-3">Score:&nbsp;{score}</div>
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
                            <button onClick={PullLever}>Lever</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
