/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("MicroTemplate1.Service", []).
        factory("microTemplate1Service", [
            "$http", "activityFormService", function($http, activityFormService) {

                var microTemplate1Service = {};
                microTemplate1Service.model =
                {
                    title: "马上报名",
                    //actionName: "活动标题",
                    //description: "活动简介",
                    //imageUrl: ["/app/img/testimg.png", "/app/img/testimg.png"]
                    buttonName: "预约报名"
                };
                microTemplate1Service.saveInfo = function(data) {
                    return activityFormService.saveOldUserBySite(data);
                };
                microTemplate1Service.isValid = function(name, phone,conent) {

                    if (name == "") {
                        //var nameRegexp = /^.{1,15}$/;
                        //if (!nameRegexp.test(name))
                        return 1; //名字不正确
                    }


                    if (phone) {
                        var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                        //      console.log(phoneRegexp.test(phone));
                        if (!phoneRegexp.test(phone))
                            return 4; //号码不正确
                    } else {
                        return 3; //号码为空

                    }
                    if (conent.length > 50) {
                        return 5;
                    }

                    return 0; //格式正确

                };

                return microTemplate1Service;
            }
        ]);
})