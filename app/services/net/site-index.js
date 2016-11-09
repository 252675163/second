/**
 * author :LTD
 * time: 2015年9月11日 15:31:23
 * description: 微官网首页服务
 */
define(['ionic'], function () {
    return angular.module('services.net.siteIndex', []).
        factory('siteIndexNetService', ['$http', function ($http) {
            // todo Mock
            //获取微官网首页信息 warning 目前微官网只有一套模板
            function getModel(orgid) {
                return $http.post("/WebSite/GetDetails", { userSign: orgid });
            }
            function makeNewModel(OrgName) {
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
                                       // title: OrgName
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
                            "pageName": "精品课程",
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
                    "status": "edit",
                    "currentPageIndex": 0,
                    "currentSectionIndex": 0
                }
            }

            function saveWeb(obj) {
                return $http.post("/WebSite/Save", { website: obj });
            }
            function updateShareConfig(id, userSign, shareConfig) {
                var title = "";
                try {
                    var shareConfigObj = angular.fromJson(shareConfig);
                    title = shareConfigObj.title;
                } catch (err) {
                    title = "";
                }
                return $http.post("/WebSite/UpdateShareConfig", {id:id,userSign:userSign,shareConfig:shareConfig,Title:title });
            }

            return {
                getModel: getModel,
                makeNewModel: makeNewModel,
                saveWeb: saveWeb,
                updateShareConfig:updateShareConfig
            }

        }]);
})