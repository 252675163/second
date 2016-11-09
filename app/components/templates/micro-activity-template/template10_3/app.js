"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template10_3/directive",
    "components/templates/micro-activity-template/template10_3/service",
], function () {

    return angular.module("Template10_3", [
        "ionic",
        "Template10_3.directives",
        "Template10_3.Service",
        //"UploadImg"
    ]);
});
