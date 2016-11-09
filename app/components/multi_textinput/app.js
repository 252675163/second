"use strict";
/**
 * author :xj
 * time: 2016年5月10日 16:48:04
 * description:带回调的输入框
 */

define([
    "ionic",
    "components/multi_textinput/directive",
    "components/multi_textinput/service"

], function () {

    return angular.module("MultiTextInput", [
        "ionic",
        "MultiTextInput.directive",
        "MultiTextInput.service"
    ]);
});
