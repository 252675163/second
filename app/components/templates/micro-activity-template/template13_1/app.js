"use strict";
/**
 * author :yinglechao
 * time: 2015年10月23日
 * description:种草
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template13_1/directive",
    "components/templates/micro-activity-template/template13_1/service",
    "components/templates/micro-activity-template/template13_1/directives_steps/directive_step1",
    "components/templates/micro-activity-template/template13_1/directives_steps/directive_step2"

], function () {

    return angular.module("Template13_1", [
        "ionic",
        "Template13_1.directives",
        "Template13_1.Service",
        "Template13_1Step1.directives",
        "Template13_1Step2.directives",
        //"UploadImg"
    ]);
});
