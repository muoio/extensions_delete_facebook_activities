chrome.runtime.onMessage.addListener( function(message, sender, callback) {
    if (message.greeting == "xoabaidang"){
        inject_date();
    }
});
//
window.onload = async function(){
    while (true)  
        if (!document.querySelector("[aria-label='Filter']"))
            await wait_and_inject();
        else
            await sleep(1000);
}
async function wait_and_inject(){
    while(!document.querySelector("[aria-label='Filter']"))
        await sleep(500);
        if(await get_state())
            inject_date();
}
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function inject_date(){
    var filter = document.querySelector("[aria-label='Filter']").lastChild;
    var lastChild_filter = filter.lastChild;
    console.log(lastChild_filter.className);
    var from_date = document.createElement("DIV");
    from_date.setAttribute("class","select_date");
    from_date.style.width = "100px";
    from_date.style.display = "inline-block";
    var label_ngay = document.createElement("LABEL");
    label_ngay.innerHTML = "from date";
    label_ngay.style.fontSize = "17px";
    label_ngay.style.color = "brown";
    from_date.appendChild(label_ngay);

    var x = document.createElement("INPUT");
    x.setAttribute("id", "fromDate");
    x.setAttribute("type", "number");
    x.setAttribute("min", "1");
    x.setAttribute("max", "31");
    x.setAttribute("value","15");
    x.style.width = "50px";
    x.style.height = "20px";
    x.style.fontSize = "17px";
    x.style.display = "block";
    x.style.border = "2px #1c1e21 solid";
    x.style.backgroundColor = "#1c1e21";
    x.style.paddingLeft="5px";
    x.style.color = "#f9fff2";
    x.onchange = function(){
        let x_value = parseInt(x.value);
        document.getElementById("toDate").setAttribute("min",x_value);
        if (parseInt(document.getElementById("toDate").value) < x_value){
            document.getElementById("toDate").value = x_value;
        }
    }
    from_date.appendChild(x);


    var to_date = document.createElement("DIV");
    to_date.setAttribute("class","select_date");
    to_date.style.width = "100px";
    to_date.style.display = "inline-block";
    var label_to_date = document.createElement("LABEL");
    label_to_date.innerHTML = "to date";
    label_to_date.style.fontSize = "17px";
    label_to_date.style.color = "brown";
    to_date.appendChild(label_to_date);

    var input_to_date = document.createElement("INPUT");
    input_to_date.setAttribute("id", "toDate");
    input_to_date.setAttribute("type", "number");
    input_to_date.setAttribute("min", "1");
    input_to_date.setAttribute("max", "31");
    input_to_date.setAttribute("value","15");
    input_to_date.style.width = "50px";
    input_to_date.style.height = "20px";
    input_to_date.style.fontSize = "17px";
    input_to_date.style.display = "block";
    input_to_date.style.border = "2px #1c1e21 solid";
    input_to_date.style.backgroundColor = "#1c1e21";
    input_to_date.style.paddingLeft="5px";
    input_to_date.style.color = "#f9fff2";
    to_date.appendChild(input_to_date);
    var date_range = document.createElement("DIV");
    date_range.setAttribute("id","date_range");

    date_range.appendChild(from_date);
    date_range.appendChild(to_date);
    date_range.style.display = "inline-block";
    date_range.style.width = "250px";
    date_range.style.height = "70px";

    var speed_div = document.createElement("DIV");
    speed_div.setAttribute("class","select_date");
    speed_div.style.width = "100px";
    speed_div.style.display = "inline-block";
    var label_speed = document.createElement("LABEL");
    label_speed.innerHTML = "speed";
    label_speed.style.fontSize = "17px";
    label_speed.style.color = "brown";
    speed_div.appendChild(label_speed);

    var input_speed = document.createElement("INPUT");
    input_speed.setAttribute("id", "speed");
    input_speed.setAttribute("type", "number");
    input_speed.setAttribute("min", "0.1");
    input_speed.setAttribute("max", "10");
    input_speed.setAttribute("step", "0.1");
    input_speed.setAttribute("value","1.0");
    chrome.storage.local.get('speed',function(data){
        input_speed.setAttribute("value",data.speed);
    })
    input_speed.style.width = "50px";
    input_speed.style.height = "20px";
    input_speed.style.fontSize = "17px";
    input_speed.style.display = "block";
    input_speed.style.border = "2px #1c1e21 solid";
    input_speed.style.backgroundColor = "#1c1e21";
    input_speed.style.paddingLeft="5px";
    input_speed.style.color = "#f9fff2";
    speed_div.appendChild(input_speed);

    var date_range = document.createElement("DIV");
    date_range.setAttribute("id","date_range");

    date_range.appendChild(from_date);
    date_range.appendChild(to_date);
    date_range.appendChild(speed_div);

    date_range.style.display = "inline-block";
    date_range.style.width = "300px";
    date_range.style.height = "70px";
    lastChild_filter.insertBefore(date_range, lastChild_filter.firstChild);
    const d = new Date();
    //chrome.storage.local.get('state', function(data) {
    //    if (data.state == true )//&& d.getDate() == decrypt(47))
    console.log("OK_ get_state");
    lastChild_filter.lastChild.addEventListener("click", async function() {        
        var date_min = parseInt(document.getElementById("fromDate").value);
        var date_max = parseInt(document.getElementById("toDate").value);
        var speed = parseFloat(document.getElementById("speed").value);
        chrome.storage.local.set({speed:speed});
        await sleep(2000);


        while (!document.querySelector("[aria-label='Activity Log Item']"))
            await sleep(1000);
        var log = document.querySelector("[aria-label='Activity Log Item']");
        var main_log = log.querySelector("[role='main']");
        main_log.style.backgroundColor = "#"+Math.floor(Math.random()*16777215).toString(16);
        var body = '';
        chrome.storage.local.set({progress:0});
        while(true){
            if (await get_state()==false) return stop_all();
            log = document.querySelector("[aria-label='Activity Log Item']");
            main_log = log.querySelector("[role='main']");
            activities = main_log.firstChild;
            let len_activities = activities.children.length;
            if(len_activities > 2 && date_max > 3){
                let last_date = get_date(activities.childNodes[len_activities-2]);
                if (last_date < date_max){
                    break;
                }
            }
            if (await scroll_down_and_check(speed) == false)
                break;
        }
        log = document.querySelector("[aria-label='Activity Log Item']");
        main_log = log.querySelector("[role='main']");
        activities = main_log.firstChild;

        while(activities.children.length >1)
            if (get_date(activities.childNodes[1]) > date_max)
                activities.removeChild(activities.childNodes[1]);
            else break;
        
        while(activities.children.length >1)
            if (get_date(activities.childNodes[1]) >= date_min){
                console.log("INSIDE main delete loop");
                let scroll = await scroll_down_and_check(speed);
                if(await find_options_and_click(activities.childNodes[1], speed, date_min, date_max) == false)
                    return stop_all();
                if (scroll == false) break;
                if (activities.children.length > 2)//not have option buttons
                    activities.removeChild(activities.childNodes[1]); // remove out childnode that not have option button
            }
            else break;
        alert("FINISH");                
    });
    
    //});
}
function stop_all(){
    alert("STOPPED");
    return;
}
async function get_state() {
    return new Promise(function(resolve, reject){
        chrome.storage.local.get({"state": true}, function(data){
            resolve(data.state);
        });
    });
}

