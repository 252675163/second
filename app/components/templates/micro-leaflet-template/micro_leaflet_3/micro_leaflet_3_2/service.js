/**
 * author :wss
 * time: 2016年7月07日
 * description:微传单三期反面
 */
define(['ionic','services/net/activity-view','modules/micro-activity-oldandnew-preview-app/leaflet-download-service'], function () {
    return angular.module('MicroLeaflet3_2.Service', ['services.net.activityView']).
        factory('microLeaflet3_2Service', ['activityFormService', 'activityViewNetService', 'leafletDownloadService', '$filter', function (activityFormService, activityViewNetService, leafletDownloadService, $filter) {

            var service = {};
            service.model =
            {  
                title: "圣安东尼跆拳道",
                description: [
                    "圣安东尼跆拳道成立于2010年，总校区设于北京海淀区，是一家专业跆拳道培训机构。成立5年来，已经成为中国跆拳道培训的佼佼者，给上万名学员提供优质跆拳道培训，帮助他们在跆拳道学习的道路上绽放出自己的光彩。近年来，已有不少学生参加全国跆拳道大赛，并取得优异成绩。",
                    "少年班、青年班、女子防身术班、私教一对一班",
                    "教练简介",
                    "卢浩 中国跆拳道黑带四段、中国跆拳道晋级考官",
                    "学习益处",
                    "强身健体、磨炼意志、树立自信、独立自强、瘦身减肥、缓解压力"
                ],
              imageUrl: [window.resourceDoMain + '/app/img/acty23_logo.jpg']
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

            service.setDownloadConfig = function(templateModel){
                //调用leafletDownloadService  添加任务
                var leafletDOM  =service.getLeafletDOM(templateModel); //打印页需要的html的传单结构
                var key = "leaflet2";//不重复添加任务
                leafletDownloadService.addLeafletByKey(key,leafletDOM);//addLeafletByKey：如果任务列表中已有key，则做更新任务，不重复添加任务
            };
            service.getLeafletDOM = function(templateModel){
                //根据templateModel拼出打印页需要的dom
                //templateModel 中的一些\n替换为<br>,空格替换

                var ele = '<div class="A4-page-content-B">' +
                '    <div class="content-B-header">' + $filter("newlines")(templateModel.title) + '</div>' +
                '    <div class="content-B-item1">' +
                '        <div class="B-item-title">机构介绍</div>' +
                '        <div class="B-item-tips">' + $filter("newlines")(templateModel.description[0]) + '</div>' +
                '    </div>' +
                '    <div class="content-B-item2">' +
                '        <div class="B-item-title">班型</div>' +
                '        <div class="B-item-tips">' + $filter("newlines")(templateModel.description[1]) + ' </div>' +
                '    </div>' +
                '    <div class="content-B-item3">' +
                '        <div class="B-item-title">'+ $filter("newlines")(templateModel.description[2]) + '</div>' +
                '        <div class="B-item-tips">' + $filter("newlines")(templateModel.description[3]) + ' </div>' +
                '    </div>' +
                '    <div class="content-B-item4">' +
                '        <div class="B-item-title">'+ $filter("newlines")(templateModel.description[4]) + '</div>' +
                '        <div class="B-item-tips">' + $filter("newlines")(templateModel.description[5]) + '</div>' +
                '    </div>' +
                '</div>';
                return ele;

            };
            return service
        }]);
});