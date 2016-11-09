"use strict";
/**
 * author :wss
 * time: 2016年8月12日
 * description:依赖合并
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template14_1/directive",
    "components/templates/micro-activity-template/template14_1/service",
    "components/templates/micro-activity-template/template14_1/directives_steps/directive_step1",
    "components/templates/micro-activity-template/template14_1/directives_steps/directive_step2",
    "components/templates/micro-activity-template/template14_2/directive",
    "components/templates/micro-activity-template/template14_2/service",
    "components/templates/micro-activity-template/template14_3/directive",
    "components/templates/micro-activity-template/template14_3/service",
    "components/templates/micro-activity-template/template14_4/directive",
    "components/templates/micro-activity-template/template14_4/service",
    "components/templates/micro-activity-template/template14_5/directive",
    "components/templates/micro-activity-template/template14_5/service",
], function() {

    return angular.module("Template11", [
        "ionic",
        "Template14_1.directives",
        "Template14_1.Service",
        "Template14_1Step1.directives",
        "Template14_1Step2.directives",
        "Template14_2.directives",
        "Template14_2.Service",
        "Template14_3.directives",
        "Template14_3.Service",
        "Template14_4.directives",
        "Template14_4.Service",
        "Template14_5.directives",
        "Template14_5.Service"
    ]);
});