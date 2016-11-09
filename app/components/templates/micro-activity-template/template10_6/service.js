/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template10_6.Service', []).
        factory('template10_6Service', ['activityFormService', function (activityFormService) {

            var service = {};
            service.model =
            {
                description: ["名额有限", "速来参与", " 神秘礼包等你来", " 浙江省杭州市西湖区文三路888号\n2015年10月30日（09:00-17:00）\n联系人：罗先生\n咨询电话：01066666666"],
                submitName: "我要参与",
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