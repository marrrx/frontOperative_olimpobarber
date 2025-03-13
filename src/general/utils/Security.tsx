function encrypt_data(data: string) {
    data = unescape(encodeURIComponent(data));
    let newString = '',
        char, nextChar, combinedCharCode;
    for (let i = 0; i < data.length; i += 2) {
        char = data.charCodeAt(i);

        if ((i + 1) < data.length) {


            nextChar = data.charCodeAt(i + 1) - 31;


            combinedCharCode = char + "" + nextChar.toLocaleString('en', {
                minimumIntegerDigits: 2
            });

            newString += String.fromCharCode(parseInt(combinedCharCode, 10));

        } else {


            newString += data.charAt(i);
        }
    }
    return newString.split("").reduce((hex, c) => hex += c.charCodeAt(0).toString(16).padStart(4, "0"), "");
}

function decrypt_data(data: string) {

    let newString = '',
        char, codeStr, firstCharCode, lastCharCode;
    if (data !== null) {
        data = data.match(/.{1,4}/g)!.reduce((acc, char) => acc + String.fromCharCode(parseInt(char, 16)), "");
        for (let i = 0; i < data.length; i++) {
            char = data.charCodeAt(i);
            if (char > 132) {
                codeStr = char.toString(10);

                firstCharCode = parseInt(codeStr.substring(0, codeStr.length - 2), 10);

                lastCharCode = parseInt(codeStr.substring(codeStr.length - 2, codeStr.length), 10) + 31;

                newString += String.fromCharCode(firstCharCode) + String.fromCharCode(lastCharCode);
            } else {
                newString += data.charAt(i);
            }
        }
    }
    return newString;
}

export { encrypt_data, decrypt_data }