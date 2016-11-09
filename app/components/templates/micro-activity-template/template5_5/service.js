/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template5_5.Service', []).
        factory('template5_5Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title:"校宝秀国际教育",
                description:"在校宝秀国际教育学习了3个月之后，我的英语成绩从班级中等进步到年级前几名，让我觉得很开心，很充实。",
                imageUrl: [window.resourceDoMain+'/app/img/acty7_pic5.jpg']
            }
            return service

        }]);
})