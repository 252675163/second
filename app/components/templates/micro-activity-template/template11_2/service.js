/**
 * author :wenjun
 * time: 2015年11月23日
 * description:元旦活动模板
 */
define(['ionic', 'services/net/activity-view'], function () {
    return angular.module('Template11_2.Service', ['services.net.activityView']).
        factory('template11_2Service', ['activityFormService', 'activityViewNetService', function (activityFormService, activityViewNetService) {

            var service = {};
            service.model =
            {
                title: ["元旦快乐", "Happy New Year"],
                description: "　　元旦就要到了，在辞旧迎新的日子里，我愿为你送走烦恼，送走压力，送走失意，送走意外，祝您在新一年里：\n　　吉星高照，恭喜发财，财运亨通，财源广进，飞黄腾达，万事顺意，幸福美满，官运亨通，美梦连连，吉祥如意，万事顺利",
            }
            service.getConfigByAspectRatio =function(aspectRatio) {
                return {
                    aspectRatio:aspectRatio?aspectRatio: 16 /9 ,
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
                    minContainerHeight:  document.documentElement?document.documentElement.clientHeight?document.documentElement.clientHeight:400:400,
                    minContainerWidth: document.documentElement?document.documentElement.clientWidth?document.documentElement.clientWidth:300:300

                }

            };

            service.GetActivityUserInfo = function (userId) {
                return activityViewNetService.GetActivityUserInfo(userId);
            };



            service.saveInfo = function(data,userType){
                if(userType=="new"){
                    return activityFormService.saveNewUser(data)
                }else{
                    return activityFormService.saveOldUser(data,true);
                }
            };
            service.isValid = function (name,phone) {
                if (name=="") {
                    return 1;            //名字不正确
                }
                if (phone) {
                    var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                    //      console.log(phoneRegexp.test(phone));
                    if (!phoneRegexp.test(phone))
                        return 4;           //号码不正确
                }
                else
                    return 3;               //号码为空
                return 0;                  //格式正确
            };
            return service

        }]);
})