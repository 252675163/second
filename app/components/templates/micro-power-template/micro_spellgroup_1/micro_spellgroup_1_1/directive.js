"use strict";
/**
 * author :yinglechao
 * time: 2016年9月18日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_1/service", "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_2/app", "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_5/app"], function () {
    angular.module("MicroSpellgroup1_1.directives", ['MicroSpellgroup1_2.Service', 'MicroSpellgroup1_5.Service'])
        .directive("microSpellgroup1by1", [
            "$window", "$timeout", "$interval", "$compile", "$location", "$rootScope", "$q", "$filter", "$ionicScrollDelegate", "microSpellgroup1_1Service", "microSpellgroup1_2Service", "microSpellgroup1_5Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", "comboboxService",
            function ($window, $timeout, $interval, $compile, $location, $rootScope, $q, $filter, $ionicScrollDelegate, microSpellgroup1_1Service, microSpellgroup1_2Service, microSpellgroup1_5Service, uploadImgService, maskService, promptBarService, commonNetService, comboboxService) {
                return {
                    restrict: "EA",
                    templateUrl: "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_1/template.html",
                    link: function (scope, iElement, iAttr) {
                        //$stateParams.oldUser 为活动用户Id，$stateParams.introducerId为推荐人Id（introducerUserId） 
                        scope.defaultHeadImg = window.resourceDoMain + "/app/img/spellgroup_User_default.jpg";
                        scope.activityIsEnd = scope.isEnd;
                        //scope.defaultHeadImg = window.resourceDoMain + "/app/img/bargain_header_bg1.png"; //默认的用户头像
                        //scope.activityExtConfig = {
                        //    NeedHelpCount:0f
                        //}
                        //表单页dom
                        var formViewEl = "";
                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        //参团用户列表
                        scope.spellgroupUserList = [];
                        //默认参团用户列表
                        scope.spellgroupDefaultUserList = [];
                        //报名弹窗
                        scope.isShowFormPopup = false;
                        //参团已满弹窗：开新团、选择其他团
                        scope.isShowNewGroupPopup = false;
                        //参团已满弹窗：查看我的团，使用新号码报名
                        scope.isShowReApplyPopup = false;
                        //拼团成功弹窗
                        scope.isShowSpellGroupSuccess = false;

                        //是否是某个活动用户的页面
                        scope.isActivityUserView = false;

                        //当前访问用户的信息
                        scope.currentUser = {
                            isApplyThisGroup: false, //是否参加了该团,
                            activityUserId: "", //参加的团
                            introducerUserId: "", //当前用户在咨询本中的Id
                            name: "",
                            headImg: ""
                        }

                        var defaultHeadImgUrl = window.resourceDoMain + "/app/img/spellgroup_User_default.jpg";
                        //表单页用到的数据
                        scope.userInfo = {
                            name: "",
                            phone: "",
                            headImg: ""
                        };

                        function init() {
                            //屏蔽相关菜单
                            window.wx && window.wx.hideMenuItems({
                                menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:QZone"]
                            });

                            if (angular.isUndefined(scope.templateModel) || angular.equals(scope.templateModel, {})) {
                                scope.sectionModel.templateModel = angular.copy(microSpellgroup1_1Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            //未成团列表页的数据
                            scope.spell_2_data = microSpellgroup1_2Service.getTemplateData();
                            //正常逻辑不会进该分支
                            if (!scope.activityOtherConfig) {
                                scope.activityOtherConfig = {};
                            }
                            //扩展活动信息使用scope.activityOtherConfig.activityExtConfig对象  ,截止日使用scope.activityOtherConfig.endDate
                            if (angular.equals(scope.activityOtherConfig.activityExtConfig, {}) || angular.isUndefined(scope.activityOtherConfig.activityExtConfig)) {
                                scope.activityOtherConfig.activityExtConfig = angular.copy(microSpellgroup1_1Service.activityExtConfig);
                            }
                            scope.activityExtConfig = scope.activityOtherConfig.activityExtConfig;
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
                            iElement[0].getElementsByClassName("bgPan_js")[0].style.height = "" + docEl.clientHeight + "px";

                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                                scope.isActivityUserView = true;
                            } else {
                                scope.userType = "old";
                                scope.isActivityUserView = false;
                            }
                            scope.activityExtConfig = scope.activityOtherConfig.activityExtConfig;

                            scope.spellgroupModel_1_5 = microSpellgroup1_5Service.getModel();



                            //初始化表单页数据
                            initFormViewData();
                            //初始化计时器
                            initTimer();

                            //如果是查看页面
                            if (scope.status == "view") {
                                //请求
                                //var userId = $rootScope.$stateParams.oldUser || $rootScope.$state.params.Id;
                                if ($rootScope.$stateParams.oldUser) {

                                    //获取访问页面的用户信息
                                    var promise1 = scope.renderCurrentUserInfo();
                                    //获取参与该团的的用户列表 scope.userListByGroupId 
                                    var promise2 = scope.renderHelperList();
                                    //todo
                                    $q.all([promise1, promise2]).then(function () {
                                        console.log(scope.spellgroupUserList);
                                        console.log(scope.currentUser);
                                        if (scope.spellgroupUserList.length >= scope.activityExtConfig.NeedHelpCount) {
                                            if (scope.currentUser.isApplyThisGroup) {
                                                scope.showPopup(4);
                                            }
                                        }
                                        //设置jssdk

                                        if (scope.currentUser.isApplyThisGroup) {
                                            scope.resetShareConfig(scope.currentUser.activityUserId, scope.currentUser.introducerUserId, scope.activityExtConfig.NeedHelpCount, scope.spellgroupUserList.length, scope.currentUser.name, scope.currentUser.headImg);
                                        } else {
                                            scope.resetShareConfigOfCurrentLink();
                                        }
                                    });
                                    ////设置jssdk
                                    //if (microSpellgroup1_1Service.shareConfigCache) {
                                    //    var data = microSpellgroup1_1Service.shareConfigCache;
                                    //    scope.resetShareConfig(data.activityUserId, data.introducerId, data.needHelp, data.currntHelpCount, data.name, data.headImg);

                                    //} else {
                                    //    scope.resetShareConfigOfCurrentLink();

                                    //}


                                    //todo 是否参加过此活动，是否助力满，确定是否弹窗（满团弹窗）
                                } else {
                                    scope.resetShareConfigOfCurrentLink();
                                }

                            } else if (scope.status == "preview") {
                                //活动实例信息（拼团人数）
                                //scope.activityExtConfig = angular.copy(scope.activityOtherConfig.activityExtConfig);
                                var now = new Date();
                                var endTime = new Date(scope.activityOtherConfig.endDate);
                                scope.time = (endTime.getTime() - now.getTime()) / 1000;
                            }
                            //根据设定的参团人数信息，重置参团的默认用户列表
                            renderSpellgroupDefaultUserList();
                        }

                        //表单类型 （1：开团，2：参团）
                        scope.formType = 0;

                        //点击开团按钮
                        scope.newGroup = function () {
                            $ionicScrollDelegate.scrollTop();
                            //scope.doHeaderAnimate();
                            scope.formType = 1;
                            scope.closeAllPopup();
                            //重置表单数据
                            scope.userInfo = angular.copy(scope.defaultUserInfo);
                            scope.showPopup(1);
                        };
                        //点击参团按钮
                        scope.participationGroup = function () {
                            //scope.closeAllPopup();
                            $ionicScrollDelegate.scrollTop();
                            scope.formType = 2;
                            //重置表单数据
                            scope.userInfo = angular.copy(scope.defaultUserInfo);
                            scope.showPopup(1);
                        }
                        //点击开新团(参团变为开团)
                        scope.participationToNewGroup = function () {
                            scope.closeAllPopup();
                            scope.formType = 1;
                            //直接请求数据
                            scope.submitInfo();
                        }

                        //跳转到未成团列表
                        scope.goNotDoneSpellGroupList = function () {
                            //todo
                            scope.closeAllPopup();
                            $location.hash("spellgroup_1_2");
                            $ionicScrollDelegate.anchorScroll(true);
                        }
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
                            uploadImgService.upLoadImg(microSpellgroup1_1Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 1, scope.upLoadFinish);
                        };

                        //关闭弹窗
                        scope.closePopup = function (popupType) {
                            if (popupType == 1) {
                                scope.isShowFormPopup = false;
                                maskService.hideModal();
                            } else if (popupType == 2) {
                                scope.isShowNewGroupPopup = false;
                            } else if (popupType == 3) {
                                scope.isShowReApplyPopup = false;
                            } else if (popupType == 4) {
                                scope.isShowSpellGroupSuccess = false;
                            }
                            //else if (popupType == 5) {
                            //    scope.isShowNewGroupPopup2 = false;
                            //}
                            renderFreezeAllScrolls();
                            $timeout(function () {
                                $ionicScrollDelegate.resize();
                            }, 200)
                        }
                        scope.closeAllPopup = function (popupType) {

                            scope.isShowFormPopup = false;
                            scope.isShowNewGroupPopup = false;
                            scope.isShowReApplyPopup = false;
                            scope.isShowSpellGroupSuccess = false;
                            maskService.hideModal();
                            //scope.isShowNewGroupPopup2 = false;
                            renderFreezeAllScrolls();
                            $timeout(function () {
                                $ionicScrollDelegate.resize();
                            }, 200)
                        }
                        //
                        scope.showPopup = function (popupType) {
                            if (popupType == 1) {
                                //scope.isShowFormPopup = true;
                                showFormView();


                            } else if (popupType == 2) {
                                scope.isShowNewGroupPopup = true;
                            } else if (popupType == 3) {
                                scope.isShowReApplyPopup = true;
                            } else if (popupType == 4) {
                                scope.isShowSpellGroupSuccess = true;
                            }
                            //else if (popupType == 5) {
                            //    scope.isShowNewGroupPopup2 = true;
                            //}
                            renderFreezeAllScrolls();


                        }
                        //重新报名
                        scope.reApply = function () {
                            scope.closeAllPopup();
                            scope.showPopup(1);
                        }

                        //查看我的团
                        scope.goToMySpellGroup = function () {
                            scope.closeAllPopup();
                            $rootScope.$state.go("activity.oldandnewview", {
                                Id: $rootScope.$stateParams.Id,
                                oldUser: scope.currentUser.activityUserId,
                                introducerId: scope.currentUser.introducerUserId
                            });

                        }

                        //设置jsjdk--link
                        scope.resetShareConfigOfCurrentLink = function () {
                            var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";
                            var link = window.shareServer + "/" + shareRouter + "?p=" + encodeURIComponent("activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + ($rootScope.$stateParams.oldUser || "") + "&introducerId=" + ($rootScope.$stateParams.introducerId || ""));

                            var config = commonNetService.getShareConfig();
                            if (config) {
                                config.link = link;
                                commonNetService.setShareMessageReception(config).then(function () { }, function () {
                                    promptBarService.showErrorBar("分享信息设置出错", 3000);
                                });
                            }
                        }
                        //设置jsjdk---微拼团
                        scope.resetShareConfig = function (activityUserId, introducerId, needHelp, currntHelpCount, userName, userHeaderImg) {
                            var title = "";
                            var link = "";
                            var desc = "";
                            var imgUrl = "";

                            var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";
                            link = window.shareServer + "/" + shareRouter + "?p=" + encodeURIComponent("activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + (activityUserId || "") + "&introducerId=" + (introducerId || ""));
                            if (currntHelpCount >= needHelp) {
                                title = "【" + scope.templateModel.title + "】恭喜" + userName + "拼团成功！大家都来拼团吧！";

                            } else {
                                title = "【" + scope.templateModel.title + "】" + userName + "喊你一起来拼团！【还差" + (needHelp - currntHelpCount) + "人】";

                            }
                            imgUrl = userHeaderImg;
                            desc = "【" + scope.templateModel.description[0] + "】，微拼团享优惠，爱“拼”才会赢！";
                            //设置
                            var config = commonNetService.getShareConfig();
                            if (config) {
                                var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";
                                config.link = link;
                                config.title = title;
                                config.desc = desc;
                                config.imgUrl = imgUrl || config.imgUrl;

                                commonNetService.setShareMessageReception(config).then(function () { }, function () {
                                    promptBarService.showErrorBar("分享信息设置出错", 3000);
                                });
                            }
                            console.log(needHelp, currntHelpCount)


                        }
                        scope.doHeaderAnimate = function () {
                            scope.isAnimate = true;
                            var animateEle = iElement.find("#animateHeaderImg")[0], //动画元素
                                animateEleMoveAim = iElement.find(".headerImg_js")[scope.spellgroupUserList.length], //目标位置上的元素
                                elementX = iElement.find(".disx_js")[0],
                                elementY = iElement.find(".disy_js")[0];
                            return scope.doAnimate({
                                sx: elementX.offsetLeft,
                                sy: elementX.offsetTop,
                                ex: animateEleMoveAim.offsetLeft,
                                ey: animateEleMoveAim.offsetTop,
                                element: animateEle,
                                elementX: elementX,
                                elementY: elementY,
                                elementScale: iElement.find(".scale_js")
                            });

                        };

                        scope.doAnimate = function (config) {
                            var config = config || {
                                sx: "动画元素x值",
                                sy: "动画元素y值",
                                ex: "目标元素x值",
                                ey: "目标元素y值",
                                element: "动画元素",
                                elementX: "控制x轴",
                                elementY: "控制y轴",
                                elementScale: "控制缩放"
                            };
                            console.log(config.sx, config.ex, config.sy, config.ey);
                            var deferred = $q.defer();

                            var disX = config.ex - config.sx,
                                disY = config.ey - config.sy;

                            $timeout(function () {

                                config.elementScale.addClass("bounceIn");

                                config.elementX.style.transform = 'translateX(' +
                                    disX + 'px' + ')';
                                config.elementY.style.transform = 'translateY(' +
                                    disY + 'px' + ')';
                                $timeout(function () {
                                    //做完动画，动画元素消失
                                    config.element.remove();
                                    deferred.resolve();

                                }, 1650)
                            }, 0);

                            return deferred.promise;
                        };

                        //设置需要的助力人数（参团人数）
                        scope.changeNeedHelpCount = function () {
                            //是否有人参与报名/助力
                            if (!scope.isActived) {

                                var dataList = [{
                                    name: "3人",
                                    value: 3
                                }, {
                                    name: "6人",
                                    value: 6
                                }, {
                                    name: "10人",
                                    value: 10
                                }, ];
                                var info = "当有人参与报名后,成团人数将不可再更改";
                                //初始化下拉组件
                                comboboxService.showCombobox(dataList, scope.activityExtConfig.NeedHelpCount, info, setNeedHelpCountListValue);
                            }
                        };
                        function showFormView() {
                            var template = "<micro_spellgroup1by1-step2></micro_spellgroup1by1-step2>"
                            var el = $compile(template)(scope);
                            maskService.initModal(el);
                            maskService.showModal(el);
                        }

                        //设置拼团人数
                        function setNeedHelpCountListValue(slelectObj) {
                            scope.activityExtConfig.NeedHelpCount = slelectObj.value;
                        }
                        //根据是否有弹窗打开，重置是否锁屏
                        var renderFreezeAllScrolls = function () {
                            //报名弹窗
                            //scope.isShowFormPopup = false;
                            ////参团已满弹窗：开新团、选择其他团
                            //scope.isShowNewGroupPopup = false;
                            ////查看我的团，使用新号码报名
                            //scope.isShowReApplyPopup = false;
                            if (scope.isShowFormPopup || scope.isShowNewGroupPopup || scope.isShowReApplyPopup || scope.isShowSpellGroupSuccess) {
                                //置顶锁屏，禁止滑动
                                $ionicScrollDelegate.scrollTop();
                                $ionicScrollDelegate.freezeAllScrolls(true);
                            } else {
                                $ionicScrollDelegate.freezeAllScrolls(false);
                            }
                            if (scope.activityIsEnd) {
                                $ionicScrollDelegate.freezeAllScrolls(false);
                            }
                        }
                        //初始化表单页数据
                        var initFormViewData = function () {
                            if (scope.status != "view") {
                                scope.defaultUserInfo = {
                                    name: "",
                                    phone: "",
                                    headImg: defaultHeadImgUrl
                                };

                            } else {
                                microSpellgroup1_1Service.getWeixinUserInfo().success(function (result) {
                                    if (result.status == 1) {
                                        scope.defaultUserInfo = {
                                            name: "",
                                            phone: "",
                                            headImg: result.data.HeadImgUrl || defaultHeadImgUrl
                                        };
                                    } else {
                                        promptBarService.showErrorBar(result.message, 3000);
                                    }
                                });
                            }

                        };
                        var timeInstance = null;
                        var initTimer = function () {
                            var now = new Date();
                            console.log("dasda");
                            scope.mydatetime = new Date(scope.activityOtherConfig.endDate);
                            scope.settings = {
                                animate: 'fade',
                                theme: 'material', // 样式
                                lang: 'zh', // 语言
                                display: 'bottom', // 显示位置    
                                mode: 'scroller', //显示方式
                                minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1), //最小值
                                showLabel: true,
                                dayText: '日',
                                monthText: '月',
                                yearText: '年',
                                hourText: '时', //面板中年月日文字
                                dateWheels: "yymmdd",
                                timeWheels: 'HH',
                                minWidth: 70,
                                onSelect: function (valueText) {
                                    scope.activityOtherConfig.endDate = valueText;
                                } //保存日期
                            };



                            scope.showDateTime = function () {
                                timeInstance = this.myInstance;
                                timeInstance.show();
                            }
                            //退出时，时间面板消失
                            var stateChangeStart = $rootScope.$on("$stateChangeStart",
                                function (event, toState, toParams, fromState, fromParams) {
                                    if (timeInstance != null) {
                                        timeInstance.destroy();
                                    }
                                });
                            scope.$on("$destroy", function () {
                                //destroy the ui.router [stateChageStart] event
                                stateChangeStart();
                            });

                            var now = new Date();
                            var endTime = new Date(scope.activityOtherConfig.endDate);
                            scope.time = (endTime.getTime() - now.getTime()) / 1000;

                            //倒计时
                            scope.timer = $interval(function () {
                                if (scope.time <= 0) {
                                    $interval.cancel(scope.timer);
                                    if (scope.isView) {
                                        scope.activityIsEnd = true;
                                        $timeout(function () {
                                            scope.$apply();
                                        }, 100)
                                        promptBarService.showErrorBar2("抱歉，您来晚了，活动已结束！");
                                        //scope.closeAllPopup();
                                    }
                                } else {
                                    scope.time--;
                                }
                            }, 1000);


                        }

                        //获取当前用户是否已参加活动用户的团 todo 获取当前用户信息
                        scope.renderCurrentUserInfo = function () {
                            return microSpellgroup1_1Service.getHelpUserInfo($rootScope.$stateParams.oldUser).success(function (result) {
                                if (result.status == 1) {
                                    scope.currentUser.isApplyThisGroup = result.data.IsHelp;
                                    if (scope.currentUser.isApplyThisGroup) {
                                        scope.currentUser.introducerUserId = result.data.IntroducerUserId;
                                        scope.currentUser.activityUserId = $rootScope.$stateParams.oldUser;
                                        scope.currentUser.name = result.data.Name || "";
                                        scope.currentUser.headImg = result.data.HeadImgUrl || scope.defaultHeadImg;
                                    }
                                } else {
                                    promptBarService.showErrorBar(result.message);
                                }
                            });
                        };
                        //获取参与该团的的用户列表 scope.userListByGroupId 
                        scope.renderHelperList = function () {
                            return microSpellgroup1_1Service.getHelperList($rootScope.$stateParams.oldUser).success(function (result) {
                                if (result.status == 1) {
                                    scope.spellgroupUserList = result.data.list;
                                } else {
                                    promptBarService.showErrorBar(result.message);
                                }
                            });
                        };


                        //拼团的默认用户列表
                        var renderSpellgroupDefaultUserList = function () {
                            var defaultName = "虚位以待";
                            var defaultHeaderImg = window.resourceDoMain + "/app/img/spellgroup_icon_default.jpg";
                            //scope.spellgroupDefaultUserList = new Array(scope.activityExtConfig.NeedHelpCount);
                            //scope.spellgroupDefaultUserList.fill({
                            //    name: defaultName,
                            //    headerImg: defaultHeaderImg
                            //});
                            scope.spellgroupDefaultUserList = scope.spellgroupDefaultUserList;
                            for (var i = 0; i < scope.activityExtConfig.NeedHelpCount; i++) {
                                scope.spellgroupDefaultUserList.push({
                                    name: defaultName,
                                    headerImg: defaultHeaderImg
                                });
                            }


                        }

                        var stateChangeStart = $rootScope.$on("$stateChangeStart",
                            function (event, toState, toParams, fromState, fromParams) {
                                if (timeInstance != null) {
                                    timeInstance.destroy();
                                }
                                $interval.cancel(scope.timer);
                                //解锁屏幕
                                $ionicScrollDelegate.freezeAllScrolls(false);

                            });
                        scope.$on("$destroy", function () {
                            //destroy the ui.router [stateChageStart] event
                            stateChangeStart();
                            maskService.initModal("");

                        });

                        init();

                    }
                }
            }
        ]);
});