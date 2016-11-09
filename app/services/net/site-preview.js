/**
 * author :LTD
 * time: 2015年9月11日 15:31:23
 * description: 微官网预览服务
 */
define(['ionic'], function () {
    return angular.module('services.net.sitePreview', []).
        factory('sitePreviewNetService', ['$http', function ($http) {
            function getPreModel(orgId) {
                return {
                    "pages": [
                        {
                            "pageName": "首页",
                            "backgroundAudio": "",
                            "sections": [
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template6",
                                    "templateModel": {
                                    },
                                    "backgroundImage": "/app/img/1-2.jpg"
                                },
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template2",
                                    "templateModel": {
                                        "input1": "哈哈1",
                                        "input2": "哈哈1",
                                        "Image1": "http://www.baidu.com",

                                    },
                                    "backgroundImage": ""
                                }
                            ]
                        },
                        {
                            "pageName": "关于我们",
                            "backgroundAudio": "",
                            "sections": [
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template2",
                                    "templateModel": {
                                        "input1": "哈哈2",
                                        "input2": "哈哈2",
                                        "Image1": "http://www.baidu.com",

                                    },
                                    "backgroundImage": ""
                                }
                            ]
                        },
                        {
                            "pageName": "联系",
                            "backgroundImage": "",
                            "sections": [
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template1",
                                    "templateModel": {
                                        "input1": "哈哈3",
                                        "input2": "哈哈3",
                                        "Image1": "http://www.baidu.com",

                                    },
                                    "backgroundImage": "123"
                                }
                            ]
                        }
                    ],

                    "isPublish": false,
                    "status": "preview",
                    "currentPageIndex": 0,
                    "currentSectionIndex": 0
                }
            }

            //参数传递待更改
            function getWebSite(websiteId) {
                return $http.post("/Website/GetDetail", { websiteId: websiteId });
            }

            return {
                getPreModel: getPreModel,
                getWebSite: getWebSite
            }

        }]);
})