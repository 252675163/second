"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template10_6/directive",
    "components/templates/micro-activity-template/template10_6/service",
], function () {

    return angular.module("Template10_6", [
        "ionic",
        "Template10_6.directives",
        "Template10_6.Service",
        //"UploadImg"
    ]);
});
