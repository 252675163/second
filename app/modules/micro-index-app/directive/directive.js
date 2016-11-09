"use strict";
/**
 * author :cm
 * time: 2016年1月5日
 * description: 通知栏
 */


define(["ionic", "modules/micro-index-app/directive/service"], function () {
    angular.module("Notification.directives", ["Notification.Service"])
        .directive("notification", [
            "$window", "$timeout", "$rootScope", "$state", "notificationService", "promptBarService", function ($window, $timeout, $rootScope, $state, notificationService, promptBarService) {
                return {
                    restrict: 'EA',
                    scope: {},
                    templateUrl: "modules/micro-index-app/directive/notification-directive.html",
                    link: function (scope, iElement, iAttr) {
                        scope.noticeConfig = {
                            type:1,//1:location.href;2:$state.go
                            content:"",//公告正文
                            link: "",//链接，或json
                            bannerImgUrl: ""
                        };

                        scope.showNotice = false;

                        scope.goLink = function () {
                            if(scope.noticeConfig.type==1){
                                $window.location.href = scope.noticeConfig.link;
                            }else if(scope.noticeConfig.type==2){
                                //页内跳转有参数 todo
                                var linkObj= JSON.parse(scope.noticeConfig.link)||{};
                                //var goState = "";
                                //var parameterObj = "";
                                $rootScope.$state.go(linkObj.goState, linkObj.parameterObj);
                            }
                        };

                        //更新banner显示状态
                        scope.closeImgNotice = function (event) {
                            event.stopPropagation();
                            
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/home/banner"]);
                            }
                            notificationService.updateUserConfig("IsShowBanner", "false").then(function (result) {
                                if (result.data.status == 1) {
                                    scope.showNotice = false;
                                }
                                else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            },null);
                        }

                        function init() {
                            notificationService.isShowNotice("IsShowBanner").then(function (result) {
                                if (result.data.status == 1) {
                                    //当前用户需要显示banner
                                    if (result.data.data.ConfigValue != "false") {

                                        notificationService.getNoticeConfig().then(function (result) {
                                            if (result.data.status == 1) {
                                                if (result.data.data.isHide) {
                                                    scope.showNotice = false;
                                                } else {
                                                    scope.noticeConfig = result.data.data;
                                                    scope.showNotice = true;
                                                }
                                               
                                            } else {
                                                promptBarService.showErrorBar(result.data.message, 3000);
                                            }
                                        }, null);
                                    }
                                    else {
                                        scope.showNotice = false;
                                    }
                                }
                                else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            }, null);
                        }

                        init();

                    }

                }
            }]
    )

});