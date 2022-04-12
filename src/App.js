import "./App.css";
import GridRow from "./Components/GridRow";

const App = () => {
    // const grid = { x: 4, y: 4 };

    // const renderRow = () => {
    //     for (let a = 0; a < grid?.x; a++) {
    //         <GridRow key={a} y={grid?.y} />;
    //     }
    // };

    const gridData = [
        {
            id: 0,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 0 },
            ],
        },
        {
            id: 1,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 0 },
            ],
        },
        {
            id: 2,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 0 },
            ],
        },
        {
            id: 3,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 0 },
            ],
        },
    ];

    // const gridData = [
    //     { id: 0, Row: 0 },
    //     { id: 1, Row: 1 },
    //     { id: 2, Row: 2 },
    //     { id: 3, Row: 3 },
    // ];

    return (
        <>
            <div className="body">
                <div className="justify-content-center">
                    <div className="grid">
                        {gridData.map((e) => (
                            <GridRow key={e.id} data={e.Row} />
                        ))}
                    </div>

                    {/* <div className="grid">
                        {gridData.map((row) => (
                            <GridRow key={row.id} data={row.Row} />
                        ))}
                    </div> */}

                    <div className="grid">
                        {gridData.map((e) => (
                            <GridRow key={e.id} data={e.Row} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
