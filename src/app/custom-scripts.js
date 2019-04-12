define(["dojo/topic"], function(topic) {
    /*
    * Custom Javascript to be executed while the application is initializing goes here
    */



    function strip(html){
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    window.getParameterByName = function(name, url){
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    var index = getParameterByName("sec") || null;

    // The application is ready
    topic.subscribe("tpl-ready", function(){

        // debugger
        // if(index){
        //     index = parseInt(index);
        //     console.log("tpl-ready & story-navigate-section ", index);
        //     topic.publish("story-navigate-section", index);
        // }

        /*
        * Custom Javascript to be executed when the application is ready goes here
        */
    });

    topic.subscribe("story-load-section", function(index){

        var url = '',
            search = window.location.search,
            title = strip(app.data.getStory().sections[index].title).trim();
        index++;
        if(search.indexOf("section")!=-1){
            var tmp = search.split("section=")
            search = tmp[0] + "section=" + index;
        }else if(search.indexOf("?")!=-1){
            search += `&section=${index}`;
        }else {
            search += `?section=${index}`;
        }
        history.pushState({state:index}, title, search);
    });
});
