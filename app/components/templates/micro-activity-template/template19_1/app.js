"use strict";
/**
 * author :yinglechao (小潘修改)
 * time: 2015年10月23日  
 * update: 2015年12月10日 19:42:24
 * description:种菜活动
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template19_1/directive",
    "components/templates/micro-activity-template/template19_1/service",
    "components/templates/micro-activity-template/template19_1/directives_steps/directive_step1",
    "components/templates/micro-activity-template/template19_1/directives_steps/directive_step2"

], function () {

    return angular.module("Template19_1", [
        "ionic",
        "Template19_1.directives",
        "Template19_1.Service",
        "Template19_1Step1.directives",
        "Template19_1Step2.directives"
    ]);
});
