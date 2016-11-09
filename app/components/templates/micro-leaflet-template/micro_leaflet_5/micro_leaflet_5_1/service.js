define(['ionic', 'services/net/activity-view', 'modules/micro-activity-oldandnew-preview-app/leaflet-download-service'], function () {
    return angular.module('MicroLeaflet5_1.Service', []).
        factory('microLeaflet5_1Service', ['$filter', 'activityFormService', 'leafletDownloadService', function ($filter, activityFormService, leafletDownloadService) {

            var service = {};
            service.model =
            {
                title: "圣安东尼国际英语",
                description: [
                    "专注致力于出国英语培训行业",
                    "扫码即刻报名",
                    "刘老师&nbsp;电话：13733333333\n微信：admin007\n座机：0571-88888888",
                    "杭州市西湖区文三路华远大厦西单元602室巴拉巴拉巴拉"
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
                    '<div class="A4-page5-bg">'+
                    '    <div class="A4-page5-desc">' + $filter("newlines")(templateModel.description[0]) + '</div>'+
                    '    <div class="A4-page5-title">'+ $filter("newlines")(templateModel.title) +'</div>'+
                    '    <div class="A4-page5-code">'+
                    '        <div class="page5-code-box">'+
                    '            <img src="{{qrcodeurl}}" />'+
                    '        </div>'+
                    '        <div class="page5-code-tips">' + $filter("newlines")(templateModel.description[1]) + '</div>'+
                    '    </div>'+
                    '    <div class="A4-page5-address">'+
                    '        <div class="page5-address-item">'+
                    '            <h3 class="item-address-h3"></h3>'+
                    '            <p class="address_phone">' + $filter("newlines")(templateModel.description[2]) + '</p>'+
                    '        </div>'+
                    '        <div class="page5-address-item  address_add">'+
                    '           <h3 class=" item-address-h3"></h3>'+
                    '            <p>' + $filter("newlines")(templateModel.description[3]) + '</p>'+
                    '        </div>'+
                    '   </div>'+
                    '</div>';


                return ele;
            };


            return service

        }]);
});