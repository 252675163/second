"use strict";
/**
 * author :huijuan
 * time: 2016年1月12日
 * description:体验课模板
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template17_1/directive",
    "components/templates/micro-activity-template/template17_1/service",
], function () {

    return angular.module("Template17_1", [
        "ionic",
        "Template17_1.directives",
        "Template17_1.Service",
        //"UploadImg"
    ]);
});
