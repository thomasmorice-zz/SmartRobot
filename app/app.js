/*
 * App.js - This will use the #create-*-room buttons to create a room
 * Once the room is created, we instanciate a robot at a specific point and with a specific language
 * Finally, keyboard controls will be allowed and the robot will be able to move around
 */

//var roomView = new RoomView({
//    model: room
//});

//roomView.createSquaredRoom();

var app = (function() {
    $("#create-squared-room").click(function() {

        var blockSize = 30;
        // Instanciate a squared room
        var room = new SquaredRoom({
            height: 4,
            width: 7
        });

        var roomView = new RoomView({
            model: room,
        });

        // Create the room with the value passed on parameters
        if (!room.isValid()) {

        }

        roomView.drawRoom(blockSize);

        var robot = new Robot({
            xValue: 1,
            yValue: 2,
            languages: Languages.swe,
            room: room
        });


        var robotView = new RobotView({
            model: robot
        });
        var canvasSize = document.getElementById('room-canvas').offsetWidth;

        console.log(canvasSize);

        robotView.drawRobot(blockSize, canvasSize);

        alert("Start : "+robot.getPosition());
        //console.log(robot);
        robot.addMoveSequence("HGHGGHGHG");
        robotView.drawRobot(blockSize, canvasSize);
        alert("End : "+robot.getPosition());

        // Create the robot with his position
        //robot.place();
    });
})();
