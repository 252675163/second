/**
 * author :
 * time: 2015年12月3日
 * description: 新微官网编辑服务
 */
define(['ionic'], function () {
    return angular.module('services.net.newSiteEdit', []).
        factory('newSiteEditNetService', ['$http', function ($http) {
            //获取微官网信息
            function getWebSite(websiteId) {
                return $http.post("/NewWebsite/GetDetail", {websiteId:websiteId});
            }
            function saveWeb(obj) {
                return $http.post("/NewWebsite/Save", { website: obj });
            }
            function updateShareConfig(id, shareConfig) {
                //更新shareConfig的时候更新Title字段 2016.6.27
                var title = "";
                try {
                    var shareConfigObj = angular.fromJson(shareConfig);
                    title = shareConfigObj.title;
                } catch (err) {
                    title = "";
                }

                return $http.post("/NewWebsite/UpdateShareConfig", { id: id, shareConfig: shareConfig ,Title:title});
            }
           

            return {
                getWebSite: getWebSite,
                saveWeb: saveWeb,
                updateShareConfig:updateShareConfig
            }

        }]);
});