"use strict";
/**
 * author :
 * time: 
 * description:
 */

define([
    "ionic",

    //微砍价 todo
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_1/app",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_2/app",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_3/app",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_4/app",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_5/app",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_6/app",





], function () {

    return angular.module("MicroPowerTemplate", [
        "ionic",

        "MicroSpellgroup1_1",
        "MicroSpellgroup1_2",
        "MicroSpellgroup1_3",
        "MicroSpellgroup1_4",
        "MicroSpellgroup1_6",


    ]);
});