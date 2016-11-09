"use strict"
/**
 * author :
 * time: 
 * description:
 */
define(['ionic'], function () {
    return angular.module('NumberFilter', [])

        .filter('NumberMAx', [function () {

            return function (input) {
                if (input < 10000) {
                    return input;
                }
                for (var i = 1; ; i++) {
                    if ((i + 1) * 10000 > input) {
                        return i + "w";
                    }
                }
            };
        }])

        .filter('Maxlength', [function (input, max) {
            return function (input, max) {
                if (!input) {
                    return input;
                }
                if (input.length <= max) {
                    return input;
                }
                else {
                    return input.slice(0, max) + "...";
                }
            }
        }])
});