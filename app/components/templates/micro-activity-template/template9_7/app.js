"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template9_7/directive",
    "components/templates/micro-activity-template/template9_7/service",
], function () {

    return angular.module("Template9_7", [
        "ionic",
        "Template9_7.directives",
        "Template9_7.Service",
        //"UploadImg"
    ]);
});
