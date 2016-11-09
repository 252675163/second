/**
 * author :LTD
 * time: 2015年9月11日 15:31:23
 * description: 微官网添加模板服务
 */
define(['ionic'], function () {
    return angular.module('services.net.siteAdd', []).
        factory('siteAddNetService', ['$http', function ($http) {
            var filterType = {"all":0,"index":1,"imageOrText":2,"form":3}
            function getSection(templateId,pageIndex, pageSize, filter) {
                //filter:页面的类型：全部、图文、表单。。。。。
                var request = {
                    filter: {
                        TemplateId: templateId,
                        Tag: filterType[filter]
                    },
                    page: {
                        PageIndex: pageIndex,
                        PageSize: pageSize
                    }
                }
                return $http.post("/WebSite/GetPages", request);
            }


            //function getSection(orgId) {
            //    return {
            //        "templates": [
            //            {
            //                templateUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20150925173425-f85b2.jpg",
            //                templateName: "micro-template4",
            //                backgroundImage: window.resourceDoMain+"/app/img/temp3_bg.png"
            //            },
            //            {
            //                templateUrl: window.resourceDoMain+"/app/img/thumbnail_site2.jpg",
            //                templateName: "micro-template3",
            //                backgroundImage: window.resourceDoMain+"/app/img/temp3_bg.png"
            //            },
            //            {
            //                templateUrl: window.resourceDoMain+"/app/img/thumbnail_site3.jpg",
            //                templateName: "micro-template6",
            //                backgroundImage: window.resourceDoMain+"/app/img/temp3_bg.png"
            //            },
            //            {
            //                templateUrl: window.resourceDoMain+"/app/img/thumbnail_site4.jpg",
            //                templateName: "micro-template5",
            //                backgroundImage: window.resourceDoMain+"/app/img/temp3_bg.png"
            //            },
            //            {
            //                templateUrl: window.resourceDoMain+"/app/img/thumbnail_site5.jpg",
            //                templateName: "micro-template2",
            //                backgroundImage: window.resourceDoMain+"/app/img/temp3_bg.png"
            //            },
            //            {
            //                templateUrl: window.resourceDoMain+"/app/img/thumbnail_site6.jpg",
            //                templateName: "micro-template1",
            //                backgroundImage: window.resourceDoMain+"/app/img/temp3_bg.png"
            //            }
            //        ]
            //    }
            //}

            return {
                getSection: getSection
            }

        }]);
})