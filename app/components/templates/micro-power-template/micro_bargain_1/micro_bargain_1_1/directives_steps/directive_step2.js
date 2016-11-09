"use strict";
/**
 * author :
 * time:
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/service"], function () {
    angular.module("MicroBargain1_1Step2.directives", ["MicroBargain1_1.Service"])
        .directive("microBargain1by1Step2", [
                "$window", "$timeout", "$rootScope", "microBargain1_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", "userTermsService", function ($window, $timeout, $rootScope, microBargain1_1Service, uploadImgService, maskService, promptBarService, commonNetService, userTermsService) {
                    return {
                        restrict: "EA",
                        scope: false,
                        templateUrl: "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/templates_steps/template_step2.html",
                        link: function (scope, iElement, iAttr) {
                            var defaultName = "";
                            var defaultHeadImgUrl = window.resourceDoMain + "/app/img/bargain_header_bg1.png";
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
                                    microBargain1_1Service.getWeixinUserInfo().success(function(result) {
                                        if (result.status == 1) {
                                            scope.userInfo = {
                                                name: defaultName,
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

                                //保存数据
                                var date = {
                                    ActivityUserId: $rootScope.$stateParams.oldUser||"",
                                    ActivityId: $rootScope.$stateParams.Id,
                                    Name: scope.userInfo.name,
                                    Phone: scope.userInfo.phone,
                                    Config: JSON.stringify({ headImg: scope.userInfo.headImg })
                                };

                                scope.isSubmit = true;
                                microBargain1_1Service.saveInfo(date).then(function(result) {
                                    scope.isSubmit = false;
                                    if (result.data.status == 1) {
                                    //打开页面
                                        $rootScope.$state.go("activity.oldandnewview", { Id: $rootScope.$stateParams.Id,oldUser: result.data.data, step: "1" });
                                    }
                                }, null);
                            };

                            //表单校验
                            function validForm() {
                                var validState = microBargain1_1Service.isValid(scope.userInfo.name, scope.userInfo.phone);
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

                                uploadImgService.upLoadImg(microBargain1_1Service.getConfigByAspectRatio(1), 1, scope.upLoadHeadImgFinish, '', {serviceType:"headerImg"});


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