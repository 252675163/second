/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("MicroTemplate6.Service", []).
        factory("microTemplate6Service", [
            "$http", function($http) {

                var microTemplate6Service = {};
                microTemplate6Service.model =
                {
                    title: "新鲜活动",//"活动",
                    actionName:"David老师的吉他公开课",// "活动标题",
                    description: "David老师将在公开课上分享他的音乐心得，并做一些示范，欢迎有兴趣的学生及家长参加。\n"+
                    "活动时间：2015年11月12日\n"+
                    "活动地点：北京市瀑布南路123号松鼠琴行211教室。",//"活动简介",
                    imageUrl:["/app/img/testimg.png"]// ["/app/img/testimg.png"]
                };
                return microTemplate6Service;
            }
        ]);
})