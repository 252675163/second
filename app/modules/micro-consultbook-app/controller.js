"use strict";
/**
 * author :
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["ionic", "modules/micro-consultbook-app/services"],
    function() {
        return angular.module("MicroConsultBookApp.controllers", ["MicroConsultBookApp.services"])
            .controller("MicroConsultBookAppController", [
                "$scope", "$rootScope", "$q", "commonNetService", "MicroConsultBookAppService", "promptBarService", "$timeout","$ionicPopup",
                function($scope, $rootScope, $q,commonNetService, microConsultBookAppService, promptBarService, $timeout,$ionicPopup) {
                    var pageSize = 10;
                    $scope.baseImgUrl = window.resourceDoMain+"/app/img/"

                    //咨询本参数
                    $scope.page = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };
                    $scope.consultdate = [];

                    //格式化日期
                    $scope.formatDateByStatistics = function(data) {
                        var d = new Date(parseInt(data.substr(6, 13)));
                        var year = d.getFullYear();
                        var month = d.getMonth() + 1;
                        var date = d.getDate();

                        if(month.toString().length == 1){
                            month = "0" + month;
                        }

                        if(date.toString().length == 1){
                            date = "0" + date;
                        }

                        return year + "-" + month + "-" + date;
                    };

                    //进入活动列表
                    $scope.goconsultbooklist = function() {
                        //$rootScope.$state.go("consultbooklist", { type: $scope.modeltype }, {
                        //    reload: true,
                        //    inherit: false
                        //});
                        $scope.showConsultsBookList = true;
                    };

                    //关闭活动列表
                    $scope.closeConsuleList = function () {
                        $scope.showConsultsBookList = false;
                    }

                    //咨询本滚动加载
                    $scope.loadMore = function() {
                        $scope.getconsults($scope.modelId, $scope.page.currentIndex + 1, pageSize, $scope.modeltype, "add").then(function() {
                            $scope.$broadcast("scroll.infiniteScrollComplete");

                        });
                    };

                    //获取咨询本数据
                    $scope.getconsults = function(id, pageIndex, pageSize, type, queryType) {
                        var d = $q.defer();
                        //queryType = "reset"or "add"
                        if (!queryType) {
                            queryType = "reset";
                        }
                        microConsultBookAppService.GetConsults(id, pageIndex, pageSize, type).success(function(result) {

                            if (result.status == 1) {
                                d.resolve();
                                if (result.data.info.ShareConfig) {
                                    $scope.Title = JSON.parse(result.data.info.ShareConfig).title;
                                } else {
                                    //默认名字
                                    var defaultShareModel = microConsultBookAppService.getTemplateDefaultTitle(result.data.info.TemplateId, type);
                                    $scope.Title = defaultShareModel.title;
                                }
                                $scope.page = result.data.page;
                                var list = result.data.list;
                                for (var i = 0; i < list.length; i++) {
                                    list[i].CreatedAt = $scope.formatDateByStatistics(list[i].CreatedAt);
                                }
                                if (queryType == "add") {
                                    $scope.data = $scope.data.concat(list);
                                } else {
                                    $scope.data = list;
                                }
                                //判断是否是投票 显示 删除/回复按钮
                                if(result.data.info.TemplateCode=="Vote"){
                                    $scope.isShowDelete = true;
                                }
                                //判断是否是种草活动，hardcode by xp 2015年12月7日 17:07:44
                                if (result.data.info.TemplateId == 13 || result.data.info.TemplateId == 14 || result.data.info.TemplateId == 19 || result.data.info.TemplateCode == "Vote" || result.data.info.TemplateCode == "Aquarium" || result.data.info.TemplateCode == "Assistant") {
                                    $scope.isGrassActivity = true;
                                } else {
                                    $scope.isGrassActivity = false;
                                }

                                //日期
                                for (var j = 0; j < $scope.data.length; j++) {
                                    if (j == 0) {
                                        $scope.consultdate = [];
                                        $scope.consultdate.push($scope.data[j].CreatedAt);
                                    } else {
                                        if ($scope.data[j].CreatedAt != $scope.data[j - 1].CreatedAt) {
                                            $scope.consultdate.push($scope.data[j].CreatedAt);
                                        }
                                    }

                                    //处理备注 兼容老数据 by xp 2015年11月25日 17:15:24
                                    //咨询对象中增加两个字段，IsJson：表明当前备注是否为Json格式  ReMark：表明当前的备注信息（Object类型）
                                    try {
                                        if (angular.isNumber(angular.fromJson($scope.data[j].Content))) {
                                            $scope.data[j].IsJson = false;
                                        } else {
                                            $scope.data[j].ReMark = angular.fromJson($scope.data[j].Content);
                                            $scope.data[j].IsJson = true;
                                        }
                                    }catch(err){
                                        $scope.data[j].IsJson = false;
                                    }

                                }




                            } else {
                                d.reject(result.message);
                                promptBarService.showErrorBar(result.message);
                            }

                        });
                        return d.promise;
                    };
                    //更改 删除/恢复 状态
                    $scope.updateDelete = function(user){

                        var text = user.IsDeleted?"恢复":"取消";
                        var text2 = user.IsDeleted?"恢复资格后，该参赛人员的票数和对应排名将恢复，</br>确认恢复资格？":"取消资格后，该参赛人员信息将不会在首页显示，</br>确认取消资格？";
                        var confirmPopup = $ionicPopup.confirm({
                            template: "<span style='line-height: 1.5;'><p class='confirm_title' style='font-weight: bold;'>"+text+"参赛资格</p><p class='confirm_content'>"+text2+"</p></span>",
                            cancelText: "我再想想",
                            okText: text+"资格"
                        });
                        confirmPopup.then(function(res) {
                            if (res) {
                                microConsultBookAppService.UpdateActivityUserIsDeleted(user.ActivityUserId).success(function(result){
                                    if(result.status==1){
                                        user.IsDeleted = !user.IsDeleted;
                                    }
                                })
                            }
                        });
                    }

                    //活动列表参数
                    //2015.12.14 by yinglechao 更改将100改为1， 活动的报名报只获取活动的实例，不再获取官网类型的实例
                    $scope.consultsListType = 1;
                    $scope.Listpage = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };

                    //获取活动数据
                    $scope.getconsultsList = function (pageIndex, pageSize,type) {

                        microConsultBookAppService.GetUserSummaries(pageIndex, pageSize, type).success(function (result) {
                            if (result.status == 1) {
                                $scope.Listdata = result.data.list;
                                $scope.Listpage = result.data.page;
                                if ($scope.Listdata.length <= 1) {
                                    $scope.showlists = false;
                                    return;
                                }
                                for (var i = 0; i < $scope.Listdata.length; i++) {
                                    if ($scope.Listdata[i].ShareConfig) {
                                        $scope.Listdata[i].Title = JSON.parse($scope.Listdata[i].ShareConfig).title;
                                    } else {
                                        var defaultShareModel = microConsultBookAppService.getTemplateDefaultTitle($scope.Listdata[i].TemplateId, $scope.Listdata[i].Type);
                                        $scope.Listdata[i].Title = defaultShareModel.title;
                                    }
                                }

                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        });
                    }

                    //活动列表滚动加载
                    $scope.ListloadMore = function () {
                        microConsultBookAppService.GetUserSummaries($scope.Listpage.currentIndex + 1, pageSize, $scope.consultsListType).success(function (result) {
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            if (result.status == 1) {
                                var list = result.data.list;
                                for (var i = 0; i < list.length; i++) {
                                    if (list[i].ShareConfig) {
                                        list[i].Title = JSON.parse(list[i].ShareConfig).title;
                                    } else {
                                        var defaultShareModel = microConsultBookAppService.getTemplateDefaultTitle(list[i].TemplateId, list[i].Type);
                                        list[i].Title = defaultShareModel.title;
                                    }
                                }
                                $scope.Listdata = $scope.Listdata.concat(list);
                                $scope.Listpage = result.data.page;
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }


                        });
                    };

                    //进入咨询本 初始化咨询本参数
                    $scope.consults = function (id, type) {
                            // $rootScope.$state.go("consultbook", { id: id, type: type }, {
                            //     reload: true,
                            //    inherit: false
                            //});

                        $(".lockMask-loading2").show();

                        $scope.page = {
                            totalCount: "",
                            currentIndex: "",
                            itemCount: ""
                        };
                        $scope.consultdate = [];

                        $scope.showConsultsBookList =false;
                        $scope.modeltype =type;
                        $scope.modelId = id;
                        $scope.getconsults($scope.modelId, 1, pageSize, $scope.modeltype);

                        //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
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


                    $scope.init = function () {
                        commonNetService.addBackgroundOperationLog("LeadsListOld");

                        $scope.showlists = true;
                        $scope.showBannerNone = false;
                        $scope.showConsultsBookList = false;
                        if (!$scope.$stateParams.id) {
                            //1:pageIndex,1:pageSize,100:全部（微官网、微活动）
                            microConsultBookAppService.GetUserSummaries(1, 1, 100).success(function (result) {
                                if (result == "<input type='hidden' id='ErrorCode' value='497' />") {
                                    window.location.href = "/Common/error?mark=MicroConsultBookAppController_init_GetUserSummaries_result_Equal_497";
                                } else {
                                    //if (result === 0) {
                                    //    $(".active_add_empty").show();
                                    //}
                                    if (result.data.list == "") {
                                        $scope.showBannerNone = true;
                                        return;
                                    }
                                    $scope.modelId = result.data.list[0].Id;
                                    $scope.modeltype = result.data.list[0].Type;
                                    $scope.getconsults($scope.modelId, 1, pageSize, $scope.modeltype);
                                    $scope.getconsultsList(1, pageSize, $scope.consultsListType);
                                }

                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
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
                            });
                        } else {
                            $scope.modeltype = $scope.$stateParams.type;
                            $scope.modelId = $scope.$stateParams.id;
                            $scope.getconsults($scope.$stateParams.id, 1, pageSize, $scope.modeltype);
                            $scope.getconsultsList(1, pageSize, $scope.consultsListType);

                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
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

                    };
                    $scope.init();

                }
            ]);
    });