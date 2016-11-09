/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('DefaultData.SiteNews.Service', []).
        factory('defaultDataForSiteNewsService', ['$http', function ($http) {

            var service = {};
            //todo 后期更改url为cdn上的url
            var baseImgUrl = window.resourceDoMain+"";
            service.defaultModelByStyle = {
                //1为styleId
                "1": {
                    News: [
                        {
                            content: "喜报！圣安东尼国际英语多名学员在11月的雅思、托福考试中取得优秀成绩。其中朝阳校区的陈思成同学，7月报读了雅思强化课程，在仅学习了3个月后，总分提升至7分，并获得了美国波士顿大学的录取通知书。学员的成长，是我们的骄傲！",
                            imageUrl: [],
                            date: new Date("2015/11/22")
                        },
                        {
                            content: "圣安东尼国际英语推出双十一优惠活动啦～现在预报2016英美冬令营，可享受9折优惠，并赠送牛津包一个。续报雅思托福课程，最高立减500元。推荐朋友报班，老带新可以各享300元优惠。优惠多多，限时低价，不容错过！",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem1_pic1.jpg"],
                            date: new Date("2015/11/11")
                        },
                        {
                            content: "本月口语角将于周日上午举行。口语角，又称口语沙龙，是为广大学员提供的一个练习英语口语，交流英语学习经验的免费活动。所有学员本着自愿的原则都可以参加口语沙龙。届时会有多位外教在场主持，更有可口的零食饮料等你来噢～",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem1_pic2.jpg", baseImgUrl + "/app/img/newSite_tem1_pic3.jpg", baseImgUrl + "/app/img/newSite_tem1_pic4.jpg", baseImgUrl + "/app/img/newSite_tem1_pic5.jpg", baseImgUrl + "/app/img/newSite_tem1_pic6.jpg", baseImgUrl + "/app/img/newSite_tem1_pic7.jpg"],
                            date: new Date("2015/10/10")
                        }]
                },
                "2": {
                    News: [
                        {
                            content: "羲之学堂将于今年冬季，开启台湾传统文化之旅，与大家一起去感受台湾的传统文化。行程包括游览台北故宫博物馆，台中六艺文化馆，访张大千故居，看云门舞集。更多行程可查看学校官网。",
                            imageUrl: [],
                            date: new Date("2015/11/22")
                        },
                        {
                            content: "羲之学堂现推出甲骨文识字免费体验课。名额有限，先报先得。",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem2_pic1.jpg", baseImgUrl + "/app/img/newSite_tem2_pic2.jpg", baseImgUrl + "/app/img/newSite_tem2_pic3.jpg"],
                            date: new Date("2015/11/11")},
                        {
                            content: "喜报～羲之学堂多名学员在第三届全国孝道文化书法比赛中取得优异成绩。其中，张晓雅同学荣获少儿组一等奖；张斌斌同学夺得高中生组二等奖；李晓芬同学荣获成人组特等奖。",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem2_pic4.jpg"],
                            date: new Date("2015/10/10")
                        }]
                },
                "3": {
                    News: [{
                            content: "寒冷的天气，火热的场面，国学入门导读班开课啦！6位深谙国学文化的资深教师，遍布京城10处校区。品味经典、开智养性，国学新知，为学生开启一扇触摸中华文明的大门！",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem3_pic1.jpg"],
                            date: new Date("2015/12/21")
                        },
                        {
                            content: "您家孩子几岁了呢？思美智高的学前英语班是专门为3岁-6岁半的孩子设计的。我们提供：1.全程小班多媒体互动式教学 2.故事、游戏、音乐等多元化形式授课 3.专八级中教与优秀资深外教全程英语教学。小朋友们，快来学习啦！",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem3_pic2.jpg", baseImgUrl + "/app/img/newSite_tem3_pic3.jpg", baseImgUrl + "/app/img/newSite_tem3_pic4.jpg", baseImgUrl + "/app/img/newSite_tem3_pic5.jpg"],
                            date: new Date("2015/12/01")
                        },
                        {
                            content: "第二十届华杯赛总决赛，思美智高代表队喜获三金四银九铜 总成绩获北京第三！",
                            imageUrl: [],
                            date: new Date("2015/11/15")
                        }]
                },
                "4": {
                    News: [{
                            content: "上海新青年教育在周日于上海会展中心举办了新青年教育高考状元公益讲座。主讲老师是2000届上海高考状元张洋，现如今是北大生命科学专业的博士研究生。她讲述了自己以及很多北大清华的高考状元的学习经历和学习方法。此次讲座，受到广大学生和家长的关注和参与。",
                            imageUrl: [],
                            date: new Date("2015/11/22")
                        },
                        {
                            content: "上海新青年教育现推出双十一优惠活动～关注我们的微信、微博，多重礼品等你拿！新声报名可享500元学费优惠，老生续报立减1000元！",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem4_pic1.jpg"],
                            date: new Date("2015/11/11")
                        },
                        {
                            content: "2015年上海五星金牌教师评选于10月10日顺利闭幕，上海新青年教育又一次斩获一项团体大奖，两项地方团队奖与10多项五星金牌教师称号奖。",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem4_pic2.jpg", baseImgUrl + "/app/img/newSite_tem4_pic3.jpg", baseImgUrl + "/app/img/newSite_tem4_pic4.jpg", baseImgUrl + "/app/img/newSite_tem4_pic5.jpg", baseImgUrl + "/app/img/newSite_tem4_pic6.jpg", baseImgUrl + "/app/img/newSite_tem4_pic7.jpg"],
                            date: new Date("2015/10/10")
                        }]
                },
                "5": {
                    News: [{
                            content: "周日“艺起来”亲子活动在梵高艺术教育缤纷上演。现场气氛热烈，游戏、抽奖、绘画\n陶艺，统统都有！尤其是各种超酷的艺术创意游戏，更是让爸爸妈妈和宝贝们玩嗨了。",
                            imageUrl: [],
                            date: new Date("2015/11/22")
                        },
                        {
                            content: "梵高艺术与您欢度双十一～现在预报2016全年课程，享受8.8折优惠，还有惊喜礼品赠送。数量有限，先报先得。",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem5_pic1.jpg"],
                            date: new Date("2015/11/11")
                        },
                        {
                            content: "金秋十月，让我们一起背起画板，拿起画笔，走出教室，跟着梵高艺术一起去写生吧。本周末，让我们相约浦东世纪公园。报名的小朋友一定准时参加噢。",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem5_pic2.jpg", baseImgUrl + "/app/img/newSite_tem5_pic3.jpg", baseImgUrl + "/app/img/newSite_tem5_pic4.jpg", baseImgUrl + "/app/img/newSite_tem5_pic5.jpg", baseImgUrl + "/app/img/newSite_tem5_pic6.jpg", baseImgUrl + "/app/img/newSite_tem5_pic7.jpg"],
                            date: new Date("2015/10/10")
                        }]
                },
                "6": {
                    News: [{
                            content: "少儿拉丁舞集训营一期正进行地如火如荼。拉丁舞让孩子拥有奥黛丽赫本的优雅仪态和卓越气质。二期也即将开始报名，记得关注新消息哦！",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem6_pic1.jpg"],
                            date: new Date("2015/12/21")
                        },
                        {
                            content: "平时努力，考级不愁！舞动人生的学员又怎么会担心少儿舞蹈考级呢？快来看看他们练舞时的优美身姿吧！",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem6_pic2.jpg", baseImgUrl + "/app/img/newSite_tem6_pic3.jpg", baseImgUrl + "/app/img/newSite_tem6_pic4.jpg", baseImgUrl + "/app/img/newSite_tem6_pic5.jpg", baseImgUrl + "/app/img/newSite_tem6_pic6.jpg"],
                            date: new Date("2015/12/18")
                        }]
                },
                "7": {
                    News: [{
                            content: "风景摄影班的学员跟随陈卿老师，前往北京卧虎山，参加“醉美卧虎山”摄影活动。空山古林江怒涛，两鹰突出霜崖高，卧虎山的风景在镜头下更加迷人。",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem7_pic1.jpg"],
                            date: new Date("2015/12/21")
                        },
                        {
                            content: "北京长城摄影艺术学校每周一次的美学交流活动又如期举行了。这周的主题是“Arts Activities for Children and Young People in Need”。学员们来到北京SOHO，从上午一直交流到华灯初上，依然流连忘返。",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem7_pic2.jpg", baseImgUrl + "/app/img/newSite_tem7_pic3.jpg", baseImgUrl + "/app/img/newSite_tem7_pic4.jpg", baseImgUrl + "/app/img/newSite_tem7_pic5.jpg", baseImgUrl + "/app/img/newSite_tem7_pic6.jpg", baseImgUrl + "/app/img/newSite_tem7_pic7.jpg"],
                            date: new Date("2015/12/13")
                        }]
                },
                "8": {
                    News: [{
                            content: "本周，纽约大学艺术学院的Craig教授受邀来沪，给同学们带来了一堂别开生面的3D建模讲座。",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem8_pic1.jpg"],
                            date: new Date("2015/12/21")
                        },
                        {
                            content: "今日，同学们来到上海动漫博物馆Harrison咖啡厅，参加“当代数字动画前沿技术分析”Workshop，大家都觉得受益匪浅。",
                            imageUrl: [],
                            date: new Date("2015/12/14")
                        },
                        {
                            content: "今天是电影特效入门班的第一堂课，老师向同学们介绍了电影《魔戒》背后的特效制作过程。后期精美绝伦的特效，为电影增添了不少风采，也令同学们震撼不已。",
                            imageUrl: [baseImgUrl + "/app/img/newSite_tem8_pic2.jpg", baseImgUrl + "/app/img/newSite_tem8_pic3.jpg", baseImgUrl + "/app/img/newSite_tem8_pic4.jpg"],
                            date: new Date("2015/12/07")
                        }]
                }
            };


            return service

        }]);
});


