$(function () {
    //退出功能
    var layer = layui.layer;
    $('#quit').on('click', function () {
        layer.confirm('确定要推出吗?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

//获取用户信息函数
getUserInfo();
var layer = layui.layer;
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res.data);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            randerUserInfo(res.data)
        }
    });
}

//渲染用户信息函数
function randerUserInfo(data) {
    var text = data.nickname || data.username;
    var firstStr = text[0].toUpperCase();
    $('.welcome').html('欢迎&nbsp;&nbsp;' + text);
    if (data.user_pic !== null) {
        $('.layui-nav-img').show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(firstStr).show();
    }
}