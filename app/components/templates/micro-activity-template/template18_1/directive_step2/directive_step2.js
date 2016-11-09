"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template18_1/service", "components/is_shaked/directive"], function () {
    angular.module("Template18_1Step2.directives", ["Template18_1.Service", "IsShaked.directive"])
        .directive("template18by1Step2", [
            "$window", "$timeout", "$rootScope", "template18_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope, template18_1Service, uploadImgService, maskService, promptBarService, commonNetService) {
                return {
                    restrict: "EA",
                    scope: {
                        status: "=",
                        isEnd:"="
                    },
                    templateUrl: "components/templates/micro-activity-template/template18_1/directive_step2/template_step2.html",
                    link: {
                        pre: function preLink(scope, iElement, iAttr) {
                            var defaultName = template18_1Service.defaultUserInfo.name;
                            var defaultHeadImgUrl = window.resourceDoMain + "/app/img/header_default2.png";
                            var defaultOtherInfo = template18_1Service.defaultUserInfo.otherInfo;
                            //表单页用到的数据
                            scope.userInfo = {
                                name: "",
                                headImg: "",
                                otherInfo:"",//祝福语
                                couplet: ["", ""]//对联
                            };

                            function init() {
                                //couplet 只读
                                scope.couplet = angular.copy(template18_1Service.defaultUserInfo.couplet);
                                if (scope.status != "view") {
                                    scope.userInfo = {
                                        name: defaultName,
                                        headImg: defaultHeadImgUrl,
                                        otherInfo:defaultOtherInfo,
                                        couplet: scope.couplet
                                    };
                                    $timeout(function () {
                                        $(".lockMask-loading2").hide();
                                    }, 800);
                                } else {
                                    template18_1Service.getWeixinUserInfo().success(function (result) {
                                        if (result.status == 1) {
                                            scope.userInfo = {
                                                name: result.data.Nickname || defaultName,
                                                headImg: result.data.HeadImgUrl || defaultHeadImgUrl,
                                                otherInfo: defaultOtherInfo,
                                                couplet: scope.couplet
                                            };
                                        } else {
                                            promptBarService.showErrorBar(result.message, 3000);
                                        }
                                        $timeout(function () {
                                            $(".lockMask-loading2").hide();
                                        }, 800);
                                    });
                                }
                                iElement[0].getElementsByClassName("myViewBox1")[0].style.background = "url('" + window.resourceDoMain + "/app/img/body_bg_24-2_1.jpg') no-repeat center center";
                                iElement[0].getElementsByClassName("myViewBox1")[0].style.backgroundSize = "100% 100%";
                                iElement[0].getElementsByClassName("myViewBox2")[0].style.background = "url('" + window.resourceDoMain + "/app/img/body_bg_24_2.jpg') no-repeat center center";
                                iElement[0].getElementsByClassName("myViewBox2")[0].style.backgroundSize = "100% 100%";
                                scope.isUseStylizedFont = template18_1Service.coupletIsInDefaultCouplet(scope.userInfo.couplet);
                                scope.$watch('userInfo.couplet', function (newValue, oldValue, scope) {
                                    if (newValue != oldValue) {
                                        scope.isUseStylizedFont = template18_1Service.coupletIsInDefaultCouplet(newValue);
                                    }
                                }, true);

                                //Warning disable  ionic  keyboard
                                if (ionic.Platform.isIOS()) {
                                    ionic.keyboard.disable();
                                }

                                scope.isShowCoupletBox = false;
                                scope.isWatch = true;

                                if ($rootScope.$stateParams.oldUser) {
                                    scope.userType = "new";
                                } else {
                                    scope.userType = "old";
                                }
                            }

                            init();
                            scope.submitInfo = function () {
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
                                        //promptBarService.showErrorBar("请不要重复提交", 3000);
                                        maskService.showMask("", 0, true, 7).then(function () {
                                            var config = commonNetService.getShareConfig();
                                            commonNetService.setShareMessageReception(config).then(function () {
                                                //用户分享或取消分享
                                                maskService.hideMask();
                                            }, function () {
                                                //set微信的link出错
                                                maskService.hideMask();
                                                promptBarService.showErrorBar("分享出错", 3000);
                                            });
                                            scope.isHaveSubmit = true;
                                            scope.oldUserInfo = angular.copy(scope.userInfo);
                                        });
                                        return;
                                    }
                                }

                                //保存数据
                                var date = {
                                    ActivityUserId: scope.userType == "new" ? $rootScope.$stateParams.oldUser : "",
                                    ActivityId: $rootScope.$stateParams.Id,
                                    Phone: "",
                                    Name: scope.userInfo.name,
                                    Config: JSON.stringify({
                                        name: scope.userInfo.name,
                                        headImg: scope.userInfo.headImg,
                                        otherInfo: scope.userInfo.otherInfo,
                                        couplet: scope.userInfo.couplet
                                    })
                                };

                                scope.isSubmit = true;
                                template18_1Service.saveInfo(date).then(function (result) {
                                    scope.isSubmit = false;
                                    if (result.data.status == 1) {
                                        maskService.showMask("", 0, true, 7).then(function () {
                                            var link = window.shareServer + "/CsngShare?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + result.data.data + "&shareTitle=";
                                            var config = commonNetService.getShareConfig();
                                            if (config) {
                                                config.title = scope.userInfo.name ? scope.userInfo.name + " 送来一副春联，给您拜年啦！" : config.title;
                                                config.desc = "大王派我送祝福\n给个红包混脸熟";
                                                config.link = link + config.title;
                                            }
                                            commonNetService.setShareMessageReception(config).then(function () {
                                                //用户分享或取消分享
                                                maskService.hideMask();
                                            }, function () {
                                                //set微信的link出错
                                                maskService.hideMask();
                                                promptBarService.showErrorBar("分享出错", 3000);
                                            });
                                            scope.isHaveSubmit = true;
                                            scope.oldUserInfo = angular.copy(scope.userInfo);
                                        });
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                }, null);
                            };

                            //表单校验
                            function validForm() {
                                if (scope.userInfo.name == "") {
                                    promptBarService.showErrorBar("请输入姓名！", 3000);
                                    return false;
                                }
                                return true;
                            }


                            scope.upLoadHeadImgFinish = function (url) {
                                $timeout(function () {
                                    scope.$apply(function () {
                                        scope.userInfo.headImg = url;
                                    });
                                });
                            };
                            scope.updateHeadImg = function () {

                                uploadImgService.upLoadImg(template18_1Service.getConfigByAspectRatio(1), 1, scope.upLoadHeadImgFinish, '', { serviceType: "headerImg" });


                            };


                            //图片上传
                            scope.imgAspectRatio = [1];
                            scope.upLoadFinish = function (url) {
                                $timeout(function () {
                                    scope.$apply(function () {
                                        scope.templateModel.imageUrl[scope.imgIndex] = url;
                                    });
                                });
                            };
                            scope.updateImg = function (imgIndex) {
                                if (!scope.isEdit) {
                                    return;
                                }
                                scope.imgIndex = imgIndex;
                                uploadImgService.upLoadImg(template18_1Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 1, scope.upLoadFinish);
                            };


                            //显示更改对联弹框
                            scope.showCoupletBox = function () {
                                if (scope.isEdit) {
                                    return;
                                }
                                scope.tempCouplet = scope.userInfo.couplet;

                                scope.isShowCoupletBox = true;

                                scope.isWatch = false;

                            };

                            scope.shakedChangeCouplet = function () {
                                if (scope.isEdit) {
                                    return;
                                }

                                var couplet = template18_1Service.getCoupletByRandom();
                                if (couplet[0] == scope.userInfo.couplet[0] && couplet[1] == scope.userInfo.couplet[1]) {
                                    scope.shakedChangeCouplet();
                                } else {
                                    scope.userInfo.couplet = couplet;
                                    $timeout(function () {
                                        if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                                            scope.$apply();
                                        }
                                    }, 0);
                                }

                            };

                            //保存对联
                            scope.saveCouplet = function () {

                                //保存对联
                                scope.userInfo.couplet = scope.tempCouplet;

                                scope.isShowCoupletBox = false;

                                scope.isWatch = true;
                                
                                $timeout(function () {
                                    if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                                        scope.$apply();
                                    }
                                }, 0);
                            };

                            //点击更改对联
                            scope.clickChangeCouplet = function () {
                                //更改对联
                                var couplet = template18_1Service.getCoupletByRandom();
                                if (couplet[0] == scope.tempCouplet[0] && couplet[1] == scope.tempCouplet[1]) {
                                    scope.clickChangeCouplet();
                                } else {
                                    scope.tempCouplet = couplet;
                                }
                            };

                        }
                    }
                };
            }
        ]
    );
});