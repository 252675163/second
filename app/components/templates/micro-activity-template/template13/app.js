"use strict";
/**
 * author :wss
 * time: 2016年8月12日
 * description:依赖合并
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template13_1/directive",
    "components/templates/micro-activity-template/template13_1/service",
    "components/templates/micro-activity-template/template13_1/directives_steps/directive_step1",
    "components/templates/micro-activity-template/template13_1/directives_steps/directive_step2",
    "components/templates/micro-activity-template/template13_2/directive",
    "components/templates/micro-activity-template/template13_2/service",
    "components/templates/micro-activity-template/template13_3/directive",
    "components/templates/micro-activity-template/template13_3/service",
    "components/templates/micro-activity-template/template13_4/directive",
    "components/templates/micro-activity-template/template13_4/service",
    "components/templates/micro-activity-template/template13_5/directive",
    "components/templates/micro-activity-template/template13_5/service",
], function() {

    return angular.module("Template11", [
        "ionic",
        "Template13_1.directives",
        "Template13_1.Service",
        "Template13_1Step1.directives",
        "Template13_1Step2.directives",
        "Template13_2.directives",
        "Template13_2.Service",
        "Template13_3.directives",
        "Template13_3.Service",
        "Template13_4.directives",
        "Template13_4.Service",
        "Template13_5.directives",
        "Template13_5.Service"
        //"UploadImg"
    ]);
});