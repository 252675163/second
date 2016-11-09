"use strict";
/**
 * author :yinglechao (小潘修改)
 * time: 2015年10月23日
 * update: 2015年12月10日 19:42:24
 * description:圣诞活动
 */

define([
    "ionic",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_6/directive",
        "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_6/micro_spellgroup_popup",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_6/service"
], function() {

    return angular.module("MicroSpellgroup1_6", [
        "ionic",
        "MicroSpellgroup1_6.directives",
        "MicroSpellgroup1_6.Service",
        "MicroSpellgroup1_6_1.directives"
    ]);
});