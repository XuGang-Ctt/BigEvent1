$(function () {
    //去注册按钮
    $('#goReg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //去登录按钮
    $('#goLogin').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    var layer = layui.layer;

    // 登录表单预验证
    layui.form.verify({//自定义验证
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {//校验两次密码一致
            if (value != $('#regPwd').val()) {
                return layer.msg('两次密码不一致')
            }
        }
    });

    // 注册表单提交
    $('#regForm').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('#regUname').val(),
                password: $('#regPwd').val(),
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 0, time: 1000 })
                }
                layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                    $('#regForm')[0].reset;
                    $('#goLogin').click();
                });

            }
        })
    })

    // 登录表单提交
    $('#loginForm').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        });
    })


});

