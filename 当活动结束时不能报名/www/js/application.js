function onDeviceReady() {
}

$(document).ready(function () {
    document.addEventListener("deviceready", onDeviceReady, false);
    $.mobile.page.prototype.options.addBackBtn = true;
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;

    if(refresh_page){
      refresh_page();
    }
});

var native_accessor = {
    process_received_message: function (json_message) {
        process_user_message(json_message);

    },

    send_sms: function (phone, message) {
        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}  ]}, {"message_content":message},
            function(){}, function(){},this);
    },

    receive_message: function (json_message) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(json_message);
        }
    }

}
function notify_message_received(message_json) {
    native_accessor.receive_message(message_json);
}
