"use strict";
/**
 * author :
 * time:
 * update:
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template20_1/directive",
    "components/templates/micro-activity-template/template20_1/service",
    "components/templates/micro-activity-template/template20_1/directives_steps/directive_step1",
    "components/templates/micro-activity-template/template20_1/directives_steps/directive_step2",
    "components/templates/micro-activity-template/template20_1/directives_steps/directive_step3",

], function () {

    return angular.module("Template20_1", [
        "ionic",
        "Template20_1.directives",
        "Template20_1.Service",
        "Template20_1Step1.directives",
        "Template20_1Step2.directives",
        "Template20_1Step3.directives"
    ]);
});
