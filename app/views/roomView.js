var RoomView = Backbone.View.extend({
    el: "room-view",
    events: {
        //"click #create-squared-room": "createSquaredRoom",
        //"click #create-rounded-room": "createRoundedRoom",
    },

    createSquaredRoom: function(height, width) {
        if (typeof height === "undefined") {
            // If no height parameters has been passed, ask for it
            var height = prompt("Please enter a number for the room height:");
        }

        if (typeof width === "undefined") {
            // If no width parameters has been passed, ask for it
            var width = prompt("Please enter a number for the room width:");
        }

        this.model.set("height", height);
        this.model.set("width", width);
        // Check if everything is validate correctly
        if (!this.model.isValid()) {
            Materialize.toast(this.model.validationError, 4000) // 4000 is the duration of the toast
        }
    },



    createRoundedRoom: function() {
        this.model = new RoundedRoom();
        var radius = prompt("Please enter a number for the room radius:");
        this.model.set("radius", radius);
    },

    // Reset the canvas
    cleanRoom: function() {
        var canvas = document.getElementById('room-canvas');
        var context = canvas.getContext('2d');
        // Store the current transformation matrix
        context.save();

        // Use the identity matrix while clearing the canvas
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Restore the transform
        context.restore();
        context.beginPath();
    },



    /* Draw the lines based on the room height and width from model
     * The blockSize is passing as parameter, 50 is the max value for width & height upon that, the canvas will not render fully
     */
    drawRoom: function(blockSize) {

        this.cleanRoom();
        if (this.model.isValid()) {
            this.cleanRoom();
            var canvas = document.getElementById('room-canvas');
            var context = canvas.getContext('2d');

            // We set absciss & ordinate value to 0
            var x = 0;
            var y = 0;

            for (var j = 0; j < this.model.get("height"); j++) {
                for (var i = 0; i < this.model.get("width"); i++) {
                    context.moveTo(x, y);
                    context.lineTo(blockSize + x, y);
                    context.lineTo(blockSize + x, blockSize + y);
                    context.lineTo(x, y + blockSize);
                    context.lineTo(x, y);
                    x = x + blockSize;
                }
                y = y + blockSize;
                x = 0;
            }

            //robotIcon = $("#robot-icon");
            //robotIcon.show();

            context.strokeStyle = "black";
            context.stroke();
        }
    },


    createRobot: function() {
        var robot = new Robot(1, 2);
        if (robot.isValid({
                roomHeight: this.model.get("height"),
                roomWidth: this.model.get("width")
            }));
    }


});
