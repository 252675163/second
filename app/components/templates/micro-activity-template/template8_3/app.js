"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template8_3/directive",
    "components/templates/micro-activity-template/template8_3/service",
], function () {

    return angular.module("Template8_3", [
        "ionic",
        "Template8_3.directives",
        "Template8_3.Service",
        //"UploadImg"
    ]);
});
