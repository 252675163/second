"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日                 
 * description:
 */

define([
    "ionic",
   "components/feedbackform/directive"

], function () {

    return angular.module("FeedbackForm", [
        "ionic",
        "FeedbackForm.directive"
    ]);
});
