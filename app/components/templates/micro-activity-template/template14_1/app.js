"use strict";
/**
 * author :yinglechao (小潘修改)
 * time: 2015年10月23日  
 * update: 2015年12月10日 19:42:24
 * description:圣诞活动
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template14_1/directive",
    "components/templates/micro-activity-template/template14_1/service",
    "components/templates/micro-activity-template/template14_1/directives_steps/directive_step1",
    "components/templates/micro-activity-template/template14_1/directives_steps/directive_step2"

], function () {

    return angular.module("Template14_1", [
        "ionic",
        "Template14_1.directives",
        "Template14_1.Service",
        "Template14_1Step1.directives",
        "Template14_1Step2.directives"
    ]);
});
