const defaultData = {
    character: {
        name: "",
        gender: "",
    },
    category: "",
    identifiers: [],
    short: {
        colour: "white",
        text: ""
    },
    long: {
        text: ""
    },
    messages: {
        equip: {
            colour: "white",
            self: {
                text: ""
            },
            room: {
                text: ""
            }
        },
        unequip: {
            colour: "white",
            self: {
                text: ""
            },
            room: {
                text: ""
            }
        },
        spam: {
            colour: "white",
            self: {
                text: "",
            },
            target: {
                text: "",
            },
            room: {
                text: "",
            }
        }
    }
};

const colours = {
    red: "maroon",
    orange: "olive",
    green: "green",
    blue: "navy",
    cyan: "teal",
    magenta: "purple",
    white: "silver",
    boldRed: "red",
    yellow: "yellow",
    boldGreen: "lime",
    boldBlue: "blue",
    boldCyan: "aqua",
    boldMagenta: "fuschia",
    boldBlack: "gray",
    boldWhite: "white"
}

const wrapify = (text, maxLineLength = 80, indent = 3) => {
    const parts = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n\n");

    let parseParagraphs = parts
        .reduce((result, part) => {
            const wrapped = wrapParagraph(part, maxLineLength, indent);
            return result + `\n${"".padStart(indent)}${wrapped}\n`;
        }, "");

    while(parseParagraphs.startsWith("\n")) {
        parseParagraphs = parseParagraphs.substring(1);
    }

    while(parseParagraphs.endsWith("\n\n")) {
        parseParagraphs = parseParagraphs.substring(0, parseParagraphs.length - 1);
    }

    return parseParagraphs;
}; 
// wrapify modified from stolen answer at 
//https://codereview.stackexchange.com/questions/171832/text-wrapping-function-in-javascript
const wrapParagraph = (text, maxLineLength, indent) => {
    const firstLineLength = --maxLineLength - indent;
    const words = text
        .replace(/\r\n/g, "\n")
        .replace(/\n/g, "\n")
        .split("\n")
        .map(line => line.trim())
        .join("\n")
        .replace(/\n+/g, " ")
        .replace(/\t/g, " ")
        .split(" ");

    let lineLength = 0;
    let firstLineDone = false;
    return words.reduce((result, word) => {
        if(!firstLineDone) firstLineDone = true;
        if (lineLength + word.length >= (firstLineDone ? firstLineLength : maxLineLength)) {
            lineLength = word.length;
            return result + `\n${word}`; // don't add spaces upfront
        } else {
            lineLength += word.length + (result ? 1 : 0);
            return result ? result + ` ${word}` : `${word}`; // add space only when needed
        }
    }, "");
};

var app = angular.module('app', ['ngSanitize']);
app.controller('c', ($scope, $sce) => {
    $scope.item = defaultData;
    $scope.temp = {
        identifiers: "",
        long: ""
    }
    $scope.basicInformation = () => {
        const maxLineLength = 80;
        $scope.item.identifiers = $scope.temp.identifiers.split(",");
        $scope.item.long.text = wrapify($scope.temp.long);
        return JSON.stringify($scope.item, null, 80);
    };
    $scope.preview = () => {
        let result = ""
        const longDescription = $scope.item.long.text;
        const shortDescription = $scope.item.short.text;
        let colour = $scope.item.short.colour;
        if(colour != null && colour != undefined) {
            colour = colours[colour];
            result += `Short description: <span style="color: ${colour};">${shortDescription}</span>\n`;
        } else {
            result += `Short description: ${shortDescription}\n`;
        }
        
        result += `Long description:\n ${longDescription}\n`;
        //result = result.replace(/\n/g, "<br />")
        //alert(result);
        return $sce.trustAsHtml(result);
    };
});