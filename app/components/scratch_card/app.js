"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日                 
 * description:
 */

define([
    "ionic",
   "components/scratch_card/directive"

], function () {

    return angular.module("ScratchCard", [
        "ionic",
        "ScratchCard.directive"
    ]);
});
