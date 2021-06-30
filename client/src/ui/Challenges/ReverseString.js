class ReverseString {
    constructor() {
        this.name = "Reverse String";
        this.duration = 600;
        this.defaultCode = 'const input = "apple";';
    }

    body() {
        return (
            <div>
                Given an input of type{" "}
                <span style={{ color: "green" }}>String</span>
                <br />
                reverse the word.
                <br />
                (example)
                <br />
                input: <b>"apple"</b>
                output: <b>"elppa"</b>
            </div>
        );
    }
}

export default new ReverseString();
