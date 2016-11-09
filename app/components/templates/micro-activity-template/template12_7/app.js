"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:备考小贴士
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template12_7/directive",
    "components/templates/micro-activity-template/template12_7/service",
], function () {

    return angular.module("Template12_7", [
        "ionic",
        "Template12_7.directives",
        "Template12_7.Service",
        //"UploadImg"
    ]);
});
