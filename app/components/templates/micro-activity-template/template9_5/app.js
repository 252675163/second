"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template9_5/directive",
    "components/templates/micro-activity-template/template9_5/service",
], function () {

    return angular.module("Template9_5", [
        "ionic",
        "Template9_5.directives",
        "Template9_5.Service",
        //"UploadImg"
    ]);
});
