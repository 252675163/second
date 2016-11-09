"use strict";
/**

 */

define([
    "ionic",
    "components/templates/micro-activity-template/template24_1/directive",
    "components/templates/micro-activity-template/template24_1/service",
    "components/templates/micro-activity-template/template24_1/directives_steps/directive_step1",
    "components/templates/micro-activity-template/template24_1/directives_steps/directive_step2",
    "components/templates/micro-activity-template/template24_2/directive",
    "components/templates/micro-activity-template/template24_2/service",
    "components/templates/micro-activity-template/template24_3/directive",
    "components/templates/micro-activity-template/template24_3/service",
    "components/templates/micro-activity-template/template24_4/directive",
    "components/templates/micro-activity-template/template24_4/service",
    "components/templates/micro-activity-template/template24_5/directive",
    "components/templates/micro-activity-template/template24_5/service",
    "components/templates/micro-activity-template/template24_6/directive",
    "components/templates/micro-activity-template/template24_6/service",
    "components/templates/micro-activity-template/template19_6/app",

], function() {

    return angular.module("Template24", [
        "ionic",
        "Template24_1.directives",
        "Template24_1.Service",
        "Template24_1Step1.directives",
        "Template24_1Step2.directives",
        "Template24_2.directives",
        "Template24_2.Service",
        "Template24_3.directives",
        "Template24_3.Service",
        "Template24_4.directives",
        "Template24_4.Service",
        "Template24_5.directives",
        "Template24_5.Service",
        "Template24_6.directives",
        "Template24_6.Service",
        "Template19_6",
    ]);
});