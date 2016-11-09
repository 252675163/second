"use strict";
/**
 * author :
 * time:
 * update:
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template21_1/directive",
    "components/templates/micro-activity-template/template21_1/service",
    "components/templates/micro-activity-template/template21_1/directives_steps/directive_step1",
    "components/templates/micro-activity-template/template21_1/directives_steps/directive_step2",
    "components/templates/micro-activity-template/template21_1/directives_steps/directive_step3",
    "components/templates/micro-activity-template/template21_1/directives_steps/directive_step4",

], function () {

    return angular.module("Template21_1", [
        "ionic",
        "Template21_1.directives",
        "Template21_1.Service",
        "Template21_1Step1.directives",
        "Template21_1Step2.directives",
        "Template21_1Step3.directives",
        "Template21_1Step4.directives",
        "Template21_3.directives",
        "Template21_3.Service",
    ]);
});
