"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:58
 * description:
 */

define(["ionic", "modules/microsite-add-app/services"],
    function () {
        return angular.module("MicroSiteAddApp.controllers", ["MicroSiteAddApp.services"])
            .controller("MicroSiteAddAppController", [
                "$scope", "$rootScope","$q", "MicroSiteAddAppService","$ionicModal","promptBarService",
                function ($scope, $rootScope,$q, microSiteAddAppService, $ionicModal,promptBarService) {
                    var pageSize = 10;
                    $scope.page = {
                        totalCount:"",
                        currentIndex:"",
                        itemCount:""
                    };
                    $scope.type = "all";//$scope.type =all,index,imageOrText,form

                    //添加模板分类 2015.11.7 by yinglechao
                    $scope.changeType = function (type) {
                        //$scope.type =all,index,imageOrText,form
                        if ($scope.type == type) {
                            return;
                        }else{
                            queryPage(1,pageSize,type,"reset").then(function(){
                                $scope.type = type;

                            });
                        }
                    };

                    //滚动加载by yinglechao 2015.11.7
                    $scope.loadMore = function () {
                        console.log("加载下一页数据");
                        if ( !$scope.isLoad) {
                            $scope.isLoad = true;
                            queryPage($scope.page.currentIndex+1, pageSize, $scope.type,"add").then(function (data) {
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                $scope.isLoad = false;
                            });
                        } else {
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                    };

                    //根据条件加载数据by yinglechao 2015.11.7
                    var queryPage = function (pageIndex, pageSize, filter, queryType) {
                        //queryType = "add" / "reset"
                        var query = queryType || "add";
                        var d = $q.defer();
                        microSiteAddAppService.getSection($scope.$stateParams.templateId,pageIndex, pageSize, filter).then(function(result){
                            if(result.data.status==1){
                                if(queryType=="add"){
                                    $scope.sections  = $scope.sections.concat(result.data.data.list);
                                }else{
                                    $scope.sections  = result.data.data.list;
                                }
                                $scope.page = result.data.data.page;
                                d.resolve();
                            }else{
                                promptBarService.showErrorBar(result.data.message,3000);
                                d.reject(result.data.message);
                            }
                        });
                        return d.promise;
                    };


                    
                    //选择模板
                    $scope.saveMould = function (name,backgroundImage) {
                        $scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.splice($scope.siteModel.currentSectionIndex + 1, 0, {
                            "sectionName": "",
                            "templateName": name,
                            "templateModel": {},
                            "backgroundImage": backgroundImage
                        });
                        $scope.siteModel.currentSectionIndex++;
                        $rootScope.$state.go("site.edit", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId ,isHold:true}, { reload: true, inherit: false });
                    };

                    $scope.init = function () {
                        if (!angular.isUndefined($scope.siteModel)) {
                            //$scope.sections = microSiteAddAppService.getSection(0);
                            queryPage(1, pageSize, $scope.type, "reset");
                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                            if (!$rootScope.isFirstLoad) {
                                $timeout(function () {
                                    $(".lockMask-loading2").hide();
                                    $rootScope.isFirstLoad = true;
                                }, 1833);
                            } else {
                                $(".lockMask-loading2").hide();
                            }
                        } else {
                            // 报错页面，非法进入页面
                            window.location.href = "/Common/error";
                        }
                    }
                    $scope.init();
                    $scope.$on("$stateChangeStart", function (event, toState) {
                        if (toState.name.indexOf("site") !== -1) {
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                        }

                    });

                }
            ]);
    });
