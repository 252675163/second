/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic', 'components/templates/new-micro-site-template/site-news/default_data_service', 'services/net/templatesmodel'], function () {
    return angular.module('siteNews.Service', ['DefaultData.SiteNews.Service', 'services.net.templatesModel']).
        factory('siteNewsService', ['activityFormService', 'defaultDataForSiteNewsService', 'templatesModelService', 'promptBarService', function (activityFormService, defaultDataForSiteNewsService, templatesModelService, promptBarService) {

            var service = {};
            service.getDefaultModelByStyle = function (styleId) {
                return defaultDataForSiteNewsService.defaultModelByStyle[styleId];
            };
            service.getDefaultModel = function () {
                return {
                    News: [
                        {
                            content: "",
                            imageUrl: [],
                            date: new Date()
                        }
                    ]
                }
            };

            //非空校验
            service.isVierifyIsNotNull = function (templateModel,isShowErrorMessage) {
                if (angular.equals(templateModel, {}) || angular.isUndefined(templateModel)) {
                    if(isShowErrorMessage) {
                        promptBarService.showErrorBar("请输入机构动态", 3000);
                    }
                    return false;
                }
                else {
                    for (var i = 0; i < templateModel.News.length; i++) {
                        if (!templateModel.News[i].content) {
                            if(isShowErrorMessage) {
                                promptBarService.showErrorBar("请输入机构动态", 3000);
                            }
                            return false;
                        }
                    }
                    return true;
                }

            };
            templatesModelService.vierifyNewsiteModulesFunctionObj['site-news'] = service.isVierifyIsNotNull;


            service.getConfigByAspectRatio = function (aspectRatio) {
                return {
                    aspectRatio: aspectRatio ? aspectRatio : 16 / 9,
                    autoCropArea: 0.7,
                    strict: true,
                    guides: false,
                    center: true,
                    highlight: false,
                    dragCrop: false,
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                    zoom: -0.2,
                    checkImageOrigin: true,
                    background: false,
                    //Container的最小大小为屏幕的大小，无法获取屏幕高度时使用300*400
                    minContainerHeight: document.documentElement ? document.documentElement.clientHeight ? document.documentElement.clientHeight : 400 : 400,
                    minContainerWidth: document.documentElement ? document.documentElement.clientWidth ? document.documentElement.clientWidth : 300 : 300

                }

            };

            return service

        }]);
});