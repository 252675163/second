"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/template3/directive"
], function () {

    return angular.module("MicroTemplate3", [
        "ionic",
        "MicroTemplate3.directive"
    ]);
});
