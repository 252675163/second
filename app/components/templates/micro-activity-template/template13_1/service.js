/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic','services/net/activity-template'], function () {
    return angular.module('Template13_1.Service', ['services.net.activityTemplate']).
        factory('template13_1Service', ['$http','activityFormService','activityTemplateService', function ($http,activityFormService,activityTemplateService) {

            var service = {};
            service.model =
            {
                title:'满天星教育',
                description:'一棵草＝1张学费抵扣券<br/>种草排行榜前10名将有机会获得神秘大奖' ,
                name:'XXX',
                imageUrl: [window.resourceDoMain+"/app/img/header_default2.png"],
            };


            service.saveInfo = function(data){
                return activityFormService.saveOldUser(data,true);
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
            service.grassList = [
                {
                    grassGrowUrl: window.resourceDoMain+"/app/img/grass1-1.gif",
                    grassDanceUrl: window.resourceDoMain+"/app/img/grass1-2.gif"
                },
                {
                    grassGrowUrl: window.resourceDoMain+"/app/img/grass2-1.gif",
                    grassDanceUrl: window.resourceDoMain+"/app/img/grass2-2.gif"
                },
                {
                    grassGrowUrl: window.resourceDoMain+"/app/img/bean-sprout-grow.gif",
                    grassDanceUrl: window.resourceDoMain+"/app/img/bean-sprout-dance.gif"
                },
                {
                    grassGrowUrl: window.resourceDoMain+"/app/img/four-leaved-clover-grow.gif",
                    grassDanceUrl: window.resourceDoMain+"/app/img/four-leaved-clover-dance.gif"
                },
                {
                    grassGrowUrl: window.resourceDoMain+"/app/img/pink-flower-grow.gif",
                    grassDanceUrl: window.resourceDoMain+"/app/img/pink-flower-dance.gif"
                },
                {
                    grassGrowUrl: window.resourceDoMain+"/app/img/dandelion-grow.gif",
                    grassDanceUrl: window.resourceDoMain+"/app/img/dandelion-dance.gif"
                },
                {
                    grassGrowUrl: window.resourceDoMain+"/app/img/sunflower-grow.gif",
                    grassDanceUrl: window.resourceDoMain+"/app/img/sunflower-dance.gif"
                },
                {
                    grassGrowUrl: window.resourceDoMain+"/app/img/daisy-grow.gif",
                    grassDanceUrl: window.resourceDoMain+"/app/img/daisy-dance.gif"
                }, {
                    grassGrowUrl: window.resourceDoMain+"/app/img/grassmogu1-1.gif",
                    grassDanceUrl: window.resourceDoMain+"/app/img/grassmogu1-2.gif"
                }

            ];
            service.getGrassList = function(){
                return service.grassList;
            };
            service.getGrassUrl = function (index) {
                switch (index) {
                    case 1:
                        return {
                            grassGrowUrl: window.resourceDoMain+"/app/img/grass1-1.gif",
                            grassDanceUrl: window.resourceDoMain+"/app/img/grass1-2.gif"
                        };
                        break;
                    case 2:
                        return {
                            grassGrowUrl: window.resourceDoMain+"/app/img/grass2-1.gif",
                            grassDanceUrl: window.resourceDoMain+"/app/img/grass2-2.gif"
                        };
                        break;
                    case 3:
                        return {
                            grassGrowUrl: window.resourceDoMain+"/app/img/bean-sprout-grow.gif",
                            grassDanceUrl: window.resourceDoMain+"/app/img/bean-sprout-dance.gif"
                        };
                        break;
                    case 4:
                        return {
                            grassGrowUrl: window.resourceDoMain+"/app/img/four-leaved-clover-grow.gif",
                            grassDanceUrl: window.resourceDoMain+"/app/img/four-leaved-clover-dance.gif"
                        };
                        break;
                    case 5:
                        return {
                            grassGrowUrl: window.resourceDoMain+"/app/img/pink-flower-grow.gif",
                            grassDanceUrl: window.resourceDoMain+"/app/img/pink-flower-dance.gif"
                        };
                        break;
                    case 6:
                        return {
                            grassGrowUrl: window.resourceDoMain+"/app/img/dandelion-grow.gif",
                            grassDanceUrl: window.resourceDoMain+"/app/img/dandelion-dance.gif"
                        };
                        break;
                    case 7:
                        return {
                            grassGrowUrl: window.resourceDoMain+"/app/img/sunflower-grow.gif",
                            grassDanceUrl: window.resourceDoMain+"/app/img/sunflower-dance.gif"
                        };
                        break;
                    case 8:
                        return {
                            grassGrowUrl: window.resourceDoMain+"/app/img/daisy-grow.gif",
                            grassDanceUrl: window.resourceDoMain+"/app/img/daisy-dance.gif"
                        };
                        break;
                    case 9:
                        return {
                            grassGrowUrl: window.resourceDoMain+"/app/img/grassmogu1-1.gif",
                            grassDanceUrl: window.resourceDoMain+"/app/img/grassmogu1-2.gif"
                        };
                        break;
                }

            };

            service.getGrassUrlByGrassCount = function (score) {
                switch (score)
                {
                    case 1:
                        return window.resourceDoMain+"/app/img/mushroom_dance.gif";

                    case 2:
                        return window.resourceDoMain+"/app/img/twograss.gif";

                    case 3:
                        return window.resourceDoMain+"/app/img/threegrass.gif";

                    case 4:
                        return window.resourceDoMain+"/app/img/fourgrass.gif";
                    case 5:
                        return window.resourceDoMain+"/app/img/fivegrass.gif";
                    //case 6:
                    //    return "/app/img/fivemoregrass.gif";
                    default:
                        return window.resourceDoMain+"/app/img/fivemore.gif";
                }
            };

            service.getGrassClasByGrassCount = function (score) {
                switch (score) {
                    case 1:
                        return "one";
                    case 2:
                        return "two";
                    case 3:
                        return "three";
                    case 4:
                        return "four";
                    case 5:
                        return "five";
                    default:
                        return "flowerpot";
                }
            };


            //种草
            service.updateScore = function(id,userType) {
                var isFirstShare = userType=="old"?true:false;
                return activityTemplateService.updateScore(id,isFirstShare);
            };

            //获取用户信息
            service.getActivityUserInfo = function(userId,userType){
                var isFirstShare = userType=="old"?true:false;
                return activityTemplateService.getActivityUserInfo(userId,isFirstShare);
            };

            //获取当前用户的微信信息，微信头像和微信名称
            service.getWeixinUserInfo = function(){
                return activityTemplateService.getWeixinUserInfo();
            };


            var userInfo = {};
            service.setUserInfo= function(info) {
                userInfo = info;
            }



            return service;
        }]);
});



