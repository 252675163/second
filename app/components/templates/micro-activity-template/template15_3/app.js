"use strict";
/**
 * author :huijuan
 * time: 2016年1月12日
 * description:招生模板
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template15_3/directive",
    "components/templates/micro-activity-template/template15_3/service",
], function () {

    return angular.module("Template15_3", [
        "ionic",
        "Template15_3.directives",
        "Template15_3.Service",
        //"UploadImg"
    ]);
});
