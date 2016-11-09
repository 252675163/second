"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:圣诞
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template8_2/directive",
    "components/templates/micro-activity-template/template8_2/service",
], function () {

    return angular.module("Template8_2", [
        "ionic",
        "Template8_2.directives",
        "Template8_2.Service",
        //"UploadImg"
    ]);
});
