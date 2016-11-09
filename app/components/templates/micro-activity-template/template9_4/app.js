"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template9_4/directive",
    "components/templates/micro-activity-template/template9_4/service",
], function () {

    return angular.module("Template9_4", [
        "ionic",
        "Template9_4.directives",
        "Template9_4.Service",
        //"UploadImg"
    ]);
});
