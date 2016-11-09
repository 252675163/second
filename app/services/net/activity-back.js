/**
 * author :小潘
 * time: 2015年9月14日 14:46:53
 * description: 微活动换背景服务
 */
define(['ionic'], function () {
    return angular.module('services.net.activityBack', []).
        factory('activityBackNetService', ['$http', function ($http) {
            // todo Mock

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
                        ImgTag:imgTag
                    }
                };
                return $http.post("/Activity/GetImageMaterials",request);
            }

            return {

                getBackUrl: getBackUrl
            }

        }]);
})