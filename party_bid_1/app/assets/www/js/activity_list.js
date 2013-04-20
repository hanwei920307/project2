function make_disable_and_enable_button()
{
    $("#activity_list_text").keyup(function(){
    var text_content=$("#activity_list_text").val();
        if(text_content.trim()=="")
        {
            $("#create_act_button").button("disable")
        }
        else
        {
            $("#create_act_button").button("enable");
        }
    })
}

function get_activity_name()
{
    var Name=$("#activity_list_text").val()
    localStorage.start_activity_name= $("#activity_list_text").val()
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
    clear_activity_list_text()
    window.location.href="#sign_up_page";
    $("#create_act_button").button("disable")
}

function activity_name_list()
{
    var activity_name= JSON.parse(localStorage.activity_names)
    var str="";
    for(var i=0;i<activity_name.length;i++)
    {
        str += '<li><a onclick="change_button_name(' + i + ')" >' + activity_name[i]["name"]  + '</a></li>'
    }
    console.log("a")
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
}

function change_button_name(activity_name)
{
    window.location="#sign_up_page"
    var activity=JSON.parse(localStorage.activity_names)
    localStorage.start_activity_name=activity[activity_name]["name"]
    var start_count=0;
    for(var i=0;i<activity.length;i++)
    {
        if(activity[i]["count"]==1)
        {
             start_count ++;

        }
    }

    if(activity[activity_name]["count"]==0 && start_count!=1 )
    {
        window.location="#sign_up_page"
        $("#start").text("开始")
        $("#start_button").button("enable")
    }
    if(activity[activity_name]["count"]==1)
    {
        window.location="#sign_up_page"
        $("#start").text("结束")
        $("#start_button").button("disable")
    }
    if(activity[activity_name]["count"]==2)
    {
        window.location="#sign_up_page"
        $("#start").text("结束")
        $("#start_button").button("disable")
    }
}

function  click_start_to_end_button()
{
    var activity=JSON.parse(localStorage.activity_names)
    for(var i=activity.length-1;i>=0;i--)
    {
        if(activity[i]["name"]==localStorage.start_activity_name)
        {
            activity[i]["count"]=1
        }
    }
    localStorage.activity_names=JSON.stringify(activity)
    $("#start").text("结束")
}
 /*
//function make_button_disable()
{
    var activity=JSON.parse(localStorage.activity_names)
    for(var i=0;i<activity.length;i++)
    {
        if(activity[i]["count"]==0)
        {
            $("#start").text("开始")
            $("#start_button").button("enable")
        }
        else(activity[i]["count"]==1)
        {
            $("#start_button").button("disable")
        }

    }
}

/*function click_start_to_end_button()
{
    var activity=JSON.parse(localStorage.activity_names)
    for(var i=0;i<activity.length;i++)
    if(activity[i]["count"]==0)
    {

        $("#start").text("开始")
    }
}

/*function  judge_button_enable()
{
    var activity=JSON.parse(localStorage.activity_names)
    for(var i=0;i<activity.length;i++)
    {
        if(activity[i]["count"]==1)
        {
            try
            {
                $("#start_button").button("disable")
                $("#create_act_button").button("disable")
            }  catch (e){}
        }
    }
  */
/*function click_end_button_to_disable()
{
    var activity=JSON.parse(localStorage.activity_names)
    var prompt=confirm("确定要结束本活动" + '\n' + "报名吗?")
    if(prompt==true)
    {
        try
        {
        $("#start_button").button("disable")
        } catch (e) {}
        activity[a]["count"]=2;
    }
}
        /*   activity_count=show_activity_end_window()
        }
        if(activity_count==1)
        {
               activity[i]["count"]=2;
        }   */




/*function confirm_activity_end_window()
{
    var prompt=confirm("确定要结束本活动" + '\n' + "报名吗?")
    if(prompt==true)
    {   try
        {
            $("#start_button").button("disable")
        } catch (e) {}
        return   1;
    }
    return    0 ;
}  */




