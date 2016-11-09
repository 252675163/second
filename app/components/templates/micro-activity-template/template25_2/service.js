/**
 * author :huijuan
 * time: 2516年1月12日
 * description:招生简章模板
 */
define(['ionic','services/net/activity-view','modules/micro-activity-oldandnew-preview-app/leaflet-download-service'], function () {
    return angular.module('Template25_2.Service', ['services.net.activityView']).
        factory('template25_2Service', ['activityFormService','activityViewNetService', 'leafletDownloadService','$filter',function (activityFormService,activityViewNetService,leafletDownloadService,$filter) {

            var service = {};
            service.model =
            {  
                title: "圣安东尼国际舞蹈",
                description: [
                    "圣安东尼舞蹈成立于2010年，总校区设于北京海淀区，是一家专业舞蹈培训机构。成立短短5年，已经成为中国舞蹈培训的佼佼者，给上万名学员提供优质舞蹈培训，帮助他们在舞蹈的成长道路上绽放出自己的光彩。近年来，已有不少学生参加全国舞蹈大赛，并且取得优异的成绩。",
                    "幼儿班、少儿班、成人班",
                    "儿童舞、民族舞、拉丁舞、街舞、机械舞、HIP-HOP舞、爵士舞等",
                    "自由标题",
                    "自由内容"
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

                var ele = ' <div class="A4-page-box2">' +
                    '                    <div class="header-title-box">'+$filter("newlines")(templateModel.title) +'</div>' +
                    '                <table class="introduction">' +
                    '                <tr>' +
                    '                <td class="td-title-box">' +
                    '                <div class="page-icon-box"><div class="page-icon-inner">机构介绍</div></div>' +
                    '                </td>' +
                    '                <td class ="td-content-box">' +
                    '                <div class="page-text-box">'+$filter("newlines")(templateModel.description[0])+'</div>' +
                    '                </td>' +
                    '                </tr>' +
                    '                </table>' +
                    '                <table class="class-type">' +
                    '                <tr>' +
                    '                <td class="td-content-box">' +
                    '                <div class="page-text-box">'+$filter("newlines")(templateModel.description[1])+'</div>' +
                    '                </td>' +
                    '                <td class="td-title-box">' +
                    '                <div class="page-icon-box"><div class="page-icon-inner">班型</div></div>' +
                    '                </td>' +
                    '                </tr>' +
                    '                </table>' +
                    '                <table class="teaching-content">' +
                    '                <tr>' +
                    '                <td class="td-title-box">' +
                    '                <div class="page-icon-box"><div class="page-icon-inner">教学内容</div></div>' +
                    '                </td>' +
                    '                <td class="td-content-box">' +
                    '                <div class="page-text-box">' +$filter("newlines")(templateModel.description[2]) +
                    '</div>' +
                    '                </td>' +
                    '                </tr>' +
                    '                </table>' +
                    '                <table class="Free-title">' +
                    '                <tr>' +
                    '                <td class="td-content-box">' +
                    '                <div class="page-text-box">' +$filter("newlines")(templateModel.description[4]) +
                    '</div>' +
                    '                </td>' +
                    '                <td class="td-title-box">' +
                    '                <div class="page-icon-box"><div class="page-icon-inner">' +$filter("newlines")(templateModel.description[3]) +
                    '</div></div>' +
                    '                </td>' +
                    '                </tr>' +
                    '                </table>' +
                    '                </div>';
                return ele;


            };



            return service

        }]);
});