/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template5_3.Service', []).
        factory('template5_3Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title:"校宝秀国际教育",
                description:"我们的学校环境很好哦！\n教室干净整洁、设施齐全、隔音良好。\n休息区还有免费的饮料、水果和糕点供应呢~\n",
                imageUrl: [window.resourceDoMain+'/app/img/acty7_pic2.jpg', window.resourceDoMain+'/app/img/acty7_pic3.jpg']
            }
            return service

        }]);
})