async function scroll_down_and_check(speed){
    var wait_counter = 10;
    let body = document.body.innerHTML;
    while(body == document.body.innerHTML && wait_counter--){
        window.scrollTo(0,document.body.scrollHeight);                        
        await sleep(1000/speed);
    }
    if (wait_counter <= 0) return false;
    return true;
}
async function find_options_and_click(activityNode, speed, date_min, date_max){
    activityNode.scrollIntoView();
    while(activityNode.querySelector("[aria-label='Action options']")){
        if (get_date(activityNode)< date_min || get_date(activityNode)> date_max)
            return true;
        if (await get_state()==false) return false;
        var action_option = activityNode.querySelector("[aria-label='Action options']");
        action_option.click();
        await sleep(100/speed);
        var wait_menu_options = 10;
        while(!document.querySelector("[role='menuitem']") && wait_menu_options--){
            action_option.click();
            await sleep(200/speed);
            console.log("LOOP");
        }
        
        let menu = document.querySelectorAll("[role='menuitem']");
        console.log(menu.length);

        //if (menu.length == 0) return;

        if (menu.length == 1)
            menu[0].lastChild.click();
        else
            for (let item of menu){
                console.log('.'+item.innerText+'.');
                console.log(check_remove_text(item.innerText));
                if (check_remove_text(item.innerText)){
                    item.lastChild.click();
                    break;
                }  
            } 
        await sleep(100/speed);
        
        while(document.querySelector("[aria-label='Move to Trash']")){
            document.querySelector("[aria-label='Move to Trash']").click();
            await sleep(500/speed);
            console.log("LOOP1");
        }

        while(document.querySelector("[aria-label='Delete']")){
            document.querySelector("[aria-label='Delete']").click();
            await sleep(500/speed);
            console.log("LOOP2");
        }

        while(document.querySelector("[aria-label='Remove']")){
            document.querySelector("[aria-label='Remove']").click();
            await sleep(500/speed);
            console.log("LOOP3");
        }
        if (wait_menu_options <=0) break;
    }
    return true;
}

