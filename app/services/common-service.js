/**
 * author :
 * time:
 * description:
 */
define(["ionic"], function () {
    return angular.module("Services.common", [])
        //控制重复请求service
        .factory('singleThreadedNetService', [function () {
            return function (fn) {
                var inProgress = false;
                return function () {
                    if (inProgress) {
                        return;
                    }
                    inProgress = true;
                    var result = fn.apply(null, arguments);
                    //check if is a promise
                    if (result && angular.isFunction(result.then))
                        result.then(function () {
                            inProgress = false;
                        }, function () {
                            inProgress = false;
                        });
                    else
                        inProgress = false;
                };
            };
        }])
        //微活动公用的与业务相关的service
        .factory('activityBusinessService', [function () {

            var getActivityShareLink = function (templateId, activityId, activityType, isAddStamp, templateCode) {
                //templateId:模板ID
                // activityId：活动ID
                // activityType：模板的类型（普通、普通复制、助力）
                //isAddStamp:路由上是否加随机码   （使用jssdk分享需要加）
                var stamp = isAddStamp ? Math.random().toString(36).substr(2) : "";
                var baseUrl = "";
                if (templateId == 2) {
                    baseUrl = window.shareServer + "/Home/GrassShareRoute?p=activity/grassindex/" + activityId;
                } else if (templateId == 13 || templateId == 14 || templateId == 18) {
                    baseUrl = window.shareServer + "/CsngShare?p=activity/oldandnewview?Id=" + activityId;
                } else if (templateId == 19) {
                    baseUrl = window.shareServer + "/" + window.creativeViewShareRouter + stamp + "Share" + "?p=activity/oldandnewview?Id=" + activityId;
                } else if (templateCode == "Aquarium") {
                    //如果是水族馆型活动
                    baseUrl = window.shareServer + "/" + window.creativeViewShareRouter + stamp + "Share" + "?p=activity/oldandnewview?Id=" + activityId;
                } else if (activityType == 3) {
                    //如果是助力型活动
                    baseUrl = window.shareServer + "/" + window.creativeViewShareRouter + stamp + "Share" + "?p=activity/oldandnewview?Id=" + activityId;
                } else if (activityType == 4) {
                    //如果是投票型活动
                    //2016.5.11 不通过jssdk分享,该链接不会通过router进行鉴权和中转
                    baseUrl = window.shareServer + "/" + window.creativeViewShareRouter + stamp + "Share" + "?p=activity/oldandnewview?Id=" + activityId;
                } else {
                    if (isAddStamp) {
                        baseUrl = window.activityServer + "/Activity" + stamp + "ShareRoute?p=activity/oldandnewview?Id=" + activityId;

                    } else {
                        baseUrl = window.activityServer + "/Home/ShareRoute?p=activity/oldandnewview?Id=" + activityId;
                    }

                }
                console.log(baseUrl);
                return baseUrl;

            };
            var templateExtConfigDefaultModel = {
                "titleConfig": {
                    "isHardcoded": false,//preview或view Title是否写死 默认不写死
                    "titleContent": "校宝秀"//标题内容
                },
                "isUsePagePlug": true,//是否使用滑屏插件,默认使用
                "nextButtonType": 1,
                "isUseFooter": true,//是否使用页脚，默认使用
                "pageDirectionIsVertical": true,//滑动方向是否垂直，默认垂直
                "isOpenDeadingFunction": false,//是否开启截止日功能，默认不开启
                "imageFolderName": "",//快速创建的助力类型模板的图片文件夹
                "isHaveBackgroundMusic": true,//模板是否有背景音乐
                "shareConfigByVisitor": [],//前台页面的shareConfig array
                "isHaveDownload": false,//是否有下载功能
                "isHaveShareByPreview": true,//预览页面是否有分享功能
                "downloadPopStyle": ""//下载弹窗的样式
            };

            //将json格式的TemplateExtConfig解析为所需的obj格式
            var parseJsonToObjForTemplateExtConfig = function (jsonForTemplateExtConfig) {
                var templateExtConfigObj = angular.copy(templateExtConfigDefaultModel);
                if (jsonForTemplateExtConfig) {
                    var templateExtConfig1 = JSON.parse(jsonForTemplateExtConfig);
                    //json 中是否存在相关配置项，若不存在，则使用默认值
                    //templateExtConfigObj.isUsePagePlug=angular.isUndefined(templateExtConfig1.isUsePagePlug)?templateExtConfigDefaultModel.isUsePagePlug:templateExtConfig1.isUsePagePlug;
                    //templateExtConfigObj.nextButtonType=angular.isUndefined(templateExtConfig1.nextButtonType)?templateExtConfigDefaultModel.nextButtonType:templateExtConfig1.nextButtonType;
                    //templateExtConfigObj.isUseFooter=angular.isUndefined(templateExtConfig1.isUseFooter)?templateExtConfigDefaultModel.isUseFooter:templateExtConfig1.isUseFooter;
                    //templateExtConfigObj.pageDirectionIsVertical=angular.isUndefined(templateExtConfig1.pageDirectionIsVertical)?templateExtConfigDefaultModel.pageDirectionIsVertical:templateExtConfig1.pageDirectionIsVertical;
                    //templateExtConfigObj.isOpenDeadingFunction=angular.isUndefined(templateExtConfig1.isOpenDeadingFunction)?templateExtConfigDefaultModel.isOpenDeadingFunction:templateExtConfig1.isOpenDeadingFunction;
                    //templateExtConfigObj.titleConfig = angular.isUndefined(templateExtConfig1.titleConfig) ? templateExtConfigDefaultModel.titleConfig : templateExtConfig1.titleConfig;
                    //templateExtConfigObj.imageFolderName = angular.isUndefined(templateExtConfig1.imageFolderName) ? templateExtConfigDefaultModel.imageFolderName : templateExtConfig1.imageFolderName;
                    //templateExtConfigObj.shareConfigByVisitor = angular.isUndefined(templateExtConfig1.shareConfigByVisitor) ? templateExtConfigDefaultModel.shareConfigByVisitor : templateExtConfig1.shareConfigByVisitor;
                    //templateExtConfigObj.isHaveBackgroundMusic = angular.isUndefined(templateExtConfig1.isHaveBackgroundMusic) ? templateExtConfigDefaultModel.isHaveBackgroundMusic : templateExtConfig1.isHaveBackgroundMusic
                    //templateExtConfigObj.isHaveDownload = angular.isUndefined(templateExtConfig1.isHaveDownload) ? templateExtConfigDefaultModel.isHaveDownload : templateExtConfig1.isHaveDownload
                    //templateExtConfigObj.isHaveShareByPreview = angular.isUndefined(templateExtConfig1.isHaveShareByPreview) ? templateExtConfigDefaultModel.isHaveShareByPreview : templateExtConfig1.isHaveShareByPreview

                    templateExtConfigObj = angular.extend({}, templateExtConfigObj, templateExtConfig1);
                    //console.log(templateExtConfigObj);
                }
                return templateExtConfigObj;
            };
            //默认的siteModel           
            var defaultSiteModel = {
                pages: [],
                title: "",
                isPublish: false,
                status: "preview",
                currentPageIndex: 0,
                currentSectionIndex: 0,
                editPermissions: {}
            };
            //var defaultSiteModelForPage = {
            //    "pageName": "",
            //    "backgroundAudio": "",
            //    "sections": []
            //};

            //var  defaultSiteModelForSection =  {
            //        "sectionName": "",
            //        "templateName": "template21by1",
            //        "type": 0,//enum{0:不做表单唯一性校验，1：封面，2：图文，3：表单}
            //        "templateModel": {},
            //        "backgroundImage": "",
            //        "editPermissions": {}
            //    };
            ////编辑权限model
            //var defaultSiteModelForEditPermissionsModel = {
            //    "addPage": true,//加页
            //    "deletePage": true,//删页
            //    "replaceMusic": true,//更换音乐
            //    "replaceBackground": true,//更换背景图片
            //    "save": true,//保存
            //    "preview": true//预览
            //};


            //将后端存储的siteModel转为为前端需要的uiSiteModel格式
            var siteModelToUiSiteModel = function (siteModel) {
                var uiSiteModel = angular.copy(defaultSiteModel);
                if (angular.isUndefined(siteModel)) {

                } else {
                    uiSiteModel.pages = angular.isUndefined(siteModel.pages) ? [] : siteModel.pages;
                    uiSiteModel.isPublish = angular.isUndefined(siteModel.title) ? false : siteModel.title;
                    uiSiteModel.status = angular.isUndefined(siteModel.status) ? "" : siteModel.status;
                    uiSiteModel.currentPageIndex = angular.isUndefined(siteModel.currentPageIndex) ? "" : siteModel.currentPageIndex;
                    uiSiteModel.currentSectionIndex = angular.isUndefined(siteModel.currentSectionIndex) ? 0 : siteModel.currentSectionIndex;
                    uiSiteModel.editPermissions = angular.isUndefined(siteModel.editPermissions) ? {} : siteModel.editPermissions;
                    //转editPermissions
                    uiSiteModel.editPermissions.addPage = angular.isUndefined(uiSiteModel.editPermissions.addPage) ? true : uiSiteModel.editPermissions.addPage;
                    uiSiteModel.editPermissions.deletePage = angular.isUndefined(uiSiteModel.editPermissions.deletePage) ? true : uiSiteModel.editPermissions.deletePage;
                    uiSiteModel.editPermissions.replaceMusic = angular.isUndefined(uiSiteModel.editPermissions.replaceMusic) ? true : uiSiteModel.editPermissions.replaceMusic;
                    uiSiteModel.editPermissions.replaceBackground = angular.isUndefined(uiSiteModel.editPermissions.replaceBackground) ? true : uiSiteModel.editPermissions.replaceBackground;
                    uiSiteModel.editPermissions.save = angular.isUndefined(uiSiteModel.editPermissions.save) ? true : uiSiteModel.editPermissions.save;
                    uiSiteModel.editPermissions.preview = angular.isUndefined(uiSiteModel.editPermissions.preview) ? true : uiSiteModel.editPermissions.preview;

                    //转page
                    for (var i = 0; i < uiSiteModel.pages.length; i++) {
                        var page = uiSiteModel.pages[i];
                        page.pageName = angular.isUndefined(page.pageName) ? [] : page.pageName;
                        page.backgroundAudio = angular.isUndefined(page.backgroundAudio) ? "" : page.backgroundAudio;
                        page.sections = angular.isUndefined(page.sections) ? [] : page.sections;
                        //转section
                        for (var n = 0; n < page.sections.length; n++) {
                            var section = page.sections[n];
                            section.sectionName = angular.isUndefined(section.sectionName) ? "" : section.sectionName;
                            section.templateName = angular.isUndefined(section.templateName) ? "" : section.templateName;
                            section.type = angular.isUndefined(section.type) ? 0 : section.type;
                            section.templateModel = angular.isUndefined(section.templateModel) ? {} : section.templateModel;
                            section.backgroundImage = angular.isUndefined(section.backgroundImage) ? "" : section.backgroundImage;
                            //section.editPermissions = angular.isUndefined(section.editPermissions)?null:section.editPermissions;
                            section.isHideInEdit = angular.isUndefined(section.isHideInEdit) ? false : section.isHideInEdit;
                            section.isHideInView = angular.isUndefined(section.isHideInView1) ? false : section.isHideInView1;

                            //转section   editPermissions waring
                            if (section.editPermissions) {
                                section.editPermissions.deletePage = angular.isUndefined(section.editPermissions.deletePage) ? true : section.editPermissions.deletePage;
                                section.editPermissions.replaceBackground = angular.isUndefined(section.editPermissions.replaceBackground) ? true : section.editPermissions.replaceBackground;
                            }
                        }
                    }
                }

                return uiSiteModel;

            };

            var extendActivityTemplateModel = function (templateConfig, templateModelExtConfig) {
                if (angular.isUndefined(templateModelExtConfig) || !templateModelExtConfig) {
                    return templateConfig;
                }
                else {
                    templateModelExtConfig = JSON.parse(templateModelExtConfig);
                    for (var i = 0, len1 = templateConfig.pages.length; i < len1 ; i++) {
                        var page = templateConfig.pages[i];
                        page.backgroundAudio = templateModelExtConfig.pages[i].backgroundAudio;
                        for (var j = 0, len2 = page.sections.length; j < len2; j++) {
                            var section = page.sections[j],
                                templateName = section.templateName;
                            angular.extend(section.templateModel, templateModelExtConfig.pages[i].sections[templateName]);

                        }
                    }
                    return templateConfig;
                }
            }

            var getBgAudioPosClassName = function (templateExtConfig) {
                var audioPosClassList = ["audio_upper_left", "audio_upper_right", "audio_bottom_left", "audio_bottom_right"];
                if (!angular.isUndefined(templateExtConfig) &&
                    !angular.isUndefined(templateExtConfig.bgAudioConfig)) {
                    var type = templateExtConfig.bgAudioConfig.bgAudioPosType;
                    return type > 0 ? audioPosClassList[type - 1] : audioPosClassList[1];
                } else {
                    return audioPosClassList[1];
                }
            }

            return {
                getActivityShareLink: getActivityShareLink,
                parseJsonToObjForTemplateExtConfig: parseJsonToObjForTemplateExtConfig,
                siteModelToUiSiteModel: siteModelToUiSiteModel,
                extendActivityTemplateModel: extendActivityTemplateModel,
                getBgAudioPosClassName: getBgAudioPosClassName
            };

        }]);

});