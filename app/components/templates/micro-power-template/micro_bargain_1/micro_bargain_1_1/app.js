"use strict";
/**
 * author
 * time:
 * update:
 * description:
 */

define([
    "ionic",
    "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/directive",
    "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/service",
    "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/filters",
    "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/directives_steps/directive_step1",
    "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/directives_steps/directive_step2"

], function() {

    return angular.module("MicroBargain1_1", [
        "ionic",
        "MicroBargain1_1.directives",
        "MicroBargain1_1.Service",
        "MicroBargain1_1.Filter",
        "MicroBargain1_1Step1.directives",
        "MicroBargain1_1Step2.directives"
    ]);
});