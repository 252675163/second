/**
 * author :小潘
 * time: 2015年9月9日 17:35:08
 * description: 网络服务基础模块
 */
define(["ionic"], function() {
    return angular.module("services.permission", []).
    factory("permissionService", [
        "$rootScope", "$http", "$timeout", "$q", "maskService",
        function($rootScope, $http, $timeout, $q, maskService) {

            var permission;
            var phone;
            var isVip;
            var microShopUser;

            function setPermission(p) {
                permission = p;
            }

            function setPhone(p) {
                phone = p;
            }

            function setVip(vip) {
                isVip = vip ? true : false;
            }

            function setMicroShopUser(model) {
                microShopUser = model;
            }


            //获取ERP用户权限等信息
            function getErpUserInfo() {
                var d = $q.defer();
                var erpUserInfo;
                $http.post("/User/GetErpUserInfo").then(function(result) {
                    if (result.data.status == 1 && result.data.data) {
                        erpUserInfo = result.data.data;
                    }
                    d.resolve(erpUserInfo);
                });
                return d.promise;
            }


            //获取微店用户是否登录
            function getMicroShopUser() {
                var d = $q.defer();
                if (angular.isUndefined(microShopUser)) {
                    $http.post("/MicroShop/GetMicroShopUserDetial").then(function(result) {
                        if (result.data.status == 1 && result.data.data) {
                            var user = {
                                userId: result.data.data.MicroShopUserId,
                                userName: result.data.data.NickName,
                                headImageUrl: result.data.data.HeadImageUrl,
                                phone: result.data.data.Phone
                            }
                            setMicroShopUser(user);
                        }
                        d.resolve(microShopUser);
                    });
                } else {
                    d.resolve(microShopUser);
                }
                return d.promise;
            }

            //增加是否已绑定手机号码
            //function hasPhone() {
            //    //如果手机号未设置，则跳转到首页
            //    var d = $q.defer();
            //    if (angular.isUndefined(phone)) {
            //        //$rootScope.$state.go("index");
            //        $http.post("/Home/GetUserInfo").success(function (result) {
            //            if (result.status) {
            //                setPhone(result.data.Phone);
            //                setVip(result.data.VipStatus==3);
            //                if (!phone) {
            //                    maskService.showMask("赶紧绑定手机使用我吧！<br/>哎呀，现在就带您去绑定手机哦~", 3000, false, 3).then(function () {
            //                        $rootScope.$state.go("bindPhone", { go: 2 });
            //                    });
            //                    d.resolve(false);
            //                }
            //                d.resolve(true);
            //            } else {
            //                location.href = "/Common/Error";
            //                d.resolve(false);
            //            }
            //        });
            //    }
            //    else if (!phone) {
            //        maskService.showMask("赶紧绑定手机使用我吧！<br/>哎呀，现在就带您去绑定手机哦~", 3000, false, 3).then(function () {
            //            $rootScope.$state.go("bindPhone", { go: 2 });
            //        });
            //        d.resolve(false);
            //    }
            //    else {
            //        d.resolve(true);
            //    }
            //    return d.promise;
            //}

            //当前用户是否是vip
            function getVip() {
                var d = $q.defer();

                //如果内存中isVip字段失效了，则重新获取
                if (angular.isUndefined(isVip)) {
                    $http.post("/Home/GetUserInfo").success(function(result) {

                        //VipStatus：表示用户VIP状态，1-不是VIP，2-VIP过期，3-是VIP
                        isVip = (result.data.VipStatus == 3);
                        d.resolve(isVip);
                    });
                } else {
                    d.resolve(isVip);
                }
                return d.promise;
            }

            function hasPermission() {
                if ($rootScope.isWebchat) {
                    //                        window.wx.hideMenuItems({
                    //                            menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email"]
                    //                        });

                    //隐藏所有按钮
                    window.wx && window.wx.hideOptionMenu();
                }

                if (!permission) {
                    location.href = "/Common/Error?mark=permissionService_permission_isNull";
                    var d = $q.defer();
                    d.reject();
                    return d.promise;
                } else {
                    if (permission != 1) {
                        location.href = "/Common/Error?mark=permissionService_permission_NotEqual_1";

                        var d = $q.defer();
                        d.reject();
                        return d.promise;
                    }
                }

                //跳转问题
                //var d = $q.defer();
                //d.reject();
                //return d.promise;

                return true;
            }

            function microShopModel() {
                var d = $q.defer();

                $http.post("/MicroShop/GetMicroShopByCurrentUser").success(function(result) {
                    var microShop = result.data,
                        microShopModel = {};
                    microShopModel.shopId = microShop == null || angular.isUndefined(microShop) ? 0 : microShop.Id; 
                    microShopModel.state = microShop == null || angular.isUndefined(microShop) ? 0 : microShop.State;
                    microShopModel.licensePic = microShop == null || angular.isUndefined(microShop) ? 0 : microShop.LicensePic;
                    d.resolve(microShopModel);
                });

                return d.promise;
            }

            function microShopModelById(id) {
                var d = $q.defer();

                $http.post("/MicroShop/GetMicroShop", { "id": id }).success(function(result) {
                    var microShop = result.data;
                    var microShopModel = {};
                    microShopModel.hasShop = microShop == null || angular.isUndefined(microShop) ? false : true;
                    microShopModel.state = microShop == null || angular.isUndefined(microShop) ? 0 : microShop.State;
                    microShopModel.contact = microShop == null || angular.isUndefined(microShop) ? '' : microShop.Contact;
                    d.resolve(microShopModel);
                });

                return d.promise;
            }
            return {
                setPermission: setPermission,
                hasPermission: hasPermission,
                setPhone: setPhone,
                setVip: setVip,
                getVip: getVip,
                microShopModel: microShopModel,
                setMicroShopUser: setMicroShopUser,
                getMicroShopUser: getMicroShopUser,
                microShopModelById: microShopModelById,
                getErpUserInfo: getErpUserInfo
            };
        }
    ]);
})