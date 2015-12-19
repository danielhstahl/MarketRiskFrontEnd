var inputUtilities={
    getInputItems:function(id, eachCallback, callback){
        var hasBoth=true;
        if(!callback){
            callback=eachCallback;
            hasBoth=false;
        }
        if(id.constructor !== Array){
            id=[id];
        }
        var n=id.length;
        var values=[];
        for(var i=0; i<n; i++){
            var e = document.getElementById(id[i]);
            if(e){
                var label="";
                var value="";
                if(e.nodeName.toLowerCase() === 'select'){ //is a select box
                    label = e.options[e.selectedIndex].label;
                    value = e.options[e.selectedIndex].value;
                }
                else {
                    label=id[i];
                    value=e.value;
                }
                values.push({title: label, value:value});
                if(eachCallback && hasBoth){
                    eachCallback(id[i], value, label, values, i);
                }
            }
        }
        if(callback){
            callback(id, values);
        }
    }
}