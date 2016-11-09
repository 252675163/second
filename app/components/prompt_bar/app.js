"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日
 * description:
 */

define([
    "ionic",
    "components/prompt_bar/directive",
    "components/prompt_bar/service",

], function () {
    return angular.module("PromptBar", [
        "ionic",
        "PromptBar.directive",
        "PromptBar.Service",
    ]);
});
