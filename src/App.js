import "./App.scss";
import GridRow from "./Components/GridRow";

const App = () => {
    const miniGridData = [
        {
            id: 0,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 1 },
                { id: 4, Data: 2 },
                { id: 5, Data: 0 },
                { id: 6, Data: 0 },
                { id: 7, Data: 0 },
            ],
        },
        {
            id: 1,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 2 },
                { id: 4, Data: 1 },
                { id: 5, Data: 0 },
                { id: 6, Data: 0 },
                { id: 7, Data: 0 },
            ],
        },
    ];

    const gridData = [
        {
            id: 0,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 0 },
                { id: 4, Data: 0 },
                { id: 5, Data: 0 },
                { id: 6, Data: 0 },
                { id: 7, Data: 0 },
            ],
        },
        {
            id: 1,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 0 },
                { id: 4, Data: 0 },
                { id: 5, Data: 0 },
                { id: 6, Data: 0 },
                { id: 7, Data: 0 },
            ],
        },
        {
            id: 2,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 0 },
                { id: 4, Data: 0 },
                { id: 5, Data: 0 },
                { id: 6, Data: 0 },
                { id: 7, Data: 0 },
            ],
        },
        {
            id: 3,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 0 },
                { id: 4, Data: 0 },
                { id: 5, Data: 0 },
                { id: 6, Data: 0 },
                { id: 7, Data: 0 },
            ],
        },
        {
            id: 4,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 0 },
                { id: 4, Data: 0 },
                { id: 5, Data: 0 },
                { id: 6, Data: 0 },
                { id: 7, Data: 0 },
            ],
        },
        {
            id: 5,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 0 },
                { id: 4, Data: 0 },
                { id: 5, Data: 0 },
                { id: 6, Data: 0 },
                { id: 7, Data: 0 },
            ],
        },
        {
            id: 6,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 0 },
                { id: 4, Data: 1 },
                { id: 5, Data: 2 },
                { id: 6, Data: 0 },
                { id: 7, Data: 0 },
            ],
        },
        {
            id: 7,
            Row: [
                { id: 0, Data: 0 },
                { id: 1, Data: 0 },
                { id: 2, Data: 0 },
                { id: 3, Data: 0 },
                { id: 4, Data: 1 },
                { id: 5, Data: 2 },
                { id: 6, Data: 0 },
                { id: 7, Data: 0 },
            ],
        },
    ];

    return (
        <>
            <div className="body">
                <div className="justify-content-center">
                    <div className="grid">
                        <div style={{ marginBottom: "1rem" }}>
                            {miniGridData.map((e) => (
                                <GridRow
                                    key={e.id}
                                    data={e.Row}
                                    display={false}
                                />
                            ))}
                        </div>
                        {gridData.map((e) => (
                            <GridRow key={e.id} data={e.Row} display={false} />
                        ))}
                    </div>

                    <div className="grid">
                        <div style={{ marginBottom: "1rem" }}>
                            {miniGridData.map((e) => (
                                <GridRow
                                    key={e.id}
                                    data={e.Row}
                                    display={true}
                                />
                            ))}
                        </div>
                        {gridData.map((e) => (
                            <GridRow key={e.id} data={e.Row} display={true} />
                        ))}
                    </div>

                    <button>Drop it</button>
                </div>
            </div>
        </>
    );
};

export default App;
