"use strict";
/**
 * author :
 * time: 2016年6月6日
 * description:
 */

define([
    "ionic",
    "components/user_terms/directive",
    "components/user_terms/service",

], function () {
    return angular.module("UserTerms", [
        "ionic",
        "UserTerms.directive",
        "UserTerms.Service",
    ]);
});
