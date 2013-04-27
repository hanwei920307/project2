function onDeviceReady() {
}
var native_access   ;
$(document).ready(function () {
    document.addEventListener("deviceready", onDeviceReady, false);
    $.mobile.page.prototype.options.addBackBtn = true;
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
    native_access = new NativeAccess() ;
    finish_text_then_ready()
  /*
    if(refresh_page){
      refresh_page();
    } */
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
function notify_message_received(json_message) {
    native_accessor.receive_message(json_message);
}

