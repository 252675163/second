/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template10_1.Service', []).
        factory('template10_1Service', ['activityFormService', function (activityFormService) {

            var service = {};
            service.model =
            {
                description:["太阳花舞蹈培训中心"," 家长开放日"],
                imageUrl: [window.resourceDoMain+'/app/img/acty18_logo.png'],
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