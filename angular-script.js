let colorApp = angular.module('colorApp', []);

 colorApp.value('colorValues', {
    numOfSquares : 6,
    mainColor: "main",
    colors: []

}); 

colorApp.controller("colorController", function ($scope, colorValues) {
    
    $scope.theColor = colorValues.mainColor;
});

 colorApp.controller("barControlller", function ($scope, colorValues, colorService) {

    $scope.reset = function(event) {
        colorService.resetService();
        
    }

    $scope.easy = function(event) {

        colorValues.numOfSquares = 3;

        event.target.classList.add('selected');
        angular.element(document.querySelector('#hard-mode'))[0].classList.remove('selected');

        colorService.resetService();
    }


    $scope.hard = function(event) {
        colorValues.numOfSquares = 6;

        event.target.classList.add('selected');
        angular.element(document.querySelector('#easy-mode'))[0].classList.remove('selected');

        var squares = angular.element(document.querySelectorAll('.option'));
        for (let i = 3; i < colorValues.numOfSquares; i++) {
            squares.css.display = 'block';
        }

        colorService.resetService();
    }


});

colorApp.controller("optionsController", function ($scope, colorValues, colorService) {

    $scope.choose = function(event) {
        var option = event.target;
        if (option.style.backgroundColor === colorValues.mainColor) {
            angular.element(document.querySelector('#reset-button')).text("Play Again");
            angular.element(document.querySelector('#result-space')).text("Congratulations.. You Won!!");
            colorService.setAllMainColor();
        }
        else {
            angular.element(document.querySelector('#reset-button')).text("Reset");
            angular.element(document.querySelector('#result-space')).text("Try Again!!");
            option.style.visibility = 'hidden';
        }
        
    }
});

colorApp.service("colorService", function(colorValues) {

    return {

        resetService : function() {
            angular.element(document.querySelector('#reset-button')).text("New Color");

            angular.element(document.querySelector('#result-space')).text("");

            colorValues.colors = this.generateColors();
            this.setUpSquares();
            this.setMainColor();
            angular.element(document.querySelector('#the-color')).text(colorValues.mainColor);
        },

        generateColors : function() {
            let arr = [];
            for (let i = 0; i < colorValues.numOfSquares; i++) {
                arr.push(this.generateRandomColor());
                console.log(arr[i]);
            }

            return arr;
        },

        generateRandomColor : function() {
            let colors = [];
            for (let i = 0; i < 3; i++) {
                colors.push(Math.floor(Math.random() * 256));
            }

            return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;

        },

        setUpSquares : function() {
            var squares = angular.element(document.querySelectorAll('.option'));

            for (let i = 0; i < colorValues.numOfSquares; i++) {
                squares[i].style.backgroundColor = colorValues.colors[i];
                squares[i].style.display = "block";
                squares[i].style.visibility = "visible";
            }

            for (let i = colorValues.numOfSquares; i < 6; i++) {
                squares[i].style.display = "none";
            }
    
        },

        setMainColor : function() {
            let num = Math.floor(Math.random() * colorValues.numOfSquares);
            colorValues.mainColor = colorValues.colors[num];
        },

        setAllMainColor : function() {
            var squares = angular.element(document.querySelectorAll('.option'));

            for (let i = 0; i < colorValues.numOfSquares; i++) {
                squares[i].style.backgroundColor = colorValues.mainColor;
                squares[i].style.display = "block";
                squares[i].style.visibility = "visible";
            }
        }
    }
}); 

