"use strict";
/**
 * author :周德威
 * time: 2016年8月11日
 * description:种菜活动 合并文件
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template19_1/directive",
    "components/templates/micro-activity-template/template19_1/service",
    "components/templates/micro-activity-template/template19_1/directives_steps/directive_step1",
    "components/templates/micro-activity-template/template19_1/directives_steps/directive_step2",
    "components/templates/micro-activity-template/template19_2/directive",
    "components/templates/micro-activity-template/template19_2/service",
    "components/templates/micro-activity-template/template19_3/directive",
    "components/templates/micro-activity-template/template19_3/service",
    "components/templates/micro-activity-template/template19_4/directive",
    "components/templates/micro-activity-template/template19_4/service",
    "components/templates/micro-activity-template/template19_5/directive",
    "components/templates/micro-activity-template/template19_5/service",
    "components/templates/micro-activity-template/template19_6/app",


], function() {

    return angular.module("Template19", [
        "ionic",
        "Template19_1.directives",
        "Template19_1.Service",
        "Template19_1Step1.directives",
        "Template19_1Step2.directives",
        "Template19_2.directives",
        "Template19_2.Service",
        "Template19_3.directives",
        "Template19_3.Service",
        "Template19_4.directives",
        "Template19_4.Service",
        "Template19_5.directives",
        "Template19_5.Service",
        "Template19_6",
    ]);
});