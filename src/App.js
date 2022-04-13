import "./App.scss";
import GridRow from "./Components/GridRow";

const App = () => {
    const miniGridMap = [
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
    ];

    const gridMap = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 2, 1, 0, 0],
    ];

    const checkMiniGridMap = (matrix) => {
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

    console.log(checkMiniGridMap(miniGridMap));

    const checkGridMap = (value, i) => {
        let temp_data = [];

        gridMap.map((e) => {
            return e.forEach((data, x) => {
                if (x === value[i]) {
                    temp_data.push(data);
                }
            });
        });

        return [value[i], temp_data];
    };

    const tempMiniGridMap = checkMiniGridMap(miniGridMap);

    let temp_x = [];

    for (let i = 0; i < tempMiniGridMap.length; i++) {
        for (let j = 0; j < tempMiniGridMap[i].length; j++) {
            if (!temp_x.includes(tempMiniGridMap[i][j][1][0])) {
                temp_x.push(tempMiniGridMap[i][j][1][0]);
            }
        }
    }

    let temp_y = [];
    for (let i = 0; i < temp_x.length; i++) {
        temp_y.push(checkGridMap(temp_x, i));
    }

    console.log(temp_y);

    return (
        <>
            <div className="body">
                <div className="justify-content-center">
                    <div className="grid">
                        <div className="mb-1">
                            {miniGridMap.map((e, i) => (
                                <GridRow
                                    key={i}
                                    data={e}
                                    display={false}
                                    border={false}
                                />
                            ))}
                        </div>
                        {gridMap.map((e, i) => (
                            <GridRow key={i} data={e} display={false} />
                        ))}
                    </div>

                    <div className="grid">
                        <div className="mb-1">
                            {miniGridMap.map((e, i) => (
                                <GridRow
                                    key={i}
                                    data={e}
                                    display={true}
                                    border={true}
                                />
                            ))}
                        </div>
                        {gridMap.map((e, i) => (
                            <GridRow key={i} data={e} display={true} />
                        ))}
                    </div>

                    <div>
                        <div style={{ marginTop: "3rem" }}>Score:</div>
                        <div style={{ marginTop: "3rem" }}>Next:</div>

                        <div style={{ marginTop: "3rem" }}>
                            <button>Drop it</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
