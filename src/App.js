import { useState } from "react";
import "./App.scss";
import GridRow from "./Components/GridRow";

const App = () => {
    const emptyTile = 0;
    const tile1 = 1;
    const tile2 = 2;
    const scoredTile1 = 11;
    const scoredTile2 = 12;

    const nextGridMap = [
        [2, 1],
        [1, 2],
    ];

    const miniGridMap = [
        [0, 0, 2, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const gridMap = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0, 0],
        [2, 2, 1, 1, 1, 1, 0, 0],
        [2, 1, 1, 1, 2, 2, 0, 0],
        [2, 2, 1, 2, 2, 2, 0, 0],
        [1, 1, 1, 2, 2, 1, 1, 0],
        [1, 1, 2, 2, 1, 1, 1, 0],
        [1, 1, 2, 2, 1, 1, 1, 10],
    ];

    const [matrixA] = useState(miniGridMap);
    const [matrixB, setMatrixB] = useState(gridMap);
    const [matrixC] = useState(nextGridMap);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [scoredAreaSize, setScoredAreaSize] = useState([]);

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

                for (let k = 0; k < value.length; k++) {
                    if (value[k][j] !== emptyTile) {
                        temp_tile.push(value[k][j]);
                        value[k][j] = 0;
                    }
                }

                temp_tile.reverse();

                for (let x = 0; x < temp_tile.length; x++) {
                    value[value.length - 1 - x][j] = temp_tile[x];
                }

                j += 1;
            }
        }
    };

    const CheckLinkedTile = (matrix, tile, scoredTile, linkedTile) => {
        for (let i = 0; i < matrix.length - 1; i++) {
            for (let j = 0; j < matrix[i].length - 1; j++) {
                if (
                    (matrix[i][j] === tile || matrix[i][j] === scoredTile) &&
                    (matrix[i][j + 1] === tile ||
                        matrix[i][j + 1] === scoredTile) &&
                    (matrix[i + 1][j] === tile ||
                        matrix[i + 1][j] === scoredTile) &&
                    (matrix[i + 1][j + 1] === tile ||
                        matrix[i + 1][j + 1] === scoredTile)
                ) {
                    linkedTile.push(
                        [i, j],
                        [i, j + 1],
                        [i + 1, j],
                        [i + 1, j + 1]
                    );
                }
            }
        }
    };

    const CheckScoredArea = (linkedTile, scoredArea, type) => {
        let visitedNode = [];
        let visitedNode2 = [];
        let tempNewScoredArea = [];
        let newScoredArea = [];
        console.log(linkedTile);

        linkedTile.forEach((elem) => {
            // let calculateScoredTile = 0;

            if (!visitedNode.includes(elem.toString()) && type === 1) {
                visitedNode.push(elem.toString());
                scoredArea.push(elem);
            } else if (!visitedNode.includes(elem.toString()) && type === 2) {
                visitedNode.push(elem.toString());
            }

            // if (type === 2) {
            //     scoredArea.push(calculateScoredTile);
            // }
        });

        // console.log(visitedNode.length);

        if (type === 2) {
            while (visitedNode2.length < visitedNode.length) {
                for (let i = 0; i < linkedTile.length; i++) {
                    if (
                        tempNewScoredArea.length === 0 &&
                        !visitedNode2.includes(linkedTile[i].toString())
                    ) {
                        visitedNode2.push(linkedTile[i].toString());
                        tempNewScoredArea.push(linkedTile[i]);
                    }
                }

                for (let j = 0; j < tempNewScoredArea.length; j++) {
                    for (let k = 0; k < linkedTile.length; k++) {
                        // console.log(tempNewScoredArea[j]);
                        if (
                            !visitedNode2.includes(linkedTile[k].toString()) &&
                            ([
                                tempNewScoredArea[j][0] + 1,
                                tempNewScoredArea[j][1],
                            ].toString() === [linkedTile[k]].toString() ||
                                [
                                    tempNewScoredArea[j][0],
                                    tempNewScoredArea[j][1] + 1,
                                ].toString() === [linkedTile[k]].toString() ||
                                [
                                    tempNewScoredArea[j][0],
                                    tempNewScoredArea[j][1] - 1,
                                ].toString() === [linkedTile[k]].toString() ||
                                [
                                    tempNewScoredArea[j][0] - 1,
                                    tempNewScoredArea[j][1],
                                ].toString() === [linkedTile[k]].toString())
                        ) {
                            tempNewScoredArea.push(linkedTile[k]);
                            visitedNode2.push(linkedTile[k].toString());
                        }

                        // console.log(
                        //     [linkedTile[i][0], linkedTile[i][1]].toString()
                        // );
                        // console.log(
                        //     [
                        //         newScoredArea[j][0] + 1,
                        //         newScoredArea[j][1],
                        //     ].toString()
                        // );
                        // console.log(
                        //     [
                        //         newScoredArea[j][0],
                        //         newScoredArea[j][1] + 1,
                        //     ].toString()
                        // );
                    }
                }
                // console.log(tempNewScoredArea);
                newScoredArea.push(tempNewScoredArea);
                tempNewScoredArea = [];
            }
            console.log(newScoredArea);

            for (let a = 0; a < newScoredArea.length; a++) {
                scoredAreaSize.push(newScoredArea[a].length);
            }
            console.log(scoredAreaSize);
        }

        // if (type === 2) {
        // for (let i = 0; i < linkedTile.length; i++) {
        //     // console.log([linkedTile[i][0], linkedTile[i][1]].toString());
        //     // console.log(
        //     //     [linkedTile[i][0], linkedTile[i][1] + 1].toString()
        //     // );

        //     // if (!visitedNode2.includes(linkedTile[i].toString())) {
        //     //     visitedNode2.push(linkedTile[i].toString());
        //     //     // newScoredArea.push([linkedTile[i]]);
        //     // }

        //     if (newScoredArea.length === 0) {
        //         newScoredArea.push([linkedTile[i]]);
        //     }

        //     for (let j = 0; j < newScoredArea.length; j++) {
        //         for (let k = 0; k < newScoredArea[j].length; k++) {
        //             console.log(newScoredArea[j][k]);
        //             console.log(linkedTile[i]);
        //             // if (newScoredArea[j][k] !== linkedTile[i]) {
        //             //     newScoredArea.push([linkedTile[i]]);
        //             // }
        //             console.log(
        //                 [
        //                     newScoredArea[j][k][0],
        //                     newScoredArea[j][k][1] + 1,
        //                 ].toString()
        //             );
        //             console.log(
        //                 [linkedTile[i][0], linkedTile[i][1]].toString()
        //             );
        //             console.log(
        //                 [
        //                     newScoredArea[j][k][0] + 1,
        //                     newScoredArea[j][k][1],
        //                 ].toString()
        //             );
        //             if (
        //                 [linkedTile[i][0], linkedTile[i][1]].toString() ===
        //                     [
        //                         newScoredArea[j][k][0],
        //                         newScoredArea[j][k][1] + 1,
        //                     ].toString() ||
        //                 [linkedTile[i][0], linkedTile[i][1]].toString() ===
        //                     [
        //                         newScoredArea[j][k][0] + 1,
        //                         newScoredArea[j][k][1],
        //                     ].toString()
        //             ) {
        //                 console.log("hello");
        //                 newScoredArea[j].push(linkedTile[i]);
        //                 // if (
        //                 //     !visitedNode2.includes(linkedTile[i].toString())
        //                 // ) {
        //                 //     console.log("hello2");
        //                 //     // visitedNode2.push(linkedTile[i].toString());

        //                 //     // console.log(visitedNode2);
        //                 // }
        //             }
        //         }
        //     }
        //     }

        // }
    };

    const calculateScoredAreaSize = (tempMatrix, tile, scoredTile) => {
        let linkedTile = [];
        let scoredArea = [];
        // let calculateScoredTileArea = 4;

        CheckLinkedTile(tempMatrix, tile, scoredTile, linkedTile);
        CheckScoredArea(linkedTile, scoredArea, 2);

        // for (let i = 0; i < scoredArea.length; i++) {
        //     if (scoredArea[i + 1] !== 4 && i !== scoredArea.length - 1) {
        //         calculateScoredTileArea =
        //             calculateScoredTileArea + scoredArea[i + 1];
        //     } else if (scoredArea[i + 1] === 4 && i !== scoredArea.length - 1) {
        //         scoredAreaSize.push(calculateScoredTileArea);
        //         calculateScoredTileArea = 4;
        //     } else if (i === scoredArea.length - 1) {
        //         scoredAreaSize.push(calculateScoredTileArea);
        //     }
        // }
    };

    const TransformTile = (matrix, tile, scoredTile) => {
        let linkedTile = [];
        let scoredArea = [];

        CheckLinkedTile(matrix, tile, scoredTile, linkedTile);
        CheckScoredArea(linkedTile, scoredArea, 1);

        for (let k = 0; k < scoredArea.length; k++) {
            matrix[scoredArea[k][0]][scoredArea[k][1]] = scoredTile;
        }
    };

    TransformTile(matrixB, tile1, scoredTile1);
    TransformTile(matrixB, tile2, scoredTile2);

    const ResetGame = () => {
        setMatrixB(gridMap);
    };

    const DropTile = () => {
        const tempMiniGridMap = CheckMiniGridMap(matrixA);
        let tempMatrix = matrixB;
        let reduceY = 0;

        if (tempMiniGridMap[0].length === 0) {
            reduceY = 1;
        }

        tempMiniGridMap.forEach((elem) => {
            elem.forEach((item) => {
                const data = item[0];
                const x = item[1][0];
                const y = item[1][1] - reduceY;

                tempMatrix[y][x] === 0
                    ? (tempMatrix[y][x] = data)
                    : setGameOver(true);
            });
        });

        gameOver === true && console.log("Game Over");

        setMatrixB([...tempMatrix]);
        ArrangeTile(matrixB);
    };

    const PullLever = () => {
        const tempMatrix = matrixB;

        calculateScoredAreaSize(tempMatrix, tile1, scoredTile1);
        calculateScoredAreaSize(tempMatrix, tile2, scoredTile2);

        tempMatrix.forEach((elem, i) => {
            elem.forEach((data, j) => {
                if (data === scoredTile1 || data === scoredTile2) {
                    tempMatrix[i][j] = emptyTile;
                }
            });
        });

        ArrangeTile(tempMatrix, emptyTile);
        TransformTile(tempMatrix, tile1, scoredTile1);
        TransformTile(tempMatrix, tile2, scoredTile2);

        let tempScore = score;
        scoredAreaSize.forEach((element) => {
            tempScore += element ** 2;
        });
        setScore(tempScore);
        setScoredAreaSize([]);
    };

    return (
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

                    <div className="mb-3">
                        <button onClick={PullLever}>Lever</button>
                    </div>

                    <div>
                        <button onClick={ResetGame}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
