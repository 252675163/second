/**
 * 
 * author :lvli
 * time: 
 * description: 微店首页接口
 */
define(["ionic"], function () {
    return angular.module("services.net.microShopIndex", []).
    factory("microShopIndexNetService", [
        "$http", "$q", "$timeout",
        function ($http, $q, $timeout) {

            //获取我的订单列表 
            function getMyOrderList(shopId, pageIndex, pageSize) {
                return $http.post("/MicroShop/GetMicroShopOrdersByCurrentUser", {
                    page: { pageIndex: pageIndex, pageSize: pageSize },
                    Filter: { ShopId: shopId }
                });
            }

            //根据订单号获得订单信息
            function getMicroShopOrder(orderId) {
                return $http.post("/MicroShop/GetMicroShopOrderAndProduct", { id: orderId });
            }
            ////获取c端微店用户信息
            function getMicroShopUserInfo() {
                return $http.post("/MicroShop/GetMicroShopUserDetial", {});
            }

            // 微店首页店铺信息
            function getMicroShopByShopId(id) {
                return $http.post("/MicroShop/GetMicroShop", { id: id });
            }
            // 微店首页店铺商品列表信息
            function getMicroShopProductsList(id, pageIndex, pageSize) {
                return $http.post("/MicroShop/GetMicroShopProductsByShopId", {
                    Page: { pageIndex: pageIndex, PageSize: pageSize },
                    Filter: { ShopId: id }
                });
            }

            //发送验证码
            function sendVerifyCode(phone) {
                return $http.post("/MicroShop/SendVerifyCode", { phone: phone });
            }
            //绑定手机
            function boundPhone(phone, code) {
                return $http.post("/MicroShop/BoundPhone", { phone: phone, code: code });
            }
            //获取系统时间
            function getServerDateTime() {
                return $http.post("/Common/GetServerDateTime");
            }

            //我的商品列表
            function getMyProductsList(shopId, pageIndex, pageSize) {
                return $http.post("/MicroShop/GetMicroShopActivityUserProducts", { filter: { shopId: shopId }, page: { pageIndex: pageIndex, pageSize: pageSize } });
            }
            // 更新分享配置
            function updateShareConfig(id, config) {
                return $http.post("/MicroShop/UpdateMicroShopShareConfig", { shopId: id, shareConfig: config });
            }
            //获取活动详情
            function getActivityUserInfo(activityUserId) {
                return $http.post("/MicroShop/GetActivityUserInfo", { activityUserId: activityUserId });
            }
            //获取商品信息
            function getMicroShopProductDetail(productId) {
                return $http.post("/MicroShop/GetMicroShopProductDetail", { id: productId });
            }
            //砍价助力接口
            function microBargainPower(activityUserId) {
                return $http.post("/MicroShop/MicroBargainPower", { activityUserId: activityUserId });
            }
            //参加活动接口
            function addUser(activityId, userName, phone, config) {
                return $http.post("/MicroShop/AddUser", { activityId: activityId, name: userName, phone: phone, config: config });
            }
            //获取砍价助力列表
            function getBargainHelperInfo(activityUserId, pageIndex, pageSize) {
                return $http.post("/MicroShop/GetActivityInteractiveRecords", {
                    Page: { pageIndex: pageIndex, pageSize: pageSize },
                    Filter: { activityUserId: activityUserId, isTest: false, isCreatedAtOrder: true, OrderBy: "Desc" }
                });
            }
            //提交订单
            function addMicroShopOrder(activityUserId) {
                return $http.post("/MicroShop/AddMicroShopOrder", { ActivityUserId: activityUserId });
            }
            //统计浏览量  id: 店铺id|商品id    type: 1-店铺浏览数量  2-商品浏览数量
            function addMicroShopLog(id, type) {
                return $http.post("/MicroShop/AddMicroShopLog", { id: id, type: type });
            }
            //获取订单支付参数
            function getPayParameters(orderId) {
                return $http.post("/MicroShop/getPayParameters", { orderId: orderId });
            }
            //获取支付时订单状态
            function getMicroShopOrderByPay(orderId) {
                return $http.post("/MicroShop/GetMicroShopOrderByPay", { id: orderId });
            }
            //支付完成更新订单状态
            function payReturn(orderId) {
                return $http.post("/MicroShop/PayReturn", { orderId: orderId });
            }
            //获取技术支持by校宝秀
            function getFooter() {
                return $http.post("/Common/GetFooter");
            } 
            //无活动商品提交订单
            function addOrderByProductId(productId, userName, userPhone) {
                return $http.post("/MicroShop/AddMicroShopOrder", { productId: productId, userName: userName, userPhone: userPhone });
            }
            //获取购买人列表
            function getShopBuyRecords(productId, pageIndex,pageSize) {
                return $http.post("/MicroShop/GetShopBuyRecords", { ProductId: productId, PageIndex: pageIndex, PageSize: pageSize });
            }
            
            return {
                getMyOrderList: getMyOrderList,
                getMicroShopOrder: getMicroShopOrder,
                getMicroShopByShopId: getMicroShopByShopId,
                getMicroShopProductsList: getMicroShopProductsList,
                getMicroShopUserInfo: getMicroShopUserInfo,
                sendVerifyCode: sendVerifyCode,
                boundPhone: boundPhone,
                getServerDateTime: getServerDateTime,
                getMyProductsList: getMyProductsList,
                updateShareConfig: updateShareConfig,
                getActivityUserInfo: getActivityUserInfo,
                getMicroShopProductDetail: getMicroShopProductDetail,
                microBargainPower: microBargainPower,
                addUser: addUser,
                getBargainHelperInfo: getBargainHelperInfo,
                addMicroShopOrder: addMicroShopOrder,
                addMicroShopLog: addMicroShopLog,
                getPayParameters: getPayParameters,
                getMicroShopOrderByPay: getMicroShopOrderByPay,
                payReturn: payReturn,
                getFooter: getFooter,
                getShopBuyRecords: getShopBuyRecords,
                addOrderByProductId: addOrderByProductId
            };
        }
    ]);
})