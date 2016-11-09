/**
 * Created by dayday on 2015/12/2.
 */
/**
 * author :yinglechao
 * time: 2015年12月2日
 * description:表单字段校验服务
 */
define(['ionic'], function () {
    return angular.module('Services.formVerify', []).
        factory('formVerifyService', ['$q','formVerifyErrorMessageService','promptBarService', function ($q,formVerifyErrorMessageService,promptBarService) {

            //校验姓名字段
            var verifyName = function (name) {
                var d = $q.defer();
                if (!name) {
                    d.reject({error: 11});
                }
                else {
                    d.resolve();//格式正确
                }
                return d.promise;
            };
            //校验手机号码或座机字段
            var verifyPhone = function (phone) {
                var d = $q.defer();
                var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                //      console.log(phoneRegexp.test(phone));
                if (!phone) {
                    d.reject({error: 21});
                }
                else if (!phoneRegexp.test(phone)) {
                    d.reject({error:22});
                    //号码不正确
                }
                else {
                    d.resolve();
                }
                return d.promise;
            };

            //校验手机号
            var verifyOnlyPhone = function (phone) {
                var d = $q.defer();
                var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                //      console.log(phoneRegexp.test(phone));
                if (!phone) {
                    d.reject({error: 31});
                }
                else if (!phoneRegexp.test(phone)) {
                    d.reject({error:32});
                    //号码不正确
                }
                else {
                    d.resolve();
                }
                return d.promise;
            };
            var verifyPhoneAndShowError = function(phone){
                var d = $q.defer();
                verifyPhone(phone).then(function(result){
                    promptBarService.showErrorBar(formVerifyErrorMessageService[result.error]).then(function(){
                        d.reject(result);
                        }
                    );
                },function(result){
                    d.resolve(result);
                });
                return d.promise;
            };
            var verifyNameAndShowError = function(name){
                var d = $q.defer();
                verifyName(name).then(function(result){
                    d.resolve(result);
                },function(result){
                    promptBarService.showErrorBar(formVerifyErrorMessageService[result.error]).then(function(){
                            d.reject(result);
                        }
                    );
                });
                return d.promise;
            };
            //todo
            var verifyFormAndShowError = function(formData){
                //formData = {name:"",phone:""}
                var name = formData.name;
                var phone = formData.phone;

                verifyNameAndShowError(name).then(function(result){

                },function(result){

                });

                //todo

            };
            return {
                //只校验
                verifyName: verifyName,
                verifyPhone: verifyPhone,
                //校验并提示错误信息
                verifyPhoneAndShowError:verifyPhoneAndShowError,
                verifyNameAndShowError:verifyNameAndShowError,
                //
                verifyFormAndShowError:verifyFormAndShowError

            }
        }])


        .factory('formVerifyErrorMessageService', ['$q', function ($q) {
            return {
                "01":"其他错误",
                '11':"姓名不能为空",
                '21':"手机号码不能为空",
                '22':"手机号码格式不正确",
                '31':"手机号码不能为空",
                '32':"手机号码格式不正确"

            };

        }])

        ;
});
