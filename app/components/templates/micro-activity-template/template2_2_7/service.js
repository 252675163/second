/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('microOldNewTemplate2_2_7.service', []).
        factory('microOldNewTemplate2_2_7Service', ['$http', 'activityFormService', function ($http, activityFormService) {

            var microTemplate2_2_7Service = {};
            microTemplate2_2_7Service.model =
            {
                title1: "开营时间:2016-1-28",
                content1:'学校地址',
                address: "浙江省宁波市中山西路21号海洋大厦506",

                content2:'联系电话',
                telephone: "01066666666\n",

                teacher:'（宋老师）',
                description:"成功邀请好友报名，\n"+
                "您和朋友都可以获得\n"+
                "学费优惠哦！",
                submitName:"点我报名"
            };
            microTemplate2_2_7Service.saveInfo = function (data, userType) {
                if(userType=="new"){
                    return activityFormService.saveNewUser(data)
                }else{
                    return activityFormService.saveOldUser(data,true);
                }
            };
            microTemplate2_2_7Service.isValid = function (name, phone) {

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

            return microTemplate2_2_7Service

        }]);
})