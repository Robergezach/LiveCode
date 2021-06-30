class FindID {
    constructor() {
        this.name = "Find Missing Index in Large Lists";
        this.duration = 900;
        this.defaultCode =
            'const base = ["Apple", "Orange", "Melon", "Kiwi", "Lemon", "Lime" ];\nconst check = ["red", "blue", "yellow", "green", "orange", "purple"]; \n//expected output: [ "orange" ]';
    }

    body() {
        return (
            <div>
                Given two inputs of type{" "}
                <span style={{ color: "green" }}>Array</span>
                <br />
                Return a list of all indexed elements in each array that match
                <br />
                (example)
                <br />
                input 1: <b>[ 1, 3, 6, 7]</b>
                <br />
                input 2: <b>[ 2, 4, 6, 8]</b>
                <br />
                output: <b>[ 6 ]</b>
                <br />
            </div>
        );
    }
}

export default new FindID();
