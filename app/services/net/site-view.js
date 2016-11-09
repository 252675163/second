/**
 * author :LTD
 * time: 2015年9月11日 15:31:23
 * description: 微官网编辑背景服务
 */
define(['ionic'], function () {
    return angular.module('services.net.siteView', []).
        factory('siteViewNetService', ['$http', function ($http) {
            function getModel(webSiteId) {
                return $http.post("/WebSite/GetWebsite", { id: webSiteId });
            }
            function makeNewModel(orgName) {
                return {
                    "pages": [
                        {
                            "pageName": "关于我们",
                            "backgroundAudio": "",
                            "sections": [
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template4",
                                    "templateModel": {
                                        //title: OrgName
                                    },
                                    "backgroundImage": "/app/img/temp3_bg.png"
                                },
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template3",
                                    "templateModel": {},
                                    "backgroundImage": "/app/img/temp3_bg.png"
                                }
                            ]
                        },
                        {
                            "pageName": "新鲜活动",
                            "backgroundAudio": "",
                            "sections": [
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template6",
                                    "templateModel": {},
                                    "backgroundImage": "/app/img/temp3_bg.png"
                                },
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template5",
                                    "templateModel": {},
                                    "backgroundImage": "/app/img/temp3_bg.png"
                                }
                            ]
                        },
                        {
                            "pageName": "课程介绍",
                            "backgroundImage": "",
                            "sections": [
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template2",
                                    "templateModel": {},
                                    "backgroundImage": "/app/img/temp3_bg.png"
                                },
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template1",
                                    "templateModel": {},
                                    "backgroundImage": "/app/img/temp3_bg.png"
                                }
                            ]
                        }
                    ],
                    "isPublish": false,
                    "status": "view",
                    "currentPageIndex": 0,
                    "currentSectionIndex": 0
                }
            }
            return {
                getModel: getModel,
                makeNewModel: makeNewModel
            }

        }]);
})