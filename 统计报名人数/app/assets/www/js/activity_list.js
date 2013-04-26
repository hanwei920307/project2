function make_disable_and_enable_button()
{
    window.location="#create_activity_page"
    $("#activity_list_text").keyup(function(){
    var text_content=$("#activity_list_text").val();
        if(text_content.trim()=="")
        {
            $("#create_button").button("disable")
        }
        else
        {
            $("#create_button").button("enable");
        }
    })
}

function get_activity_name()
{
    var Name=$("#activity_list_text").val()
    var activity ={"name":Name,"count":0}
    localStorage.activity_names=localStorage.activity_names || '[]'
    var activity_name=JSON.parse(localStorage.activity_names)
    activity_name.unshift(activity)
    localStorage.activity_names = JSON.stringify(activity_name)
}

function clear_activity_list_text()
{
    $("#activity_list_text").val("")
}

function save_activity_name()
{
    get_activity_name()
    display_activity_name()
    localStorage.now_activity_page_name = $("#activity_list_text").val();
    clear_activity_list_text()
    window.location.href="#sign_up_page";
    $("#create_button").button("disable")
}

function create_button()
{
    localStorage.now_activity_page_count =0
    try
    {
        $("#start").text("开始")
        $("#start_activity_button").button("enable")
    }   catch (e) {}
    clear_applicants_name()
}

function clear_applicants_name()
{
    $("#show_sign_up_name_and_phone").html("")
    try
    {
        $("#show_sign_up_name_and_phone").listview("refresh")
    }  catch(e) {}
}

function activity_name_list()
{
    var activity_name= JSON.parse(localStorage.activity_names)
    var str="";
    for(var i=0;i<activity_name.length;i++)
    {
        if(activity_name[i]["count"]==1)
        {
            str +='<li data-theme="e" ><a onclick="change_button_name(' + i + ')" >' + activity_name[i]["name"]  + '</a></li>'
        }
        else
        {
            str += '<li><a   onclick="change_button_name(' + i + ')" >' + activity_name[i]["name"]  + '</a></li>'
        }
    }
        return str;
}

function restructure(id,str)
{
    $("#"+id).html(str)
    try
    {
        $("#"+id).listview('refresh')
    }
    catch(e) {}
}

function render_activity_name(activity_name)
{
    restructure("show_name_activity" ,activity_name)
}

function display_activity_name()
{
    var activity_name= activity_name_list()
    render_activity_name(activity_name)
}

function save_and_judge_activity_name()
{
    localStorage.activity_names=localStorage.activity_names || '[]'
    var activity_name=JSON.parse(localStorage.activity_names)
    var new_name=$("#activity_list_text").val()
    for(var i=0;i<activity_name.length;i++)
    {
           if(new_name==activity_name[i]["name"])
           {
             alert("活动名不能重复!")
             $("#activity_list_text").val("")
                 return null;
           }
    }
    save_activity_name();
    create_button()
}


function change_button_name(activity_name)
{
    window.location="#sign_up_page"
    var activity=JSON.parse(localStorage.activity_names)
    localStorage.now_activity_page_count=activity[activity_name]["count"]
    localStorage.now_activity_page_name=activity[activity_name]["name"]
    var start_count=0;
    var start2=0;
    for(var i=0;i<activity.length;i++)
    {
        if(activity[i]["count"]==1)
        {
             start_count=1;
             start2=1;

        }
        if(activity[i]["count"]==2)
        {
            start_count=2
        }
    }
        if(activity[activity_name]["count"]==0 && start_count==0 )
        {
             $("#start").text("开始")
             $("#start_activity_button").button("enable")
        }
        else if(activity[activity_name]["count"]==0 && start_count==0)
        {
             $("#start").text("开始")
             $("#start_activity_button").button("enable")
        }
        else if(activity[activity_name]["count"]==0 && start_count==1)
        {
            $("#start").text("开始")
            $("#start_activity_button").button("disable")
        }
        else if(activity[activity_name]["count"]==0 && start_count==2 && start2==1)
        {
            $("#start").text("开始")
            $("#start_activity_button").button("disable")
        }
        else if(activity[activity_name]["count"]==1)
        {
            $("#start").text("结束")
            $("#start_activity_button").button("enable")
        }
        else if(activity[activity_name]["count"]==0 && start_count==2)
        {
            $("#start").text("开始")
            $("#start_activity_button").button("enable")
        }

        else if(activity[activity_name]["count"]==2)
        {
            $("#start").text("结束")
            $("#start_activity_button").button("disable")
        }
}

function  click_start_to_end_button()
{
    var activity=JSON.parse(localStorage.activity_names)
    for(var i=activity.length-1;i>=0;i--)
    {
        if(activity[i]["name"]==localStorage.now_activity_page_name)
        {
            activity[i]["count"]=1
            localStorage.now_activity_page_count=activity[i]["count"]
        }
    }
    localStorage.activity_names=JSON.stringify(activity)
    $("#start").text("结束")
    display_activity_name()
}

function create_activity_btn_disable()
{
    var activity=JSON.parse(localStorage.activity_names)
    window.location="#activity_list_page"
    for(var i=0;i<activity.length;i++)
    {
        if(activity[i]["count"]==1)
        {
            $("#create_activity_button").button("disable")
            break;

        }
        else
        {
            $("#create_activity_button").button("enable")
        }
    }

}

