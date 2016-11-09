/**
 * author :LTD
 * time: 2015年9月11日 15:31:23
 * description: 微官网预览服务
 */
define(['ionic'], function () {
    return angular.module('services.net.newSitePreview', []).
        factory('newSitePreviewNetService', ['$http', function ($http) {

            //参数传递待更改
            function getWebsite(websiteId) {
                return $http.post("/NewWebsite/GetDetail", { websiteId: websiteId });
            }
            function saveWebsite(obj) {
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
                getWebSite: getWebsite,
                saveWebsite:saveWebsite,
                updateShareConfig:updateShareConfig
            }
        }]);
});