"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template8_5/directive",
    "components/templates/micro-activity-template/template8_5/service",
], function () {

    return angular.module("Template8_5", [
        "ionic",
        "Template8_5.directives",
        "Template8_5.Service",
        //"UploadImg"
    ]);
});
