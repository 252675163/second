/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic','services/net/activity-template'], function () {
    return angular.module('Template20_1.Service', ['services.net.activityTemplate']).
        factory('template20_1Service', ['$http','activityFormService','activityTemplateService', function ($http,activityFormService,activityTemplateService) {

            var service = {};
            service.model =
            {
                title: '满天星教育',
                name: '校宝秀',
                imageUrl: [window.resourceDoMain + "/app/img/grow_vegetables_1_photo.png"],
                couponsAmount: 100,
                helperCount: 20
            };
            var data = {};
            service.getTemplateModel = function(){
                return data;
            };
            service.setDataOfTempaletModel = function(templateModel){
                data.templateModel = templateModel;
            };


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

            //获得刮奖结果金额
            service.voucherScratch = function (userId, userType) {
                var isFirstShare = userType == "old" ? true : false;
                return activityTemplateService.voucherScratch(userId, isFirstShare);
            };

            //获取用户信息
            service.getActivityUserInfo = function(userId,userType){
                var isFirstShare = userType=="old"?true:false;
                return activityTemplateService.getActivityUserInfo(userId,isFirstShare,4);
            };
            //2016.4.29 获取当前用户的微信信息，微信头像和微信名称 ---头像使用微信地址
            service.getWeixinUserInfo = function(){
                return activityTemplateService.getWeixinUserInfoByHeadImgUseWeixinUrl();
            };
            //是否是第一次进入页面，表单页只有先打开第一页才能打开
            service.isFirst=true;

            

            return service;

        }]);
});



