"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日
 * description:
 */

define([
    "ionic",
    "components/mask/directive",
    "components/mask/service",

], function () {

    return angular.module("Mask", [
        "ionic",
        "Mask.directive",
        "Mask.Service",

    ]);
});
