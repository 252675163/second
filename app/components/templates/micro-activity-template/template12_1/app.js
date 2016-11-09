"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:光荣榜
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template12_1/directive",
    "components/templates/micro-activity-template/template12_1/service",
], function () {

    return angular.module("Template12_1", [
        "ionic",
        "Template12_1.directives",
        "Template12_1.Service",
        //"UploadImg"
    ]);
});
