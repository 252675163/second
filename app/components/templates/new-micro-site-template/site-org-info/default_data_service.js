/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('DefaultData.SiteOrgInfo.Service', []).
        factory('defaultDataForSiteOrgInfoService', ['$http', function ($http) {

            var service = {};
            //todo 后期更改url为cdn上的url
            var baseImgUrl = window.resourceDoMain+"";
            service.defaultModelByStyle = {
                //1为styleId
                "1": {
                    description: "圣安东尼国际英语成立于2010年，总校区设于北京海淀区，是一家专业英语培训机构。成立短短5年，已经成为中国英语培训的佼佼者，给上万名学员提供优质英语教育，帮助他们成功获得海外留学的机会。我们有来自欧美的资深外教，国内海归教育人才，知名院校专业讲师。我们倡导融入式英语教育理念，注重培养学员的语言实际应用能力。互动式的教学方式更让学员在游戏中轻松掌握听说读写全方位技能，将英语变为第二母语。",
                    imageUrl: [baseImgUrl+"/app/img/newSite_tem1_pic8.jpg",baseImgUrl+"/app/img/newSite_tem1_pic9.jpg"]
                },
                "2": {
                    description: "羲之学堂位于风景优美的烟雨路上，毗邻广东华侨博物馆和广东美术馆。学堂以传承、弘扬和推广中华优秀传统文化为己任，专门教授国学书法。办学十载，培育了众多优秀人才，在全国地方各大国学书法大赛上都有优异表现。从汉字起源到书法技巧，我们重视全方位的系统学习，同时借助现代化的体验式教学，多媒体教学，提高学员的学习兴趣，进行全面的德行培养。",
                    imageUrl:[baseImgUrl+"/app/img/newSite_tem2_pic5.jpg"]
                },
                "3": {
                    description: "思美智高教育培训学校致力于为3-18岁的孩子提供高品质的课外辅导，已成为北京颇受家长和学生信赖的课外辅导品牌。多年来，思美智高教育在北京已建立25个分校校区，年培训人次突破50000人。思美智高教育以“塑造品格，高效学习”为使命，秉承“启发兴趣、培养习惯、教书育人”的教育理念，不仅关注学生学习成绩的提高，更注重培养学生自主学习的态度和习惯，塑造高效学习的思维模式，让学习成为美好体验。所有校区都配有现代化的教学设备，保证学生上课的质量和环境，让家长放心，让孩子舒心。",
                    imageUrl: [baseImgUrl+"/app/img/newSite_tem3_pic6.jpg"]
                },
                "4": {
                    description: "上海新青年教育是专注中小学个性化辅导的专业教育机构，帮助了数十万中小学生实现了素质和成绩的突破，考上了理想的中学和大学，得到家长的一致好评！博学多才又风趣幽默的老师均来自于国内一流名校，不仅是学生的良师益友，更是学习榜样！新青年根据学生的性格、目标、优势短板等个性化需求安排最合适的老师授课。用心做教育，专注育人才，新青年教育在“做中国最好的个性化教育机构”的道路上不断前行。",
                    imageUrl:  [baseImgUrl+"/app/img/newSite_tem4_pic8.jpg"]
                },
                "5": {
                    description: "梵高艺术教育成立于2000年，位于上海普陀区，占地1000多平方米，是上海目前规模最大的少儿美术教育基地，拥有美术，国画，书法，陶艺，素描等缤纷多彩的创意课程。我们致力于成为中国最受尊敬的少儿美术机构，为中国孩子提供最优质的艺术教育服务和最完善的艺术课程规划。在这里，孩子不是为了学习美术而学习美术，而是通过美术教育启迪他们的心智，培养他们的个性，享受多彩的人生！",
                    imageUrl: [baseImgUrl+"/app/img/newSite_tem5_pic8.jpg"]
                },
                "6": {
                    description: "舞动人生艺术培训学校从北京起航，经过10年大浪淘沙，成为全国最知名的舞蹈艺术培训连锁机构之一。\n舞动人生的老师毕业于北京舞蹈学院、中央音乐学院、科隆音乐学院等国内外著名院校。德、美、俄等国的优秀外教也时常受邀来舞动人生交流讲学。\n舞动人生引进国外先进的教学方式，倡导“舞随心动，身心皆美”的舞蹈理念，强调师生互动，先想后练，积极主动。 教学质量优异，口碑上佳，成果颇丰。",
                    imageUrl:[baseImgUrl+"/app/img/newSite_tem6_pic7.jpg",baseImgUrl+"/app/img/newSite_tem6_pic8.jpg"]
                },
                "7": {
                    description: "北京长城摄影艺术学校是中国摄影行业的知名学校。学校创办10年来为社会输送了数万名优秀摄影师，数码设计师等专业人才。学校名师芸集，创始人黄其杰担任中国摄影协会副会长。\n多年来，北京长城摄影致力于完善自身的专业教学体系，编著多部摄影教程，如：《商业人像摄影step by step》、《20世纪风景摄影教材》、《新古典摄影色彩教程》等。\n北京长城摄影为学员提供良好的就业前景。毕业学员可就业于大型影楼、演艺公司、形象设计工作室、广告摄影公司等，就业率达95%以上。",
                    imageUrl: [baseImgUrl+"/app/img/newSite_tem7_pic8.jpg"]
                },
                "8": {
                    description: "皮克斯动画培训学校是上海唯一的全外资、专业动漫影视人才培养基地。学校有6个校区，总部位于五角场，拥有20多位外籍资深教学人员、80余位中方教学、研发人员，其中博士6名，硕士27名。\n教师都具有深厚的学识和丰富的行业经验，大多参与过知名动漫影视、游戏产品的设计与运营。学校采用“理论和实战并进”的教学模式，让学员熟悉大量经典动画案例的设计与开发过程，同时亲手实践，创作成品，使他们更快地达到广告、动漫、游戏企业的岗位要求。",
                    imageUrl: [baseImgUrl + "/app/img/newSite_tem8_pic5.jpg", baseImgUrl + "/app/img/newSite_tem8_pic5.jpg", baseImgUrl + "/app/img/newSite_tem8_pic5.jpg", baseImgUrl + "/app/img/newSite_tem8_pic5.jpg", baseImgUrl + "/app/img/newSite_tem8_pic5.jpg"]
                }
            };


            return service

        }]);
});


