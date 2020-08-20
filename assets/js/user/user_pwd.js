$(function () {
    //表单验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格！'],
        newPwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新密码不能与旧密码相同！';
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！';
            }
        }
    });

    //表单提交按钮
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，修改成功,请重新登录！',{
                    icon: 1,
                    time: 1000
                  }, function () {
                    localStorage.removeItem('token');
                    window.parent.location.href = '/login.html'
                })

            }
        });
    })
})