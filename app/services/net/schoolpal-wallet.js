/**
 * 
 * author :lvli
 * time: 
 * description: 校宝钱包接口
 */
define(["ionic"], function() {
    return angular.module("services.net.schoolpalWallet", []).
    factory("schoolpalWalletNetService", [
        "$http", "$q", "$timeout",
        function($http, $q, $timeout) {

            //提现订单详情
            function getMicroShopOrder(id) {
                return $http.post("/MicroShop/GetMicroShopOrder", {
                    "id": id,
                });
            }
            //提交提现申请
            function addMicroShopDrawApply(code, inputNum) {
                return $http.post("/MicroShop/AddMicroShopDrawApply", {
                    "amount": inputNum,
                    "code": code
                });
            }
            //钱包账户信息
            function getSchoolPalWalletAccount() {
                return $http.post("/MicroShop/GetSchoolPalWalletAccount");
            }
            //发送验证码
            function getVerificationCode() {
                return $http.post("/MicroShop/SendVerifyCodeWhenDraw");
            }
            //获取带星号的校长手机
            function getPrincipalPhone() {
                return $http.post("/MicroShop/GetPrincipalPhone");
            }
            //获取账户信息
            function getSchoolPalWalletAccount() {
                return $http.post("/MicroShop/GetSchoolPalWalletAccount")
            }
            //获取提现 收入订单列表
            function getMicroShopEventLogs(pageIndex, pageSize) {
                return $http.post("/MicroShop/GetMicroShopEventLogs", { page: { pageIndex: pageIndex, pageSize: pageSize } });
            }
            //获取订单详情
            function getMicroShopDrawApplyDetail(id) {
                return $http.post("/MicroShop/GetMicroShopDrawApplyDetail", { id: id });
            }

            //获取c端用户信息
            function getMicroShopUserMsgByUserId(id) {
                return $http.post("/MicroShop/GetMicroShopUserMsgByUserId", { id: id });
            }

            ////提现规则判断
            function checkMicroShopDrawApply() {
                return $http.post("/MicroShop/CheckMicroShopDrawApply");
            }
            //根据云账号获取头像和昵称
            function getHeaderNicknameBySchoolPalCloudSignId(id) {
                return $http.post("/MicroShop/GetHeaderNicknameBySchoolPalCloudSignId", { id: id });
            }
            return {
                getVerificationCode: getVerificationCode,
                getMicroShopDrawApplyDetail: getMicroShopDrawApplyDetail,
                addMicroShopDrawApply: addMicroShopDrawApply,
                getSchoolPalWalletAccount: getSchoolPalWalletAccount,
                getPrincipalPhone: getPrincipalPhone,
                getMicroShopEventLogs: getMicroShopEventLogs,
                getMicroShopOrder: getMicroShopOrder,
                getMicroShopUserMsgByUserId: getMicroShopUserMsgByUserId,
                checkMicroShopDrawApply: checkMicroShopDrawApply,
                getHeaderNicknameBySchoolPalCloudSignId: getHeaderNicknameBySchoolPalCloudSignId
            };
        }
    ]);
})