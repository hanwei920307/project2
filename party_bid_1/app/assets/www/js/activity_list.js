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

}

function activity_name_list()
{
    var activity_name= JSON.parse(localStorage.activity_names)
    var str="";
    for(var i=0;i<activity_name.length;i++)
    {
        str += '<li><a onclick="change_button_name(' + i + ')" >' + activity_name[i]["name"]  + '</a></li>'
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
    console.log(" save_and_judge_activity_name() begin")
    try
    {
        var activity_name=JSON.parse(localStorage.activity_names)
        var new_name=$("#activity_list_text").val()
        for(var i=0;i<activity_name.length;i++)
        {
           if(new_name==activity_name[i])
           {
             alert("活动名不能重复!")
                 return null;
           }
        }
    }catch (e) {}
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
        console.log("for begin")
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
            console.log("if(activity[activity_name][count]==0 && start_count==0 )")
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
        console.log("for end");

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
}

function create_activity_btn_disable()
{
    var activity=JSON.parse(localStorage.activity_names)
    window.location="#activity_list_page"
    for(var i=0;i<activity.length;i++)
    {
        if(activity[i]["count"]==1)
        {
            console.log("create_activity_btn_disable()")
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
    if(localStorage.now_activity_page_count==0)
    {
        click_start_to_end_button()
    }
    else if(localStorage.now_activity_page_count==1)
    {
        confirm_activity_end_window()
    }
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
               console.log(" for(var i=0;i<activity.length;i++)")
           }
        }
    }
}




