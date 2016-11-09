/**
 * Created by dayday on 2015/11/5.
 * 用户中心相关接口
 */
define(["ionic"],
    function() {
        return angular.module("Services.net.userCenter", [])
            .factory("userCenterNetService",
            [
                "$http", "$q", function($http) {
                    function getUserInfoByUserId() {
                        //iphone说明页返回会跳转到上一个用户页面  需要重发请求
                        return $http.post("/Home/GetUserInfo?timestamp=" + new Date());
                    }

                    //邀请有礼
                    function getInvitationInfo() {
                        return $http.post("/Customer/GetInvitationInfo");
                    }

                    function invitationUser(id) {
                        return $http.post("/Customer/InvitationUser", { id: id });
                    }

                    //解除校宝绑定
                    function removeSchoolPalLink(orgId, orgUserId) {
                        return $http.post("/Organization/UnBoundOrg", { orgId: orgId, orgUserId: orgUserId });
                    }

                    //绑定校宝
                    function bindSchoolPal(schoolPalWeb, account, password) {
                        //schoolPalWeb：网址后缀，account：校宝账号,password：校宝密码
                        return $http.post("/Organization/BoundOrg",
                        { orgEnName: schoolPalWeb, username: account, password: password });
                    }

                    //获取用户机构列表
                    function getUserAccountList() {
                        return $http.post("/Organization/GetSchoolPalOrgList");
                    }

                    //切换机构
                    function switchAccount(orgId, orgUserId) {
                        return $http.post("/Organization/ResetBoundOrg", { orgId: orgId, orgUserId: orgUserId });
                    }

                    //数据迁移
                    function transferData(perUserId, orgUserId) {
                        return $http.post("/Organization/MigrateOrgData", { sponsorOrgUserId: perUserId, receiverOrgUserId: orgUserId });
                    }

                    //机构数据是否为空
                    function orgHasData(orgUserId, orgId) {
                        return $http.post("/Organization/OrgHasData", { orgUserId: orgUserId, orgId: orgId });
                    }

                    //获取机构状态
                    function getOrgUserState(orgUserId) {
                        return $http.post("/Organization/GetOrgUserState", { orgUserId: orgUserId });
                    }

                    //获取数据迁移状态
                    function getMigrateState() {
                        return $http.post("/Organization/GetMigrateState");
                    }

                    //绑定手机号相关接口 begin------
                    //手机号码校验
                    function verifyPhone(phone) {
                        return $http.post("/Home/CheckPhone", { phone: phone });
                    }

                    //发送校验码
                    function sendVerificationCode(phone) {
                        return $http.post("/Home/SendVerifyCode", { phone: phone });
                    }

                    //2015.12.25 发送校验码 图形验证接口
                    function sendVerifyCodeByImageCode(phone, code) {
                        return $http.post("/Home/SendVerifyCodeByImageCode", { phone: phone, code: code });
                    }

                    //绑定手机号
                    function bindPhone(phone, code) {
                        return $http.post("/Home/BoundPhone", { phone: phone, code: code });
                    }

                    //--------绑定手机号相关接口 end

                    function isShowNotice(configKey) {
                        return $http.post("/Home/GetUserConfig", { configKey: configKey });
                    }

                    function updateUserConfig(configKey, configValue) {
                        return $http.post("/Home/UpdateUserConfig", { configKey: configKey, configValue: configValue });
                    }

                    function getPhone() {
                        return $http.post("/Home/GetPhone");
                    }

                    function checkPhoneType(phone) {
                        return $http.post("/Home/CheckPhoneType", { phone: phone });
                    }

                    function login(phone, code, password, type) {
                        return $http.post("/Home/Login", { phone: phone, code: code, password: password, type: type });
                    }

                    //注销
                    function signOut() {
                        return $http.post("/Home/SignOut");
                    }

                    //获取钱包账户信息
                    function getSchoolPalWalletAccount() {
                        return $http.post("/MicroShop/GetSchoolPalWalletAccount");
                    }
                    //获取微店
                    function getMicroShopByCurrentUser() {
                        return $http.post("/MicroShop/GetMicroShopByCurrentUser");
                    }
                    return {
                        getUserInfoByUserId: getUserInfoByUserId,
                        removeSchoolPalLink: removeSchoolPalLink,
                        bindSchoolPal: bindSchoolPal,
                        verifyPhone: verifyPhone,
                        sendVerificationCode: sendVerificationCode,
                        sendVerifyCodeByImageCode: sendVerifyCodeByImageCode,
                        bindPhone: bindPhone,
                        isShowNotice: isShowNotice,
                        updateUserConfig: updateUserConfig,
                        GetInvitationInfo: getInvitationInfo,
                        InvitationUser: invitationUser,
                        getUserAccountList: getUserAccountList,
                        switchAccount: switchAccount,
                        transferData: transferData,
                        orgHasData: orgHasData,
                        getOrgUserState: getOrgUserState,
                        getMigrateState: getMigrateState,
                        getPhone: getPhone,
                        checkPhoneType: checkPhoneType,
                        login: login,
                        signOut: signOut,
                        getSchoolPalWalletAccount:getSchoolPalWalletAccount,
                        getMicroShopByCurrentUser:getMicroShopByCurrentUser
                    };
                }
            ]);
    })