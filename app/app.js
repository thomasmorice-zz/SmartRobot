/*
 * App.js - This will use the #create-*-room buttons to create a room
 * Once the room is created, we instanciate a robot at a specific point and with a specific language
 * Finally, keyboard controls will be allowed and the robot will be able to move around
 */

var app = (function() {
    $(".create-room").click(function(event) {
        // Change some elements on the page
        $("#btn-init-room").hide();
        $("#btn-refresh-page").css('display', 'inline-block');
        $("#keyboard-enabled").prop("checked", true);
        $("#switch-keyboard-input").show();

        // Global var
        window.blockSize = 30; // The width and height of one block which represent a piece of the room

        // Initialize a room
        if ($(event.target).data("roomtype") == "squared") {
            var room = new SquaredRoom({
                height: 5, // The room will have 5 blocks as height
                width: 5 // The room will have 5 blocks as width
            });
        } else {
            var room = new RoundedRoom({
                radius: 10, // The room will have 10 blocks as radius
            });
        }

        // Initialize the view with the current room
        // It will automatically be drawn on the page
        var roomView = new RoomView({
            model: room,
        });

        // Intialize the robot
        var robot = new Robot({
            language: Languages.swe, // add a default language to the robot
            room: room // add the room so the robot will know where he is and can interact
        });

        // Initialize the view with the current robot
        // It will automatically be placed on the room at the position it belongs
        var robotView = new RobotView({
            model: robot
        });
    });
})();
