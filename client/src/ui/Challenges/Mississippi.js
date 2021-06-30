class Mississippi {
    constructor() {
        this.name = "Unique Number Count";
        this.duration = 600;
        this.defaultCode =
            'const input = "mississippi"; \n //output: [m: 1] [i: 4] [s: 4] [p: 2]';
    }

    body() {
        return (
            <div>
                Given an input of type{" "}
                <span style={{ color: "green" }}>String</span> <br />
                Output each number and the amount of times it occurs in the
                string. <br />
                (example)
                <br />
                input: <b>mississippi</b>
                <br />
                output: <b>[m: 1] [i: 4] [s: 4] [p: 2]</b>
            </div>
        );
    }
}

export default new Mississippi();
