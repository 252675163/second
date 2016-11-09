/**
 * author :LTD
 * time: 2015年9月17日 11:11:53
 * description: 微活动查看服务
 */
define(['ionic'], function () {
    return angular.module('services.net.activityView', []).
        factory('activityViewNetService', ['$http', function ($http) {
            function getActivity(id,sceneTemporaryUnfreezeValue) {
                return $http.post("/Activity/GetActivity", { id: id ,sceneTemporaryUnfreezeValue:sceneTemporaryUnfreezeValue });
            }

            function getUserNameByUserId(id){
                return $http.post("/Activity/GetActivityUserName  ", { activityUserId: id });
            }
            function GetActivityUserInfo(id) {
                return $http.post("/Activity/GetActivityUserInfo  ", { activityUserId: id });
            }


            return {
                GetActivity: getActivity,
                getUserNameByUserId: getUserNameByUserId,
                GetActivityUserInfo:GetActivityUserInfo,
            }

        }]);
});