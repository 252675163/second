/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic', 'components/templates/new-micro-site-template/site-about-us-info/default_data_service', 'services/net/templatesmodel'], function () {
    return angular.module('SiteAboutUsInfo.Service', ['DefaultData.SiteAboutUsInfo.Service', 'services.net.templatesModel']).
        factory('siteAboutUsInfoService', ['$http', 'defaultDataForSiteAboutUsInfoService', 'templatesModelService', 'promptBarService', function ($http, defaultDataForSiteAboutUsInfoService, templatesModelService, promptBarService) {

            var service = {};
            service.getDefaultModelByStyle =function(styleId){
                return defaultDataForSiteAboutUsInfoService.defaultModelByStyle[styleId];
            };

            service.campusInfoModel = {
                campusName:"",
                address:"",
                tel:""//校区联系电话
            };
            service.model ={
                aboutUsInfoList:[angular.copy( service.campusInfoModel)]
            };
            service.getDefaultModel = function(){
                return  angular.copy(service.model)
            };

            //非空校验
            service.isVierifyIsNotNull = function (templateModel,isShowErrorMessage) {
                if (angular.equals(templateModel, {}) || angular.isUndefined(templateModel)) {
                    if(isShowErrorMessage){
                        promptBarService.showErrorBar("请输入联系信息", 3000);
                    }
                    return false;
                }
                else {
                    for (var i = 0; i < templateModel.aboutUsInfoList.length; i++)
                    {
                        if (!templateModel.aboutUsInfoList[i].campusName)
                        {
                            if(isShowErrorMessage) {
                                promptBarService.showErrorBar("请输入校区名称", 3000);
                            }
                            return false;
                        }
                        if (!templateModel.aboutUsInfoList[i].address) {
                            if(isShowErrorMessage) {
                                promptBarService.showErrorBar("请输入校区地址", 3000);
                            }
                            return false;
                        }
                        if (!templateModel.aboutUsInfoList[i].tel) {
                            if(isShowErrorMessage) {
                                promptBarService.showErrorBar("请输入校区电话", 3000);
                            }
                            return false;
                        }
                    }
                } 
                return true;
            };
            templatesModelService.vierifyNewsiteModulesFunctionObj['site-about-us-Info'] = service.isVierifyIsNotNull;



            return service

        }]);
});


