"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template19_5/service"], function () {
    angular.module("Template19_1.directives", [])
        .directive("template19by1", [
                "$window", "$timeout", "$rootScope", "$q", "$ionicScrollDelegate", "template19_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", "template19_5Service", function ($window, $timeout, $rootScope, $q, $ionicScrollDelegate, template19_1Service, uploadImgService, maskService, promptBarService, commonNetService, template19_5Service) {
                    return {
                        restrict: "EA",
                        templateUrl: "components/templates/micro-activity-template/template19_1/template.html",
                        link: function (scope, iElement, iAttr) {

                            scope.defaultHeadImg = window.resourceDoMain + "/app/img/grow_vegetables_1_photo.png"; //默认的用户头像
                            scope.gifts = [];//表示已有多少个礼物

                            //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                            scope.renderGrassHat = function (score) {
                                scope.grassUrl = template19_1Service.getGrassUrlByGrassCount(score);
                                scope.grassClass = template19_1Service.getGrassClasByGrassCount(score);
                            };

                            function init() {
                                //屏蔽相关菜单
                                window.wx && window.wx.hideMenuItems({
                                    menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:QZone"]
                                });

                                if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                    scope.sectionModel.templateModel = angular.copy(template19_1Service.model);
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }
                                if (scope.templateModel.imageUrl[0].indexOf("/app") == 0) {
                                    scope.templateModel.imageUrl[0] = window.resourceDoMain + scope.templateModel.imageUrl[0];
                                }
                                scope.isEdit = scope.status == "edit" ? true : false;
                                scope.isView = scope.status == "view" ? true : false;
                                //背景图片
                                var docEl = document.documentElement;
                                var clientWidth = docEl.clientWidth;
                                iElement[0].getElementsByClassName("bgPan")[0].style.height = "" + docEl.clientHeight + "px";

                                if ($rootScope.$stateParams.oldUser) {
                                    scope.userType = "new";
                                } else {
                                    scope.userType = "old";
                                }
                                scope.step = $rootScope.$stateParams.step || 1;
                                scope.userInfo1 = {};
                                //如果是查看页面
                                if (scope.status == "view") {
                                    //请求

                                    var userId = $rootScope.$stateParams.oldUser || $rootScope.$state.params.Id;
                                    template19_1Service.getActivityUserInfo(userId, scope.userType).success(function (result) {
                                        if (result.status == 1) {
                                            if (scope.userType == "new") {
                                                scope.userInfo1 = {
                                                    name: result.data.Name || "",
                                                    headImg: result.data.Config ? JSON.parse(result.data.Config).headImg : scope.defaultHeadImg,
                                                    grassCount: result.data.Score,
                                                    rank: result.data.Rank
                                                };
                                            } else {
                                                scope.userInfo1 = {
                                                    name: scope.templateModel.name,
                                                    headImg: scope.templateModel.imageUrl[0] || scope.defaultHeadImg,
                                                    grassCount: result.data.Score,
                                                    rank: result.data.Rank
                                                };
                                            }
                                            //去生成礼物
                                            //scope.createGift(result.data.Score);
                                            scope.vegetablesClassName = template19_1Service.getGrassClasByGrassCount(result.data.Score);

                                            //warning 设置userInfo 至排行榜，数据互通 
                                            template19_5Service.setUserInfo(scope.userInfo1);
                                            scope.renderGrassHat(scope.userInfo1.grassCount);
                                            scope.isHaveGrow = result.data.IsHaveGrow;
                                        }
                                    });


                                }

                            }

                            init();

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
                                uploadImgService.upLoadImg(template19_1Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 1, scope.upLoadFinish);
                            };


                            //显示选择草
                            scope.showGrassList = function () {
                                if (scope.isEdit) {
                                    return;
                                }
                                scope.isShowGrassList = true;

                                $ionicScrollDelegate.scrollTop();
                                $ionicScrollDelegate.freezeAllScrolls(true);
                            };
                            //关闭选择草的列表
                            scope.closeGrass = function () {
                                scope.isShowGrassList = false;
                                $ionicScrollDelegate.freezeAllScrolls(false);

                            };
                            //选择草
                            scope.chooseGrassAction = function (index) {
                                if (scope.isHaveAddGrass == true) {
                                    scope.closeGrass();
                                    promptBarService.showErrorBar("你已经种过草啦！");
                                    return;
                                }
                                //是否在种草请求中
                                if (scope.isAddGrassing == true) {
                                    return;
                                }

                                scope.giftObj = template19_1Service.getGrassUrl(index);
                                scope.closeGrass();
                                if (scope.userInfo1.grassCount > 500) {
                                    //显示验证码弹窗
                                    scope.showVerify();
                                } else {
                                    scope.isGrow = true;
                                    scope.isDance = false;
                                    //scope.isShowDuang = true;//是否出现特效
                                    $timeout(function () {
                                        scope.isGrow = false;
                                        //scope.isShowDuang = false;
                                    }, 1500);

                                    scope.isHideDddGrassButton = true;
                                    scope.addGrass();
                                }


                            };
                            scope.addGrass = function () {
                                if (scope.status == "preview") {
                                    scope.isHaveAddGrass = true;
                                    scope.isDance = true;
                                } else {
                                    scope.isAddGrassing = true;
                                    var userId = $rootScope.$stateParams.oldUser || $rootScope.$stateParams.Id;
                                    template19_1Service.updateChristmasScore(userId, scope.userType, scope.captcha).success(function (result) {
                                        scope.isAddGrassing = false;
                                        if (result.status == 1) {
                                            scope.isHideDddGrassButton = true;
                                            scope.isHaveAddGrass = true;
                                            scope.userInfo1.grassCount++;
                                            //如果输入过验证码，重新做动画效果
                                            if (scope.captcha) {
                                                //旋转动画1.5秒
                                                scope.isGrow = true;
                                                scope.isDance = false;
                                                $timeout(function () {
                                                    scope.isGrow = false;
                                                }, 1500)
                                                    .then(function () {
                                                        scope.isDance = true;
                                                    })
                                                //关闭验证码弹窗
                                                scope.closeVerify();
                                            } else {
                                                scope.isDance = true;
                                            }
                                        } else {
                                            scope.isGrow = false;
                                            //promptBarService.showErrorBar(result.message);
                                            if (result.error == 7) {
                                                //重复助力
                                                scope.isHideDddGrassButton = true;
                                                promptBarService.showErrorBar(result.message, 3000);

                                            } else {

                                                scope.isHideDddGrassButton = false;


                                                if (result.error == 10002) {
                                                    promptBarService.showErrorBar("验证码过期！", 3000);
                                                } else if (result.error == 10003) {
                                                    promptBarService.showErrorBar("验证码错误！", 3000);
                                                } else if (result.error == 10001) {
                                                    if (scope.isShowVerify) {
                                                        promptBarService.showErrorBar("验证码为空！", 3000);
                                                    }
                                                } else {
                                                    promptBarService.showErrorBar(result.message, 3000);
                                                }
                                                if (result.error == 10002 || result.error == 10001 || result.error == 10003) {
                                                    scope.showVerify();
                                                    scope.captcha = "";
                                                }

                                            }
                                        }
                                    });
                                }
                            };


                            //关闭验证码
                            scope.closeVerify = function () {
                                //关闭弹窗
                                scope.isShowVerify = false;
                                $ionicScrollDelegate.freezeAllScrolls(false);


                            }
                            scope.showVerify = function () {
                                $ionicScrollDelegate.scrollTop();
                                $ionicScrollDelegate.freezeAllScrolls(true);
                                //关闭旋转动效
                                scope.isGrow = false;
                                scope.isShowVerify = true;
                                scope.reGetVerifyCode();
                            }
                            //点击验证码的助力
                            scope.cilckVerifyConfirm = function () {
                                //是否正在助力请求
                                if (scope.isAddGrassing == true) {
                                    return;
                                } else if (!scope.captcha) {
                                    promptBarService.showErrorBar("验证码为空！", 3000);
                                } else {
                                    scope.addGrass();
                                }


                            }
                            scope.reGetVerifyCode = function () {
                                scope.imgurl = "/Common/Captcha" + "?v=" + new Date().getTime();
                            }

                            //跳转到信息填写页面
                            scope.goForm = function () {
                                if (scope.isEdit) {
                                    return;
                                }
                                if (scope.status == "preview") {
                                    var stateName = scope.isAuth ? "activity.preview" : "activity.oldandnewpreview";
                                    $rootScope.$state.go(stateName, { step: "2" });
                                } else if (scope.status == "view") {
                                    $rootScope.$state.go("activity.oldandnewview", { step: "2" });
                                }
                            };


                            //根据分数获取样式名
                            scope.createGift = function (count) {
                                gift.imgUrl = template19_1Service.getGrassUrlByGrassCount(i);
                                gift.className = template19_1Service.getGrassClasByGrassCount(i);

                            };
                        }
                    };
                }
        ]
        );
});