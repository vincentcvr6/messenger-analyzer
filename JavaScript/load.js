function getSingleFile(arg) {
    var f = arg.files[0];
    console.log("DEBUGGER")
    if (f) {
        var reader = new FileReader();
        reader.onload = function(e){
            var contents = e.target.results;
            console.log("File Contents: " + contents)
            var raw_html = reader.result;
            var parser = new DOMParser();
            var doc = parser.parseFromString(raw_html, 'text/html');
            parseDoc(doc);
        };
        reader.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
  }
function parseDoc(doc){
    var raw_messages = doc.getElementsByClassName("pam _3-95 _2pi0 _2lej uiBoxWhite noborder");
    var processed_messages = [];
    var message;
    for (var i=0; i < raw_messages.length; i++){
        message = raw_messages[i]
        var reactions = []
        try{
            var sender = message.getElementsByClassName("_3-96 _2pio _2lek _2lel")[0].innerText;
            var text = message.getElementsByClassName("_3-96 _2let")[0].children[0].children[1].innerText
        }catch(err){
            console.log("Message has not sender/text: " + message)
            continue
        }
        try{
            var react_html = message.getElementsByClassName("_tqp")[0].children;
            //var react;
            for(var j = 0; j < react_html.length; j++){
                var react = react_html[j].innerText;
                reactions.push(new Reaction(react.substring(2), react.substring(0, 2)));
            }
        }catch(err){
            console.log("No reacts found.")
        }
        processed_messages.push(new Message(
                                    sender=sender,
                                    text=text,
                                    reaction_list=reactions
                                    ))
    }
    console.log(processed_messages)

    //generate scatter plot of values

    var user_list = []
    var emoji_count = []
    var total_messages = []
    for (var i=0; i < processed_messages.length; i++){
        mess = processed_messages[i];
        if (user_list.indexOf(mess.sender) == -1){
            user_list.push(mess.sender);
            emoji_count.push(0);
            total_messages.push(0);
        }
        
        index = user_list.indexOf(mess.sender);
        emoji_count[index] += mess.reaction_list.length;
        total_messages[index] += 1;
    }
    var points_list = []
    //make list for graph render
    for (var i=0; i < user_list.length; i++){
        point = {x: total_messages[i], y: emoji_count[i]}
        points_list.push(point)
    }
    renderScatterChart(points_list, user_list);

}

function renderScatterChart(coords, name_labels) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data:{
            labels: name_labels,
            datasets:[{
                label: "Legend",
                data: coords
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                    var label = data.labels[tooltipItem.index];
                    return label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
                    }
                }
            }
        }
    });
}



