/**
 * author :wss
 * time: 2016年7月18日
 * description:微传单四期反面
 */
define(['ionic','services/net/activity-view','modules/micro-activity-oldandnew-preview-app/leaflet-download-service'], function () {
    return angular.module('MicroLeaflet4_2.Service', ['services.net.activityView']).
        factory('microLeaflet4_2Service', ['activityFormService', 'activityViewNetService', 'leafletDownloadService', '$filter', function (activityFormService, activityViewNetService, leafletDownloadService, $filter) {

            var service = {};
            service.model =
            {  
                title: "古墨书画培训",
                description: [
                    "古墨书画培训成立三年有余，位于嶯山之下书圣故里之中。此处人杰地灵，文化气息醇厚。书圣王羲之曾居住于此，脍炙人口的《兰亭集序》便是其在嶯山之上即兴而作。古墨书画培训立志于追先哲之遗风，立后来之楷模，开办至今已经有不少优秀学员在全国书画比赛中获奖。",
                    "毛笔书法、硬笔书法、国画、素描",
                    "师资介绍",
                    "王不周  绍兴市书法协会前会长\n陆衍客 浙江省国画协会会员",
                    "古人有云",
                    "贤哲之书温醇 ，骏雄之书沉毅，\n畸士之书历落，才子之书秀颖。"
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

                var ele = '<div class="A4-page4-B-bg">' +
                            '<div class="A4-page4-B-title">' + $filter("newlines")(templateModel.title) + '</div>' +
                            '<div class="A4-page4-B-desc">' + $filter("newlines")(templateModel.description[0]) + '</div>' +

                            '<div class="A4-page4-B-item1">' +
                                '<div class="page4-B-item-title">教学内容</div>' +
                                '<div class="page4-B-item-tips">' + $filter("newlines")(templateModel.description[1]) + '</div>' +
                            '</div>' +
                            '<div class="A4-page4-B-item2">' +
                                '<div class="page4-B-item-title">' + $filter("newlines")(templateModel.description[2]) + '</div>' +
                                '<div class="page4-B-item-tips">' + $filter("newlines")(templateModel.description[3]) + '</div>' +
                            '</div>' +
                            '<div class="A4-page4-B-item3">' +
                                '<div class="page4-B-item-title">' + $filter("newlines")(templateModel.description[4]) + '</div>' +
                                '<div class="page4-B-item-tips">' + $filter("newlines")(templateModel.description[5]) + '</div>' +
                            '</div>' +
                        '</div>';
                return ele;

            };
            return service
        }]);
});