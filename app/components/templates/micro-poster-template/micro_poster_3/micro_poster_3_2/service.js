/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description:砍价策略制定输入
 */
define(['ionic'], function () {
    return angular.module('MicroPoster3_2.Service', []).
        factory('microPoster3_2Service', ['$http', 'activityFormService', function ($http, activityFormService) {


            var service = {};
            service.model =
            {
                    description : "教的是书，翻开的是人生无数精彩的篇章；树的是人，长成的是世间顶天立地的儿女；燃的是烛，焚尽的是心头红泪始干的血汗；最最亲爱的老师啊，9月10日教师节来临，愿辛劳的您，收到无尽诚挚的祝福，绽放无比开心的微笑！",
            };

            var data = {};
            //设置图片信息
            service.getDescription = function () {
                return data;
            };
            //保存图片信息
            service.setDescription = function (info) {
                data.description = info;
            }

            return service;

        }]);
});



