"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template8_6/directive",
    "components/templates/micro-activity-template/template8_6/service",
], function () {

    return angular.module("Template8_6", [
        "ionic",
        "Template8_6.directives",
        "Template8_6.Service",
        //"UploadImg"
    ]);
});
