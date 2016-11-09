"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template12_9/directive",
    "components/templates/micro-activity-template/template12_9/service",
], function () {

    return angular.module("Template12_9", [
        "ionic",
        "Template12_9.directives",
        "Template12_9.Service",
        //"UploadImg"
    ]);
});
