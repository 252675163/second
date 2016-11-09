

define(['ionic'], function () {
    return angular.module('microOldNewTemplate7_7.service', []).
        factory('microOldNewTemplate7_7Service', ['$http', 'activityFormService', function ($http, activityFormService) {

            var MicroOldNewTemplate7_7Service = {};
            MicroOldNewTemplate7_7Service.model = {
                title: "报名微讲堂 做称职家长 ",
                description: "想聆听特约讲师Christina的更多分享？立即免费报名父母英语微讲堂吧！\n"+
                        "前20位报名的家长还有惊喜小礼品赠送哦~",
                submitName: "我要报名"
            }

            MicroOldNewTemplate7_7Service.saveInfo = function (data, userType) {
                if (userType == "new") {
                    return activityFormService.saveNewUser(data)
                } else {
                    return activityFormService.saveOldUser(data, true);
                }
            };
            MicroOldNewTemplate7_7Service.isValid = function (name, phone) {
                if (name == "") {
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


            return MicroOldNewTemplate7_7Service

        }]);
})