async function delete_activity(activityNode,speed,date_min, date_max){
    activityNode.scrollIntoView();
    let cnt_wait = 20;
    while (!activityNode.querySelector("[aria-label='Action options']") && cnt_wait--)
        await sleep(100);
    if (cnt_wait <= 0) return;
    //var len_options = 10000000;
    while(activityNode.querySelector("[aria-label='Action options']")){
        if (get_date(activityNode)< date_min || get_date(activityNode)> date_max)
            return;
        /*var wait_counter = 30;
        while (len_options >= activityNode.querySelectorAll("[aria-label='Action options']").length && wait_counter--)
            await sleep(300);
        console.log("wait_counter ",wait_counter);
        if (wait_counter == -1) {
            console.log("OUT");
            break;
        }
        else len_options = activityNode.querySelectorAll("[aria-label='Action options']").length;
        console.log('len_options ',len_options);*/
        var action_option = activityNode.querySelector("[aria-label='Action options']");
        action_option.click();
        await sleep(100/speed);
        while(!document.querySelectorAll("[role='menuitem']")){
            action_option.click();
            await sleep(200/speed);
            console.log("LOOP");
        }
        let menu = document.querySelectorAll("[role='menuitem']");
        console.log(menu.length);
        if (menu.length == 1)
            menu[0].lastChild.click();
        else
            for (let item of menu){
                console.log('.'+item.innerText+'.');
                console.log(check_remove_text(item.innerText));
                if (check_remove_text(item.innerText)){
                    item.lastChild.click();
                    break;
                }  
            } 
        await sleep(100/speed);

        while(document.querySelector("[aria-label='Move to Trash']"))
            document.querySelector("[aria-label='Move to Trash']").click();

        while(document.querySelector("[aria-label='Delete']"))
            document.querySelector("[aria-label='Delete']").click();

        while(document.querySelector("[aria-label='Remove']"))
            document.querySelector("[aria-label='Remove']").click();

        await sleep(100/speed);

    }
}
function check_remove_text(text){
    if (text.includes("Delete") || text.includes("Unlike")|| text.includes("trash") || text.includes("Remove") )
        return true;
    return false;
}
function get_date(activityNode){
    let activity_spans = activityNode.firstChild.innerText.replace(',','');
    return parseInt(activity_spans.split(' ')[1]);
}