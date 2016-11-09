"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日                 
 * description:
 */

define([
    "ionic",
    "components/next_button/directive"

], function () {

    return angular.module("NextButton", [
        "ionic",
        "NextButton.directive"
    ]);
});
