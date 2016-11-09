"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-koubei-create-shop-app/services"],
    function () {
        return angular.module("MicroShopKoubeiCreateShopApp.controllers", ["MicroShopKoubeiCreateShopApp.services"])
            .controller("MicroShopKoubeiCreateShopAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopKoubeiCreateShopAppService", "$ionicPopup", "$timeout", "comboboxService", "$ionicScrollDelegate", "singleThreadedNetService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopKoubeiCreateShopAppService, $ionicPopup, $timeout, comboboxService, $ionicScrollDelegate, singleThreadedNetService) {
                    $scope.checkBoolean = true;//条款同意
                    $scope.alipayTermShow = false;//支付宝商家服务协议
                    $scope.koubeiTermShow = false;//口碑商家服务协议
                    $scope.hasApply = false;//申请成功
                    $scope.hasShop = false;//是否已经有口碑店铺
                    $scope.checking = false;
                    $scope.shopModel = {
                        name: '',//门店名称
                        locate: {
                            address: "杭州西湖区华星时代广场a座",
                            provinceCode: "",
                            cityCode: "",
                            districtCode: "",
                            location: {
                                lat: 0,//纬度
                                lng: 0  //经度
                            }
                        },//门店地址
                        tel: '',  //门店电话
                        categoryId: '', //经营种类
                        firstPicture: '',  //门店首图
                        indoorPicture: '',//门店內照与内景照
                        businessLicense: '', //营业执照
                        regNumber: '',//注册号
                        businessName: '',//字号名称
                        accreditImg: ''//授权函
                    }
                    //title显示
                    $rootScope.$state.current.title = $scope.hasShop ? "提交申请失败" : "填写开店信息";

                    //勾选用户条款
                    $scope.agreeUserTerms = function () {
                        $scope.checkBoolean = !$scope.checkBoolean;
                    }
                    //显示协议弹窗
                    $scope.showAlipayTerm = function () {
                        $scope.alipayTermShow = true;
                    }
                    //关闭协议弹窗
                    $scope.hideAlipayTerm = function () {
                        $scope.alipayTermShow = false;
                    }
                    //图片上传配置项
                    $scope.firstPicture = {
                        imageUrlArr: [],
                        imageType: 13,
                        maxImageNum: 1,
                        extConfig: {
                            isHaveCutImg: false,
                            supportImgType: ["jpg"],
                            serviceType: "koubei",
                            maxSize: "default"
                        }

                    }
                    $scope.indoorPicture = {
                        imageUrlArr: [],
                        imageType: 13,
                        maxImageNum: 3,
                        extConfig: {
                            isHaveCutImg: false,
                            supportImgType: ["jpg"],
                            serviceType: "koubei",
                            maxSize: "default"
                        }
                    }
                    $scope.businessLicense = {
                        imageUrlArr: [],
                        imageType: 13,
                        maxImageNum: 1,
                        extConfig: {
                            isHaveCutImg: false,
                            supportImgType: ["jpg"],
                            serviceType: "koubei",
                            maxSize: "default"
                        }
                    }
                    $scope.accreditImgConfig = {
                        imageUrlArr: [],
                        imageType: 13,
                        maxImageNum: 1,
                        extConfig: {
                            isHaveCutImg: false,
                            supportImgType: ["jpg"],
                            serviceType: "koubei",
                            maxSize: "default"
                        }
                    }
                    // 跳转获取地址页
                    $scope.gotoLocate = function () {
                        $scope.$state.go("microshopkoubei.locate");
                    }

                    //经营品类列表
                    $scope.showBusinessTypeList = function () {


                        var dataList = [{ name: "早教中心", type: 2016051000170050 },
                                        { name: "少儿外语（语言类培训）", type: 2016051000165496 },
                                        { name: "少儿才艺（跆拳道、机器人等素质培训）", type: 2016051000171940 },
                                        { name: "取消", type: 0 }];
                        var info = "";

                        var setFollowUpStatus = function (item) {
                            if (item.type == 0) {
                                return;
                            } else {
                                $scope.shopModel.businessType = item.name;
                                $scope.shopModel.categoryId = item.type;
                            }

                        }
                        //初始化下拉组件
                        comboboxService.showCombobox(dataList, $scope.shopModel.businessType, info, setFollowUpStatus);
                    }

                    //验证输入
                    $scope.checkForm = function () {
                        $scope.checkResult = false;
                        //数字和字母
                        var numEnRegexp = /^[A-Za-z0-9]*$/
                        //电话
                        var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                        //非空校验
                        if (!$scope.shopModel.name) {
                            promptBarService.showErrorBar("请输入门店名称！", 3000);
                            return;
                        }
                        else if (!$scope.shopModel.name.trim()) {
                            promptBarService.showErrorBar("请输入正确的门店名称！", 3000);
                            return;
                        }
                        else if (!$scope.shopModel.address) {
                            promptBarService.showErrorBar("请选择门店地址！", 3000);
                            return;
                        }
                        else if (!$scope.shopModel.locate.provinceCode) {
                            promptBarService.showErrorBar("请选择省/市/区！", 3000);
                            return;
                        }
                        else if (!$scope.shopModel.tel) {
                            promptBarService.showErrorBar("请输入门店电话！", 3000);
                            return;
                        }
                        else if (!phoneRegexp.test($scope.shopModel.tel)) {
                            promptBarService.showErrorBar("请输入正确的门店电话！", 3000);
                            return;
                        }
                        else if (!$scope.shopModel.businessType) {
                            promptBarService.showErrorBar("请选择经营品类！", 3000);
                            return;
                        }
                        else if ($scope.firstPicture.imageUrlArr.length == 0) {
                            promptBarService.showErrorBar("请上传门店首图！", 3000);
                            return;
                        }
                        else if ($scope.indoorPicture.imageUrlArr.length < 3) {
                            promptBarService.showErrorBar("请上传三张图片！", 3000);
                            return;
                        }
                        else if ($scope.businessLicense.imageUrlArr.length == 0) {
                            promptBarService.showErrorBar("请上传营业执照！", 3000);
                            return;
                        }
                        else if (!$scope.shopModel.regNumber) {
                            promptBarService.showErrorBar("请输入注册号！", 3000);
                            return;
                        }
                        else if (!numEnRegexp.test($scope.shopModel.regNumber)) {
                            promptBarService.showErrorBar("请输入正确的注册号！", 3000);
                            return;
                        }
                        else if (!$scope.shopModel.businessName) {
                            promptBarService.showErrorBar("请输入名称!", 3000);
                            return;
                        }
                        else if (!$scope.shopModel.businessName.trim()) {
                            promptBarService.showErrorBar("请输入正确的名称！", 3000);
                            return;
                        }
                        else if (!$scope.checkBoolean) {
                            promptBarService.showErrorBar("请勾选，同意服务协议！", 3000);
                            return;
                        }
                        else
                            $scope.checkResult = true;
                    }

                    function getImageIdList(list) {
                        var data = [];
                        angular.forEach(list, function (value) {
                            data.push(value.imageId);
                        });
                        return data;
                    }

                    //提交
                    $scope.submitShopInformation = singleThreadedNetService(function () {
                        //获取地址信息
                        $scope.shopModel.locate = MicroShopKoubeiCreateShopAppService.getLocate();
                        //表单验证
                        $scope.checkForm();

                        if ($scope.checkResult) {
                            //图片
                            $scope.shopModel.firstPicture = $scope.firstPicture.imageUrlArr[0].imageId;
                            $scope.shopModel.indoorPicture = getImageIdList($scope.indoorPicture.imageUrlArr);
                            $scope.shopModel.businessLicense = $scope.businessLicense.imageUrlArr[0].imageId;
                            $scope.shopModel.accreditImg = $scope.accreditImgConfig.imageUrlArr[0].imageId;

                            var shopModel = MicroShopKoubeiCreateShopAppService.setKoubeiShopModel($scope.shopModel);

                            return MicroShopKoubeiCreateShopAppService.saveShopInformation(shopModel).then(function (result) {
                                if (result.data.status == 1) {
                                    $scope.hasApply = true;
                                    $rootScope.$state.current.title = "提交申请成功";
                                    $ionicScrollDelegate.resize();
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        }

                    })
                    function init() {
                        //判断店铺申请状态
                        MicroShopKoubeiCreateShopAppService.mcroShopOpenState().then(function (result) {
                            if (result.data && result.data.status == 1) {
                                switch (result.data.data) {
                                    case 1:
                                        $rootScope.$state.current.title = "填写开店信息";
                                        //同步校宝微店信息
                                        MicroShopKoubeiCreateShopAppService.getShopInformation().then(function (result) {
                                            if (result.data.status == 1) {
                                                $scope.shopModel = MicroShopKoubeiCreateShopAppService.getKoubeiShopModel(result.data.data);
                                            }
                                            else {
                                                promptBarService.showErrorBar(result.data.message, 3000);
                                            }
                                            //关闭loading动画
                                            $scope.hideLoading();
                                        });
                                        break;
                                    case 2:
                                        $rootScope.$state.current.title = "提交申请等待中";
                                        $scope.checking = true;
                                        //关闭loading动画
                                        $scope.hideLoading();
                                        break;
                                    case 3:
                                        $rootScope.$state.current.title = "提交申请失败";
                                        $scope.hasShop = true;
                                        //关闭loading动画
                                        $scope.hideLoading();
                                        break;
                                }
                            }
                            else {
                                //关闭loading动画
                                $scope.hideLoading();
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        })

                    }

                    init();


                }
            ]);
    });