/*
 * App.js - This will use the #create-*-room buttons to create a room
 * Once the room is created, we instanciate a robot at a specific point and with a specific language
 * Finally, keyboard controls will be allowed and the robot will be able to move around
 */

var app = (function() {
    $("#create-squared-room").click(function() {
        // Set some global var
        window.blockSize = 30; // The width and height of one block which represent a piece of the room


        var room = new SquaredRoom({
            height: 5,
            width: 5
        });

        var roomView = new RoomView({
            model: room,
        });

        roomView.drawRoom();

        var robot = new Robot({
            xValue: 1,
            yValue: 2,
            language: Languages.swe,
            room: room
        });


        var robotView = new RobotView({
            model: robot
        });
        // must use uppercase at this time
        robot.addMoveSequence("HGHGGHGHG");
        robotView.drawRobot();
        console.log(robot.getPosition());
        //alert("End : "+robot.getPosition());

        // Create the robot with his position
        //robot.place();
    });
})();
