/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价活动介绍
 */
define(["ionic"], function () {
    return angular.module("MicroSpellgroup1_3.Service", []).
        factory("microSpellgroup1_3Service", [
            "$http", "activityFormService", function ($http, activityFormService) {

                var service = {};

                service.model =
                {
                    title: "机构介绍",
                    description: ["您可填写课程介绍、学校简介等信息"]
                };

                return service;
            }
        ]);
});