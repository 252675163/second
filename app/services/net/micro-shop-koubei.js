/**
 * 
 * author :lvli
 * time: 
 * description: 微店口碑接口
 */
define(["ionic"], function() {
    return angular.module("services.net.microShopKoubei", []).
    factory("microShopKoubeiNetService", [
        "$http", "$q", "$timeout",
        function($http, $q, $timeout) {
            //获取同步店铺列表
            function getSyncShopList(signId) {
                return $http.get("/KouBei/GetOrgs?signId=" + signId);
            }
            //口碑登陆发送手机验证码
            function sendVerifyCode(phone) {
                return $http.get("/KouBei/SendVerifyCode?UserName=" + phone);
            }
            //同步店铺
            function syncShop(orgId, shopId) {
                return $http.post("/KouBei/FirstSyncKouBeiProduct", { OrgId: orgId, ShopId: shopId });
            }
            //登陆
            function login(userLogin) {
                return $http.post("/KouBei/Login", { UserName: userLogin.phone, PassWord: userLogin.password });
            }
            //注册
            function reg(userReg) {
                return $http.post("/KouBei/Register", { UserName: userReg.phone, PassWord: userReg.password, CAPTCHA: userReg.code });
            }

            //获取店铺信息
            function getShopInformation() {
                return $http.get("/KouBei/GetMicroShopByCurrentUser");
            }
            //提交店铺信息
            function saveShopInformation(shopModel) {
                return $http.post("/KouBei/CreateShop", shopModel);
            }

            //管理页start
            // //获取微店信息
            // function getMicroShop() {
            //     return $http.post("/MicroShop/GetMicroShopByCurrentUser", {});

            // }

            //获取商品管理列表
            function getMicroShopProductsList(pageIndex, pageSize) {
                return $http.post("/KouBei/GetKouBeiProducts", { page: { pageIndex: pageIndex, pageSize: pageSize } });
            }

            //编辑商品信息
            function updateMicroProduct(product) {
                return $http.post("/KouBei/UpdateKouBeiProduct", product);
            }
            //创建新商品
            function createMicroShopProduct(product) {
                return $http.post("/KouBei/AddKouBeiProduct", product);
            }
            //获取商品信息
            function getMicroShopProduct(id) {
                return $http.post("/KouBei/GetKouBeiProduct", { id: id });
            }

            //删除商品
            function deleteMicroShopProduct(id) {
                return $http.post("/KouBei/DeleteKouBeiProduct", { id: id });
            }

            //更新商品状态信息
            function updateMicroShopProductState(id, productState) {
                return $http.post("/KouBei/UpdateKouBeiProductType", { dto: { MicroProductId: id, ProductStateTypes: productState } });
            }

            // //获取订单管理列表
            // function getMicroShopOrders(pageIndex, pageSize) {
            //     return $http.post("/MicroShop/GetMicroShopOrders", { page: { pageIndex: pageIndex, pageSize: pageSize } });
            // }

            // //更新订单状态已完成
            // function updateMicroShopOrderFinish(orderId) {
            //     return $http.post("/MicroShop/UpdateMicroShopOrderFinish", { id: orderId });
            // }
            //商品是否存在活动用户
            function isExistProductActivityUser(productId) {
                return $http.post("/MicroShop/IsExistProductActivityUser", { productId: productId });
            }
            //获取店铺申请状态
            function mcroShopOpenState() {
                return $http.get("/KouBei/MicroShopOpenState");
            }
            //获取当前用户状态
            function getUserState(data) {
                return $http.get("/KouBei/IsvAccredit?app_id=" + data.app_id + "&source=" + data.source + "&scope=" + data.scope + "&auth_type=" + data.auth_type + "&auth_code=" + data.auth_code);
            }
            //获取二维码
            function getQrCode(url) {
                return $http.post("/KouBei/GetQrCode", { url: url });
            }
            //管理页同步 todo删除无用代码
            function syncKouBeiProduct() {
                return $http.post("/KouBei/SyncKouBeiProduct", { "shopId": "24" });
            }
            //管理页end
            return {
                getSyncShopList: getSyncShopList,
                sendVerifyCode: sendVerifyCode,
                syncShop: syncShop,
                login: login,
                reg: reg,
                getShopInformation: getShopInformation,
                saveShopInformation: saveShopInformation,
                getMicroShopProductsList: getMicroShopProductsList,
                updateMicroProduct: updateMicroProduct,
                createMicroShopProduct: createMicroShopProduct,
                getMicroShopProduct: getMicroShopProduct,
                deleteMicroShopProduct: deleteMicroShopProduct,
                updateMicroShopProductState: updateMicroShopProductState,
                isExistProductActivityUser: isExistProductActivityUser,
                mcroShopOpenState: mcroShopOpenState,
                getUserState: getUserState,
                getQrCode: getQrCode,
                syncKouBeiProduct: syncKouBeiProduct
            }
        }
    ]);
})