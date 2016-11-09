/**
 * author :陈雪冬
 * time: 2016年8月3日13:38:09
 * description:微传单五 反面
 */
define(['ionic', 'services/net/activity-view', 'modules/micro-activity-oldandnew-preview-app/leaflet-download-service'], function () {
    return angular.module('MicroLeaflet5_2.Service', ['services.net.activityView']).
        factory('microLeaflet5_2Service', ['activityFormService', 'activityViewNetService', 'leafletDownloadService', '$filter', function (activityFormService, activityViewNetService, leafletDownloadService, $filter) {

            var service = {};
            service.model =
                {
                    title: "圣安东尼国际英语",
                    description: [
                        "满天星成立于2010年，总校区设于北京海淀区，是一家专业英语培训机构。成立短短5年，已经成为中国英语培训的佼佼者，给上万名学员提供优质英语教育，帮助他们成功获得海外留学的机会。我们有来自欧美的资深外教，国内海归教育人才，知名院校专业讲师。",
                        "托福基础班、托福基础班、托福VIP、托福基础班、托福基础班、托福基础班、托福基础班",
                        "托福基础班、托福基础班、托福VIP、托福基础班、托福基础班、托福基础班、托福基础班"
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

            service.setDownloadConfig = function (templateModel) {
                //调用leafletDownloadService  添加任务
                var leafletDOM = service.getLeafletDOM(templateModel); //打印页需要的html的传单结构
                var key = "leaflet2";//不重复添加任务
                leafletDownloadService.addLeafletByKey(key, leafletDOM);//addLeafletByKey：如果任务列表中已有key，则做更新任务，不重复添加任务
            };
            service.getLeafletDOM = function (templateModel) {
                //根据templateModel拼出打印页需要的dom
                //templateModel 中的一些\n替换为<br>,空格替换

                var ele = '<div class="A4-page-content">' +
                    '<div class="A4-page5-B-bg">' +
                    '    <div class="A4-page5-B-title">' + $filter("newlines")(templateModel.title) + '</div>' +
                    '    <div class="A4-page5-B-subtitle">机构介绍</div>' +
                    '    <div class="A4-page5-B-desc">' + $filter("newlines")(templateModel.description[0]) + '</div>' +
                    '    <div class="A4-page5-B-item1">' +
                    '        <div class="page5-B-item-title">教学内容</div>' +
                    '        <div class="page5-B-item-tips">' + $filter("newlines")(templateModel.description[3]) + ' </div>' +
                    '    </div>' +
                    '    <div class="A4-page5-B-item2">' +
                    '        <div class="page5-B-item-title">班型</div>' +
                    '        <div class="page5-B-item-tips">' + $filter("newlines")(templateModel.description[1]) + ' </div>' +
                    '    </div>' +
                    '   </div>' +
                    '/div>';

                return ele;

            };
            return service
        }]);
});