/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template10_2.Service', []).
        factory('template10_2Service', ['activityFormService', function (activityFormService) {

            var service = {};
            service.model =
            {
                bigTitle: "活动日程",
                title: ["◎知名教师  亲临指导", "◎教学评估  享受优惠", "◎抽奖活动  好礼不断", "◎活动现场  交流互动"],
                description: ["2015年10月30日上午9:00-10:30\nXXX老师讲述如何教育孩子",
                    "2015年10月30日上午11:00-12:00\n检阅校园环境，享报名优惠",
                    "2015年10月30日下午13:00-15:00\n填教学评估表，参与抽奖，大礼抱回家",
                    "2015年10月30日下午15:00-17:00\n亲子互动交流，家长共享育儿经"]
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
            return service

        }]);
});