function judge_button_name()
{
    console.log("judge")
    if(localStorage.now_activity_page_count==0)
    {
        click_start_to_end_button()
        console.log("create_native_save_new_message")
        create_native_save_new_activity_applicants_message()
    }
    else if(localStorage.now_activity_page_count==1)
    {
        confirm_activity_end_window()
    }
}

function create_native_save_new_activity_applicants_message()
{

    console.log("save_applicant_message")
    var now_activity=localStorage.now_activity_page_name
    localStorage[now_activity]=JSON.stringify({"name":now_activity,"message":[]})
}
function confirm_activity_end_window()
{
    var activity=JSON.parse(localStorage.activity_names)
    for(var i=0;i<activity.length;i++)
    {

    }
    var prompt=confirm("确定要结束本活动" + '\n' + "报名吗?")
    if(prompt==true)
    {   try
        {
            $("#start_activity_button").button("disable")
        } catch (e) {}
        for(var i=0;i<activity.length;i++)
        {
           if(activity[i]["count"]==1)
           {
               activity[i]["count"]=2
               localStorage.activity_names=JSON.stringify(activity)
               localStorage.now_activity_page_count=2
           }
        }
        display_activity_name()

    }
}

function reply_message_to_applicant(json_message)
{
    console.log("reply_message")
    var  return_phone="";
    if(localStorage.now_activity_page_count==0)
    {
        var return_message="活动尚未开始，请稍后"
        native_accessor.send_sms(return_phone,return_message);
    }
    else if(localStorage.now_activity_page_count==1)
    {
         console.log("activity_page_count=1")
        is_applicant_same(json_message)
    }
    else if(localStorage.now_activity_page_count==2)
    {
        var return_message="对不起,报名已经结束"
        native_accessor.send_sms(return_phone,return_message);
    }

}
function process_user_message(json_message)
{
    console.log("process")
    judge_sms_ilgel(json_message)

}

function is_applicant_same(json_message)                       //判断报名者是否相同
{
    var activity_message=JSON.parse(localStorage[localStorage.now_activity_page_name])
    if(activity_message["message"]=="")
    {
        console.log("shifouchongming")
        save_activity_applicants_name_and_phone(json_message)

    }
    else
    {
        console.log("else")
        var new_activity_applicants_message=JSON.parse(localStorage[localStorage.now_activity_page_name])
        for(var i=0;i<new_activity_applicants_message["message"].length;i++)
        {
            console.log("undif")
            if(json_message.messages[0].phone==new_activity_applicants_message["message"][i].phone)
            {
                console.log("dianhuahaomaxiangtong")
                reply_applicant_not_repeat_apply()
                return null;
            }
            else
            {
                console.log("号码不同")
                save_activity_applicants_name_and_phone(json_message)
                return null;
            }
        }
    }
}

function save_activity_applicants_name_and_phone(json_message)                 //  存储当前活动的报名者信息
{
    var new_applicant={"name":"Name","phone":"Phone"}
    new_applicant.name=json_message.messages[0].message.substring(2);
    new_applicant.phone=json_message.messages[0].phone;
    console.log("ctivity_applicants_message")
    var activity_name=localStorage.now_activity_page_name
    var new_acitivity_applicangts_message=JSON.parse(localStorage[activity_name])
    console.log("ctivity_applicant")
    try
    {
        new_acitivity_applicangts_message["message"].unshift(new_applicant)
    }   catch (e) {}
    console.log("ctivity_save")
    localStorage[activity_name]=JSON.stringify(new_acitivity_applicangts_message)
    console.log("a")
    list_people_name_and_tel()
    console.log("b")
}

function reply_applicant_not_repeat_apply()
{
    return message="您已经报名成功，请勿重复报名！"
    native_accessor.send_sms(json_message.messages[0].phone,return_message)
}

function list_people_name_and_tel()
{
    var name_tel_str="";
    var new_array=JSON.parse(localStorage[localStorage.now_activity_page_name])
    console.log("new")
    for(var i=0;i<new_array["message"].length;i++)
    {
        name_tel_str += '<li>' + new_array["message"][i].name + '<span style="float:right;"> '
            + new_array["message"][i].phone + '</span></li>'
    }
    console.log(name_tel_str)
    $("#show_sign_up_name_and_phone").html(name_tel_str)
    try
    {
        console.log("123")
        $("#show_sign_up_name_and_phone").listview('refresh')
    }
    catch(e) {}
    console.log("shihsi")
    compute_applicants_num()
}

function compute_applicants_num()
{
    var applicants=JSON.parse(localStorage[localStorage.now_activity_page_name])
    var num=applicants["message"].length
    $("#compute_applicants_num").html("报名(" + num + "人)")
    try
    {
        $("#compute_applicants_num").listview('refresh')
    }  catch(e) {}

}

function judge_sms_ilgel(json_message)
{
    console.log("judge_sms_ilgel")
        var mark=json_message.messages[0].message.substring(0,2);
        if(mark == "BM"||mark =="bm"||mark=="bM"||mark=="Bm")
        {
            reply_message_to_applicant(json_message)
        }
        else
        {
            return message="报名格式错误！"
            native_accessor.send_sms(json_message.messages[0].phone,return_message)
        }
}







