var socket = io();

$(document).ready(() => {
    var me = "";
    $('#signin').click(() => {
        var username = $('#username').val();
        if (username !== '') {
            socket.emit('signin-username', username);
            socket.on('yourself-signin', (list_user) => {
                $('.form-chat').css('display', 'block');
                $('.form-signin').css('display', 'none');
                alert('Bạn đã đăng nhập thành công !!!');
                me = username;
                $('.contacts').html('');
                list_user.map(user => {
                    $('.contacts').append(
                        `
                            <li class="active">
                                <div class="d-flex bd-highlight">
                                    <div class="img_cont">
                                        <img src="https://devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg"
                                            class="rounded-circle user_img">
                                        <span class="online_icon"></span>
                                    </div>
                                    <div class="user_info">
                                        <span>${user}</span>
                                        <p>${user} is online</p>
                                    </div>
                                </div>
                            </li>
                        `
                    )
                })

            })
        }
    });
    socket.on('exists_username', (message) => {
        alert(message);
    })

    socket.on('new-user', (list_user) => {
        socket.on('new-user-signin', (message_new_login) => {
            alert(message_new_login);
        });
        $('.contacts').html('');
        list_user.map(user => {
            $('.contacts').append(
                `
                <li class="active">
                    <div class="d-flex bd-highlight">
                        <div class="img_cont">
                        </div>
                        <div class="user_info">
                            <span>${user}</span>
                            <p>${user} is online</p>
                        </div>
                    </div>
                </li>
                `
            )
        })
    })
    $('#send-message').click(function () {
        var content = $('#content-message').val();
        if (content) {
            socket.emit('send-message', content);
            $('#content-message').val('');
        }
    })
    $('#content-message').keyup((e) => {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var content = $('#content-message').val();
        if (content) {
            socket.emit('send-message', content);
            $('#content-message').val('');
        }
        }
    });
    socket.on('server-send-message', (server_send_message) => {
        var year = new Date(Date.now()).getFullYear();
        var month = new Date(Date.now()).getMonth();
        var day = new Date(Date.now()).getDate();
        var hours = new Date(Date.now()).getHours();
        var minutes = new Date(Date.now()).getMinutes();
        var seconds = new Date(Date.now()).getSeconds();
        var times = `${day}-${month}-${year}*times:${hours}:${minutes}:${seconds}`;
        if (server_send_message.username === me) {
            $('.msg_card_body').append(
                `
                    <div class="d-flex justify-content-end mb-4">
                        <div class="msg_cotainer_send" title=${times}>
                            ${server_send_message.message}
                            <span class="msg_time_send">${server_send_message.username}</span>
                        </div>
                    </div>
                `
            )
        }
        else {
            $('.msg_card_body').append(
                `
                <div class="d-flex justify-content-start mb-4">
                    <div class="msg_cotainer" title=${times}>
                    ${server_send_message.message}
                    <span class="msg_time_send">${server_send_message.username}</span>
                    </div>
                </div>
                `
            )
        }
    })

});