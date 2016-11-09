/**
 * author :chenxuedong
 * time: 2016-05-17 23:25:43
 * description: templateModel就是该模板创建的结构，自定义
 */
define(['ionic','services/net/activity-template'], function () {
    return angular.module('Template21_1.Service', ['services.net.activityTemplate']).
        factory('template21_1Service', ['$http','activityTemplateService', function ($http,activityTemplateService) {

            var service = {};
            service.model =
            {
                title: '满天星教育集团',
                name: '明日之星评选大赛',
                imageUrl: [window.resourceDoMain + "/app/img/grow_vegetables_1_photo.png"],
                
            };
            
            
            var data = {};
            service.getTemplateModel = function(){
                return data;
            };
            service.setDataOfTempaletModel = function(templateModel){
                data.templateModel = templateModel;
            };
            //默认图片 待修改
            
            var imgs = window.resourceDoMain + "/app/img/";
          
            var voterdatas = [{
                "Name":"小明","Score":888,"Id":"1","IsHaveGrow":false,"slogn":"爱生活爱运动，感谢你们为我投上宝贵的一票！","Rank":1},
                {
                "Name":"小红","Score":777,"Id":"2","IsHaveGrow":false,"slogn":"爱生活爱运动，感谢你们为我投上宝贵的一票！","Rank":2},
                {
                "Name":"小陈","Score":666,"Id":"3","IsHaveGrow":false,"slogn":"爱生活爱运动，感谢你们为我投上宝贵的一票！","Rank":3},
                {
                "Name":"乐乐","Score":555,"Id":"4","IsHaveGrow":false,"slogn":"爱生活爱运动，感谢你们为我投上宝贵的一票！","Rank":4},
                {
                "Name":"笑笑","Score":444,"Id":"5","IsHaveGrow":false,"slogn":"爱生活爱运动，感谢你们为我投上宝贵的一票！","Rank":5},
                {
                "Name":"小黄","Score":333,"Id":"6","IsHaveGrow":false,"slogn":"爱生活爱运动，感谢你们为我投上宝贵的一票！","Rank":6}];
 	
            service.getVoterList = function() {
                return voterdatas;
            }
            
            
            //用于暂存时 第一页输入活动名称 二三页展示
            var activeInfo = {};
            
            //外部获得使用条件
            service.getActiveInfo = function () {
                return activeInfo;
            };
            //保存当前的活动名称
            service.setActiveName = function (info) {
                activeInfo.name = info;
            }
             //用于暂存预览时第一页选择的某人ID
            var selectID = "";
            //传回ID
            service.getSelectId = function () {
                return selectID||1;
            };
            //设置ID
            service.setSelectId = function (id) {
                selectID = id;
            }
            
            //用于step4 跳转至step3 重新报名时，带入个人信息
            var userinfo = {
                            name: "",
                            phone: "",
                            headImg: "",
                            slogn:"",
                            SelfActivityUserId:""
            };
            
            //传回选择人信息
            service.getUserInfo = function () {
                return userinfo;
            };
            //保存选择人信息
            service.setUserInfo = function (info) {
                userinfo = info;
            }
            
            service.saveInfo = function(data){
                return activityTemplateService.addAssistUser(data, true);
            };
            service.isValid = function (name,phone,slogn,img) {
                if (name=="") {
                    return 1;            //名字不正确
                }
                if (slogn==""){
                    return 5;       //参赛宣言为空
                }
                if (img==""){
                    return 6;       //图片为空
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

            service.getContent = function (nameArr,valueArr) {
                var response = [];
                if (nameArr){
                    for(var i= 0;i<nameArr.length;i++){
                        response.push({name:nameArr[i]||"",value:valueArr[i]||""});
                    }
                }
                return response;
            };

           

            

            //获取用户信息
            service.getActivityUserInfo = function(userId,userType){
                var isFirstShare = userType=="old"?true:false;
                return activityTemplateService.getActivityUserInfo(userId,isFirstShare,4);
            };
            
            // 新增用户报名  true代表 同步到资讯本
            service.addActivityUserInfo = function(user){
                return activityTemplateService.addAssistUser(user,true);
            };
            
            //投票
            service.voteToSB = function (userid) {
                return activityTemplateService.updateVoteScore(userid,false);
            }
            //带有验证码 投票
            service.voteToSBwithStr = function (userid,voterid,captcha) {
                return activityTemplateService.updateScorewithCaptcha(userid,captcha,false);
            }

            service.getvoteList = function (originid,page) {
                return activityTemplateService.getVoteList(originid,page);
            }
            
                   //2016.4.29 获取当前用户的微信信息，微信头像和微信名称 ---头像使用微信地址
            service.getWeixinUserInfo = function(){
                return activityTemplateService.getWeixinUserInfoByHeadImgUseWeixinUrl();
            };
            
            
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
                    };
                };
            

            return service;

        }]);
});



