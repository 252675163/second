"use strict";
/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价联系方式
 */

define([
    "ionic",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_4/directive",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_4/service"
], function() {

    return angular.module("MicroSpellgroup1_4", [
        "ionic",
        "MicroSpellgroup1_4.directives",
        "MicroSpellgroup1_4.Service",
        //"UploadImg"
    ]);
});