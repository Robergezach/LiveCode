class RomanNumerals {
    constructor() {
        this.name = "Convert Number to Roman Numerals";
        this.duration = 1200;
        this.defaultCode = 'const input = 14; \n// Expected output: "XIV"';
    }

    body() {
        return (
            <div>
                Given an input of type{" "}
                <span style={{ color: "green" }}>Integer</span>
                <br />
                Return that number converted into the representing roman
                numerals
                <br />
                <table>
                    <tr>
                        <th>Roman Numeral</th>
                        <th>Value</th>
                    </tr>
                    <tr>
                        <td>I</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>V</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>X</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>L</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>C</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>D</td>
                        <td>500</td>
                    </tr>
                    <tr>
                        <td>M</td>
                        <td>1000</td>
                    </tr>
                </table>
                <br />
                <b>Special Rules:</b>
                <br />
                A letter placed after another of greater value adds (thus XVI or
                xvi is 16), whereas a letter placed before another of greater
                value subtracts (thus XC or xc is 90).
                <br />
                <br />
                (example)
                <br />
                input: <b>7</b>
                <br />
                output: <b>VII</b>
                <br />
            </div>
        );
    }
}

export default new RomanNumerals();
