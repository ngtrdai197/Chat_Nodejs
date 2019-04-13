var socket = io();

$(document).ready(function () {
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
                    console.log(user);

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
            console.log(user);
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
    $('#send-message').click(function(){
        var content = $('#content-message').val();
        if(content){
            socket.emit('send-message', content);
            $('#content-message').val('');
        }
    })
    socket.on('server-send-message', (server_send_message)=> {
        if(server_send_message.username === me){
            console.log('cos');
            
            $('.msg_card_body').append(
                `
                    <div class="d-flex justify-content-end mb-4">
                        <div class="msg_cotainer_send">
                            ${server_send_message.message}
                            <span class="msg_time_send">${new Date(Date.now())}</span>
                        </div>
                    </div>
                `
            )
        }
        else{
            $('.msg_card_body').append(
                `
                <div class="d-flex justify-content-start mb-4">
                    <div class="msg_cotainer">
                    ${server_send_message.message}
                    <span class="msg_time_send">${new Date(Date.now()).}</span>
                    </div>
                </div>
                `
            )
        }
    })

});
