"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:备考小贴士
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template12_6/directive",
    "components/templates/micro-activity-template/template12_6/service",
], function () {

    return angular.module("Template12_6", [
        "ionic",
        "Template12_6.directives",
        "Template12_6.Service",
        //"UploadImg"
    ]);
});
