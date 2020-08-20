$(function () {
    // 表单验证
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '长度在1~6之间';
            }
        }
    });
    //初始化渲染用户信息函数
    initUserInfo();
    var layer = layui.layer;
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                $('[name=id]').attr('value', res.data.id)
                $('[name=username]').attr('value', res.data.username);
                $('[name=nickname]').attr('value', res.data.nickname);
                $('[name=email]').attr('value', res.data.email);
            }
        });
    }
    //表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜修改成功！');
                window.parent.getUserInfo();
            }
        });
    })
})