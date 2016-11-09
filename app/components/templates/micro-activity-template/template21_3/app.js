"use strict";
/**
 * author :chenxuedong
 * time: 2016-05-17 23:25:43
 * description: templateModel就是该模板创建的结构，自定义
 */
define([
    "ionic",
    "components/templates/micro-activity-template/template21_3/directive",
    "components/templates/micro-activity-template/template21_3/service",
], function () {

    return angular.module("Template21_3", [
        "ionic",
        "Template21_3.directives",
        "Template21_3.Service",
        //"UploadImg"
    ]);
});
