var app = angular.module('app', ['ngSanitize']);
app.controller('c', ($scope, $sce) => {
    $scope.item = defaultData;
    $scope.genders = genders;
    $scope.categories = categories;
    $scope.colours = colours;
    $scope.options = {
        targettable: false
    }
    $scope.temp = {
        identifiers: "",
        long: ""
    }

    $scope.updateItemInformation = () => {
        const maxLineLength = 80;
        $scope.item.identifiers = $scope.temp.identifiers.split(",");
        $scope.item.long.text = wrapify($scope.temp.long);

        return JSON.stringify($scope.item, null, 80);
    };
    $scope.preview = () => {
        let result = "", temp = "";
        // const id = $scope.item.identifiers.length > 0 ? ($scope.item.itentifiers[0].length > 0 ? $scope.item.identifiers[0] : "clothing") : "clothing";


        result += `                   <span style="color: yellow;">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span>\n`;
        result += `                 <span style="color: yellow;"><</span> <span style="color: white;">Threshold Autoload Clothing Item Previewer</span> <span style="color: yellow;">></span>\n`;
        result += `                   <span style="color: yellow;">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span>\n`;

        // SHORT DESCRIPTION
        if($scope.item.short.text) {
            const shortDescription = $scope.item.short.text;
            const colour = findCssColour($scope.item.short.colour);
            result += `<div style="color: ${colour};">${shortDescription}</div>\n`;
        }
        
        // LONG DESCRIPTION
        if($scope.item.long.text) {
            const longDescription = $scope.item.long.text || "";      
            result += `<div style="color: silver">${longDescription}</div>\n`;
        }

        // MESSAGES
        if($scope.item.messages.equip.self.text) {
            const colour = findCssColour($scope.item.messages.equip.colour);
            const equipSelfMessage = iwrapify(substituteMessage($scope.item.messages.equip.self.text, "self", false, $scope.item.short.text, $scope.item.character), 80, 0);
            result += `<div>Equip message (self)</div><div style="color: ${colour}">${equipSelfMessage}</div>`;
        }
        if($scope.item.messages.equip.room.text) {
            const colour = findCssColour($scope.item.messages.equip.colour);
            const equipRoomMessage = iwrapify(substituteMessage($scope.item.messages.equip.room.text, "room", false, $scope.item.short.text, $scope.item.character), 80, 0);
            result += `<div>Equip message (room)</div><div style="color: ${colour}">${equipRoomMessage}</div>`;
        }

        // Required to send HTML/CSS to an angular element
        return $sce.trustAsHtml(result);
    };
});