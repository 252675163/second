"use strict";
/**
 * author
 * time:
 * update:
 * description:
 */

define([
    "ionic",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_1/directive",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_1/service",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_1/filters",
    "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_1/directives_steps/directive_step2"

], function() {

    return angular.module("MicroSpellgroup1_1", [
        "ionic",
        "MicroSpellgroup1_1.directives",
        "MicroSpellgroup1_1.Service",
        "MicroSpellgroup1_1.Filter",
        "MicroSpellgroup1_1Step2.directives"
    ]);
});