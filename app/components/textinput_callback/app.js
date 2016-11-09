"use strict";
/**
 * author :xj
 * time: 2016年5月10日 16:48:04
 * description:带回调的输入框
 */

define([
    "ionic",
    "components/textinput_callback/directive",
    "components/textinput_callback/service"

], function () {

    return angular.module("TextInputCallback", [
        "ionic",
        "TextInputCallback.directive",
        "TextInputCallback.service"
    ]);
});
