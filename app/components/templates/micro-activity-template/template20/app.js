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
    "components/templates/micro-activity-template/template20_2/directive",
    "components/templates/micro-activity-template/template20_2/service",
    "components/templates/micro-activity-template/template20_3/directive",
    "components/templates/micro-activity-template/template20_3/service",
    "components/templates/micro-activity-template/template20_4/directive",
    "components/templates/micro-activity-template/template20_4/service",
], function() {

    return angular.module("Template20", [
        "ionic",
        "Template20_1.directives",
        "Template20_1.Service",
        "Template20_1Step1.directives",
        "Template20_1Step2.directives",
        "Template20_1Step3.directives",
        "Template20_2.directives",
        "Template20_2.Service",
        "Template20_3.directives",
        "Template20_3.Service",
        "Template20_4.directives",
        "Template20_4.Service",
    ]);
});