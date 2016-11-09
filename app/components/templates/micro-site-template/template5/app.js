"use strict";
/**
 * author :chenmeng
 * time: 2015年9月10日
 * description:
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/template5/directive",
    "components/templates/new-micro-site-template/template5/service",
], function () {

    return angular.module("MicroTemplate5", [
        "ionic",
        "MicroTemplate5.directives",
        "MicroTemplate5.Service"
    ]);
});
