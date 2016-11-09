/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template6_7.Service', []).
        factory('template6_7Service',['$http','activityFormService', function ($http,activityFormService) {

            var service = {};
            service.model =
            {
                title:"我要报名",
                description:"带上父母、携上小伙伴一起来吧！\n活动现场有大礼！",
                submitName:"我要参加"
            };
            service.saveInfo = function(data,userType){
                if(userType=="new"){
                    return activityFormService.saveNewUser(data)
                }else{
                    return activityFormService.saveOldUser(data,true);
                }
            };
            service.isValid = function (name,phone) {
                if (name=="") {
                    return 1;            //名字不正确
                }
                if (phone) {
                    var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                    //      console.log(phoneRegexp.test(phone));
                    if (!phoneRegexp.test(phone))
                        return 4;           //号码不正确
                }
                else
                    return 3;               //号码为空
                return 0;                  //格式正确
            };
            return service

        }]);
})