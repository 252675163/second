/**
 * author :小潘
 * time: 2015年9月14日 14:46:53
 * description: 微活动预览服务
 */
define(["ionic"], function() {
    return angular.module("services.net.activityPreview", []).
        factory("activityPreviewNetService", [
            "$http", function($http) {
                function getActivity(activityId, templateId) {
                    if (activityId) {
                        return $http.post("/Activity/GetDetail", { activityId: activityId });
                    }
                    return $http.post("/Activity/GetTemplate", { id: templateId });

                }

                function makeNewModel(orgName) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                "backgroundAudio": "http://cdn.schoolpal.cn/shiningstar" + "/Activity/20150918165536-e398d.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template2",
                                        "templateModel": {
                                            title1: orgName
                                        },
                                        "backgroundImage": "http://cdn.schoolpal.cn/shiningstar" + "/Website/20150916144024-ce78f.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template5",
                                        "templateModel": {},
                                        "backgroundImage": "http://cdn.schoolpal.cn/shiningstar" + "/Website/20150916144607-03d34.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template3",
                                        "templateModel": {},
                                        "backgroundImage": "http://cdn.schoolpal.cn/shiningstar" + "/Website/20150916144717-3ab4f.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template4",
                                        "templateModel": {},
                                        "backgroundImage": "http://cdn.schoolpal.cn/shiningstar" + "/Website/20150916145254-df03a.jpg"
                                    }
                                ]
                            }
                        ],
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }

                function saveActivity(obj) {
                    return $http.post("/Activity/Save", { activity: obj });
                }

                function updateShareConfig(id, shareConfig) {
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

                // 新增接口  前台使用获取模板的Config等其他信息 无鉴权
                function getTemplateById(id) {
                    return $http.post("/Activity/GetTemplateById", { id: id });
                }

                //生成传单图片 2016.5.24 by yinglechao
                function getLeafletImgUrlList(leafletDomList,activityId){
                    var data = {
                        LeafletDomList:leafletDomList,
                        ActivityId:activityId
                    };
                    return $http.post("/Activity/CreateLeafletImage", data);
                }




                return {
                    getActivity: getActivity,
                    makeNewModel: makeNewModel,
                    saveActivity: saveActivity,
                    updateShareConfig: updateShareConfig,
                    getTemplateById: getTemplateById,
                    getLeafletImgUrlList:getLeafletImgUrlList
                };
            }
        ]);
})