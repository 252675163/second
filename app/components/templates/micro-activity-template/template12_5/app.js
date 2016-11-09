"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:备考小贴士
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template12_5/directive",
    "components/templates/micro-activity-template/template12_5/service",
], function () {

    return angular.module("Template12_5", [
        "ionic",
        "Template12_5.directives",
        "Template12_5.Service",
        //"UploadImg"
    ]);
});
