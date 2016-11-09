"use strict";
/**
 * author :cxd
 * time:2016年6月2日16:03:22
 * description:
 */

define(["ionic", "modules/user-location-app/services"],
    function () {
        return angular.module("UserLocationApp.controllers", ["UserLocationApp.services"])
            .controller("UserLocationAppController", [
                "$scope", "$rootScope", "$ionicScrollDelegate", "$timeout", "maskService", "commonNetService", "userLocationAppService", "$location",
                function ($scope, $rootScope, $ionicScrollDelegate, $timeout, maskService, commonNetService, userLocationAppService, $location) {

                    //是否是自动搜索 切换页面列表页与搜索页
                    $scope.ifAuto = true;
                    //位置信息初始化
                    $scope.address = {
                        cityName: "获取中...",
                        Id: "0"
                    }
                    function init() {
                        //自动情况下  从报名本页面 进入
                        //该页面后从微信wx JSSDK 
                        // 中获取经纬度 并百度API转为地址数据
                        //定位后
                        // 从后端拉取所有城市数据   
                        //             todo： 侧边栏锚点跳转
                        //选择城市后 保存数据  返回上一界面
                        //

                        //拉取所有城市数据
                        commonNetService.getAllCityDistricts().success(function (data) {
                            if (data.status == 1) {
                                $scope.citydatas = data.data;
                                if (!$rootScope.isFirstLoad) {//首次进入  延长遮罩时间
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
                        })
                        //获取侧边栏字母表
                        $scope.AlphaList = userLocationAppService.getAlphaList();

                        //根据设备高度计算字母表的高度
                        var docEl = document.documentElement;
                        angular.element(document.querySelector('.sideAlpha'))[0].style.height = "" + docEl.clientHeight -
                            angular.element(document.querySelector('.present-city'))[0].clientHeight - 10 -
                            angular.element(document.querySelector('.search-city'))[0].clientHeight + "px";


                        //通过微信接口 获取经纬度 百度地图接口转换坐标 转为地址
                        commonNetService.getWxLocation()    //微信接口 定位获取经纬度 
                            .then(commonNetService.transWxtoBaidu)//误差坐标转换
                            .then(commonNetService.getGeoToAddress)//坐标转为地址 返回地址格式
                            .then(function (res) {
                                console.log(res);
                                $scope.address = res;
                            }).catch(function (error) {
                                $scope.address = { cityName: "获取不到位置信息", Id: "0" };
                            });

                        //无数据样式切换Tag
                        $scope.ifNoData = false;
                    }

                    init();

                    //搜索框事件
                    $scope.searchFuc = function () {
                        if (angular.element(document.querySelector('li')).length == 0) {
                            $scope.ifNoData = true;
                        } else {
                            $ionicScrollDelegate.scrollTop();
                            $scope.ifNoData = false;
                        }
                    }
                    //页面滚动时  取消输入框聚焦
                    $scope.touchFuc = function(){
                        document.querySelector("#searchbox").blur();
                    }
                    //城市列表情况下 点击搜索框   隐藏城市列表  显示搜索结果
                    $scope.showSearchList = function (ifauto) {
                        $scope.searchText = "";
                        $scope.ifAuto = ifauto;
                        $scope.ifNoData = false;
                    }
                    $scope.selectCity = function (city) {
                        if (city.Id != "0") {
                            commonNetService.updateDistrictByUserId(city.Id).success(function (res) {
                                if (res.status == 1) {
                                    console.log(city);
                                    //保存并返回上一界面
                                    $scope.$state.go("userCenter", {});
                                } else {
                                    //
                                }

                            })
                        }
                    }

                    $scope.showAlpha = false;
                    //点击某字母后滚动界面至对应城市
                    $scope.scrollto = function (alpha) {
                        event.preventDefault();
                        var ele = angular.element(document.querySelector("a[name='" + alpha + "']"))[0];
                        if (ele) {
                            $scope.alpha = alpha;
                            $scope.showAlpha = true;

                            //console.log(alpha);
                            var height = ele.offsetTop;
                            $timeout(function () {
                                $ionicScrollDelegate.scrollTo(0, height, false);
                            }, 0)
                            $timeout(function () {
                                $scope.showAlpha = false;
                            }, 1200)
                        }
                    }

                }
            ])
    .filter('filterdistrictName',function(){
        return function(inputArray,params,value){
            var array = [];
            if (!value) {
                return inputArray; 
            }
            inputArray.map(function (d) {
                for (var i = 0; i < params.length; i++) {
                    if (d[params[i]].toString().indexOf(value) != -1) {
                        array.push(d);
                    }
                }
            });
            return array;
        }
    });
});