/**
 * 
 */
define(['ionic','services/net/activity-template'], function () {
    return angular.module('MicroBargain1_1.Service', ['services.net.activityTemplate']).
        factory('microBargain1_1Service', ['$http','activityFormService','activityTemplateService', function ($http,activityFormService,activityTemplateService) {

            var service = {};
            service.model =
            {
                title: '满天星教育',
                description: '独家编写讲义+名师授课=英语学习高效而有趣',
                name:'肖秀秀',
                imageUrl: [window.resourceDoMain + "/app/img/grow_vegetables_1_photo.png"],
                bargainProduct: '新概念英语1暑假班',
            };
            //与后端ExtConfig字段的结构保持一致
            service.activityExtConfig = {
                InitialPrice: "1000",//初始价
                PreferentialPricePowerCount: "55",//优惠价的助力人数
                PreferentialPriceStock: "50",//优惠价的库存
                PreferentialPrice: "817",//优惠价
                SpecialPricePowerCount: "145",//特惠价的助力人数
                SpecialPriceStock: "10",//特惠价的库存
                SpecialPrice: "520",//特惠价
                Version:2//2016.10.24 区分新老砍价规则
            }


            service.saveInfo = function(data){
                return activityTemplateService.addAssistUser(data, true);
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

            service.getContent = function (nameArr,valueArr) {
                var response = [];
                if(nameArr){
                    for(var i= 0;i<nameArr.length;i++){
                        response.push({name:nameArr[i]||"",value:valueArr[i]||""});
                    }
                }
                return response;
            };

            service.getConfigByAspectRatio =function(aspectRatio) {
                return {
                    aspectRatio:aspectRatio?aspectRatio: 16 /9 ,
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
                    minContainerHeight:  document.documentElement?document.documentElement.clientHeight?document.documentElement.clientHeight:400:400,
                    minContainerWidth: document.documentElement?document.documentElement.clientWidth?document.documentElement.clientWidth:300:300
                };
            };

            //获取用户信息
            service.getActivityUserInfo = function(userId,userType){
                var isFirstShare = userType=="old"?true:false;
                return activityTemplateService.getActivityUserInfo(userId,isFirstShare,4);
            };

            //砍价助力接口
            service.microBargainPower = function (userId, userType) {
                var isFirstShare = userType == "old" ? true : false;
                return activityTemplateService.microBargainPower(userId, isFirstShare);
            }

            //微砍价领取优惠接口
            service.microBargainPreferential = function (userId, type ,userType) {
                var isFirstShare = userType == "old" ? true : false;
                return activityTemplateService.microBargainPreferential(userId, type, isFirstShare);
            }

            //获取当前用户的微信信息，微信头像和微信名称
            service.getWeixinUserInfo = function(){
                return activityTemplateService.getWeixinUserInfo();
            };


            return service;

        }]);
});



