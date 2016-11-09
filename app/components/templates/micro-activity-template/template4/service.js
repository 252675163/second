/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('MicroOldNewTemplate4.service', []).
        factory('microOldNewTemplate4Service', ['$http','activityFormService', function ($http,activityFormService) {

            var microTemplate4Service = {};
            microTemplate4Service.model =
            {
                title:"立即报名",
                description:"有限的时间，有限的名额，\n"+
                "考验的是速度。您的速度如何？\n"+
                "我们约吧！",
                submitName:"我要报名",
                formOtherInfo:"孩子年龄"
            };
            microTemplate4Service.saveInfo = function(data,userType){
                if(userType=="new"){
                    return activityFormService.saveNewUser(data)
                }else{
                    return activityFormService.saveOldUser(data,true);
                }
            };
            microTemplate4Service.isValid = function (name,phone) {
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

            return microTemplate4Service

        }]);
})