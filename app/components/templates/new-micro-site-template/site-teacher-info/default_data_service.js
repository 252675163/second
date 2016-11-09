/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('DefaultData.SiteTeacherInfo.Service', []).
        factory('defaultDataForSiteTeacherInfoService', ['$http', function ($http) {
            var baseImgUrl = window.resourceDoMain+"";
            var service = {};
            service.defaultModelByStyle = {
                //1为styleId
                "1": {
                    teacherInfoList: [
                    {
                        name: "Monica老师",
                        description: " Monica老师毕业于剑桥大学并修得CELTA证书。来自美国本土的Morgan老师至今已有6年ESL教学经验了，在圣安东尼国际英语负责口语和写作教学。Monica老师的课堂气氛放松并活跃，她希望学员都能够积极开放地参与到课堂的口语练习中。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem1_teacher1.jpg"
                    },
                    {
                        name: "天天老师",
                        description: "天天老师毕业于华东师范大学英语语言文学专业，2002年开始从事雅思教学，拥有九年雅思教学和教研经验。现主要教授雅思听力和口语，出版有多本雅思听力系列教材，授课风格活泼幽默，坚持“寓教于乐”的教学理念。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem1_teacher2.jpg"
                    },
                    {
                        name: "Tony老师",
                        description: "来自美国华盛顿的Tony老师是一位成熟、专业的ESL老师，至今有五年多的课堂教学，特别在通用英语、托福托业雅思备考辅导上有非常丰富的教学经验。Tony老师倡导全浸式英语学习，他的课堂专业、有效。运用直接传授+沟通交流等多种方式结合教学以求最好学习效果。课堂上挑战多多，学员参与感很强，有效信息吸收率高。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem1_teacher3.jpg"
                    },
                    {
                        name: "凯凯老师",
                        description: "凯凯老师毕业于北京大学，雅思、托福考试高分，托福写作满分，在托福写作口语和雅思口语的预测中，多次命中考题，所教学生托福写作成绩普遍在25分及以上，不仅辅导学生在考试中取得满意的成绩，同时也在英语能力上有所突破。对于不同程度的学生，凯凯老师因材施教，耐心教导，深受学生好评。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem1_teacher4.jpg"
                    },
                    {
                        name: "Joe老师",
                        description: "Joe老师是加拿大土生土长的地道英语老师。已有12年教学经验的他认为最快乐的事就是能帮到大家。他在加拿大学习了三年的教师训练技能并在2002年获得了教师资格。他擅长雅思、托福，能发现学生的薄弱环节加以强化。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem1_teacher5.jpg"
                    },
                    {
                        name: "小木老师",
                        description: "小木老师是雅思听力、阅读主讲，雅思基础词汇主讲。浙江工商大学英语专业硕士，英语专业八级，具有高级中学教师资格证书。英语功底扎实深厚，具有丰富的英语教学经验，教学风格严谨踏实，注重因材施教，善于帮助学生把握重点与难点。教学过程耐心细致，善于与学生沟通，与学生亦师亦友，使学生在春风化雨中得到提升。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem1_teacher6.jpg"
                    }]
                },
                "2": {
                    teacherInfoList: [
                    {
                        name: "小芳老师",
                        description: " 毕业于广东美术学院，从事书画教育行业多年，现为广州市美协会员，广州青年书法家协会会员。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem2_teacher1.jpg"
                    },
                    {
                        name: "阿姆老师",
                        description: "毕业于浙江大学，在软笔书法学习过程中，主张学习传统，不光师古人之迹还要师古人之心。通过临帖、读帖、默帖的形式让孩子逐步掌握软笔书法的基本知识。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem2_teacher2.jpg"
                    },
                    {
                        name: "小咪老师",
                        description: "毕业于广州美术学院，自幼酷爱书法，师从书法名家学习书法和篆刻，现任广州青年书法家协会会员。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem2_teacher3.jpg"
                    },
                    {
                        name: "天天老师",
                        description: "毕业于暨南大学，长期从事中国文字研究，书法楷书、行书、隶书、篆书均有教学经验,对不同年龄层次和书法基础的学生有针对性的教学方法，深受学员的好评",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem2_teacher4.jpg"
                    }]
                },
                "3": {
                    teacherInfoList: [
                    {
                        name: "孙成功",
                        description: " 北京航空航天大学化学专业硕士。七年的化学情缘让孙老师拥有扎实过硬的化学专业功底和对学科独到的见解。他富有亲和力，善于营造活跃的课堂氛围，按照学生个性和水平因材施教，既激发学习兴趣，又提升应试能力。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem3_teacher1.jpg"
                    },
                    {
                        name: "梁付宝",
                        description: "毕业于北京大学元培学院，语文特级教师，北京市民办教育优秀园丁奖。幽默风趣、善于启发的教学风格是梁老师的标志。积累了7年教学经验，梁老师已出版3本语文教学书籍。他有深厚的文学积淀和素养，旁征博引，文学知识信手拈来，带领学生走近语文，爱上语文。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem3_teacher2.jpg"
                    },
                    {
                        name: "李静",
                        description: "北京师范大学文学硕士。2014年“春蕾杯”作文大赛园丁奖获得者。讲课时激情四射，扣人心弦，能引起学生强烈的情感共鸣。李老师讲课思路清晰严谨，方法灵活实用，使学生在学习方法，兴趣和成绩上有较大提高，因此得到学生和家长的普遍认可。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem3_teacher3.jpg"
                    },
                    {
                        name: "陈培新",
                        description: "毕业于英国约克大学，TESOL专业。高考英语145分，雅思英语8分，参与编写《高中英语听力进阶》丛书。教学经验丰富，热情大方，授课亲切自然，注重培养学生学习兴趣和学习习惯，深受学员欢迎。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem3_teacher4.jpg"
                    },
                    {
                        name: "贾林",
                        description: "北京语言大学英语翻译硕士，英语专业八级，英语笔译二级，蝉联两届教师授课大赛英语组一等奖。在中学英语教学中，擅长语法和知识点教学，讲解深入浅出，以缜密的逻辑思维理解语法，所教班级里绝大部分学生能够取得明显的进步。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem3_teacher5.jpg"
                    }]
                },
                "4": {
                    teacherInfoList: [
                    {
                        name: "Mr.Chen老师",
                        description: " 市级英语学科带头人，市英语备考中心组成员。8年初三毕业班经验，6年高中毕业班经验，精通中高考出题套路，屡次命中考试要点。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem4_teacher1.jpg"
                    },
                    {
                        name: "张老师",
                        description: "省一级学校骨干老师，从教十多年，改变众多学生对语文的态度。拥有详细精辟的语文教学笔记，对教学质量有严格而苛刻的要求。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem4_teacher2.jpg"
                    },
                    {
                        name: "陈老师",
                        description: "重点中学数学教师，因教学成绩突出，被破格提前评选为中学高级教师。18年初中毕业班数学教学经验，对初中数学知识结构体系及命题方向了如指掌。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem4_teacher3.jpg"
                    },
                    {
                        name: "李老师",
                        description: "重点中学化学教师，多次被评为市级优秀教师。善于总结教学经验和方法，帮助学生迅速提高分数，所带班级化学考试成绩全市排名第四。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem4_teacher4.jpg"
                    }]
                },
                "5": {
                    teacherInfoList: [
                    {
                        name: "小芳老师",
                        description: " 毕业于杭州美术学院，十余年美术教育教学经验。形成独特的指教风格：活泼、细腻、亲和力强、教学严谨，提倡孩子们通过实践去体验、去玩、去摸、去听，再用脑子去记、去想、去画，用孩子熟悉的方式激发孩子的创作力，让孩子的想象力动起来，并在绘画活动中体验到美术学习给他们带来的快乐和多彩生活。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem5_teacher1.jpg"
                    },
                    {
                        name: "汤姆老师",
                        description: "首都师范大学油画系毕业，有5年以上教学经验，运用全方位立体化的教学理念，从观察——认识——绘画，并结合丰富的美术常识，融合艺术史等教学因素，使学生得到真正的“艺术教育”。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem5_teacher2.jpg"
                    },
                    {
                        name: "小咪老师",
                        description: "毕业于上海大学美术系，热爱幼儿教育事业，在美术教学活动中能充分调动孩子积极性和想象力，善于帮助孩子，养成良好的学习习惯，启发孩子的思维能力，培养孩子的创意、想象能力。教学耐心，熟悉幼儿身心发展的成长规律，致力于幼儿美术教育方面的学习深造，善于发掘每个孩子的艺术潜力，让他们能够大胆自信的进行艺术创造与表现。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem5_teacher3.jpg"
                    }]
                },
                "6": {
                    teacherInfoList: [
                    {
                        name: "王泽元",
                        description: " 毕业于北京舞蹈学院民族舞系。中国舞蹈家协会会员，原剧团舞蹈演员，现任舞动人生少儿民族舞课程教师。他拥有扎实的舞蹈基础和丰富的舞台经验，十分注重合理的知识结构的构建，擅长总结经验，有较强的创新能力和舞蹈教学能力。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem6_teacher1.jpg"
                    },
                    {
                        name: "张杰",
                        description: "以专业第二的优异成绩毕业于科隆音乐学院（德国），多次参加国外大型比赛及演出。他广泛涉猎社会、思想、文化等学科知识，将文化背景融入舞台表演，创新表演形式，深受广大学员好评。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem6_teacher2.jpg"
                    },
                    {
                        name: "蒋丽颖",
                        description: "上海音乐学员优秀毕业生，蒋老师是流行舞名师温可奕的弟子。她曾获得福建省音乐舞蹈大赛专业组表演金奖、全国大学生艺术展舞蹈专业组一等奖等多项大奖，指导少儿舞蹈考级过级率达百分之百。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem6_teacher3.jpg"
                    },
                    {
                        name: "周清清",
                        description: "毕业于中央舞蹈学院芭蕾舞系，国家二级演员，中国舞蹈家协会会员，被授予“十佳优秀青年演员”称号。8年来周老师一直耕耘在少儿舞蹈培训第一线，为舞动人生输送了一批批舞蹈人才。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem6_teacher4.jpg"
                    },
                    {
                        name: "梅果智",
                        description: "国内资深职业舞蹈培训讲师、舞蹈大赛评委，英国皇家舞蹈教师协会会员，国内著名舞蹈编导、考试官。梅老师所创编舞蹈曾参加中央电视台的大型文艺晚会，获“最佳编导奖”。梅老师教学经验非常丰富，培养了大批专业和业余的舞蹈人才。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem6_teacher5.jpg"
                    },
                    {
                        name: "钱少群",
                        description: "艺术院校舞蹈系专业毕业，具有专业演员、学校舞蹈教师等多重工作经验，曾多次作为省队代表成员参加国家级、省级舞蹈大赛，多次荣获优异成绩。钱老师有着丰富的舞蹈表演和教学经验，专业技术扎实、全面，深受广大学员的喜爱！",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem6_teacher6.jpg"
                    }]
                },
                "7": {
                    teacherInfoList: [
                    {
                        name: "梁易军",
                        description: " 商业人像摄影名师\n更多：第三届全国风景摄影十杰，国内多所大学摄影专业客座教授，《人像摄影》特约撰稿人，编著国内第一套《商业人像摄影教程》。拍摄经验丰富，擅长商业人像摄影。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem7_teacher1.jpg"
                    },
                    {
                        name: "祖峰钦",
                        description: "影楼摄影名师\n更多： 10年探索之路，2001年步入影楼摄影行业，为上千家影楼工作室提供实景制作及样片指导拍摄。作品长期发表于各杂志，工作范围涉及影楼，影视，广告，舞台，时装等多个领域。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem7_teacher2.jpg"
                    },
                    {
                        name: "蔡启明",
                        description: "时尚新锐摄影师\n北京长城摄影艺术总监，摄影风格独具匠心，别出心裁。主要合作杂志有《人像摄影》、《时尚先生》、《时尚芭莎》、《瑞丽服饰》等。在教学上严谨风趣，注重实际操作和拍摄技巧。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem7_teacher3.jpg"
                    }]
                },
                "8": {
                    teacherInfoList: [
                    {
                        name: "Emma",
                        description: " 毕业于纽约州立大学电影系，曾担任好莱坞LA18电视台制片人。热情大方、善于发掘学生优点。",
                        imageUrl:baseImgUrl+"/app/img/newSite_tem8_teacher1.jpg"
                    },
                    {
                        name: "Tom",
                        description: "资深动画师，曾参与设计多部国外冠军收视动画片，Autodesk•XSI国际讲师，前Base FX高级动画师。",
                        imageUrl: baseImgUrl+"/app/img/newSite_tem8_teacher2.jpg"
                    },
                    {
                        name: "吴清风",
                        description: "中国美术学院动画系硕士，曾获得全国动漫原创作品大赛一等奖、第五届全国大学生广告艺术大赛动漫作品一等奖等多个奖项。教学风格幽默风趣，深受学员喜爱。",
                        imageUrl:  baseImgUrl+"/app/img/newSite_tem8_teacher3.jpg"
                    },
                    {
                        name: "Jean",
                        description: "毕业于美国罗德岛设计学院，曾在国际4A广告公司任职动画设计师，善于营造轻松活泼的教学氛围、鼓励学生用创造性思维设计动画作品。",
                        imageUrl:  baseImgUrl+"/app/img/newSite_tem8_teacher4.jpg"
                    },
                    {
                        name: "Alice",
                        description: "SVA纽约视觉艺术学院的讲师经历，让Alice 老师积累了丰富的教学经验。她注重培养学生的编剧能力和扎实的拍摄基础，班上的学生的影视作品往往具有个性的表达和创意。",
                        imageUrl:  baseImgUrl+"/app/img/newSite_tem8_teacher5.jpg"
                    },
                    {
                        name: "Grison",
                        description: "萨凡纳艺术与设计学院本科，罗德岛设计学院硕士，Grison老师不仅有深厚的理论基础，也有丰富的动画设计经验。他曾在美国皮克斯动画工作室担任研发工程师、现任学校研发中心主任。",
                        imageUrl:  baseImgUrl+"/app/img/newSite_tem8_teacher6.jpg"
                    }]
                }
            };


            return service

        }]);
});


