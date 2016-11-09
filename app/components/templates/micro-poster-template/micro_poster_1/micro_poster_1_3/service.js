/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价活动介绍
 */
define(["ionic"], function () {
    return angular.module("MicroPoster1_3.Service", []).
        factory("microPoster1_3Service", [
            "$http", "activityFormService", function ($http, activityFormService) {

                var service = {};
                service.model =
                    {
                        title: "续班课程介绍",
                        subject: ["初级舞蹈入门课", "初级舞蹈入门课", "初级舞蹈入门课"],
                        description: ["请输入简要的课程介绍", "请输入简要的课程介绍", "请输入简要的课程介绍"]
                    };
                return service;
            }
        ]);
});