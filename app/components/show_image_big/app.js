"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日
 * description:
 */

define([
    "ionic",
    "components/show_image_big/directive",
    "components/show_image_big/service",

], function () {
    return angular.module("showImageBig", [
        "ionic",
        "showImageBig.directive",
        "showImageBig.Service",
    ]);
});
