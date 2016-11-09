/**
 * 
 */
define(['ionic', 'services/net/activity-template'], function () {
    return angular.module('MicroSpellgroup1_1.Service', ['services.net.activityTemplate']).
        factory('microSpellgroup1_1Service', ['$http', 'activityFormService', 'activityTemplateService', function ($http, activityFormService, activityTemplateService) {

            var service = {};
            service.model =
            {
                title: "满天星光教育集团",
                description: ["少儿入门初级舞蹈班",
                    "少儿舞蹈通过科学系统的训练方法，培育孩子们良好的姿态以及高贵的气质，增强孩子身体的协调能力，给孩子美和艺术的熏陶，培养孩子的综合能力，为孩子的全面发展打下基础。原价XX元的课程，拼团成功享九折优惠！"]
            };
            //与后端ExtConfig字段的结构保持一致
            service.activityExtConfig = {
                NeedHelpCount: 3//需要的助力人数,默认值3
            }
            //添加活动用户(开团)
            service.addActivityUser = function (data) {
                return activityTemplateService.addActivityUserByActivityId(data, true);
            }
            service.helpAndAddConsult = function (data) {
                return activityTemplateService.helpAndAddConsult(data);
            };
            //获取活动助力详情列表 微拼团模板
            service.getHelperList = function (activityUserId) {
                return activityTemplateService.getHelperList(activityUserId);

            }
            //获取当前用户是否已经参加团 微拼团模板
            service.getHelpUserInfo = function (activityUserId) {
                return activityTemplateService.getHelpUserInfo(activityUserId);
            }
            //获取场景下的活动 微拼团模板 成团列表与未成团列表
            service.getHelpersByActivityId = function (activityUserId, type, pageIndex, pageSize) {
                return getHelpersByActivityId(activityUserId, type, pageIndex, pageSize);
            }
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



            //获取当前用户的微信信息，微信头像和微信名称
            service.getWeixinUserInfo = function () {
                return activityTemplateService.getWeixinUserInfo();
            };


            return service;

        }]);
});



