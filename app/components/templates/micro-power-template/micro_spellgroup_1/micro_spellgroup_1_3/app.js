"use strict";
/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价活动介绍
 */

define([
    "ionic",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_3/directive",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_3/service"
], function() {

    return angular.module("MicroSpellgroup1_3", [
        "ionic",
        "MicroSpellgroup1_3.directives",
        "MicroSpellgroup1_3.Service",
        //"UploadImg"
    ]);
});