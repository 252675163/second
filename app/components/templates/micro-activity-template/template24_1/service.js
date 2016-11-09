/**
 * 
 */
define(['ionic', 'services/net/activity-template'], function () {
    return angular.module('Template24_1.Service', ['services.net.activityTemplate']).
        factory('template24_1Service', ['$http',  'activityTemplateService', function ($http,  activityTemplateService) {

            var service = {};
            service.model =
            {
                imageUrl: [window.resourceDoMain + "/app/img/grow_vegetables_1_photo.png"],
                title: "满天星教育集团",                        //机构标题
                description: "一条鱼=一张学费抵扣券",           //机构提示文案
                name: "XXX",                                   //姓名框默认文案
                headBarTitle: "的欢乐农场",                    //头部标题
                headBarTitleColor: "#fff",                    //头部标题色值
                userTermsTextColor1: "#fff",                  //“同意”文本色值
                userTermsTextColor2: "red",                   //“用户条款”文本色值
                titleColor: "#fff",                           //标题色值
                descriptionColor: "#fff"                      //提示文案色值
            };


            service.saveInfo = function (data) {
                return activityTemplateService.addAssistUser(data, true);
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

            service.getContent = function (nameArr, valueArr) {
                var response = [];
                if (nameArr) {
                    for (var i = 0; i < nameArr.length; i++) {
                        response.push({ name: nameArr[i] || "", value: valueArr[i] || "" });
                    }
                }
                return response;
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
                };
            };





            //更新礼物
            service.updateChristmasScore = function (id, userType,captcha) {
                var isFirstShare = userType == "old" ? true : false;
                return activityTemplateService.updateActivityInteractiveRecords(id, isFirstShare, captcha);
            };

            //获取用户信息
            service.getActivityUserInfo = function (userId, userType) {
                var isFirstShare = userType == "old" ? true : false;
                var activityType = 4;//通用助力表
                return activityTemplateService.getActivityUserInfo(userId, isFirstShare, 4);
            };
            //获取当前用户的微信信息，微信头像和微信名称
            service.getWeixinUserInfo = function () {
                return activityTemplateService.getWeixinUserInfoByHeadImgUseWeixinUrl();
            };




            return service;

        }]);
});



