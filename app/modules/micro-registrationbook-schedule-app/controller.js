"use strict";
/**
 * author :zhouhuijuan
 * create time: 2016/9/20
 * description:咨询本日程
 */


define(["ionic", "modules/micro-registrationbook-schedule-app/services"],
    function () {
        return angular.module("MicroRegistrationBookScheduleApp.controllers", ["MicroRegistrationBookScheduleApp.services", "TextInputCallback"])
            .controller("MicroRegistrationBookScheduleAppController", [
                "$scope", "$filter", "$rootScope", "$q", "$sce", "MicroRegistrationBookScheduleAppService", "MicroRegistrationBookAppService", "promptBarService", "commonNetService", "$timeout", "textInputCallbackService", "$ionicScrollDelegate", "permissionService", "maskService", "$location",
                function ($scope, $filter, $rootScope, $q, $sce, MicroRegistrationBookScheduleAppService,MicroRegistrationBookAppService, promptBarService, commonNetService, $timeout, textInputCallbackService, $ionicScrollDelegate, permissionService, maskService, $location) {
                    $scope.scheduleList = [];
                    var pageSize = 15;
                    $scope.page = {
                        totalCount: 0,
                        currentIndex: 1,
                        itemCount: 0
                    };
                    $scope.weekday = ['日', '一', '二', '三', '四', '五', '六'];
                    $scope.myActiveSlide = 1;
                    $scope.selectDay = "";
                    $scope.today = "";
                    $scope.WeeklySchedule = [];
                    $scope.showNoData = false;
                    $scope.render = function (date) {
                        $scope.calendarPrev = [];
                        $scope.calendarData = [];
                        $scope.calendarNext = [];
                        var day = date.getDate();
                        var weekd = date.getDay();
                        if (weekd == 0) {
                            weekd = 7;
                        }
                        for (var i = -weekd - 6; i <= - weekd; i++) {
                            var d = new Date(date);
                            d.setDate(day + i);
                            $scope.calendarPrev.push(d);
                        }
                        for (var i = -weekd + 1; i <= 7 - weekd; i++) {
                            var d = new Date(date);
                            d.setDate(day + i);
                            var calenDate = {hasRemind:false,date:d};
                            $scope.calendarData.push(calenDate);
                        }
                        for (var i = -weekd + 8; i <= 14 - weekd; i++) {
                            var d = new Date(date);
                            d.setDate(day + i);
                            $scope.calendarNext.push(d);
                        }
                    };
                    var mySwiper = new ionic.views.Swiper('#swpercalendar', {
                        initialSlide: 1,
                        threshold: 10,
                        observer: true,
                        direction: 'horizontal',
                        loop: false,
                        slideToClickedSlide: false,
                        freeMode: false,
                        resistance: true,
                        onTransitionEnd: function (mySwiper) {
                            if (mySwiper.activeIndex != 1) {
                                mySwiper.slideTo(1, 0, true);
                                var type = mySwiper.previousIndex == 2 ? 'next' : 'prev';
                                $scope.$apply(function () {
                                    $scope.changeWeek(type);
                                });
                                $scope.getScheduleWeekly();
                            }
                        }
                    }, $scope);
                    $scope.changeWeek = function (type) {
                        var dish = (type == 'next') ? 7 : -7;
                        $scope.selectDay.setDate($scope.selectDay.getDate() + dish);
                        $scope.getSchedule();
                        $scope.render($scope.selectDay);
                    };
                    $scope.chooseDay = function (data) {
                        //选择日期百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/schedule/date"]);
                        }
                        $scope.showReload = false;
                        if (data.date.getDate() != $scope.selectDay.getDate()) {
                            $scope.selectDay = data.date;
                            $scope.scheduleList = [];
                             if (data.hasRemind){
                                $scope.getSchedule();
                             }
                             else {
                                 $scope.showNoData = true;
                             }
                        } 
                    };
                    //获取日程列表
                    $scope.getSchedule = function () {
                        $scope.scheduleList = [];
                        $scope.showReload = false;
                        $scope.showNoData = false;
                           MicroRegistrationBookScheduleAppService.getScheduleList(1, pageSize, $scope.selectDay).success(function (result) {
                               if (result.status == 1) {
                                   $ionicScrollDelegate.scrollTop();
                                   $scope.page = result.data.page;
                                   //判断有没有结果
                                    if (result.data.list.length==0) {
                                        $scope.showNoData = true;
                                    }
                                    else {
                                        $scope.showNoData = false;
                                        angular.forEach(result.data.list, function (model) {
                                            var scheduleModel = MicroRegistrationBookScheduleAppService.parseBizModelToUiModel(model);
                                            $scope.scheduleList.push(scheduleModel);
                                        });
                                    }
                                } else {
                                    promptBarService.showErrorBar(result.message, 3000);
                                }
                           }).error(function (result) {
                               if (angular.equals(result, null)) {
                                   $scope.showReload = true;
                                   $scope.showNoData = false;
                               }
                           });
                    }
                    //获取一周内的日程数量
                    $scope.getScheduleWeekly = function () {
                        MicroRegistrationBookScheduleAppService.getCommuRemindCount($scope.calendarData[0].date, $scope.calendarData[6].date).success(function (result) {
                            if (result.status == 1) {
                                $scope.WeeklySchedule = result.data;
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                            if ($scope.WeeklySchedule.length != 0) {
                                for (var i = 0; i < $scope.calendarData.length; i++) {
                                    for (var j = 0; j < $scope.WeeklySchedule.length; j++) {
                                        var dateFromJson = $scope.formatDateByStatistics($scope.WeeklySchedule[j].QueryDate);
                                        if ($scope.calendarData[i].date.getDate() == dateFromJson.getDate()) {
                                            $scope.calendarData[i].hasRemind = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        });
                    }

                    //格式化输出时间
                    $scope.formatDateByStatistics = function (data) {
                        return data && new Date(parseInt(data.substr(6, 13)));
                    };
                    //保存当前日期
                    var saveScheduleDate= function () {
                        var ScheduleDate = angular.copy($scope.selectDay);
                        MicroRegistrationBookAppService.setScheduleDate(ScheduleDate);
                    }
                    //滚动加载
                    $scope.loadMoreSchedule = function () {
                        MicroRegistrationBookScheduleAppService.getScheduleList($scope.page.currentIndex + 1, pageSize, $scope.selectDay).success(function (result) {
                            if (result.status == 1) {
                                $scope.page = result.data.page;
                                if (result.data.list.length != 0) {
                                    angular.forEach(result.data.list, function (model) {
                                        var scheduleModel = MicroRegistrationBookScheduleAppService.parseBizModelToUiModel(model);
                                        $scope.scheduleList.push(scheduleModel);
                                    });
                                }             
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                        });
                    };
                    $scope.goAllList = function () {
                        $scope.$state.go("registrationbook.registrationbookall");
                    }
                    $scope.goStatistics = function () {
                        $scope.$state.go("registrationbook.statistics");
                    }
                    $scope.goChannel = function () {
                        $scope.$state.go("registrationbook.channel");
                    }
                    $scope.goToday = function () {
                        //回到今天百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/schedule/backtotoday"]);
                        }
                        $scope.today = new Date();
                        $scope.selectDay = new Date($scope.today);
                        $scope.render($scope.selectDay);
                        $scope.getSchedule();
                        $scope.getScheduleWeekly();
                    }
                    //跳转到我的场景
                    $scope.goMyScenes = function () {
                        $scope.$state.go("index", {});
                    }
                    //跳转微店
                    $scope.goMicroShop = function () {
                        window.location.href = commonNetService.getMicroShopRouter();
                    }
                    //跳转到个人中心
                    $scope.goUserCenter = function () {
                        $scope.$state.go("userCenter", {});
                    };
                    $scope.toDetailPage = function (regUserId,page) {
                        //进入详情页面百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/clientdetail/tracebyschedule"]);
                        }
                        MicroRegistrationBookScheduleAppService.markAsRead(regUserId).success(function (result) {
                            if (result.status == 0) {
                                promptBarService.showErrorBar(result.message);
                            }
                        });
                        saveScheduleDate();
                        $scope.$state.go("registrationbook.registrationbookdetail", { id: regUserId, showPage: page });
                    }
                    //初始化
                    $scope.init = function () {
                        
                        //日活统计
                        commonNetService.addBackgroundOperationLog("LeadsList");
                        $scope.showlists = true;
                        $scope.showBannerNone = false;
                        $scope.selectDay = MicroRegistrationBookAppService.getScheduleDate();
                        if ($scope.selectDay != "") {
                            $scope.render($scope.selectDay);
                            $scope.getSchedule();
                            $scope.getScheduleWeekly();
                        }
                        else {
                           //初始化日期
                            $scope.goToday();
                        }

                        //统一增加后台页面的Loading效果 
                        if (!$rootScope.isFirstLoad) {
                            $timeout(function () {
                                $(".lockMask-loading2").hide();
                                $rootScope.isFirstLoad = true;
                            }, 1833);
                        } else {
                            $timeout(function () {
                                $(".lockMask-loading2").hide();
                                $rootScope.isFirstLoad = true;
                            }, 1000);
                        }
                    };
                    
                    $scope.init();

                }
            ]);
    });