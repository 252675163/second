"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template2_2_5/directive",
    "components/templates/micro-activity-template/template2_2_5/service",
], function () {

    return angular.module("microOldNewTemplate225", [
        "ionic",
        "microOldNewTemplate2_2_5.directives",
        "microOldNewTemplate2_2_5.service"

    ]);
});
