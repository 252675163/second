/**
 * author :lvli
 * time: 
 * description: 微店管理后台接口
 */
define(["ionic"], function() {
    return angular.module("services.net.microShopManagement", []).
    factory("microShopManagementNetService", [
        "$http",
        function($http) {
            //获取微店申请信息
            function getMicroShopApply() {
                return $http.post("/MicroShop/GetMicroShopApply", {});

            }
            //获取微店信息
            function getMicroShop() {
                return $http.post("/MicroShop/GetMicroShopByCurrentUser", {});

            }

            //编辑微店
            function saveMicroShop(shop) {
                return $http.post("/MicroShop/SaveMicroShop", shop);
            }

            //获取商品管理列表
            function getMicroShopProducts(pageIndex, pageSize) {
                return $http.post("/MicroShop/GetMicroShopProducts", { page: { pageIndex: pageIndex, pageSize: pageSize } });
            }

            //编辑商品信息
            function saveMicroShopProduct(product) {
                return $http.post("/MicroShop/SaveMicroShopProduct", product);
            }

            //获取商品信息
            function getMicroShopProduct(id) {
                return $http.post("/MicroShop/GetMicroShopProduct", { id: id });
            }

            //删除商品
            function deleteMicroShopProduct(id) {
                return $http.post("/MicroShop/DeleteMicroShopProduct", { id: id });
            }

            //更新商品状态信息
            function updateMicroShopProductState(id, productState) {
                return $http.post("/MicroShop/UpdateMicroShopProductState", { id: id, productState: productState });
            }

            //获取订单管理列表
            function getMicroShopOrders(pageIndex, pageSize) {
                return $http.post("/MicroShop/GetMicroShopOrders", { page: { pageIndex: pageIndex, pageSize: pageSize } });
            }

            //更新订单状态已完成
            function updateMicroShopOrderFinish(orderId) {
                return $http.post("/MicroShop/UpdateMicroShopOrderFinish", { id: orderId });
            }
            //提交微店申请表单
            function saveMicroShopApply(userName, schoolOrgName, contact, position) {
                return $http.post("/MicroShop/SaveMicroShopApply", {
                    "UserName": userName,
                    "SchoolOrgName": schoolOrgName,
                    "Contact": contact,
                    "position": position
                });
            }
            //微店申请时获得机构名称和职位
            function getOrgNamePostion() {
                return $http.post("/MicroShop/GetOrgNamePostion");
            }
            //商品是否存在活动用户
            function isExistProductActivityUser(productId) {
                return $http.post("/MicroShop/IsExistProductActivityUser", { productId: productId });
            }
            //判断是否有微店
            function hasKouBei(shopId) {
                return $http.post("/MicroShop/HasKoubeiShop", { shopId: shopId });
            }
            //获取口碑授权二维码
            function getKoubeiAccreditQrCode(shopModel) {
                return $http.get("/KouBei/AccreditQrCode");
            }
            return {
                getMicroShopApply: getMicroShopApply,
                getMicroShop: getMicroShop,
                saveMicroShop: saveMicroShop,
                getMicroShopProducts: getMicroShopProducts,
                saveMicroShopProduct: saveMicroShopProduct,
                getMicroShopProduct: getMicroShopProduct,
                deleteMicroShopProduct: deleteMicroShopProduct,
                updateMicroShopProductState: updateMicroShopProductState,
                getMicroShopOrders: getMicroShopOrders,
                updateMicroShopOrderFinish: updateMicroShopOrderFinish,
                saveMicroShopApply: saveMicroShopApply,
                getOrgNamePostion: getOrgNamePostion,
                isExistProductActivityUser: isExistProductActivityUser,
                hasKouBei: hasKouBei,
                getKoubeiAccreditQrCode: getKoubeiAccreditQrCode
            };
        }
    ]);
})