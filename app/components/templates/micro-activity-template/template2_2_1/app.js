"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define([
    "ionic",   
    "components/templates/micro-activity-template/template2_2_1/service",
     "components/templates/micro-activity-template/template2_2_1/directive",
], function () {

    return angular.module("microOldNewTemplate221", [
        "ionic",       
        "microOldNewTemplate2_2_1.service",
         "microOldNewTemplate2_2_1.directives"

    ]);
});
