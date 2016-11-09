"use strict";
/**
 * author :wss
 * time: 2016年8月12日
 * description:合并文件
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template21_1/directive",
    "components/templates/micro-activity-template/template21_1/service",
    "components/templates/micro-activity-template/template21_1/directives_steps/directive_step1",
    "components/templates/micro-activity-template/template21_1/directives_steps/directive_step2",
    "components/templates/micro-activity-template/template21_1/directives_steps/directive_step3",
    "components/templates/micro-activity-template/template21_1/directives_steps/directive_step4",
    "components/templates/micro-activity-template/template21_2/directive",
    "components/templates/micro-activity-template/template21_2/service",
    "components/templates/micro-activity-template/template21_3/directive",
    "components/templates/micro-activity-template/template21_3/service"


], function() {

    return angular.module("Template19", [
        "ionic",
        "Template21_1.directives",
        "Template21_1.Service",
        "Template21_1Step1.directives",
        "Template21_1Step2.directives",
        "Template21_1Step3.directives",
        "Template21_1Step4.directives",
        "Template21_2.directives",
        "Template21_2.Service"
    ]);
});