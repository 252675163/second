"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:圣诞
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template9_2/directive",
    "components/templates/micro-activity-template/template9_2/service",
], function () {

    return angular.module("Template9_2", [
        "ionic",
        "Template9_2.directives",
        "Template9_2.Service",
        //"UploadImg"
    ]);
});
