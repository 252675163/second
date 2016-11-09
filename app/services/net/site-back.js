/**
 * author :LTD
 * time: 2015年9月11日 15:31:23
 * description: 微官网编辑背景服务
 */
define(['ionic'], function () {
    return angular.module('services.net.siteBack', []).
        factory('siteBackNetService', ['$http', function ($http) {
            function getBackUrl(templateId,pageIndex,pageSize,imgTag) {
                //filter
                //public long TemplateId { get; set; }
                //public ImageTag ImgTag { get; set; }
                //public AudioTag AudioTag { get; set; }
                var request = {
                    page:{
                        PageSize:pageSize,
                        PageIndex:pageIndex
                    },
                    filter:{
                        TemplateId:templateId,
                        imgTag:imgTag
                    }
                };
                return $http.post("/WebSite/GetImageMaterials",request);
            }

            return {
                getBackUrl: getBackUrl
            }

        }]);
})