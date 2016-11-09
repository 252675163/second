"use strict";
/**Ë®×å¹Ý

 */

define([
    "ionic",
    "components/templates/micro-activity-template/template23_1/directive",
    "components/templates/micro-activity-template/template23_1/service",
    "components/templates/micro-activity-template/template23_1/directives_steps/directive_step1",
    "components/templates/micro-activity-template/template23_1/directives_steps/directive_step2"

], function () {

    return angular.module("Template23_1", [
        "ionic",
        "Template23_1.directives",
        "Template23_1.Service",
        "Template23_1Step1.directives",
        "Template23_1Step2.directives"
    ]);
});
