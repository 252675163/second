"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日                 
 * description:
 */

define([
    "ionic",
   "components/audio/directive"

], function () {

    return angular.module("MyAudio", [
        "ionic",
        "MyAudio.directive"
    ]);
});
