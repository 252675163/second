/**
 * Created by xj on 2016/2/22.
 * 报名提醒
 */
define(['ionic'], function () {
    return angular.module('Services.net.userSignupremind', []).
        factory('userSignupremindNetService', ['$http', function ($http) {
            // 获得提醒开关
            function getUserSignUpRemind() {
                return $http.post("/Home/GetReceiveMsg", {});
            }

            //更新提醒开关
            function setUserSignUpRemind(isNotRemindMsg, type) {
                return $http.post("/Home/UpdateReceiveMsg", { isNotRemindMsg: isNotRemindMsg, type: type })
            }

            return {
                getUserSignUpRemind: getUserSignUpRemind,
                setUserSignUpRemind: setUserSignUpRemind
            }

        }]);
})