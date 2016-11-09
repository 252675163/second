/**
 * author :yinglechao
 * time: 2015年12月3日
 * description: 新微官网前台view
 */
define(['ionic'], function () {
    return angular.module('services.net.newSiteView', []).
        factory('newSiteViewNetService', ['$http', function ($http) {
            function getModel(webSiteId,sceneTemporaryUnfreezeValue) {
                return $http.post("/NewWebsite/GetWebsite", { id: webSiteId ,sceneTemporaryUnfreezeValue:sceneTemporaryUnfreezeValue});
            }

            return {
                getModel: getModel
            }

        }]);
});