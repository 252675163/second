define(['ionic', 'services/net/activity-view', 'modules/micro-activity-oldandnew-preview-app/leaflet-download-service'], function () {
    return angular.module('MicroLeaflet3_1.Service', []).
        factory('microLeaflet3_1Service', ['$filter', 'activityFormService', 'leafletDownloadService', function ($filter, activityFormService, leafletDownloadService) {

            var service = {};
            service.model =
            {
                title: "圣安东尼跆拳道",
                description: [
                    "专业致力于跆拳道培训",
                    "扫码免费试课",
                    "座机：0571-88888888\n刘老师 电话：13733333333\n微信：admin007",
                    "圣安东尼跆拳道学校宁波分校3号楼201室"
                ],
                imageUrl: []
            };
            service.GetActivityUserInfo = function (userId) {
                return activityViewNetService.GetActivityUserInfo(userId);
            };
            
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
            //打印功能
            service.setDownloadConfig = function (templateModel) {
                //调用leafletDownloadService  添加任务
                var leafletDOM = service.getLeafletDOM(templateModel); //打印页需要的html的传单结构
                var key = "leaflet1";//不重复添加任务
                leafletDownloadService.addLeafletByKey(key, leafletDOM);//addLeafletByKey：如果任务列表中已有key，则做更新任务，不重复添加任务
            };
            service.getLeafletDOM = function (templateModel) {
                // 根据templateModel拼出打印页需要的dom
                // templateModel 中的一些\n替换为<br>,空格替换  使用filter

                var ele = '<div class="A4-page-content">' +
                    (templateModel.imageUrl[0] ? '<div class="A4-content-logo"><img src="' + templateModel.imageUrl[0] + '"/></div>' : '') +
                    '                <div class="A4-content-slogan">' +
                    '                <div class="content-slogan-tirle">' + $filter("newlines")(templateModel.title) + '</div>' +
                    '                <div class="content-slogan-tips">' + $filter("newlines")(templateModel.description[0]) + '</div>' +
                    '                </div>' +
                    '                <div class="A4-content-code">' +
                    '                <div class="content-code-box"><img src="{{qrcodeurl}}" /></div>' +
                    '                <div class="content-code-tips">' + $filter("newlines")(templateModel.description[1]) + '</div>' +
                    '                </div>' +
                    '                <div class="A4-content-address">' +
                    '                    <div class="content-address-item">' +
                    '                       <h3 class="item-address-h3">联系方式</h3>' +
                    '                        <p>' + $filter("newlines")(templateModel.description[2]) + '</p>' +
                    '                    </div>' +
                    '                    <div class="content-address-item">' +
                    '                        <h3 class=" item-address-h3">地址</h3>' +
                    '                        <p>' + $filter("newlines")(templateModel.description[3]) + '</p>' +
                    '                    </div>' +
                    '                </div>';

                return ele;
            };


            return service

        }]);
});