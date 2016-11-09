"use strict";
/**
 * author :yinglechao
 * time: 2015年10月23日
 * description:种草
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template18_1/directive",
    "components/templates/micro-activity-template/template18_1/service",
    "components/templates/micro-activity-template/template18_1/directive_step1/directive_step1",
    "components/templates/micro-activity-template/template18_1/directive_step2/directive_step2"

], function () {

    return angular.module("Template18_1", [
        "ionic",
        "Template18_1.directives",
        "Template18_1.Service",
        "Template18_1Step1.directives",
        "Template18_1Step2.directives",
        //"UploadImg"
    ]);
});
