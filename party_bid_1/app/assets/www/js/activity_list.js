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
    var activityName=$("#activity_list_text").val()
    localStorage.activity_names=localStorage.activity_names || '[]'
    var activity_name=JSON.parse(localStorage.activity_names)
    activity_name.unshift(activityName)
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
        str += '<li><a href="#sign_up_page">' + activity_name[i]  + '</a></li>'
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