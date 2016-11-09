/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic', 'components/templates/new-micro-site-template/site-teacher-info/default_data_service', 'services/net/templatesmodel'], function () {
    return angular.module('SiteTeacherInfo.Service', ['DefaultData.SiteTeacherInfo.Service', 'services.net.templatesModel']).
        factory('siteTeacherInfoService', ['$http', 'defaultDataForSiteTeacherInfoService','templatesModelService', 'promptBarService', function ($http, defaultDataForSiteTeacherInfoService,templatesModelService, promptBarService) {

            var service = {};

            service.getDefaultModelByStyle = function (styleId) {
                return defaultDataForSiteTeacherInfoService.defaultModelByStyle[styleId];
            };

            service.teacherInfoModel = {
                name:"",
                description:"",
                imageUrl:""
            };
            service.model ={
                teacherInfoList:[angular.copy( service.teacherInfoModel)]
            };
            service.getDefaultModel = function(){
                return angular.copy(service.model);
            };


            //非空校验
            service.isVierifyIsNotNull = function (templateModel,isShowErrorMessage) {
                if (angular.equals(templateModel, {}) || angular.isUndefined(templateModel)) {
                    if(isShowErrorMessage) {
                        promptBarService.showErrorBar("请输入教师信息", 3000);
                    }
                    return false;
                }
                else {
                    for (var i = 0; i < templateModel.teacherInfoList.length; i++)
                    {
                        if (!templateModel.teacherInfoList[i].name) {
                            if(isShowErrorMessage) {
                                promptBarService.showErrorBar("请输入教师姓名", 3000);
                            }
                            return false;
                        }
                        if (!templateModel.teacherInfoList[i].description)
                        {
                            if(isShowErrorMessage) {
                                promptBarService.showErrorBar("请输入教师介绍", 3000);
                            }
                            return false;
                        }
                        if (!templateModel.teacherInfoList[i].imageUrl) {
                            if(isShowErrorMessage) {
                                promptBarService.showErrorBar("请添加教师图片", 3000);
                            }
                            return false;
                        }
                    }
                    return true;
                }
            };
            templatesModelService.vierifyNewsiteModulesFunctionObj['site-teacher-info'] = service.isVierifyIsNotNull;

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


