/**
 * author :LTD
 * time: 2015年9月11日 15:31:23
 * description: 微官网发布服务
 */
define(['ionic'], function () {
    return angular.module('services.net.sitePublish', []).
        factory('sitePublishNetService', ['$http', function ($http) {
            // todo Mock
            function saveWeb(obj) {
                return $http.post("/WebSite/Save", { website: obj });
            }
            function getMessage() {
                return $http.post("/WebSite/GetWeixinInfo");
            }
            function saveWebAndPublish(obj) {
                return $http.post("/WebSite/Publish", { website: obj });
            }
            return {
                getMessage: getMessage,
                saveWeb: saveWeb,
                saveWebAndPublish: saveWebAndPublish
            }

        }]);
})