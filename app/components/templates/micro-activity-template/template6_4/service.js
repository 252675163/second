/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template6_4.Service', []).
        factory('template6_4Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                description: [
                    "舌尖上的感恩节",
                    " 热情似火的火鸡Turkey",
                    "火鸡是感恩节的传统主菜，通常是把火鸡肚子里塞上各种调料和拌好的食品，然后整只烤出，鸡皮烤成深棕色，由男主人用刀切成薄片分给大家。然后由各人自己浇上卤汁，洒上盐，味道十分鲜美。"
                ]
            }
            return service

        }]);
})