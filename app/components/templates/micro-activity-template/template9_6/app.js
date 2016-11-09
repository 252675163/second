"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template9_6/directive",
    "components/templates/micro-activity-template/template9_6/service",
], function () {

    return angular.module("Template9_6", [
        "ionic",
        "Template9_6.directives",
        "Template9_6.Service",
        //"UploadImg"
    ]);
});
