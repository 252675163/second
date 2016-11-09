/**
 * author :
 * time: 2015年9月14日 14:46:53
 * description: 微活动换音频服务
 */
define(['ionic'], function () {
    return angular.module('services.net.activityAudio', []).
        factory('activityAudioNetService', ['$http', function ($http) {

            function getAudios(templateId,pageIndex,pageSize,audioTag) {
                var request = {
                    page:{
                        PageSize:pageSize,
                        PageIndex:pageIndex
                    },
                    filter:{
                        TemplateId:templateId,
                        AudioTag:audioTag
                    }
                };
                return $http.post("/Activity/GetAudioMaterials", request);
            }
            return {
                getAudios: getAudios
            }

        }]);
})