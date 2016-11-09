"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template14_1/service"], function() {
    angular.module("Template14_1Step2.directives", ["Template14_1.Service"])
        .directive("template14by1Step2", [
                "$window", "$timeout", "$rootScope", "template14_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", function($window, $timeout, $rootScope, template14_1Service, uploadImgService, maskService, promptBarService, commonNetService) {
                    return {
                        restrict: "EA",
                        scope: {
                            status: "="
                        },
                        templateUrl: "components/templates/micro-activity-template/template14_1/templates_steps/template_step2.html",
                        link: function(scope, iElement, iAttr) {
                            var defaultName = "";
                            var defaultHeadImgUrl = window.resourceDoMain+"/app/img/header_default2.png";
                            //表单页用到的数据
                            scope.userInfo = {
                                name: "",
                                phone: "",
                                headImg: ""
                            };

                            function init() {
                                if (scope.status != "view") {
                                    scope.userInfo = {
                                        name: defaultName,
                                        phone: "",
                                        headImg: defaultHeadImgUrl
                                    };
                                    $timeout(function() {
                                        $(".lockMask-loading2").hide();
                                    }, 800);
                                } else {
                                    template14_1Service.getWeixinUserInfo().success(function(result) {
                                        if (result.status == 1) {
                                            scope.userInfo = {
                                                name: result.data.Nickname || defaultName,
                                                phone: "",
                                                headImg: result.data.HeadImgUrl || defaultHeadImgUrl
                                            };
                                        } else {
                                            promptBarService.showErrorBar(result.message, 3000);
                                        }
                                        $timeout(function() {
                                            $(".lockMask-loading2").hide();
                                        }, 800);
                                    });
                                }
                                //Warning disable  ionic  keyboard 
                                if (ionic.Platform.isIOS()) {
                                    ionic.keyboard.disable();
                                }
                            }

                            init();
                            scope.submitInfo = function() {
                                //scope.isSubmit是否在提交中
                                if (scope.isSubmit == true) {
                                    return;
                                }
                                //表单校验
                                if (!validForm()) {
                                    return;
                                }
                                if (scope.status != "view") {
                                    promptBarService.showErrorBar("预览页面无法保存数据", 3000);
                                    return;
                                }
                                //如果已经提交过表单，判断提交信息是否有更改
                                if (scope.isHaveSubmit == true) {
                                    if (angular.equals(scope.oldUserInfo, scope.userInfo)) {
                                        promptBarService.showErrorBar("请不要重复提交", 3000);
                                        return;
                                    }
                                }

                                //保存数据
                                var date = {
                                    ActivityUserId: scope.userType == "new" ? $rootScope.$stateParams.oldUser : "",
                                    ActivityId: $rootScope.$stateParams.Id,
                                    Name: scope.userInfo.name,
                                    Phone: scope.userInfo.phone,
                                    Config: JSON.stringify({ headImg: scope.userInfo.headImg })
                                };

                                scope.isSubmit = true;
                                template14_1Service.saveInfo(date).then(function(result) {
                                    scope.isSubmit = false;
                                    if (result.data.status == 1) {

//                                        maskService.showMask("", 0, false, 6).then(function() {
//                                            //$rootScope.$state.go("activity.oldandnewview", { oldUser: result.data.data }, { reload: true });
//                                            var link = window.shareServer + "/CsngShare?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + result.data.data;
//                                            var config = commonNetService.getShareConfig();
//                                            if (config) {
//                                                config.link = link;
//                                                config.title = scope.userInfo.name ? scope.userInfo.name + "喊你送TA圣诞礼物啦！" : config.title;
//                                            }
//                                            commonNetService.setShareMessageReception(config).then(function() {
//                                                //用户分享或取消分享
//                                                maskService.hideMask();
//                                            }, function() {
//                                                //set微信的link出错
//                                                maskService.hideMask();
//                                                promptBarService.showErrorBar("分享出错", 3000);
//                                            });
                                        //                                        });

                                        var link = window.shareServer + "/CsngShare?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + result.data.data;
                                        var config = commonNetService.getShareConfig();
                                        if (config) {
                                            config.link = link;
                                            config.title = scope.userInfo.name ? scope.userInfo.name + "喊你送TA圣诞礼物啦！" : config.title;
                                        }
                                        commonNetService.setShareMessageReception(config).then(function () {
                                            //用户分享或取消分享
                                            maskService.hideMask();
                                        }, function () {
                                            //set微信的link出错
                                            maskService.hideMask();
                                            promptBarService.showErrorBar("分享出错", 3000);
                                        });

                                        promptBarService.showSuccessBar("提交成功！", 3000);

                                        scope.isHaveSubmit = true;
                                        scope.oldUserInfo = angular.copy(scope.userInfo);
                                    }
                                }, null);
                            };

                            //表单校验
                            function validForm() {
                                var validState = template14_1Service.isValid(scope.userInfo.name, scope.userInfo.phone);
                                if (validState == 1) {
                                    promptBarService.showErrorBar("请输入姓名！", 3000);
                                    return false;
                                } else if (validState == 3) {
                                    promptBarService.showErrorBar("请输入手机号码！", 3000);
                                    return false;
                                } else if (validState == 4) {
                                    promptBarService.showErrorBar("请输入真实的手机号码！", 3000);
                                    return false;
                                }
                                return true;
                            }


                            scope.upLoadHeadImgFinish = function(url) {
                                $timeout(function() {
                                    scope.$apply(function() {
                                        scope.userInfo.headImg = url;
                                    });
                                });
                            };
                            scope.updateHeadImg = function() {

                                uploadImgService.upLoadImg(template14_1Service.getConfigByAspectRatio(1), 1, scope.upLoadHeadImgFinish, '', { serviceType: "headerImg" });
                                

                              
                            };

                        }

                    };
                }
            ]
        );
});