//配置JS中的相关设置。
//请求的url
main_url="115.28.192.61";
dragon_url=
{
       "login":main_url+"/dragonfruit/rest/v1/user/login",
       "register":main_url+"/dragonfruit/rest/v1/user/register",
}

//ajax异域操作添加
$(function () {  //, headers: { 'x-requested-with': 'XMLHttpRequest' }
        $.ajaxSetup({crossDomain: true, xhrFields: {withCredentials: true}});
});

