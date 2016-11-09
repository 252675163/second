"use strict";
/**

 */

define([
    "ionic",
    "components/templates/micro-activity-template/template24_1/directive",
    "components/templates/micro-activity-template/template24_1/service",
    "components/templates/micro-activity-template/template24_1/directives_steps/directive_step1",
    "components/templates/micro-activity-template/template24_1/directives_steps/directive_step2"

], function () {

    return angular.module("Template24_1", [
        "ionic",
        "Template24_1.directives",
        "Template24_1.Service",
        "Template24_1Step1.directives",
        "Template24_1Step2.directives"
    ]);
});
