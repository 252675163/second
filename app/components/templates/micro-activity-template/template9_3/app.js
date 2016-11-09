"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template9_3/directive",
    "components/templates/micro-activity-template/template9_3/service",
], function () {

    return angular.module("Template9_3", [
        "ionic",
        "Template9_3.directives",
        "Template9_3.Service",
        //"UploadImg"
    ]);
});
