/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic', 'components/templates/new-micro-site-template/site-course-info/default_data_service','services/net/templatesmodel'], function () {
    return angular.module('SiteCourseInfo.Service', ['DefaultData.SiteCourseInfo.Service', 'services.net.templatesModel']).
        factory('siteCourseInfoService', ['$http', 'defaultDataForSiteCourseInfoService', 'templatesModelService', 'promptBarService', function ($http, defaultDataForSiteCourseInfoService, templatesModelService, promptBarService) {

            var service = {};
            service.getDefaultModelByStyle = function (styleId) {
                return defaultDataForSiteCourseInfoService.defaultModelByStyle[styleId];
            };



            service.courseTypeModel = {
                name:"",
                list:[]//课程小类
            };
            service.courseModel = {
                name:"",
                description:""
            };

            service.getDefaultCourseTypeModel = function(){
                var courseType = angular.copy(service.courseTypeModel);
                courseType.list.push(angular.copy(service.courseModel));
                return courseType;
            };
            service.model ={
                list:[service.getDefaultCourseTypeModel()]
            };
            service.getDefaultModel = function(){
                return angular.copy( service.model);
            };

            //非空校验
            service.isVierifyIsNotNull = function (templateModel,isShowErrorMessage) {
                if (angular.equals(templateModel, {}) || angular.isUndefined(templateModel)) {
                    if(isShowErrorMessage) {
                        promptBarService.showErrorBar("请输入课程信息", 3000);
                    }
                    return false;
                }
                else {
                    for (var i = 0; i < templateModel.list.length; i++) {

                        if (!templateModel.list[i].name)
                        {
                            if(isShowErrorMessage) {
                                promptBarService.showErrorBar("请输入课程类别", 3000);
                            }
                            return false;
                        }

                        for (var j = 0; j < templateModel.list[i].list.length; j++)
                        {
                            if (!templateModel.list[i].list[j].name) {
                                if(isShowErrorMessage) {
                                    promptBarService.showErrorBar("请输入具体课程名", 3000);
                                }
                                return false;
                            }
                            if (!templateModel.list[i].list[j].description) {
                                if(isShowErrorMessage) {
                                    promptBarService.showErrorBar("请输入具体课程介绍", 3000);
                                }
                                return false;
                            }
                        }
                    }
                    return true;
                }
                

            };
            templatesModelService.vierifyNewsiteModulesFunctionObj['site-course-info'] = service.isVierifyIsNotNull;


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


