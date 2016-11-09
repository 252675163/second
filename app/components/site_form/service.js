/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic","services/net/site-template"], function() {
    return angular.module("SiteForm.Service", ["services.net.siteTemplate"]).
        factory("siteFormService", [
            "$http", "$timeout", "$q","$rootScope","formVerifyService","siteTemplateNetService",function($http, $timeout,$q,$rootScope,formVerifyService,siteTemplateNetService) {

                var siteFormService = {};
                siteFormService.siteFormData = {
                    isShow: false,
                    //current:{},//{courseType:{name:"",list[{course类型}]},course:{name:"",description}}
                    courseModel:{},//课程信息
                    campusModel:{},//校区信息
                    viewList:{},
                    currentIndex:0,
                    content:"",
                    status:"",//view/preview
                    from:""//course/campus
                };
                siteFormService.setCourseModel = function(courseModel){
                    siteFormService.siteFormData.courseModel = courseModel;
                };
                siteFormService.setCampusModel = function(campusModel){
                    siteFormService.siteFormData.campusModel = campusModel;
                };
                siteFormService.showSiteForm = function (type,info,status) {
                    //type:1 从精品课程模块进入报名，type：2从校区信息进入报名
                    //info{campusName:"",current:{courseType:{},course:{}}}
                    //viewList更新
                    siteFormService.siteFormData.viewList =[];

                    if(type==1){
                        siteFormService.siteFormData.from = 'course';
                        for(var i = 0;i<siteFormService.siteFormData.courseModel.list.length;i++){
                            for(var p = 0;p<siteFormService.siteFormData.courseModel.list[i].list.length;p++){
                                siteFormService.siteFormData.viewList.push({courseType:siteFormService.siteFormData.courseModel.list[i],course:siteFormService.siteFormData.courseModel.list[i].list[p]});
                            }
                        }

                        var currentIndex= 0;//currentIndex下拉列表选中项的索引值
                        for(var i = 0;i<siteFormService.siteFormData.viewList.length;i++){
                            if(siteFormService.siteFormData.viewList[i].course==info.current.course){
                                currentIndex = i;
                                break;
                            }
                        }
                        siteFormService.siteFormData.currentIndex=currentIndex.toString();
                        siteFormService.siteFormData.content = "";
                    }else if(type==2){
                        siteFormService.siteFormData.from = 'campus';
                        //for(var i = 0;i<siteFormService.siteFormData.campusModel.list.length;i++){
                        //    for(var p = 0;p<siteFormService.siteFormData.courseModel.list[i].list.length;p++){
                        //        siteFormService.siteFormData.viewList.push({courseType:siteFormService.siteFormData.courseModel.list[i],course:siteFormService.siteFormData.courseModel.list[i].list[p]});
                        //    }
                        //}
                        siteFormService.siteFormData.viewList = siteFormService.siteFormData.campusModel.aboutUsInfoList;
                        var currentIndex= info.currentIndex;
                        siteFormService.siteFormData.currentIndex=currentIndex.toString();
                        siteFormService.siteFormData.content = "";
                        //siteFormService.siteFormData.content = {name:"校区",value:info.campusName};

                    }


                    siteFormService.siteFormData.status = status;
                    siteFormService.siteFormData.isShow = true;

                };
                //关闭遮罩
                siteFormService.hideSiteForm = function(){
                    $timeout(function(){
                        siteFormService.siteFormData.isShow = false;
                    },0)
                };


                siteFormService.saveInfo = function(userInfo) {
                    return siteTemplateNetService.saveUserBySite(userInfo);
                };
                siteFormService.isValid = function(name, phone) {
                    if (name == "") {
                        //var nameRegexp = /^.{1,15}$/;
                        //if (!nameRegexp.test(name))
                        return 1; //名字不正确
                    }
                    if (phone) {
                        var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                        //      console.log(phoneRegexp.test(phone));
                        if (!phoneRegexp.test(phone))
                            return 4; //号码不正确
                    } else {
                        return 3; //号码为空

                    }


                    return 0; //格式正确

                };




                return siteFormService;
            }
        ]);
});