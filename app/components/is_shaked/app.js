"use strict";
/**
 * author :小潘
 * time: 2015年11月7日 16:48:04
 * description:输入框获取焦点时，弹出新的输入框
 */

define([
    "ionic",
    "components/is_shaked/directive"

], function () {

    return angular.module("IsShaked", [
        "ionic",
        "IsShaked.directive"

    ]);
});
