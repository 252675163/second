"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/service"], function() {
    angular.module("MicroBargain1_1.directives", [])
        .directive("microBargain1by1", [
            "$window", "$timeout", "$interval", "$rootScope", "$q", "$filter", "$ionicScrollDelegate", "microBargain1_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService",
            function($window, $timeout, $interval, $rootScope, $q, $filter, $ionicScrollDelegate, microBargain1_1Service, uploadImgService, maskService, promptBarService, commonNetService) {
                return {
                    restrict: "EA",
                    templateUrl: "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/template.html",
                    link: function(scope, iElement, iAttr) {

                        scope.defaultHeadImg = window.resourceDoMain + "/app/img/bargain_header_bg1.png"; //默认的用户头像

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）

                        function init() {
                            //屏蔽相关菜单
                            window.wx && window.wx.hideMenuItems({
                                menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:QZone"]
                            });

                            if (angular.isUndefined(scope.templateModel) || angular.equals(scope.templateModel, {})) {
                                scope.sectionModel.templateModel = angular.copy(microBargain1_1Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            //正常逻辑不会进该分支
                            if (!scope.activityOtherConfig) {
                                scope.activityOtherConfig = {};
                            }
                            //价格信息使用scope.activityOtherConfig.activityExtConfig对象  ,截止日使用scope.activityOtherConfig.endDate
                            if (angular.equals(scope.activityOtherConfig.activityExtConfig, {}) || angular.isUndefined(scope.activityOtherConfig.activityExtConfig)) {
                                scope.activityOtherConfig.activityExtConfig = angular.copy(microBargain1_1Service.activityExtConfig);
                            }
                            if (!scope.activityOtherConfig.endDate) {
                                //默认时间为当前时间加7天                              
                                scope.activityOtherConfig.endDate = new Date();
                                scope.activityOtherConfig.endDate.setDate(scope.activityOtherConfig.endDate.getDate() + 7)
                            }
                            //校验是否最大值 并且是否是JsonDate格式 
                            if (scope.activityOtherConfig.endDate != "/Date(253402185600000+0800)/") {
                                scope.activityOtherConfig.endDate = $filter("formatJsonDate2")(scope.activityOtherConfig.endDate, "yyyy/MM/dd HH:mm:ss");
                                console.log(scope.activityOtherConfig.endDate);
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
                            //显示领取优惠页面
                            scope.showBargainSuccess = false;

                            //显示砍价结果页面
                            scope.showBargainResult = false;

                            //如果是查看页面
                            if (scope.status == "view") {
                                //请求
                                var userId = $rootScope.$stateParams.oldUser || $rootScope.$state.params.Id;
                                microBargain1_1Service.getActivityUserInfo(userId, scope.userType).success(function(result) {
                                    if (result.status == 1) {
                                        if (scope.userType == "new") {
                                            scope.userInfo1 = {
                                                name: result.data.Name || "",
                                                headImg: result.data.Config ? JSON.parse(result.data.Config).headImg : scope.defaultHeadImg,
                                            };
                                        } else {
                                            scope.userInfo1 = {
                                                name: scope.templateModel.name,
                                                headImg: scope.templateModel.imageUrl[0] || scope.defaultHeadImg,
                                            };
                                        }
                                        scope.powerInfo = JSON.parse(result.data.MicroPowerConfig);
                                        //活动剩余时间 秒
                                        scope.time = scope.powerInfo.SurplusTotalSeconds;
                                        scope.bargainInfo = angular.copy(scope.activityOtherConfig.activityExtConfig);

                                        //当前活动是否结束
                                        if (scope.time < 0 || scope.powerInfo.ReceiveStockType != -1) {

                                            scope.activityIsEnd = true;

                                            if (scope.powerInfo.ReceiveStockType != -1 && scope.step == 1) {
                                                promptBarService.showErrorBar("优惠已领取，活动已结束~", 5000);
                                            }
                                            if (scope.time < 0) {
                                                promptBarService.showErrorBar2("活动时间已结束~");
                                            }
                                        } else {
                                            scope.activityIsEnd = false;
                                        }

                                        //进度条百分比
                                        if (scope.powerInfo.PowerTotalAmount < (scope.bargainInfo.InitialPrice - scope.bargainInfo.PreferentialPrice)) {
                                            scope.percentageGoing = (scope.powerInfo.PowerTotalAmount / (scope.bargainInfo.InitialPrice - scope.bargainInfo.PreferentialPrice)) * 50;
                                        } else {
                                            scope.percentageGoing = ((scope.powerInfo.PowerTotalAmount + parseInt(scope.bargainInfo.PreferentialPrice) - scope.bargainInfo.InitialPrice) / (scope.bargainInfo.PreferentialPrice - scope.bargainInfo.SpecialPrice)) * 50 + 50;
                                        }

                                        //自己看到的按钮逻辑
                                        if (scope.powerInfo.IsSelf) {
                                            //0 领取优惠，1 继续努力，2 抢完啦，3 已领取，4已结束，5 隐藏
                                            if (scope.time < 0) {
                                                scope.btn = [5, 4, 4];
                                            } else {
                                                //已经领过
                                                if (scope.powerInfo.ReceiveStockType != -1) {
                                                    if (scope.powerInfo.ReceiveStockType == 0) {
                                                        scope.btn = [3, 5, 5];
                                                    } else if (scope.powerInfo.ReceiveStockType == 1) {
                                                        scope.btn = [5, 3, 5];
                                                    } else {
                                                        scope.btn = [5, 5, 3];
                                                    }
                                                } else {
                                                    //判断按钮状态
                                                    buttonStatus();
                                                }
                                            }
                                        }

                                        //设置config
                                        var config = commonNetService.getShareConfig();

                                        if (config) {
                                            var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";

                                            config.link = window.shareServer + "/" + shareRouter + "?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + ($rootScope.$stateParams.oldUser || "" + "&step=1");
                                            config.title = "快来帮我砍价，" + scope.templateModel.bargainProduct + "特惠价只要" + scope.bargainInfo.SpecialPrice + "元啦~";
                                            config.desc = "大侠快来帮我砍价，感激不尽！ ";
                                            config.imgUrl = scope.userInfo1.headImg || config.imgUrl;

                                            commonNetService.setShareMessageReception(config).then(function() {}, function() {
                                                promptBarService.showErrorBar("分享信息设置出错", 3000);
                                            });
                                        }

                                        //倒计时
                                        scope.timer = $interval(function() {
                                            if (scope.time <= 0) {
                                                //按钮置为已结束
                                                scope.btn = [5, 4, 4];
                                                promptBarService.showErrorBar2("活动时间已结束~");
                                                scope.activityIsEnd = true;

                                                $interval.cancel(scope.timer);
                                            } else {
                                                scope.time--;
                                            }
                                        }, 1000);

                                    } else {
                                        promptBarService.showErrorBar(result.message);
                                    }
                                });
                            } else if (scope.status == "preview") {
                                //获得编辑得到的砍价信息和时间
                                scope.bargainInfo = angular.copy(scope.activityOtherConfig.activityExtConfig);
                                var now = new Date();
                                var endTime = new Date(scope.activityOtherConfig.endDate);
                                scope.time = (endTime.getTime() - now.getTime()) / 1000;

                                //预览页面助力信息
                                scope.powerInfo = {
                                    IsPower: false,
                                    PowerTotalCount: 0,
                                    PowerTotalAmount: 0,
                                }

                                //进度条百分比
                                scope.percentageGoing = 0;

                                //倒计时
                                scope.timer = $interval(function() {
                                    if (scope.time <= 0) {
                                        $interval.cancel(scope.timer);
                                    } else {
                                        scope.time--;
                                    }
                                }, 1000);
                            }
                        }

                        init();

                        //0 领取优惠，1 继续努力，2 抢完啦，3 已领取，4已结束，5 隐藏
                        function buttonStatus() {
                            //助力人数小于特惠价助力人数
                            if (scope.powerInfo.PowerTotalCount < scope.bargainInfo.SpecialPricePowerCount * 1 + scope.bargainInfo.PreferentialPricePowerCount * 1) {
                                //助力金额小于优惠价助力金额
                                if (scope.powerInfo.PowerTotalAmount < (scope.bargainInfo.InitialPrice - scope.bargainInfo.PreferentialPrice)) {
                                    scope.btn = [5, 1, 1];
                                } else {
                                    //优惠价库存为0
                                    if (scope.powerInfo.SurplusPreferentialPriceStock == 0) {
                                        scope.btn = [5, 2, 1];
                                    } else {
                                        scope.btn = [5, 0, 1];
                                    }
                                }
                            } else {
                                //特惠价库存为0
                                if (scope.powerInfo.SurplusSpecialPriceStock == 0) {
                                    //优惠价库存为0
                                    if (scope.powerInfo.SurplusPreferentialPriceStock == 0) {
                                        scope.btn = [5, 2, 2];
                                    } else {
                                        scope.btn = [5, 0, 2];
                                    }
                                } else {
                                    scope.btn = [5, 5, 0];
                                }
                            }
                            //特惠价库存为0
                            if (scope.powerInfo.SurplusSpecialPriceStock == 0) {
                                scope.btn[2] = 2;
                            }
                            //优惠价库存为0
                            if (scope.powerInfo.SurplusPreferentialPriceStock == 0) {
                                scope.btn[1] = 2;
                            }
                        }



                        //图片上传
                        scope.imgAspectRatio = [1];
                        scope.upLoadFinish = function(url) {
                            $timeout(function() {
                                scope.$apply(function() {
                                    scope.templateModel.imageUrl[scope.imgIndex] = url;
                                });
                            });
                        };
                        scope.updateImg = function(imgIndex) {
                            if (!scope.isEdit) {
                                return;
                            }
                            scope.imgIndex = imgIndex;
                            uploadImgService.upLoadImg(microBargain1_1Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 1, scope.upLoadFinish);
                        };

                        //帮他砍价
                        scope.helpBargain = function() {
                            //预览页面砍价
                            if (scope.status == "preview") {
                                scope.showBargainResult = true;

                                //前端随机数金额
                                var Range = (scope.bargainInfo.InitialPrice - scope.bargainInfo.PreferentialPrice) / scope.bargainInfo.PreferentialPricePowerCount;
                                var Rand = Math.random() + 0.01;
                                scope.bargainPrice = (Rand * Range).toFixed(2);

                                scope.powerInfo = {
                                        IsPower: true,
                                        PowerTotalCount: 1,
                                        PowerTotalAmount: scope.bargainPrice,
                                    }
                                    //进度条比例
                                scope.percentageGoing = (scope.powerInfo.PowerTotalAmount / (scope.bargainInfo.InitialPrice - scope.bargainInfo.PreferentialPrice)) * 50;
                            } else {
                                //防止重复提交
                                if (scope.isSubmit) {
                                    return;
                                }

                                //助力金额达到最大值时
                                if (scope.powerInfo.PowerTotalAmount >= scope.bargainInfo.InitialPrice - scope.bargainInfo.SpecialPrice) {
                                    promptBarService.showErrorBar("已砍到最低价，不需要再砍价了哦~");
                                    return;
                                }

                                var userId = $rootScope.$stateParams.oldUser || $rootScope.$stateParams.Id;
                                scope.isSubmit = true;
                                microBargain1_1Service.microBargainPower(userId, scope.userType).success(function(result) {

                                    scope.isSubmit = false;
                                    if (result.status == 1) {
                                        scope.bargainPrice = result.data.VoucherAmount;
                                        scope.powerInfo.IsPower = true;
                                        scope.powerInfo.PowerTotalCount = scope.powerInfo.PowerTotalCount + 1;
                                        scope.powerInfo.PowerTotalAmount = parseFloat(scope.powerInfo.PowerTotalAmount) + parseFloat(scope.bargainPrice);

                                        scope.showBargainResult = true;

                                        //进度条百分比
                                        if (scope.powerInfo.PowerTotalAmount < (scope.bargainInfo.InitialPrice - scope.bargainInfo.PreferentialPrice)) {
                                            scope.percentageGoing = (scope.powerInfo.PowerTotalAmount / (scope.bargainInfo.InitialPrice - scope.bargainInfo.PreferentialPrice)) * 50;
                                        } else {
                                            scope.percentageGoing = ((scope.powerInfo.PowerTotalAmount + parseInt(scope.bargainInfo.PreferentialPrice) - scope.bargainInfo.InitialPrice) / (scope.bargainInfo.PreferentialPrice - scope.bargainInfo.SpecialPrice)) * 50 + 50;
                                        }

                                        //如果是自己帮自己砍价 砍完判断按钮状态
                                        if (scope.powerInfo.IsSelf) {

                                            $timeout(function() {
                                                scope.$apply(buttonStatus());
                                            });
                                        }

                                    } else {
                                        //优惠已领取，活动结束了~||活动已结束!!
                                        if (result.error == 1010 || result.error == 1008) {
                                            scope.activityIsEnd = true;
                                        }
                                        //你已经助力过啦!!
                                        else if (result.error == 1001 || result.error == 1004) {
                                            scope.powerInfo.IsPower = true;
                                        }
                                        promptBarService.showErrorBar(result.message);
                                    }
                                });
                            }
                        }

                        //关闭砍价金额弹框
                        scope.closeBargainShowBox = function() {
                            scope.showBargainResult = false;
                        }

                        //领取优惠
                        scope.getBenefits = function(type) {
                            if (scope.btn[type] != "0") {
                                return;
                            } else {
                                //领取优惠逻辑
                                //领取的优惠价
                                switch (type) {
                                    case 0:
                                        scope.benefitsPrice = scope.bargainInfo.InitialPrice;
                                        break;
                                    case 1:
                                        scope.benefitsPrice = scope.bargainInfo.PreferentialPrice;
                                        break;
                                    case 2:
                                        scope.benefitsPrice = scope.bargainInfo.SpecialPrice;
                                        break;
                                }
                                //领取优惠价类型
                                scope.type = type;
                                scope.showBargainSuccess = true;
                            }
                        }

                        //优惠价确认
                        scope.sureBargainBox = function() {
                            if (scope.btn[scope.type] != "0") {
                                return;
                            } else {
                                //防止重复提交
                                if (scope.isSubmit) {
                                    return;
                                }
                                var userId = $rootScope.$stateParams.oldUser || $rootScope.$stateParams.Id;
                                scope.isSubmit = true;
                                microBargain1_1Service.microBargainPreferential(userId, scope.type, scope.userType).success(function(result) {

                                    scope.isSubmit = false;
                                    if (result.status == 1) {
                                        scope.showBargainSuccess = false;
                                        //领取成功按钮变化
                                        scope.btn = [5, 5, 5];
                                        scope.btn[scope.type] = 3;


                                        if (scope.type == 1) {
                                            //优惠价库存减一
                                            scope.powerInfo.SurplusPreferentialPriceStock--;
                                        } else {
                                            //特惠价库存减一
                                            scope.powerInfo.SurplusSpecialPriceStock--;
                                        }

                                        promptBarService.showErrorBar("优惠已领取，活动结束了~", 5000);
                                    } else {
                                        scope.showBargainSuccess = false;
                                        //慢了一步，最后一件被人抢走啦！
                                        if (result.error == 1014 || result.error == 1018) {
                                            scope.btn[scope.type] = 2;
                                            //抢完的是特惠价
                                            if (scope.type == 2) {
                                                //将特惠价库存置为0
                                                scope.powerInfo.SurplusSpecialPriceStock = 0;
                                                //优惠价库存为0
                                                if (scope.powerInfo.SurplusPreferentialPriceStock != 0) {
                                                    scope.btn[1] = 0;
                                                } else {
                                                    scope.btn = [5, 2, 2];
                                                }
                                            }
                                            //抢完的是优惠价
                                            else {
                                                //将优惠价库存置为0
                                                scope.powerInfo.SurplusPreferentialPriceStock = 0;
                                                scope.btn[0] = 5;
                                            }
                                        }
                                        //你已经领取过优惠啦!!||优惠已领取
                                        else if (result.error == 1002 || result.error == 1011) {
                                            scope.btn[scope.type] = 3;
                                        }
                                        //活动已结束!!
                                        else if (result.error == 1009) {
                                            scope.btn = [5, 4, 4];
                                        }
                                        promptBarService.showErrorBar(result.message, 5000);
                                    }
                                });
                            }
                        }

                        //优惠价取消
                        scope.cancelBargainBox = function() {
                            scope.showBargainSuccess = false;
                        }


                        //跳转到信息填写页面
                        scope.goForm = function() {
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

                        var stateChangeStart = $rootScope.$on("$stateChangeStart",
                            function(event, toState, toParams, fromState, fromParams) {
                                $interval.cancel(scope.timer);
                            });
                        scope.$on("$destroy", function() {
                            //destroy the ui.router [stateChageStart] event
                            stateChangeStart();
                        });
                    }
                };
            }
        ]);
});