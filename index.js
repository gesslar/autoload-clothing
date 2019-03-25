var app = angular.module('app', ['ngSanitize']);
app.controller('c', ($scope, $sce) => {
    $scope.item = defaultData;
    $scope.genders = genders;
    $scope.categories = categories;
    $scope.colours = colours;
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
            colour = findCssColour(colour)[0].cssColour;
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