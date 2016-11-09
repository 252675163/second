/**
 * author :wenjun
 * time: 2015年11月23日
 * description:元旦活动模板
 */
define(['ionic'], function () {
    return angular.module('Template11_3.Service', []).
        factory('template11_3Service', ['$http', 'activityFormService', function ($http, activityFormService) {

            var service = {};
            service.model =
            {
                title: "送祝福赢大奖",
                description: "在喜迎元旦的日子里，只要填写信息并将祝福发送给好友，就有机会赢取神秘大奖，还有报班折扣，优惠多多，赶紧参加吧～",
                submitName: "点击提交",
                formOtherInfo: "送上祝福",
            };
            service.tempInfo = {};

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
            service.getConfigByAspectRatio = function (aspectRatio) {
                return {
                    aspectRatio: aspectRatio ? aspectRatio : 16 / 9,
                    autoCropArea: 0.7,
                    strict: true,
                    guides: false,
                    center: true,
                    highlight: false,
                    dragCrop: false,
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                    zoom: -0.2,
                    checkImageOrigin: true,
                    background: false,
                    //Container的最小大小为屏幕的大小，无法获取屏幕高度时使用300*400
                    minContainerHeight: document.documentElement ? document.documentElement.clientHeight ? document.documentElement.clientHeight : 400 : 400,
                    minContainerWidth: document.documentElement ? document.documentElement.clientWidth ? document.documentElement.clientWidth : 300 : 300

                }

            };
            service.formOtherInfoToJSON = function(infoNameArray,infoValueArray){
                var formOtherInfoByJson = [];
                if(infoNameArray){
                    for(var i = 0;i<infoNameArray.length;i++){
                        var info = {
                            name:infoNameArray[i]||"",
                            value:infoValueArray[i]||""
                        };
                        formOtherInfoByJson.push(info);
                    }
                }
                return formOtherInfoByJson;

            };



            return service

        }]);
});



