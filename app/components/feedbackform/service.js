/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function () {
    return angular.module("FeedbackForm.Service", []).
        factory("feedbackFormService", [
            "$http", "$timeout", "$q", function ($http, $timeout, $q) {

                var feedbackformService = {};

                var reportList = [
                    { Id: 1, reasonText: "恶意营销、虚假传播" },
                    { Id: 2, reasonText: "抄袭、侵权" },
                    { Id: 3, reasonText: "色情、赌博、毒品" },
                    { Id: 4, reasonText: "违反国家政策和法律" },
                    { Id: 5, reasonText: "其他原因" }
                ];

                feedbackformService.getReportList = function () {
                    return reportList;
                }
                //手机号码校验
                feedbackformService.checkMobilenum = function (mobilenum) {
                    var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                    if (mobilenum) {
                        return phoneRegexp.test(mobilenum)
                    } else {
                        return true;
                    }
                }


                return feedbackformService;
            }
        ]);
});