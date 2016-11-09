"use strict";
/**
 * author :huijuan
 * time: 2016年1月12日
 * description:快速报名模板
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template16_1/directive",
    "components/templates/micro-activity-template/template16_1/service",
], function () {

    return angular.module("Template16_1", [
        "ionic",
        "Template16_1.directives",
        "Template16_1.Service",
        //"UploadImg"
    ]);
});
