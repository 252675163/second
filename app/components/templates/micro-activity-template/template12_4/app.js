"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:备考小贴士
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template12_4/directive",
    "components/templates/micro-activity-template/template12_4/service",
], function () {

    return angular.module("Template12_4", [
        "ionic",
        "Template12_4.directives",
        "Template12_4.Service",
        //"UploadImg"
    ]);
});
