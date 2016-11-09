"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日                 
 * description:
 */

define([
    "ionic",
   "components/footer/directive"

], function () {

    return angular.module("MyFooter", [
        "ionic",
        "MyFooter.directive"
    ]);
});
