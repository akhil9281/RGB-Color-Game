const { element } = require("angular");

/* let colors=  [];
let mainColor;
let mode = "hard";
let numOfSquares = 6;
let squares = document.getElementsByClassName("option");

let easyButton ;
let hardButton ;
let resetButton ;
let resultSpace;
let theColor  */
var colorApp = angular.module("colorApp", ['ngRoute']);

/* 
colorApp.config([ '$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
---
    let colors=  [];
    let mainColor;
    let mode = "hard";
    let numOfSquares = 6;
    let squares = document.getElementsByClassName("option");

    let easyButton ;
    let hardButton ;
    let resetButton ;
    let resultSpace;
    let theColor;
---
    $locationProvider.hashPrefix('');

    
    //document.getElementById("result-space").innerText = "AK";

    $routeProvider
    .when('/ak', {
        templateUrl: 'bar.html',
        controller: 'colorController'
    })
    .otherwise({
        redirectTo: '/km'
    })

}])
*/


colorApp.controller('colorController', ['$scope', '$document', ($scope, $document) => {
    $scope.theColor = mainColor;
}])

colorApp.controller('barController', ['$scope', '$document', ($scope, $document) => {

    $scope.result = "";

    $scope.reset = function(event) {
        event.target.text = "kk";
       // angular.element($document.querySelector('#reset-button')).text("New Color");
        angular.element(document.querySelector('#result-space')).text("akh");
        
        angular.element($document.querySelector('#the-color')).text("akhil");
        ModeService.getMode();
        colors = ColorService.generateColors();
        MainColorService.setMainColor();
        
    }

    function easy() {
        mode = "easy";
        reset();
    }

    function hard() {
        mode = "hard";
        for (let i = 3; i < 6; i++) {
            angular.element(squares[i]).css({
                display: 'block'
            });
        }
        reset();
    }
    
}])

colorApp.controller('optionsController', ['$scope', ($scope) => {
    $scope.choose = function(event) {
        var clickedElement = event.target;
        clickedElement.style.backgroundColor = 'red';
    };
    
}]);

colorApp.service('ModeService', () => {
    this.getMode = function() {
        if (mode == "easy")
            numOfSquares = 3;
    
        else 
            numOfSquares = 6;
    }
})

colorApp.service('ColorSerivce', () => {
    this.generateColors = function() {
        let arr = [];

        for (let i = 0; i < numOfSquares; i++) {

            arr.push(function() {
                let colors = [];
                for (let i = 0; i < 3; i++) {
                    colors.push(Math.floor(Math.random() * 256));
                }

                return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
            });
        }

        return arr;
    }
})

colorApp.service('MainColorService', () => {
    this.setMainColor = function () {
        let num ;
        if (mode === "easy")
            num = 3;
        else    
            num = 6;
        let i = Math.floor(Math.random() * num);
        console.log(i);
        mainColor = colors[i];
        console.log(mainColor);
        theColor.textContent += mainColor;
    }
})
