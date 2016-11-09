/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template5_6.Service', []).
        factory('template5_6Service', ['$http','activityFormService', function ($http,activityFormService) {

            var service = {};
            service.model =
            {
                title:"福利来啦~",
                description:"即日起至2015年12月31日，只要成功报名并分享至微信朋友圈，即可获得小学英语课程免费试听机会哦！\n还在犹豫什么，赶紧报名吧~",
                submitName: "我要报名"
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