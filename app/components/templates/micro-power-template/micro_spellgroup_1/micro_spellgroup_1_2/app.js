"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description:砍价策略制定输入
 */

define([
    "ionic",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_2/directive",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_2/service"
], function() {

    return angular.module("MicroSpellgroup1_2", [
        "ionic",
        "MicroSpellgroup1_2.directives",
        "MicroSpellgroup1_2.Service",
        //"UploadImg"
    ]);
});