"use strict";
/**
 * author :lv li、xujie、jiawen xu
 * update time: 2016/8/2
 * description:跟进列表
 */


define(["ionic", "modules/micro-registrationbook-ongoing-app/services"],
    function () {
        return angular.module("MicroRegistrationBookOngoingApp.controllers", ["MicroRegistrationBookOngoingApp.services", "TextInputCallback"])
            .controller("MicroRegistrationBookOngoingAppController", [
                "$scope", "$filter", "$rootScope", "$q", "$sce", "MicroRegistrationBookOngoingAppService", "promptBarService", "commonNetService", "$timeout", "textInputCallbackService", "$ionicScrollDelegate", "permissionService", "maskService","$location",
                function ($scope, $filter, $rootScope, $q, $sce, MicroRegistrationBookOngoingAppService, promptBarService, commonNetService, $timeout, textInputCallbackService, $ionicScrollDelegate, permissionService, maskService,$location) {

                    var pageSize = 15, statusList = [], templateIdList = [];
                    var headBgcolor = ["#6090cd", "#90d355", "#fec42c", "#e3547f", "#ff7f5d", "#49c5d8"];
                    var timeInstance = null;

                    $scope.defaultContent = "该线索还没有沟通记录或未填写沟通内容";
                    $scope.baseImgUrl = window.resourceDoMain + "/app/img/";
                    $scope.showAllList = false;

                    $scope.onGoingListData = [];
                    $scope.normalDateList = [];
                    $scope.onGoingListDate = [];
                    $scope.newUserNum = 0;
                    var queryType = '';

                    $scope.onGoingListPage = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };

                    //置顶操作
                    $scope.markTop = function (regUser) {
                        regUser.IsTop = !regUser.IsTop;
                        //置顶操作百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/registrationbook/CRMongong/tag"]);
                        }
                        MicroRegistrationBookOngoingAppService.markTop(regUser.Id, regUser.IsTop).success(function (result) {
                            if (result.status == 0) {
                                promptBarService.showErrorBar(result.message);
                                regUser.IsTop = !regUser.IsTop;
                            }
                        });
                    }

                    //切换到全部列表
                    $scope.goAllList = function () {
                        $scope.$state.go("registrationbook.registrationbookall");
                    }

                    $scope.showSearch = function () {
                        $scope.$state.go("registrationbook.registrationbooksearch");
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

                    //获取默认头像背景色
                    $scope.getHeadImageBg = function (name) {
                        if (name.length > 0) {
                            return headBgcolor[name[0].charCodeAt() % 6];
                        }
                    }

                    //获取新用户数量
                    $scope.getNewUserNum = function () {
                        MicroRegistrationBookOngoingAppService.getNewUserNum().success(function (result) {
                            if (result.status == 1) {
                                $scope.newUserNum = result.data;
                            }
                            else {
                                promptBarService.showErrorBar(result.message);
                            }
                        });
                    }
                    //拨打电话百度统计埋点
                    $scope.callTel = function () {
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/registrationbook/CRMongong/ring"]);
                        }
                    }


                    //添加沟通记录
                    var charType = {
                        type: "other",
                        maxLength: 500,
                        isDiff: false
                    }
                    $scope.addCommunication = function (regUser) {
                        //添加沟通记录百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/registrationbook/CRMongong/add"]);
                        }

                        textInputCallbackService.showTextInput("", callback, charType);
                        function callback() {
                            $scope.setCommuContent(regUser, textInputCallbackService.getCurrentValue());
                        }

                    }
                    $scope.setCommuContent = function (regUser, content) {
                        var con = $scope.stringTrim(content)
                        if (con == "") {
                            return;
                        }
                        var newContent = content;
                        MicroRegistrationBookOngoingAppService.createCommu(regUser.Id, content).success(function (result) {
                            if (result.status == 1) {
                                MicroRegistrationBookOngoingAppService.getCommuList(regUser.Id,1,1).success(function (result) {
                                    if (result.status == 1) {
                                        regUser.isCommuShow = true;
                                        regUser.CommuContent = result.data.list[0].CommuContent;
                                        regUser.CommuResult = result.data.list[0].CommuResult;
                                        regUser.CommuTime = $filter('formatJsonDate')(result.data.list[0].DateTime, "yyyy/MM/dd HH:mm");
                                    }
                                    else {
                                        promptBarService.showErrorBar(result.message);
                                    }
                                })
                            }
                            else {
                                promptBarService.showErrorBar(result.message);
                            }
                        });

                    }
                    $scope.toDetailPage = function (regUserId,page) {
                        //进入详情页面-沟通记录 百度统计埋点
                        if (window._hmt&&page==2) {
                            window._hmt.push(['_trackPageview', "/registrationbook/CRMdetails/tracebyCRMongong"]);
                        }
                        MicroRegistrationBookOngoingAppService.markAsRead(regUserId).success(function (result) {
                            if (result.status == 0) {
                                promptBarService.showErrorBar(result.message);
                            }
                        });
                        $scope.$state.go("registrationbook.registrationbookdetail", { id: regUserId, showPage: page });
                    }
                    $scope.regUserArr = [];

                    $scope.getRegBookUserList = function (pageIndex, pageSize, regBookUserListType, queryType, followUpStatusList, regBookTemplateTypeList) {
                        var d = $q.defer();
                        var isAllList = regBookUserListType == 1 ? true : false,
                            list = [];
                        queryType = !queryType ? "reset" : "add";
                        MicroRegistrationBookOngoingAppService.getRegBookUserList(pageIndex, pageSize, regBookUserListType, followUpStatusList, regBookTemplateTypeList).success(function (result) {
                            if (result.status == 1) {
                                list = result.data.info;
                                if (!isAllList) {
                                    $scope.onGoingListPage = result.data.page;
                                    var dataList = [];
                                    dataList = dataList.concat(list.Top);
                                    dataList = dataList.concat(list.Normal);
                                    angular.forEach(dataList, function (data, index) {
                                        data.CommuTime = $filter('formatJsonDate')(data.CommuTime, "yyyy/MM/dd HH:mm");
                                        data.CommuContent = $scope.stringTrim(data.CommuContent) == '' ? null : data.CommuContent;
                                        data.CommuResult = $scope.stringTrim(data.CommuResult) == '' ? null : data.CommuResult;
                                        if (data.CommuContent || data.CommuResult) {
                                            data.isCommuShow = true;
                                        } else {
                                            data.isCommuShow = false;
                                        }
                                    })
                                    $scope.onGoingListData = $scope.onGoingListData.concat(dataList);
                                    $scope.onGoingListEmpty = $scope.onGoingListData.length == 0 ? true : false;
                                }
                                d.resolve(result);
                            }
                            else {
                                d.reject(result);
                                promptBarService.showErrorBar(result.message);
                            }
                        })
                        return d.promise;
                    }

                    //去除字符串两边空格
                    $scope.stringTrim = function (string) {
                        if (string) {
                            return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                        } else {
                            return string;
                        }
                    }

                    //格式化日期
                    $scope.formatDateByStatistics = function (data) {
                        var d = new Date(parseInt(data.substr(6, 13)));
                        var year = d.getFullYear();
                        var month = d.getMonth() + 1;
                        var date = d.getDate();

                        if (month.toString().length == 1) {
                            month = "0" + month;
                        }

                        if (date.toString().length == 1) {
                            date = "0" + date;
                        }

                        return year + "-" + month + "-" + date;
                    };

                    //加载跟进中列表
                    $scope.loadOnGoingList = function () {
                        var index = $scope.onGoingListData.length > 0 ? $scope.onGoingListPage.currentIndex : 0,
                            queryType = $scope.onGoingListData.length > 0 ? "add" : "";
                        $scope.getRegBookUserList(index + 1, pageSize, 2, queryType).then(function () {
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                        });
                    };

                    //更新第一次遮罩提示显示状态
                    $scope.closeFirstRemind = function () {
                        MicroRegistrationBookOngoingAppService.updateUserConfig("IsShowRegBookGuide", "false").then(function (result) {
                            if (result.data.status == 1) {
                            }
                            else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        }, null);
                    }

                    //回访提醒时间选择
                    //var now = new Date();
                    //$scope.setVisitDateTime = {
                    //    animate: 'fade',
                    //    theme: 'material',      // 样式
                    //    lang: 'zh',    // 语言
                    //    display: 'bottom',  // 显示位置
                    //    minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()), //最小值
                    //    onSelect: function (valueText) {

                    //        if (window._hmt) {
                    //            window._hmt.push(['_trackPageview', "/registrationbook/CRMongong/callbackreminder"]);
                    //        }
                    //        var odlValue = $scope.changeVistDateTime.RecentVisitAt;
                    //        $scope.changeVistDateTime.RecentVisitAt = valueText;
                    //        MicroRegistrationBookOngoingAppService.setVisitTime($scope.changeVistDateTime.Id, valueText, 1).success(function (result) {
                    //            if (result.status != 1) {
                    //                promptBarService.showErrorBar(result.message);
                    //                $scope.changeVistDateTime.RecentVisitAt = odlValue;
                    //                $scope.changeVistDateTime.copyRecentVisitAt = odlValue;
                    //            }
                    //        });
                    //    },//设置回访提醒时间
                    //    onClear: function (event, inst) {
                    //        $scope.changeVistDateTime.RecentVisitAt = null;
                    //        MicroRegistrationBookOngoingAppService.setVisitTime($scope.changeVistDateTime.Id, "", 0).success(function (result) {
                    //            if (result.status != 1) {
                    //                promptBarService.showErrorBar(result.message);
                    //            }
                    //        });
                    //    },//删除回访提醒时间

                    //    buttons: [
                    //        'set',
                    //        'cancel',
                    //        'clear'
                    //    ],
                    //    clearText: '删除回访提醒',
                    //    showLabel: true, dayText: '日', monthText: '月', yearText: '年', hourText: '时', minuteText: '分',//面板中年月日文字
                    //    minWidth: 40//设置每列wheel的最小宽度


                    //};

                    //$scope.showVisitDateTime = function (regUser) {
                    //    timeInstance = this.myInstance;
                    //    now = new Date();
                    //    $scope.setVisitDateTime.minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
                    //    timeInstance.option($scope.setVisitDateTime);
                    //    timeInstance.show();
                    //    $scope.changeVistDateTime = regUser;
                    //}//暂存当前点击的对象

                    //初始化
                    $scope.init = function () {
                        
                        //日活统计
                        commonNetService.addBackgroundOperationLog("LeadsList");
                        $scope.showlists = true;
                        $scope.showBannerNone = false;
                        $scope.showConsultsBookList = false;
                        

                        //是否要显示第一次提醒
                        MicroRegistrationBookOngoingAppService.isShowNotice("IsShowRegBookGuide").then(function (result) {
                            if (result.data.status == 1) {
                                //判断当前用户是否要显示第一次提示
                                var isFirstVisiteBook = result.data.data.ConfigValue;
                                //获取当前用户信息，判断是否有地址信息  无则判断是否是第一次进入  是则获取位置 否则跳过 本地标签

                                commonNetService.getDistrictByUserId().then(function (res) {
                                    if (res.data.status == 1) {
                                        $scope.currentUserLocation = res.data.data;
                                        if ($scope.currentUserLocation && $scope.currentUserLocation.Id > 0) {

                                        } else {
                                            if (isFirstVisiteBook != "false") {
                                                //首次进入时获取当前位置 并保存
                                                commonNetService.getWxLocation()    //微信接口 定位获取经纬度 
                                                    .then(commonNetService.transWxtoBaidu)//误差坐标转换
                                                    .then(commonNetService.getGeoToAddress)//坐标转为地址 返回地址格式
                                                    .then(function (res1) {
                                                        if (res1.Id != "0") {
                                                            commonNetService.updateDistrictByUserId(res1.Id)
                                                                .success(function (res) {
                                                                    if (res.status == 1) {
                                                                        console.log(res);
                                                                        $timeout(function () {
                                                                            $scope.$apply(
                                                                                function () {
                                                                                    $scope.currentUserLocation.Id = res1.data.Id;
                                                                                }
                                                                            )
                                                                        }, 0);
                                                                    }
                                                                })
                                                        }
                                                    })
                                                    .catch(function (error) {
                                                        //promptBarService.showErrorBar("位置获取失败", 3000);
                                                    });
                                            }
                                        }
                                    } else {
                                        promptBarService.showErrorBar(res.data.message, 3000);
                                    }
                                });

                                /*if (isFirstVisiteBook != "false") {
                                    maskService.showMask("", 0, false, 32, $scope.closeFirstRemind);
                                }
                                */
                                $scope.getRegBookUserList(1, pageSize, 2, queryType).then(function (result) {
                                    if (result.status == 1) {
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
                                    }
                                    else {
                                        if (!$rootScope.isFirstLoad) {
                                            $timeout(function () {
                                                $(".lockMask-loading2").hide();
                                                $rootScope.isFirstLoad = true;
                                                promptBarService.showErrorBar(result.message, 3000);
                                            }, 1833);
                                        } else {
                                            $timeout(function () {
                                                $(".lockMask-loading2").hide();
                                                $rootScope.isFirstLoad = true;
                                                promptBarService.showErrorBar(result.message, 3000);
                                            }, 1000);
                                        }
                                    }
                                }, null);
                            }
                            else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        }, null);



                        $scope.getNewUserNum();
                    };
                    
                    $scope.init();
                        

                    //退出时，输入框隐藏
                    var stateChangeStart = $rootScope.$on("$stateChangeStart",
                        function (event, toState, toParams, fromState, fromParams) {
                            textInputCallbackService.hideTextInput();
                        });


                    $scope.$on("$destroy", function () {
                        //destroy the ui.router [stateChageStart] event
                        stateChangeStart();
                    });

                }
            ]);
    });