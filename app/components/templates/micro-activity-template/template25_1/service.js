define(['ionic', 'services/net/activity-view', 'modules/micro-activity-oldandnew-preview-app/leaflet-download-service'], function () {
    return angular.module('Template25_1.Service', []).
        factory('template25_1Service', ['$filter', 'activityFormService', 'leafletDownloadService', function ($filter, activityFormService, leafletDownloadService) {

            var service = {};
            service.model =
            {
                title: "圣安东尼国际舞蹈",
                description: [
                    "专注致力于舞蹈培训行业",
                    "扫码申请试听",
                    "座机：0571-88888888\n刘老师 电话：13733333333\n微信：admin007",
                    "圣安东尼舞蹈学校宁波分校3号楼201室"
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
              
                var ele ='<div class="A4-page-box ">' +

                    (templateModel.imageUrl[0]? '<div class="A4-page-logo"><img src="' + templateModel.imageUrl[0] + '"/></div>':'')+
                    '                <div class="header-page">' +
                    '                <h1 class="logo-tips">' + $filter("newlines")(templateModel.title) + '</h1>' +
                    '                <h3 class="logo-tips-text">' + $filter("newlines")(templateModel.description[0]) + '</h3>' +
                    '                </div>' +
                    '                <div class="bottom-contact">' +
                    '                <div class="contact-content">' +
                    '                <div class="contact-left">' +
                    '                <img src="{{qrcodeurl}}" />' +
                    '                <div class="contact-code-text">' + $filter("newlines")(templateModel.description[1]) + '</div>' +
                    '                </div>' +
                    '                <div class="contact-right">' +
                    '                <p class="contact-title">联系方式</p>' +
                    '                <span class="contact-position">' + $filter("newlines")(templateModel.description[2]) + '</span>' +
                    '                </div>' +
                    '                </div>' +
                    '                </div>' +
                    '                <div class="bottom-address">' +
                    '                <p class="address-title">地址</p>' +
                    '                <span class="address-position">' + $filter("newlines")(templateModel.description[3]) + '</span>' +
                    '                </div>' +
                    '                </div>';
                return ele;
            };


            return service

        }]);
});