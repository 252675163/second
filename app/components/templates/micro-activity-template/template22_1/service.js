
define(['ionic','services/net/activity-view','modules/micro-activity-oldandnew-preview-app/leaflet-download-service'], function () {
    return angular.module('Template22_1.Service', []).
        factory('template22_1Service', ['$filter','activityFormService', 'leafletDownloadService',function ($filter,activityFormService,leafletDownloadService) {

            var service = {};
            service.model =
            {  
              title:"圣安东尼国际英语",
              description: ["专注致力于出国英语培训行业", "圣安东尼国际英语学校宁波分校3号楼201室","座机：0571-88888888\n刘老师 电话：13733333333\n微信：admin007"],
              imageUrl: [window.resourceDoMain + '/app/img/leaflet_logo.png']
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
            service.setDownloadConfig = function(templateModel){
                //调用leafletDownloadService  添加任务
                var leafletDOM  =service.getLeafletDOM(templateModel); //打印页需要的html的传单结构
                var key = "leaflet1";//不重复添加任务
                leafletDownloadService.addLeafletByKey(key,leafletDOM);//addLeafletByKey：如果任务列表中已有key，则做更新任务，不重复添加任务
            };
            service.getLeafletDOM = function(templateModel){
                // 根据templateModel拼出打印页需要的dom
                // templateModel 中的一些\n替换为<br>,空格替换  使用filter
                var ele = '   <div class="A4-box">' +
                    '                    <div class="content-box">' +
                    '                <div class="content-box-item">' +
                    '                <div class="logo"><img src="'+templateModel.imageUrl[0]+'"/></div>' +
                    '                <h3 class="server-name">'+$filter("newlines")(templateModel.title)+'</h3>' +
                    '                <p class="server-aims">'+$filter("newlines")(templateModel.description[0])+'</p>' +
                    '                <div class="QR-code"><img src="{{qrcodeurl}}"/></div>' +
                    '                <span class="QR-code-text">扫码即刻报名</span>' +
                    '                </div>' +
                    '                </div>' +
                    '                <div class="address-box">' +
                    '                <h4 class="address-content">地址</h4>' +
                    '                <p class="address-text">'+$filter("newlines")(templateModel.description[1])+'</p>' +
                    '                </div>' +
                    '                <div class="contacts-box">' +
                    '                <h4 class="contacts">联系人</h4>' +
                    '                <p class="contacts-number">'+$filter("newlines")(templateModel.description[2])+'</p>' +
                    '                </div>' +
                    '                </div>';
                return ele;
            };


            return service

        }]);
});