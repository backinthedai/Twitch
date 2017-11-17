var proxy = 'https://cors-anywhere.herokuapp.com/';
var liveName="";
var targetBlank = "target=\"_blank\"";

$(document).ready(function () {

    $.ajax({
        type: "Get",
        url: "https://api.twitch.tv/kraken/streams",
        headers: {
            'Client-ID': 'idpyww9687xf8ws1njyyx2dycw2xzh'
        },
        success: function (liveData) {
            liveName = liveData.streams[0].channel.display_name;
            console.log(liveName);
            if(liveName != ""){
                $.ajax({
                    type: "GET",
                    url: "https://api.twitch.tv/kraken/streams/getinvolvedgaming",
                    headers: {           
                        'Client-ID': 'idpyww9687xf8ws1njyyx2dycw2xzh'
                    },
                    success: function (data1) {
                        if (data1.stream === null) {
                            $("#liveStatus").html("G.I.G. stream is currently Offline");
                        
                            var player = new Twitch.Player("<player div ID>", streamOptions(liveName));
                            player.setVolume(0);
                        }
                        else {
                            $("#liveStatus").html("G.I.G. stream is currenly Live");
            
                            var player = new Twitch.Player("<player div ID>", streamOptions("getinvolvedgaming"));
                            player.setVolume(0.5);
                        }
                        //    console.log(data1);
                    }
                });
            }
        }
    });

    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/users/getinvolvedgaming/follows/channels/",
        headers: {
            'Client-ID': 'idpyww9687xf8ws1njyyx2dycw2xzh'
        },
        success: function (data2) {
            console.log(data2);
            for (var i = 0; i < data2.follows.length; i++) {
                var logo = data2.follows[i].channel.logo;
                var displayName = data2.follows[i].channel.display_name;
                var status = data2.follows[i].channel.status;

                if (logo === null) {
                    logo = "NA.jpg";
                }
                $("#followerInfo").prepend("<div class='row'>"
                    + "<div class='col-md-4'>"
                    + "<a href='https://www.twitch.tv/" + displayName + "' "
                    + targetBlank +"><img src='" + logo + "'></a>" + "</div>"
                    + "<div class='col-md-4'>" + displayName + "</div>"
                    + "<div class='col-md-4'>" + status + "</div>"
                    + "</div>");
            }

        }
    })

    function streamOptions(name) {
        var options = {
            width: 854,
            height: 480,
            channel: name,
        };
        return options;
    }

});