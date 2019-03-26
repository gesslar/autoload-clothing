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
        let result = "";
        const shortDescription = $scope.item.short.text || "";
        const longDescription = $scope.item.long.text || "";
        let colour = $scope.item.short.colour;
        result += `                   <span style="color: yellow;">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span>\n`;
        result += `                 <span style="color: yellow;"><</span> <span style="color: white;">Threshold Autoload Clothing Item Previewer</span> <span style="color: yellow;">></span>\n`;
        result += `                   <span style="color: yellow;">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span>\n`;
        if(colour === null || colour === undefined) colour = "white";
        result += `<span style="color: ${colour};">${shortDescription}</span>\n`;
        result += longDescription + "\n";

        result += "Equip message:\n";

        if(item.messages.equip.self.text)
            result += substituteMessage = (item.messages.equip.self.text, "self", false, item.short.text, item.character);
        // Required to send HTML/CSS to an angular element
        return $sce.trustAsHtml(result);
    };
});