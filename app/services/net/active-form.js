/**
 * Created by dayday on 2015/9/17.
 */
define(['ionic'], function () {
    return angular.module('services.net.activityForm', []).
        factory('activityFormService', ['$http', function ($http) {

            //带有推荐人用户信息
            function saveNewUser(date) {
                return $http.post("/Activity/AddIntroduceUser",date);
            }
            //没有推荐人的用户信息saveOldUser
            function saveOldUser(user,isIntroduced){
                //isIntroduced 是否成为咨询记录
                var data={
                    user:user,
                    isIntroduced : isIntroduced||false
                };
                return $http.post("/Activity/AddUser",data);
            }

            //微官网
            function saveOldUserBySite(date){
                return $http.post("/Website/AddUser",date);

            }


            return {
                saveOldUser: saveOldUser,
                saveNewUser:saveNewUser,
                saveOldUserBySite:saveOldUserBySite
            }

        }
        ]
    )
})