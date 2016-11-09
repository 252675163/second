/**
 * author :LTD
 * time: 2015年9月11日 15:31:23
 * description: 微官网发布服务
 */
define(['ionic'], function () {
    return angular.module('services.net.newSitePublish', []).
        factory('newSitePublishNetService', ['$http', function ($http) {

            //新官网发布
            //isManual是否手动
            function saveAppInfoAndAppInfo(websiteId,name,phone,isManual,appId,appSecret) {
                var data = {
                    WebsiteId: websiteId,
                    Name:name,
                    Phone:phone,
                    AppId:appId,
                    AppSecret:appSecret||"",
                    IsManual:isManual||""
                };
                return $http.post("/NewWebSite/SaveSyncInfo",data);
            }
            //获取用户的微信应用(公众号或服务号)信息
            function getUserWeixinInfo(websiteId) {
                var data = {
                    WebsiteId: websiteId
                };
                return $http.post("/NewWebSite/GetUserWeixinInfo", data);
            }

            return {
                saveAppInfoAndAppInfo: saveAppInfoAndAppInfo,
                getUserWeixinInfo: getUserWeixinInfo
            }

        }]);
})