"use strict";
/**
 * author :
 * time:
 * description:咨询本搜索页
 */

define(["ionic", "modules/micro-registrationbook-search-app/services"],
    function() {
        return angular.module("MicroRegistrationbookSearchApp.controllers", ["MicroRegistrationbookSearchApp.services"])
            .controller("microRegistrationbookSearchAppController", [
                "$scope", "$rootScope", "promptBarService", "$sce", "commonNetService", "microRegistrationbookSearchAppService", "$ionicPopup", "$timeout", "maskService", "MicroRegistrationBookAppService", "$ionicScrollDelegate", "comboboxService", "permissionService", "$ionicHistory",
                function($scope, $rootScope, promptBarService, $sce, commonNetService, microRegistrationbookSearchAppService, $ionicPopup, $timeout, maskService, MicroRegistrationBookAppService, $ionicScrollDelegate, comboboxService, permissionService, $ionicHistory) {

                    var pageSize = 15;
                    $scope.showNoData = false;
                    $scope.search = MicroRegistrationBookAppService.getSearchCondition();

                    $scope.hideSearch = function() {
                            //$scope.$state.go($ionicHistory.backView().stateName);
                            $scope.$state.go("registrationbook.registrationbookall");
                        }
                        //保存搜索条件
                    var saveSearch = function() {
                        var searchCondition = angular.copy($scope.search);
                        MicroRegistrationBookAppService.setSearchCondition(searchCondition);
                    }

                    $scope.goRegistrationBookDetail = function(regUserId) {
                        saveSearch();
                        //进入详情页面百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/clientdetail/tracebyclientsearch"]);
                        }
                        $scope.$state.go("registrationbook.registrationbookdetail", { id: regUserId });
                    }

                    $scope.searchListContentPage = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };

                    $scope.searchListNamePage = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };

                    $scope.searchListPhonePage = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };

                    $scope.$watch('search', function(newValue, oldValue, $scope) {
                        if (newValue != oldValue) {
                            var regexp = /[^\d\u4e00-\u9fa5a-zA-Z]*/g;
                            $scope.search = newValue.replace(regexp, "");
                        }
                    });

                    $scope.showMoreResult = function(type) {
                        if (type == "content") {
                            microRegistrationbookSearchAppService.getMoreSearchResult(8, $scope.search, $scope.searchListContentPage.currentIndex + 1, pageSize).then(function(result) {
                                if (result.data.status == 1) {

                                    var contentList = result.data.data.list;
                                    $scope.searchListContentPage = result.data.data.page;

                                    for (var i = 0; i < contentList.length; i++) {
                                        contentList[i] = microRegistrationbookSearchAppService.parseBizModelToUiModel(contentList[i]);
                                        contentList[i].cname = $sce.getTrustedHtml(contentList[i].Name.replace($scope.search, "<span class='searched_content'>" + $scope.search + "</span>"));
                                        contentList[i].content = $sce.getTrustedHtml("沟通记录：" + contentList[i].Content.replace($scope.search, "<span class='searched_content'>" + $scope.search + "</span>"));
                                    }

                                    $scope.dataList.contentList = $scope.dataList.contentList.concat(contentList);
                                    $ionicScrollDelegate.resize();
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        } else if (type == "name") {
                            microRegistrationbookSearchAppService.getMoreSearchResult(1, $scope.search, $scope.searchListNamePage.currentIndex + 1, pageSize).then(function(result) {
                                if (result.data.status == 1) {

                                    var nameList = result.data.data.list;
                                    $scope.searchListNamePage = result.data.data.page;

                                    for (var i = 0; i < nameList.length; i++) {
                                        nameList[i] = microRegistrationbookSearchAppService.parseBizModelToUiModel(nameList[i]);
                                        nameList[i].cname = $sce.getTrustedHtml(nameList[i].Name.replace($scope.search, "<span class='searched_content'>" + $scope.search + "</span>"));
                                        nameList[i].phone = $sce.getTrustedHtml("手机：" + nameList[i].Phone.replace($scope.search, "<span class='searched_content'>" + $scope.search + "</span>"));
                                    }

                                    $scope.dataList.nameList = $scope.dataList.nameList.concat(nameList);
                                    $ionicScrollDelegate.resize();
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        } else if (type == "phone") {
                            microRegistrationbookSearchAppService.getMoreSearchResult(2, $scope.search, $scope.searchListPhonePage.currentIndex + 1, pageSize).then(function(result) {
                                if (result.data.status == 1) {

                                    var phoneList = result.data.data.list;
                                    $scope.searchListPhonePage = result.data.data.page;

                                    for (var i = 0; i < phoneList.length; i++) {
                                        phoneList[i] = microRegistrationbookSearchAppService.parseBizModelToUiModel(phoneList[i]);
                                        phoneList[i].cname = $sce.getTrustedHtml(phoneList[i].Name.replace($scope.search, "<span class='searched_content'>" + $scope.search + "</span>"));
                                        phoneList[i].phone = $sce.getTrustedHtml("手机：" + phoneList[i].Phone.replace($scope.search, "<span class='searched_content'>" + $scope.search + "</span>"));
                                    }

                                    $scope.dataList.phoneList = $scope.dataList.phoneList.concat(phoneList);
                                    $ionicScrollDelegate.resize();
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        }
                    };
                    //格式化输出时间
                    $scope.formatDateByStatistics = function(data) {
                        return data && new Date(parseInt(data.substr(6, 13)));
                    };

                    //搜索
                    $scope.searchPost = function() {
                        $scope.showReload = false;
                        $scope.showNoData = false;
                        if ($scope.search == "") {
                            promptBarService.showErrorBar("请输入搜索内容", 3000);
                        } else {
                            microRegistrationbookSearchAppService.getSearchResult($scope.search, pageSize).success(function(result) {
                                if (result.status == 1) {

                                    $scope.dataList = {
                                        contentList: result.data.Content.list,
                                        phoneList: result.data.Phone.list,
                                        nameList: result.data.Name.list
                                    };

                                    $scope.searchListContentPage = result.data.Content.page;
                                    $scope.searchListNamePage = result.data.Name.page;
                                    $scope.searchListPhonePage = result.data.Phone.page;

                                    //判断有没有结果
                                    if (angular.equals($scope.dataList.contentList, null) && angular.equals($scope.dataList.phoneList, null) && angular.equals($scope.dataList.nameList, null)) {
                                        $scope.showNoData = true;
                                    } else {
                                        $scope.showNoData = false;
                                        //搜索字段加粗
                                        if (!angular.equals($scope.dataList.nameList, null)) {
                                            for (var i = 0; i < $scope.dataList.nameList.length; i++) {
                                                //nameList cname phone Phone Name Content HeadImgUrl
                                                $scope.dataList.nameList[i] = microRegistrationbookSearchAppService.parseBizModelToUiModel($scope.dataList.nameList[i]);
                                                $scope.dataList.nameList[i].cname = $sce.getTrustedHtml($scope.dataList.nameList[i].Name.replace($scope.search, "<span class='searched_content'>" + $scope.search + "</span>"));
                                                $scope.dataList.nameList[i].phone = $sce.getTrustedHtml("手机：" + $scope.dataList.nameList[i].Phone.replace($scope.search, "<span class='searched_content'>" + $scope.search + "</span>"));
                                            }
                                        }
                                        if (!angular.equals($scope.dataList.phoneList, null)) {
                                            for (var i = 0; i < $scope.dataList.phoneList.length; i++) {
                                                $scope.dataList.phoneList[i] = microRegistrationbookSearchAppService.parseBizModelToUiModel($scope.dataList.phoneList[i]);
                                                $scope.dataList.phoneList[i].cname = $sce.getTrustedHtml($scope.dataList.phoneList[i].Name.replace($scope.search, "<span class='searched_content'>" + $scope.search + "</span>"));
                                                $scope.dataList.phoneList[i].phone = $sce.getTrustedHtml("手机：" + $scope.dataList.phoneList[i].Phone.replace($scope.search, "<span class='searched_content'>" + $scope.search + "</span>"));
                                            }
                                        }
                                        if (!angular.equals($scope.dataList.contentList, null)) {
                                            for (var i = 0; i < $scope.dataList.contentList.length; i++) {
                                                $scope.dataList.contentList[i] = microRegistrationbookSearchAppService.parseBizModelToUiModel($scope.dataList.contentList[i]);
                                                $scope.dataList.contentList[i].cname = $sce.getTrustedHtml($scope.dataList.contentList[i].Name.replace($scope.search, "<span class='searched_content'>" + $scope.search + "</span>"));
                                                $scope.dataList.contentList[i].content = $sce.getTrustedHtml("沟通记录：" + $scope.dataList.contentList[i].Content.replace($scope.search, "<span class='searched_content'>" + $scope.search + "</span>"));
                                            }
                                        }
                                    }
                                } else {
                                    promptBarService.showErrorBar(result.message, 3000);
                                }
                            }).error(function(result) {
                                if (angular.equals(result, null)) {
                                    $scope.showReload = true;
                                    $scope.showNoData = false;
                                }
                            });
                        }

                        return false;
                    }

                    function init() {
                        if ($scope.search != "") {
                            $scope.searchPost();
                        }
                        $scope.userDistrictId = $scope.currentUserLocation.Id;

                        //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                        if (!$rootScope.isFirstLoad) {
                            $timeout(function() {
                                $(".lockMask-loading2").hide();
                                $rootScope.isFirstLoad = true;
                            }, 1833);
                        } else {
                            $timeout(function() {
                                $(".lockMask-loading2").hide();
                                $rootScope.isFirstLoad = true;
                            }, 1000);
                        }
                    }

                    init();

                }
            ]);
    });