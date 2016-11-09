/**
 * author :
 * time: 2015年9月14日 14:46:53
 * description: 微活动加页面服务
 */
define(['ionic'], function () {
    return angular.module('services.net.activityIndex', []).
        factory('activityIndexNetService', ['$http', function ($http) {
            // todo Mock
            function getModel(orgid) {
                return $http.post("/Activity/GetTemplates", { userId: orgid });
            }

            function getActivityModel(UserId, Id,activityId) {
                return $http.post("/Activity/GetDetail", { userId: UserId, templateId: Id ,activityId:activityId});
            }
            //by 2015.10.21 by yinglechao
            function getActivityList(UserId) {
                return $http.post("/Activity/GetSummaries", { userId: UserId });
            }


            function saveActivity(obj) {
                return $http.post("/Activity/Save", { activity: obj });
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
            function updateShareConfig(id,userId,userSign,ShareConfig){
                //更新shareConfig的时候更新Title字段 2016.6.27
                var title = "";
                try {
                    var shareConfigObj = angular.fromJson(shareConfig);
                    title = shareConfigObj.title;
                } catch (err) {
                    title = "";
                }
                return $http.post("/Activity/UpdateShareConfig", { id: id, shareConfig: shareConfig, Title: title });
            }

            return {
                getModel: getModel,
                getActivityModel: getActivityModel,
                saveActivity: saveActivity,
                makeNewModel: makeNewModel,
                updateShareConfig:updateShareConfig,
                getActivityList: getActivityList
            }

        }]);
})