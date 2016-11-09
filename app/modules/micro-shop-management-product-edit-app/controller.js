"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-management-product-edit-app/services"],
    function() {
        return angular.module("MicroShopManagementProductEditApp.controllers", ["MicroShopManagementProductEditApp.services"])
            .controller("MicroShopManagementProductEditAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "comboboxService", "MicroShopManagementProductEditAppService", "$ionicPopup", "$timeout", "singleThreadedNetService",
                function($scope, $rootScope, $window, promptBarService, commonNetService, comboboxService, MicroShopManagementProductEditAppService, $ionicPopup, $timeout, singleThreadedNetService) {
                    $scope.id = $scope.$state.params.id;
                    $rootScope.$state.current.title = !$scope.id ? "新增商品" : "编辑商品";
                    $scope.compile = true;
                    $scope.new = false;
                    $scope.productList = [];
                    for (var i = 1; i < 10; i++) {
                        var obj = {};
                        obj.name = "item " + i;
                    }
                    $scope.product = {
                        id: 0,
                        name: "", //名称
                        price: 1, //现价
                        stock: "",
                        originPrice: "", //原价
                        productState: "1", //商品是否参与砍价状态
                        marketTime: "", //倒计时
                        marketNumber: 100,
                        introduce: "",
                        imgUrl: "", //商品首张图片
                        typeModel: {
                            type: 1,
                            name: "一元砍价"
                        },
                        koubeiImages: null
                    }
                    $scope.callback = {};
                    //图片上传默认配置 （当用户不存在口碑或者用户在编辑原有的一元砍价活动时不用以下的默认配置）
                    $scope.uploadConfig = {
                        imageUrlArr: [],
                        imageType: 13,
                        maxImageNum: 3,
                        aspectRatio: 640 / 300,
                        extConfig: {
                            serviceType: "koubei",
                            supportImgType: ["jpg"]
                        }
                    }

                    //上传图片尺寸比例
                    $scope.imgAspectRatio = [];

                    function getProductImages() {
                        var imagesObj = {
                            imageArr: [],
                            koubeiImageArr: []
                        };
                        angular.forEach($scope.uploadConfig.imageUrlArr,
                            function(va) {
                                if ($scope.uploadConfig.extConfig.serviceType == "koubei") {
                                    var imageObj = {
                                            url: va.url
                                        },
                                        koubeiImageObj = {
                                            url: va.imageId
                                        };
                                    imagesObj.imageArr.push(imageObj);
                                    imagesObj.koubeiImageArr.push(koubeiImageObj);
                                } else {
                                    var imageObj = {
                                        url: va
                                    };
                                    imagesObj.imageArr.push(imageObj);
                                }

                            });
                        return imagesObj;
                    }

                    //创建编辑商品
                    $scope.submitProductInfo = singleThreadedNetService(function(type) {
                        if ($scope.new == false) {
                            if ($scope.check() == false) {
                                return;
                            }
                        }
                        //非空校验
                        if (!$scope.product.name) {
                            promptBarService.showErrorBar("请输入商品名称", 3000);
                            return;
                        } else if ($scope.uploadConfig.imageUrlArr.length == 0) {
                            promptBarService.showErrorBar("请至少上传一张图片", 3000);
                            return;
                        } else if ($scope.product.name.trim() == "") {
                            promptBarService.showErrorBar("请输入正确的商品名称", 3000);
                            return;
                        } else if (!$scope.product.originPrice) {
                            promptBarService.showErrorBar("请输入价格", 3000);
                            return;
                        } else if (!$scope.product.stock) {
                            promptBarService.showErrorBar("请输入库存", 3000);
                            return;
                        } else if (!$scope.product.price) {
                            promptBarService.showErrorBar("请输入一口价", 3000);
                            return;
                        } else if (!$scope.product.introduce) {
                            promptBarService.showErrorBar("请输入商品介绍", 3000);
                            return;
                        }

                        //数字校验
                        var numRegexp = /^[0-9]*$/;
                        if (!numRegexp.test($scope.product.originPrice)) {
                            promptBarService.showErrorBar("请输入正确的价格", 3000); //号码不正确
                            return;
                        } else if (!numRegexp.test($scope.product.stock)) {
                            promptBarService.showErrorBar("请输入正确的库存", 3000);
                            return;
                        } else if (!numRegexp.test($scope.product.marketNumber)) {
                            promptBarService.showErrorBar("请输入正确的砍价人数", 3000);
                            return;
                        } else if (!numRegexp.test($scope.product.price) || $scope.product.price < 1 || $scope.product.price > 9999) {
                            promptBarService.showErrorBar("请输入正确的一口价", 3000);
                            return;
                        } else if ($scope.product.price > 5000) {
                            promptBarService.showErrorBar("一口价的价格不能超过5000", 3000);
                            return;
                        }

                        //表单校验
                        if ($scope.product.originPrice <= 1) {
                            promptBarService.showErrorBar("价格不得低于1元", 3000);
                            return;
                        } else if ($scope.product.stock > 999) {
                            promptBarService.showErrorBar("库存数量不能大于999", 3000);
                            return;
                        } else if ($scope.product.stock < 1) {
                            promptBarService.showErrorBar("库存数量不能为零", 3000);
                            return;
                        } else if ($scope.product.originPrice > 9999) {
                            promptBarService.showErrorBar("请输入正确的价格！", 3000);
                            return;
                        } else if ($scope.product.marketNumber < 10) {
                            promptBarService.showErrorBar("砍价人数不得低于10人！", 3000);
                            return;
                        }
                        $scope.product.imgUrl = getProductImages().imageArr;
                        if (($scope.product.typeModel.type == 2 && !!$scope.product.koubeiImages) || $scope.new) {
                            $scope.product.koubeiImages = getProductImages().koubeiImageArr;
                        }
                        $scope.product.productState = (type == 0) ? 0 : 1;
                        if ($scope.product.typeModel.type == 1) {
                            $scope.product.price = 1;
                        }
                        var shopModel = MicroShopManagementProductEditAppService.setMicroShopModel($scope.product);
                        return MicroShopManagementProductEditAppService.createMicroProduct(shopModel).then(function(result) {
                            if (result.data.status == 1) {
                                $scope.$state.go("microshopmanagement.index.product");
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                    });

                    $scope.check = function() {
                        var checkTime = new Date($scope.product.marketTime).getTime();
                        var nowTime = new Date().getTime();
                        if (nowTime >= checkTime) {
                            return false;
                        }
                        if ($scope.product.stock == 0) {
                            return false;
                        }
                        if ($scope.uploadConfig.imageUrlArr.length == 0) {
                            return false;
                        }
                        if ($scope.product.price.length == 0) {
                            return false;
                        }
                        return true;
                    }

                    //营销方式选择
                    $scope.showList = function() {
                        if (!$scope.new) {
                            return;
                        }
                        var dataList = [{ name: "一元砍价", type: 1 },
                            { name: "一口价", type: 2 },
                            { name: "取消", type: 5 }
                        ];
                        var info = "";

                        var setFollowUpStatus = function(item) {
                                if (item.type == 1) {
                                    $scope.product.price = 1;
                                    $scope.product.typeModel = item;
                                } else if (item.type == 2) {
                                    $scope.product.price = '';
                                    $scope.product.typeModel = item;
                                }
                            }
                            //初始化下拉组件
                        comboboxService.showCombobox(dataList, $scope.product.typeModel.name, info, setFollowUpStatus);
                    }

                    function init() {
                        $scope.new = true;
                        //如果没有口碑微店则图片配置不使用口碑配置，否则使用默认配置
                        if (!$scope.hasKouBei) {
                            $timeout(function() {
                                $scope.uploadConfig.extConfig = {};
                                $scope.uploadConfig.imageType = 7;
                                $scope.callback.resetUploadConfig();
                            }, 800)
                        }
                        //截止时间设置
                        var timeInstance = null;

                        if (!$scope.activityOtherConfig) {
                            $scope.activityOtherConfig = {};
                        }

                        if (!$scope.activityOtherConfig.endDate) {
                            //默认时间为当前时间加7天                              
                            $scope.activityOtherConfig.endDate = new Date();
                            $scope.activityOtherConfig.endDate.setDate($scope.activityOtherConfig.endDate.getDate() + 7);
                        }

                        var now = new Date();
                        $scope.product.marketTime = new Date($scope.activityOtherConfig.endDate);
                        $scope.settings = {
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
                            onSelect: function(valueText) {
                                    $scope.activityOtherConfig.endDate = valueText;
                                    $scope.$apply(function() {
                                        $scope.product.marketTime = valueText;
                                    });
                                    $scope.check();
                                } //保存日期
                        };
                        $scope.showDateTime = function() {
                                timeInstance = this.myInstance;
                                timeInstance.show();
                            }
                            //退出时，时间面板消失
                        var stateChangeStart = $rootScope.$on("$stateChangeStart",
                            function(event, toState, toParams, fromState, fromParams) {
                                if (timeInstance != null) {
                                    timeInstance.destroy();
                                }
                            });
                        $scope.$on("$destroy", function() {
                            //destroy the ui.router [stateChageStart] event
                            stateChangeStart();
                        });

                        $scope.product.marketNumber = 100;

                        //如果商品已经存在
                        if ($scope.id) {
                            $scope.new = false;
                            MicroShopManagementProductEditAppService.isExistProductActivityUser($scope.id).then(function(result) {
                                var data = result.data;
                                if (data.status == 1) {
                                    $scope.hasActivityUser = data.data;
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                            MicroShopManagementProductEditAppService.getMicroProduct($scope.id).then(function(result) {
                                if (result.data.status == 1 && result.data.data) {
                                    var shopProductModel = MicroShopManagementProductEditAppService.getMicroShopModel(result.data.data);
                                    $scope.product = shopProductModel;
                                    if (!$scope.product.introduce) {
                                        $scope.product.introduce = "";
                                    }
                                    //判断价格是否可编辑
                                    $scope.priceEdit = ($scope.product.typeModel.type == 1 ? false : true);
                                    //判断获取的商品是否是一口价商品且口碑图片存在，如果不是图片配置为微店原先的
                                    if ($scope.product.typeModel.type != 2 && !JSON.parse($scope.product.koubeiImages)) {
                                        $timeout(function() {
                                            $scope.uploadConfig.extConfig = {};
                                            $scope.uploadConfig.imageType = 7;
                                            $scope.callback.resetUploadConfig();
                                        })
                                    }
                                    var time = $scope.product.marketTime.slice(6, 19);
                                    $scope.product.marketTime = new Date(parseInt(time));
                                    if ($scope.product.productState == 1) {
                                        $scope.marking = true;
                                        $scope.compile = false;
                                    }

                                    var img = JSON.parse($scope.product.imgUrl);
                                    var koubeiimg = JSON.parse($scope.product.koubeiImages);
                                    if ($scope.uploadConfig.extConfig.serviceType == "koubei") {
                                        angular.forEach(img, function(value, index) {
                                            var obj = value.url;
                                            $scope.uploadConfig.imageUrlArr.push(obj);
                                        })
                                    } else {
                                        angular.forEach(img, function(value, index) {
                                            var obj = {
                                                imageId: koubeiimg[index].url,
                                                url: value.url
                                            }
                                            $scope.uploadConfig.imageUrlArr.push(obj);
                                        })
                                    }
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                                //关闭loading动画
                                $scope.hideLoading();
                            });
                        } else {
                            //关闭loading动画
                            $scope.hideLoading();
                        }
                    }
                    init();
                }
            ]);
    });