

define(['ionic'], function () {
    return angular.module('Template9_9.Service', []).
        factory('template9_9Service', ['$http', 'activityFormService', function ($http, activityFormService) {

            var service = {};
            service.model = {
                description: "预约参加，校宝秀教育\n" +
                        "将帮助您走出教育误区",
                address: "学校地址：杭州市文三路华星时代广场\n"+
                         "电话：4000051221",
                submitName: "我要预约",
                formOtherInfo:"孩子年级"
            }

            service.saveInfo = function (data, userType) {
                if (userType == "new") {
                    return activityFormService.saveNewUser(data)
                } else {
                    return activityFormService.saveOldUser(data, true);
                }
            };
            service.isValid = function (name, phone) {
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


            return service

        }]);
})

