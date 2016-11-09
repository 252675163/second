"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
* description:圣诞舞会
    */

define([
    "ionic",
    "components/templates/micro-activity-template/template8_1/directive",
    "components/templates/micro-activity-template/template8_1/service",
], function () {

    return angular.module("Template8_1", [
        "ionic",
        "Template8_1.directives",
        "Template8_1.Service",
        //"UploadImg"
    ]);
});
