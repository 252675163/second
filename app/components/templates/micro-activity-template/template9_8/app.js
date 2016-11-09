"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template9_8/directive",
    "components/templates/micro-activity-template/template9_8/service",
], function () {

    return angular.module("Template9_8", [
        "ionic",
        "Template9_8.directives",
        "Template9_8.Service",
        //"UploadImg"
    ]);
});
