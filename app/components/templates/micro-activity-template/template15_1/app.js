"use strict";
/**
 * author :huijuan
 * time: 2016��1��12��
 * description:��������ģ��
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template15_1/directive",
    "components/templates/micro-activity-template/template15_1/service",
], function () {

    return angular.module("Template15_1", [
        "ionic",
        "Template15_1.directives",
        "Template15_1.Service",
        //"UploadImg"
    ]);
});
