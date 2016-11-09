"use strict";
/**
 * author :chenxuedong
 * time: 2016年8月15日20:21:23
 * description: 教师节贺卡
 */


define(["ionic"], function () {
    angular.module("MicroPoster3_1Step1.directives", [])
        .directive("microposter3by1Step1", ["$timeout", "$rootScope", "maskService", "promptBarService", "commonNetService", "microPoster3_1Service",
            function ($timeout, $rootScope, maskService, promptBarService, commonNetService, microPoster3_1Service) {
                return {
                    restrict: 'EA',
                    scope: false,
                    templateUrl: "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_1/templates_steps/template_step1.html",
                    link: function (scope, iElement, iAttr) {

                        function init() {

                            scope.indextag = microPoster3_1Service.getIndexTag();
                            if (angular.equals(scope.indextag, {})) {
                                microPoster3_1Service.setIndexTag("step1")
                            }
                            var url = window.activityServer + "/Activity" + Math.random().toString(36).substr(2)+ "ShareRoute?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id;
                            var config = commonNetService.getShareConfig();
                            if ($rootScope.$stateParams.oldUser) {
                                url += encodeURIComponent("&oldUser=" + $rootScope.$stateParams.oldUser);
                            }
                            if (scope.indextag.tag == "step1") {//从首页step1跳转过来到step2的请客
                                url += encodeURIComponent("&step=1");
                            } else {                            //从链接 直接进step2的请客  
                                url += encodeURIComponent("&step=2");
                            }

                            scope.content = microPoster3_1Service.getContent();
                            if (scope.content) {
                                microPoster3_1Service.setlocContent(scope.content);
                                url += encodeURIComponent("&content=" + scope.content.replace(/\n/g,'%0A').replace(/&nbsp;/g,"%20").replace(/=/g,"%3D"))
                            }

                            if (scope.isView && $rootScope.$stateParams.oldUser) {

                                microPoster3_1Service.GetActivityUserInfo($rootScope.$stateParams.oldUser).success(function (result) {
                                    if (result.status == 1) {
                                        scope.name = result.data.Name;
                                        $rootScope.$state.current.title = "来自【" + result.data.Name + "】的教师节祝福";
                                        if (config) {
                                            config.link = url;
                                            config.title = $rootScope.$state.current.title;
                                            config.desc = "祝亲爱的老师教师节快乐！";
                                            config.imgUrl = config.imgUrl;
                                        }
                                        commonNetService.setShareMessageReception(config);

                                    } else {
                                        promptBarService.showErrorBar(result.message, 3000);
                                    }
                                }, null);
                            } else {
                                scope.name = scope.templateModel.name;
                                /**
                                *如果是view状态，机构分享出来，标题使用机构填写的内容+格式，直接分享卡，片使用机构后台的卡片内容
                                *2016.9.6  edit by yinglechao
                                */
                                if (scope.isView) {
                                    $rootScope.$state.current.title = "来自【" + scope.name + "】的教师节祝福";
                                  
                                }

                            }




                        }
                        init();
                        //查看祝福
                        scope.viewpray = function () {
                            if (scope.isEdit) {
                                return;
                            }
                            if (scope.status == "preview") {
                                var stateName = scope.isAuth ? "activity.preview" : "activity.oldandnewpreview";
                                $rootScope.$state.go(stateName, { step: "2" });
                            } else if (scope.status == "view") {
                                $rootScope.$state.go("activity.oldandnewview", { step: "2" });

                            }

                        }
                        scope.inputconfig = [{
                            width: 260,
                            height: 32,
                            fontSize: 28
                        }]
                    }
                }
            }]
        )

});

