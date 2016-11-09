"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:第三套模板{final}第一个section
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template3_1/directive",
    "components/templates/micro-activity-template/template3_1/service",
], function () {

    return angular.module("Template3_1", [
        "ionic",
        "Template3_1.directives",
        "Template3_1.Service",
    ]);
});
