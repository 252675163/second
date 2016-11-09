"use strict";
/**
 * author :chenxuedong
 * time: 2016年8月15日20:21:23
 * description: 教师节贺卡
 */


define(["ionic"], function () {
    angular.module("MicroPoster3_1Step2.directives", [])
        .directive("microposter3by1Step2", ["$timeout", "$rootScope", "promptBarService", "microPoster3_2Service", "microPoster3_1Service", "commonNetService", "maskService",
            function ($timeout, $rootScope, promptBarService, microPoster3_2Service, microPoster3_1Service, commonNetService, maskService) {
                return {
                    restrict: "EA",
                    scope: false,
                    templateUrl: "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_1/templates_steps/template_step2.html",
                    link: function (scope, iElement, iAttr) {

                        function init() {
                            $timeout(function () {
                                $(".lockMask-loading2").hide();
                            }, 800);
                            //查询用户跳转状态
                            scope.indextag = microPoster3_1Service.getIndexTag();
                            if (angular.equals(scope.indextag, {})) {
                                microPoster3_1Service.setIndexTag("step2")
                            }

                            var url = window.activityServer + "/Activity" + Math.random().toString(36).substr(2)+ "ShareRoute?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id;
                            var config = commonNetService.getShareConfig();
                            if ($rootScope.$stateParams.oldUser) {
                                url += encodeURIComponent("&oldUser=" + $rootScope.$stateParams.oldUser);
                            }

                            if (scope.indextag.tag == "step1") {//从首页step1跳转过来到step2的请客
                                url += encodeURIComponent("&step=1");
                                scope.ifBright = true;              //是否显示炫耀一下
                            } else {                            //从链接 直接进step2的请客  
                                url += encodeURIComponent("&step=2");
                                scope.ifBright = false;
                            }

                            var content = microPoster3_1Service.getContent() || microPoster3_1Service.getlocContent().info;
                            if (content) {
                                microPoster3_1Service.setlocContent(content);
                                scope.description = content;
                                url += encodeURIComponent("&content=" + scope.description.replace(/\n/g, '%0A').replace(/&nbsp;/g, "%20").replace(/=/g, "%3D"))
                            }

                            if (scope.isView && $rootScope.$stateParams.oldUser) {
                                microPoster3_1Service.GetActivityUserInfo($rootScope.$stateParams.oldUser).success(function (result) {
                                    if (result.status == 1) {


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
                                }, null)
                            } else {
                                /**
                                *如果是view状态，机构分享出来，标题使用机构填写的内容+格式，直接分享，卡片使用机构后台的卡片内容
                                *2016.9.6  edit by yinglechao
                                */
                                if (scope.isView) {
                                    $rootScope.$state.current.title = "来自【" + scope.templateModel.name + "】的教师节祝福";
                                } else {
                                    $rootScope.$state.current.title = "教师节贺卡";
                                }
                              
                            }
                            if (!scope.description) {
                                scope.description = microPoster3_2Service.getDescription().description;//当前页面又刷新的状态下的祝福语&&
                            }

                        }

                        init();

                        //我也要送祝福
                        scope.sendpray = function () {
                            if (scope.isEdit) {
                                return;
                            }
                            if (scope.status == "preview") {
                                var stateName = scope.isAuth ? "activity.preview" : "activity.oldandnewpreview";
                                $rootScope.$state.go(stateName, { step: "3" });
                            } else if (scope.status == "view") {
                                $rootScope.$state.go("activity.oldandnewview", { step: "3" });

                            }
                        }
                        //炫耀一下
                        scope.bright = function () {
                            if (scope.isEdit) {
                                return;
                            }
                            if (scope.isView) {

                                //保存成功后 更新分享链接
                                var url = window.activityServer + "/Activity" + Math.random().toString(36).substr(2)+ "ShareRoute?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id;
                                if ($rootScope.$stateParams.oldUser) {
                                    url += "&oldUser=" + $rootScope.$stateParams.oldUser;
                                }
                                url += encodeURIComponent("&step=2");
                                var desc = scope.description.replace(/\n/g, '%0A').replace(/&nbsp;/g, "%20").replace(/=/g, "%3D");
                                url += encodeURIComponent("&content=" + desc);
                                var config = commonNetService.getShareConfig();

                                if (config) {
                                    config.link = url;
                                }
                                commonNetService.setShareMessageReception(config);

                                maskService.showMask("", 0, true, 2);
                            } else {
                                promptBarService.showErrorBar("预览页面无法保存数据!", 5000);
                            }
                        }

                    }

                };
            }
        ]
        );
});