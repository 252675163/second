"use strict";
/**ˮ����

 */

define([
    "ionic",
    "components/templates/micro-activity-template/template23_1/directive",
    "components/templates/micro-activity-template/template23_1/service",
    "components/templates/micro-activity-template/template23_1/directives_steps/directive_step1",
    "components/templates/micro-activity-template/template23_1/directives_steps/directive_step2",
    "components/templates/micro-activity-template/template23_2/directive",
    "components/templates/micro-activity-template/template23_2/service",
    "components/templates/micro-activity-template/template23_3/directive",
    "components/templates/micro-activity-template/template23_3/service",
    "components/templates/micro-activity-template/template23_4/directive",
    "components/templates/micro-activity-template/template23_4/service",
    "components/templates/micro-activity-template/template23_5/directive",
    "components/templates/micro-activity-template/template23_5/service",

], function() {

    return angular.module("Template23", [
        "ionic",
        "Template23_1.directives",
        "Template23_1.Service",
        "Template23_1Step1.directives",
        "Template23_1Step2.directives",
        "Template23_2.directives",
        "Template23_2.Service",
        "Template23_3.directives",
        "Template23_3.Service",
        "Template23_4.directives",
        "Template23_4.Service",
        "Template23_5.directives",
        "Template23_5.Service"
    ]);
});