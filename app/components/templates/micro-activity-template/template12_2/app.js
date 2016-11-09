"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:备考小贴士
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template12_2/directive",
    "components/templates/micro-activity-template/template12_2/service",
], function () {

    return angular.module("Template12_2", [
        "ionic",
        "Template12_2.directives",
        "Template12_2.Service",
        //"UploadImg"
    ]);
});
