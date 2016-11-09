"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template8_4/directive",
    "components/templates/micro-activity-template/template8_4/service",
], function () {

    return angular.module("Template8_4", [
        "ionic",
        "Template8_4.directives",
        "Template8_4.Service",
        //"UploadImg"
    ]);
});
