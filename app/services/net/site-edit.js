/**
 * author :小潘
 * time: 2015年9月10日 18:21:23
 * description: 微官网编辑服务
 */
define(['ionic'], function () {
    return angular.module('services.net.newSiteEdit', []).
        factory('newSiteEditNetService', ['$http', function ($http) {
            //获取微官网信息
            function getWebSite(websiteId) {
                return $http.post("/WebSite/GetDetail", {websiteId:websiteId});
            }
            function saveWeb(obj) {
                return $http.post("/WebSite/Save", { website: obj });
            }


            function makeNewModel(orgName) {
                return {
                    "pages": [
                        {
                            "pageName": "",
                            "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20150918165536-e398d.mp3",
                            "sections": [
                                {
                                    "sectionName": "",
                                    "templateName": "micro-old-new-template2",
                                    "templateModel": {
                                        title1: orgName
                                    },
                                    "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Website/20150916144024-ce78f.jpg"
                                },
                                {
                                    "sectionName": "",
                                    "templateName": "micro-old-new-template5",
                                    "templateModel": {},
                                    "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Website/20150916144607-03d34.jpg"
                                },
                                {
                                    "sectionName": "",
                                    "templateName": "micro-old-new-template3",
                                    "templateModel": {},
                                    "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Website/20150916144717-3ab4f.jpg"
                                },
                                {
                                    "sectionName": "",
                                    "templateName": "micro-old-new-template4",
                                    "templateModel": {},
                                    "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Website/20150916145254-df03a.jpg"
                                }
                            ]
                        }
                    ],
                    "isPublish": false,
                    "status": "edit",
                    "currentPageIndex": 0,
                    "currentSectionIndex": 0
                }
            }
           

            return {
                getWebSite: getWebSite,
                saveWeb: saveWeb,
                makeNewModel:makeNewModel
            }

        }]);
})