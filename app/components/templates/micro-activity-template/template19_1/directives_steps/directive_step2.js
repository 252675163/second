"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template19_1/service"], function() {
    angular.module("Template19_1Step2.directives", ["Template19_1.Service"])
        .directive("template19by1Step2", [
                "$window", "$timeout", "$rootScope", "template19_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", "userTermsService", function ($window, $timeout, $rootScope, template19_1Service, uploadImgService, maskService, promptBarService, commonNetService, userTermsService) {
                    return {
                        restrict: "EA",
                        scope: {
                            status: "="
                        },
                        templateUrl: "components/templates/micro-activity-template/template19_1/templates_steps/template_step2.html",
                        link: function(scope, iElement, iAttr) {
                            var defaultName = "XXX";
                            var defaultHeadImgUrl = window.resourceDoMain + "/app/img/grow_vegetables_1_photo.png";
                            //表单页用到的数据
                            scope.userInfo = {
                                name: "",
                                phone: "",
                                headImg: ""
                            };
                            //用户条款是否选中
                            scope.isCheckUserTerms = true;
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
                                    template19_1Service.getWeixinUserInfo().success(function(result) {
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
                                    ActivityUserId: $rootScope.$stateParams.oldUser||"",
                                    ActivityId: $rootScope.$stateParams.Id,
                                    Name: scope.userInfo.name,
                                    Phone: scope.userInfo.phone,
                                    Config: JSON.stringify({ headImg: scope.userInfo.headImg })
                                };

                                scope.isSubmit = true;
                                template19_1Service.saveInfo(date).then(function(result) {
                                    scope.isSubmit = false;
                                    if (result.data.status == 1) {

                                        var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";
                                        var link = window.shareServer + "/"+shareRouter+"?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + result.data.data;
                                        var config = commonNetService.getShareConfig();
                                        if (config) {
                                            config.link = link;
                                            config.title = scope.userInfo.name ? scope.userInfo.name + "喊你来农场帮Ta种菜啦~" : config.title;
                                            //2016.3.8
                                            //2016.3.17 不使用默认文案，使用shareConfig的desc
                                            //config.desc = "我刚当上了农场主，快来帮我种上你喜欢的菜啊！";
                                            config.imgUrl = scope.userInfo.headImg||config.imgUrl;
                                        }

                                        maskService.showMask("",0,false,8);
                                        commonNetService.setShareMessageReception(config).then(function () {
                                            //用户分享或取消分享
                                            maskService.hideMask();
                                        }, function () {
                                            //set微信的link出错
                                            maskService.hideMask();
                                            promptBarService.showErrorBar("分享出错", 3000);
                                        });

                                        //promptBarService.showSuccessBar("提交成功！", 3000);

                                        scope.isHaveSubmit = true;
                                        scope.oldUserInfo = angular.copy(scope.userInfo);
                                    }
                                }, null);
                            };

                            //表单校验
                            function validForm() {
                                var validState = template19_1Service.isValid(scope.userInfo.name, scope.userInfo.phone);
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
                                if (!scope.isCheckUserTerms) {
                                    promptBarService.showErrorBar("请同意用户条款！", 3000);
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

                                uploadImgService.upLoadImg(template19_1Service.getConfigByAspectRatio(1), 1, scope.upLoadHeadImgFinish, '', { serviceType: "headerImg" });
                                

                            };
                            //显示用户条款弹窗
                            scope.showUserTerms = function () {
                                userTermsService.showUserTerms();
                            }
                            // 用户勾选用户条款todo
                            scope.checkUserTerms = function () {
                                scope.isCheckUserTerms = !scope.isCheckUserTerms;
                            }
                        }

                    };
                }
            ]
        );
});