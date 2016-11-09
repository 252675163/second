"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:备考小贴士
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template12_8/directive",
    "components/templates/micro-activity-template/template12_8/service",
], function () {

    return angular.module("Template12_8", [
        "ionic",
        "Template12_8.directives",
        "Template12_8.Service",
        //"UploadImg"
    ]);
});
