/**
 * author :huijuan
 * time: 2216年1月12日
 * description:招生简章模板
 */
define(['ionic','services/net/activity-view','modules/micro-activity-oldandnew-preview-app/leaflet-download-service'], function () {
    return angular.module('Template22_2.Service', ['services.net.activityView']).
        factory('template22_2Service', ['activityFormService','activityViewNetService', 'leafletDownloadService','$filter',function (activityFormService,activityViewNetService,leafletDownloadService,$filter) {

            var service = {};
            service.model =
            {  
                title: "圣安东尼国际英语",
                description: ["圣安东尼国际英语成立于2010年，总校区设于北京海淀区，是一家专业英语培训机构。成立短短5年，已经成为中国英语培训的佼佼者，给上万名学员提供优质英语教育，帮助他们成功获得海外留学的机会。我们有来自欧美的资深外教，国内海归教育人才，知名院校专业讲师。", "雅思基础班    8-12人  120课时   5688元\n雅思提高班      6人       60课时    4888元\n托福基础班   8-12人   120课时   6888元\n托福提高班      6人      60课时     5288元\n托福VIP           1对1    30课时      5688元", "凭此传单页上门可免费试听/纯正发音外教课堂"],
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
                var ele = '<div class="A4-box2">' +
                    '                    <div class="company-name">'+$filter("newlines")(templateModel.title) +'</div>' +
                    '                <div class="company-introduce">' +
                    '                <div class="introduce-name">机构介绍</div>' +
                    '<table><tr><td class="introduce-text-box">'+
                    '                <p class="introduce-text">'+$filter("newlines")(templateModel.description[0])+'</p>' +
                    '</td></tr></table>'+
                    '                </div>' +
                    '                <div class="company-course">' +
                    '                <div class="course-name">课程</div>' +
                    '<table><tr><td class="course-item-box">'+
                    '                <p class="course-item">' +$filter("newlines")(templateModel.description[1]) +
                    '                </p>' +
                    '</td></tr></table>'+
                    '                </div>' +
                    '                <div class="company-advantage">' +
                    '                <div class="advantage-name">优势</div>' +
                    '<table><tr><td class="advantage-text-box">'+
                    '                <p class="advantage-text">'+$filter("newlines")(templateModel.description[2])+'</p>' +
                    '</td></tr></table>'+
                    '                </div>' +
                    '                </div>';
                return ele;
            };



            return service

        }]);
});