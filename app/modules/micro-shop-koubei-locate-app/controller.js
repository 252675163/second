"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-koubei-locate-app/services", "modules/micro-shop-koubei-create-shop-app/services"],
    function () {
        return angular.module("MicroShopKoubeiLocateApp.controllers", ["MicroShopKoubeiLocateApp.services", "MicroShopKoubeiCreateShopApp.services"])
            .controller("MicroShopKoubeiLocateAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopKoubeiLocateAppService", "$ionicPopup", "$timeout", "MicroShopKoubeiCreateShopAppService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopKoubeiLocateAppService, $ionicPopup, $timeout, MicroShopKoubeiCreateShopAppService) {
                    var provinceSwiper,
                        citySwiper,
                        districtSwiper;
                    //省市区列表选择对象
                    var districtSearch;
                    //地图点标记
                    var marker;
                    //地图对象
                    var map;
                    //地址对象
                    $scope.addressObj = {
                        address: "杭州西湖区华星时代广场a座",
                        districtStr: "",
                        provinceCode: "",
                        cityCode: "",
                        districtCode: "",
                        location: {
                            lat: 0,//纬度
                            lng: 0  //经度
                        }

                    };
                    var addressList = [];
                    $scope.provinceList = [];
                    $scope.cityList = [];
                    $scope.districtList = [];
                    var isFirstLoad = true;
                    var hasGetAddressList = false;
                    //切换地址选择组件
                    $scope.toggleSelectDistrict = function (flag) {
                        if (!hasGetAddressList) {
                            promptBarService.showErrorBar("获取城市列表信息中...");
                            return;
                        }
                        if (isFirstLoad) {
                            $scope.provinceList = addressList;
                            $scope.cityList = addressList[0].cityList;
                            $scope.districtList = addressList[0].cityList[0].districtList;
                            isFirstLoad = false;
                        }
                        if (flag) {
                            $timeout(function () {
                                provinceSwiper.update(true);
                                citySwiper.update(true);
                                districtSwiper.update(true);
                            }, 0);
                        }
                        $scope.isShowDistrictSelect = flag;
                    }
                    //保存地址信息
                    $scope.saveAddress = function () {
                        if (!$scope.addressObj.districtStr.trim()) {
                            promptBarService.showErrorBar("请选择省/市/区！");
                            return;
                        }
                        if (!$scope.addressObj.address) {
                            promptBarService.showErrorBar("请输入详细地址！");
                            return;
                        }
                        if (!$scope.addressObj.districtStr.trim()) {
                            promptBarService.showErrorBar("请输入正确的详细地址！");
                            return;
                        }
                        var position = marker && marker.getPosition();
                        if (position) {
                            $scope.addressObj.location.lat = position.lat;
                            $scope.addressObj.location.lng = position.lng;
                        }
                        else {
                            promptBarService.showErrorBar("定位失败，请重新定位！");
                            return;
                        }
                        MicroShopKoubeiCreateShopAppService.saveLocate($scope.addressObj);



                        $scope.$state.go("microshopkoubei.createshop");
                    }
                    //保存 省/市/区
                    $scope.saveDistrict = function () {
                        var districtStr = "";
                        if ($scope.provinceList.length > 0) {
                            districtStr += $scope.provinceList[provinceSwiper.activeIndex].name;
                            $scope.addressObj.provinceCode = $scope.provinceList[provinceSwiper.activeIndex].code;
                        }
                        if ($scope.cityList.length > 0) {
                            districtStr += " ";
                            districtStr += $scope.cityList[citySwiper.activeIndex].name;
                            $scope.addressObj.cityCode = $scope.cityList[citySwiper.activeIndex].code;
                        }
                        if ($scope.districtList.length > 0) {
                            districtStr += " ";
                            districtStr += $scope.districtList[districtSwiper.activeIndex].name;
                            $scope.addressObj.districtCode = $scope.districtList[districtSwiper.activeIndex].code;
                        }
                        $scope.addressObj.districtStr = districtStr;
                        $scope.isShowDistrictSelect = false;
                        if (!$scope.addressObj.address.trim()) {
                            $scope.locate();
                        }
                    }

                    //校验详细地址
                    $scope.checkAddress = function () {
                        if (!$scope.addressObj.address || $scope.addressObj.address.trim() == "") {
                            return false;
                        }
                        return true;
                    }
                    //定位
                    $scope.locate = function () {
                        map.clearMap();
                        var geocoder = new AMap.Geocoder({
                            //            city: "", //城市，默认：“全国”
                            radius: 500 //范围，默认：500
                        });
                        var address = $scope.addressObj.districtStr + $scope.addressObj.address;
                        //地理编码,返回地理编码结果
                        geocoder.getLocation(address, function (status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                getMap(result);
                                if (result.geocodes[0]) {
                                    $scope.addressObj.location.lat = result.geocodes[0].location.lat;
                                    $scope.addressObj.location.lng = result.geocodes[0].location.lng;
                                }

                            }
                            else if (status == "no_data") {
                                promptBarService.showErrorBar("定位失败，请按照要求重新输入地址信息！");
                            }
                        });
                    }
                    //统计地图标记
                    function addMarker(i, d) {
                        marker = new AMap.Marker({
                            map: map,
                            position: [d.location.getLng(), d.location.getLat()],
                            draggable: true,
                            cursor: 'move',
                            raiseOnDrag: true
                        });
                        var infoWindow = new AMap.InfoWindow({
                            content: d.formattedAddress,
                            offset: { x: 0, y: -30 }
                        });
                        marker.on("mouseover", function (e) {
                            infoWindow.open(map, marker.getPosition());
                        });
                    }
                    //地理编码返回结果展示
                    function getMap(data) {
                        var geocode = data.geocodes;
                        for (var i = 0; i < geocode.length; i++) {
                            addMarker(i, geocode[i]);
                        }
                        map.setFitView();
                    }

                    //获取省市区列表
                    function getAddressList(list) {
                        angular.forEach(list.districtList, function (model) {
                            var province = {
                                code: model.adcode,
                                name: model.name,
                                cityList: []
                            }
                            angular.forEach(model.districtList, function (model) {
                                var city = {
                                    code: model.adcode,
                                    name: model.name,
                                    districtList: []
                                }
                                angular.forEach(model.districtList, function (model) {
                                    var district = {
                                        code: model.adcode,
                                        name: model.name
                                    }
                                    city.districtList.push(district);
                                });
                                province.cityList.push(city);
                            });
                            addressList.push(province);
                        });
                        return addressList;
                    }
                    //切换
                    function swiperAddress(type, index) {
                        switch (type) {
                            case "province":
                                if ($scope.provinceList.length > 0) {
                                    $timeout(function () {
                                        $scope.$apply(function () {
                                            $scope.cityList = $scope.provinceList[index] ? $scope.provinceList[index].cityList : [];
                                            $scope.districtList = $scope.cityList[0] ? $scope.cityList[0].districtList : [];
                                        });
                                        citySwiper.update(true);
                                        districtSwiper.update(true);
                                    }, 0);
                                }
                                break;
                            case "city":
                                if ($scope.cityList.length > 0) {
                                    $timeout(function () {
                                        $scope.$apply(function () {
                                            $scope.districtList = $scope.cityList[index] ? $scope.cityList[index].districtList : [];
                                        });
                                        districtSwiper.update(true);
                                    }, 0);
                                }
                                break;
                        }
                    }
                    //获取省市区列表
                    function getDistrictList(level, keycode) {
                        districtSearch.setExtensions('base');
                        districtSearch.setLevel(level); //行政区级别
                        districtSearch.search(keycode, function (status, result) {
                            if (status == "complete" && result.info == "OK") {
                                var list = result.districtList[0];
                                if (list.districtList) {
                                    getAddressList(list);
                                    hasGetAddressList = true;
                                }
                                else {
                                    promptBarService.showErrorBar("获取城市列表信息失败！");
                                }
                            }
                            else {
                                promptBarService.showErrorBar("获取城市列表信息失败！");
                            }

                        });
                    }
                    //初始化函数
                    function init() {
                        //初始化高德地图
                        map = new AMap.Map("map", {
                            resizeEnable: true
                        });
                        provinceSwiper = new ionic.views.Swiper('#province', {
                            direction: 'vertical',
                            slidesPerView: 7,
                            centeredSlides: true,
                            observer: true,
                            onSlideChangeStart: function (swiper) {
                                swiperAddress("province", swiper.activeIndex);
                            }
                        }, $scope);
                        citySwiper = new ionic.views.Swiper('#city', {
                            direction: 'vertical',
                            slidesPerView: 7,
                            centeredSlides: true,
                            observer: true,
                            onSlideChangeStart: function (swiper) {
                                swiperAddress("city", swiper.activeIndex);
                            }
                        }, $scope);
                        districtSwiper = new ionic.views.Swiper('#district', {
                            direction: 'vertical',
                            slidesPerView: 7,
                            centeredSlides: true,
                            observer: true
                        }, $scope);

                        AMap.service('AMap.DistrictSearch', function () {//回调函数
                            //实例化DistrictSearch
                            districtSearch = new AMap.DistrictSearch({
                                subdistrict: 3
                            });
                            getDistrictList("country", "中国");
                        });
                        //获取地址
                        $scope.addressObj = MicroShopKoubeiCreateShopAppService.getLocate();
                        if ($scope.addressObj.address.trim()) {
                            $scope.locate();
                        }
                        ////关闭loading动画
                        //$scope.hideLoading();
                    }

                    init();


                }
            ]);
    });