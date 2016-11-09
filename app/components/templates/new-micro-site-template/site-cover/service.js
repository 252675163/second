/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic', 'components/templates/new-micro-site-template/site-cover/default_data_service','services/net/templatesmodel'], function () {
    return angular.module('siteCover.Service', ['DefaultData.SiteCover.Service',"services.net.templatesModel"]).
        factory('siteCoverService', ['activityFormService', 'defaultDataForSiteCoverService','templatesModelService','promptBarService', function (activityFormService, defaultDataForSiteCoverService,templatesModelService,promptBarService) {

            var service = {};
            service.getDefaultModelByStyle = function (styleId) {
                return defaultDataForSiteCoverService.defaultModelByStyle[styleId];
            };
            service.getDefaultModel = function(){
              return {
                  description: ["", "", ""],
                  imageUrl: ["",""]
              }
            };
            //非空校验
            service.isVierifyIsNotNull = function(templateModel,isShowErrorMessage){
                if(angular.equals(templateModel, {}) || angular.isUndefined(templateModel)){
                    if(isShowErrorMessage) {
                        promptBarService.showErrorBar("请输入机构基本信息",3000);
                    }
                    return false;
                }else if(!templateModel.imageUrl[0]){
                    if(isShowErrorMessage) {
                        promptBarService.showErrorBar("请上传LOGO",3000);
                    }
                    return false;
                }else if(!templateModel.description[0]){
                    if(isShowErrorMessage) {
                        promptBarService.showErrorBar("请输入机构名",3000);
                    }
                    return false;
                }else if(!templateModel.description[1]){
                    if(isShowErrorMessage) {
                        promptBarService.showErrorBar("请输入机构电话",3000);
                    }
                    return false;
                }else if(!templateModel.description[2]){
                    if(isShowErrorMessage) {
                        promptBarService.showErrorBar("请输入机构品牌标语",3000);
                    }
                    return false;
                }

                return true;

            };
           templatesModelService.vierifyNewsiteModulesFunctionObj['site-cover'] = service.isVierifyIsNotNull;



            service.getConfigByAspectRatio =function(aspectRatio) {
                return {
                    aspectRatio:aspectRatio?aspectRatio: 16 /9 ,
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
                    minContainerHeight:  document.documentElement?document.documentElement.clientHeight?document.documentElement.clientHeight:400:400,
                    minContainerWidth: document.documentElement?document.documentElement.clientWidth?document.documentElement.clientWidth:300:300
                }

            };
           
            return service

        }]);
});