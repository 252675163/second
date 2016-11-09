/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价活动介绍
 */
define(["ionic"], function() {
    return angular.module("MicroBargain1_3.Service", []).
        factory("microBargain1_3Service", [
            "$http", "activityFormService", function($http, activityFormService) {

                var service = {};
                
                service.model =
                {                
                    description: ["1、您能帮每个分享者砍一刀，也能帮自己砍一刀\n2、您需砍过优惠价/特惠价，并点击【领取优惠】按钮确认后，才能以领取的价格报名\n3、在机构报名时，记得提供您的手机和姓名哦\n4、数量有限，先报先得"]
                };
                return service;
            }
        ]);
});