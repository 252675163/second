"use strict"
/**
 * author :
 * time: 
 * description:
 */
define(['ionic'], function () {
    return angular.module('LengthFilter', [])

    .filter('Length', [function (input, max) {

        return function (input, max) {
            if (!input) {
                return;
            }
            if (input.length <= max) {
                return input;
            }
            else {
                return input.slice(0, max);
            }

        };
    }])
})