"use strict";
/**
 * author :lvli
 * time: 2016年7月4日11:45:15
 * description:
 */

define([
    "ionic",
    "components/textinput_new/directive"

], function () {

    return angular.module("NewTextInput", [
        "ionic",
        "NewTextInput.directive"

    ]);
});
