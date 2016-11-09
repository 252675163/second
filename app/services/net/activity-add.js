/**
 * author :
 * time: 2015年9月14日 14:46:53
 * description: 微活动加页面服务
 */
define(['ionic'], function () {
    return angular.module('services.net.activityAdd', []).
        factory('activityAddNetService', ['$http','$q', function ($http,$q) {
            var filterType = {"all":0,"index":1,"imageOrText":2,"form":3}
            function getSection(templateId,pageIndex, pageSize, filter) {
                //filter:页面的类型：全部、图文、表单。。。。。
                var request = {
                    filter:{
                        TemplateId:templateId,
                        Tag:filterType[filter]
                    },
                    page:{
                        PageIndex:pageIndex,
                        PageSize:pageSize
                    }
                }
                return $http.post("/Activity/GetPages",request);
            }

            return {
                getSection: getSection
            }

        }]);
})