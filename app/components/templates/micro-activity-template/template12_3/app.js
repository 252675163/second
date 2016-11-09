"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:备考小贴士
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template12_3/directive",
    "components/templates/micro-activity-template/template12_3/service",
], function () {

    return angular.module("Template12_3", [
        "ionic",
        "Template12_3.directives",
        "Template12_3.Service",
        //"UploadImg"
    ]);
});
