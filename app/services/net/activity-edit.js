/**
 * author :LTD
 * time: 2015年9月14日 14:46:53
 * description: 微活动编辑服务
 */
define(['ionic'], function () {
    return angular.module('services.net.activityEdit', []).
        factory('activityEditNetService', ['$http', function ($http) {

            function getAactivity(activityId) {
                return $http.post("/Activity/GetDetail", { activityId: activityId });
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
                                        title1:orgName
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
            function saveActivity(obj) {
                return $http.post("/Activity/Save", { activity: obj });
            }

            function getTemplate(id) {
                return $http.post("/Activity/GetTemplate", { id: id });
            }
            return {
                getAactivity: getAactivity,
                saveActivity: saveActivity,
                makeNewModel: makeNewModel,
                getTemplate:getTemplate
            }

        }]);
})