class ReverseString {
    constructor() {
        this.name = "Reverse String";
        this.duration = 3600;
        this.defaultCode = 'const input = "apple";';
    }

    body() {
        return (
            <div>
                Given an input of "apple" reverse the string to ouput "apple"
            </div>
        );
    }
}

export default new ReverseString();
