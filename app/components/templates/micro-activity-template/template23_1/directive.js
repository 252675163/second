"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic","components/templates/micro-activity-template/template23_5/service"], function () {
    angular.module("Template23_1.directives", [])
        .directive("template23by1", [
                "$window", "$timeout", "$rootScope", "$q", "$ionicScrollDelegate", "template23_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", "template23_5Service",
                function ($window, $timeout, $rootScope, $q, $ionicScrollDelegate, template23_1Service, uploadImgService, maskService, promptBarService, commonNetService,template23_5Service) {
                    return {
                        restrict: "EA",
                        templateUrl: "components/templates/micro-activity-template/template23_1/template.html",
                        link: function (scope, iElement, iAttr) {

                            scope.getImageDoMain = function (url) {
                                return window.resourceDoMain + scope.templateExtConfig.imageFolderName + url;
                            };
                            scope.defaultHeadImg = scope.getImageDoMain('/template1_head_bg.png');; //默认的用户头像
                            scope.gifts = [];//表示已有多少个礼物

                            //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                            scope.renderGrassHat = function (score) {
                                scope.grassUrl = template23_1Service.getGrassUrlByGrassCount(score);
                                scope.grassClass = template23_1Service.getGrassClasByGrassCount(score);
                            };

                            function init() {
                                //屏蔽相关菜单
                                window.wx && window.wx.hideMenuItems({
                                    menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:QZone"]
                                });

                                if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                    scope.sectionModel.templateModel = angular.copy(template23_1Service.model);
                                    scope.templateModel = scope.sectionModel.templateModel;
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
                                    //当前访问者（当前用户）的信息
                                    scope.visitorInfo = {
                                        isSelfShare: false //是否是当前连接的分享者
                                    };
                                    var userId = $rootScope.$stateParams.oldUser || $rootScope.$state.params.Id;

                                    template23_1Service.getActivityUserInfo(userId, scope.userType).success(function (result) {
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
                                            //当前访问者（当前用户）的信息
                                            scope.visitorInfo = {
                                                isSelfShare: result.data.IsSelfShare
                                            }
                                            //去生成礼物
                                            //scope.createGift(result.data.Score);
                                            scope.groupGifUrl = template23_1Service.getGrassClasByGrassCount(result.data.Score);
                                            //warning 设置userInfo 至排行榜，数据互通 
                                            template23_5Service.setUserInfo(scope.userInfo1);
                                            scope.renderGrassHat(scope.userInfo1.grassCount);
                                            scope.isHaveGrow = result.data.IsHaveGrow;
                                            var currentTitle = scope.templateExtConfig.shareConfigByVisitor[0].title;
                                            currentTitle = currentTitle.replace("{{shareUser.name}}", scope.userInfo1.name);
                                            if (scope.step == 1) {
                                                $rootScope.$state.current.title = currentTitle;
                                            }
                                            var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";
                                            var link = window.shareServer + "/" + shareRouter + "?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id;
                                            //var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";
                                            //var link = window.shareServer + "/AquariumView" + "/activity/oldandnewview?Id=" + $rootScope.$stateParams.Id;
                                            if ($rootScope.$stateParams.oldUser) {
                                                link = link + "&oldUser=" + $rootScope.$stateParams.oldUser;
                                            }
                                            var config = commonNetService.getShareConfig();
                                            var shareTitle = scope.templateExtConfig.shareConfigByVisitor[0].title;
                                            if (config) {
                                                config.link = link;
                                            }
                                            commonNetService.setShareMessageReception(config)
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
                                uploadImgService.upLoadImg(template23_1Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 1, scope.upLoadFinish);
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
                                    promptBarService.showErrorBar("你已经捕过鱼啦！");
                                    return;
                                }
                                //是否在种草请求中
                                if (scope.isAddGrassing == true) {
                                    return;
                                }
                                var defaultGifUrl = "/template1_item1_gif.gif";
                                scope.itemGifUrl = defaultGifUrl.replace("item1", "item" + index);
                                scope.giftObj = template23_1Service.getGrassUrl(index);
                                scope.closeGrass();
                                //如果当前助力人数大于500人，需要输入验证码
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
                                    template23_1Service.updateChristmasScore(userId, scope.userType, scope.captcha).success(function (result) {
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
                                $ionicScrollDelegate.freezeAllScrolls(false);

                                //关闭弹窗
                                scope.isShowVerify = false;

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
                                    if (scope.visitorInfo.isSelfShare) {
                                        //如果该链接是自己分享出来的话出遮罩，引导分享
                                        //todo 图片替换
                                        maskService.showMask(scope.getImageDoMain('/template1_share_mask_bg.png'), 3000, false, 41);
                                        return;
                                    }
                                    $rootScope.$state.go("activity.oldandnewview", { step: "2" });
                                }
                            };


                            //根据分数获取样式名
                            scope.createGift = function (count) {
                                gift.imgUrl = template23_1Service.getGrassUrlByGrassCount(i);
                                gift.className = template23_1Service.getGrassClasByGrassCount(i);

                            };


                        }
                    };
                }
        ]
        );
});