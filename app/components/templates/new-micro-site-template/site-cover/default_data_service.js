/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('DefaultData.SiteCover.Service', []).
        factory('defaultDataForSiteCoverService', ['$http', function ($http) {

            var service = {};
            //todo 后期更改url为cdn上的url
            var baseImgUrl = window.resourceDoMain+"";
            service.defaultModelByStyle = {
                //1为styleId
                "1": {
                    description: ["圣安东尼国际英语", "010-66666666", "轻松学英语，铺平留学梦"],
                    imageUrl: [baseImgUrl + '/app/img/newSite_tem1_logo.jpg', baseImgUrl + '/app/img/newSite_tem1_bg1.jpg']
                },
                "2": {
                    description: ["羲之学堂", "010-66666666", "笔墨间传承中华文化"],
                    imageUrl: [baseImgUrl + '/app/img/newSite_tem2_logo.jpg', baseImgUrl + '/app/img/newSite_tem2_bg1.jpg']
                },
                "3": {
                    description: ["思美智高教育培训学校", "010-66666666", "有兴趣+好习惯=高效学习"],
                    imageUrl: [baseImgUrl + '/app/img/newSite_tem3_logo.jpg', baseImgUrl + '/app/img/newSite_tem3_bg1.jpg']
                },
                "4": {
                    description: ["上海新青年教育", "010-66666666", "感知青春的力量，让我们放飞梦想"],
                    imageUrl: [baseImgUrl + '/app/img/newSite_tem4_logo.jpg', baseImgUrl + '/app/img/newSite_tem4_bg1.jpg']
                },
                "5": {
                    description: ["梵高艺术教育", "010-66666666", "用艺术点亮孩子的创意"],
                    imageUrl: [baseImgUrl + '/app/img/newSite_tem5_logo.jpg', baseImgUrl + '/app/img/newSite_tem5_bg1.jpg']
                },
                "6": {
                    description: ["舞动人生艺术培训", "010-66666666", "权威专业&全国连锁"],
                    imageUrl: [baseImgUrl + '/app/img/newSite_tem6_logo.jpg', baseImgUrl + '/app/img/newSite_tem6_bg1.jpg']
                },
                "7": {
                    description: ["北京长城摄影艺术学校", "010-66666666", "孕育中国摄影新时代"],
                    imageUrl: [baseImgUrl + '/app/img/newSite_tem7_logo.png', baseImgUrl + '/app/img/newSite_tem7_bg1.jpg']
                },
                "8": {
                    description: ["皮克斯动画培训学校", "010-66666666", "来自美国的专业动画培训"],
                    imageUrl: [baseImgUrl + '/app/img/newSite_tem8_logo.jpg', baseImgUrl + '/app/img/newSite_tem8_bg1.jpg']
                }
            };


            return service

        }]);
});


