var RoomView = Backbone.View.extend({
    el: "room-view",

    /*
     * Function initialize
     * We have the room model so let's show it on the screen
     */
    initialize: function() {
        this.drawRoom();
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
     * The blockSize is global, 50 is the max value for width & height upon that, the canvas will not render fully
     */
    drawRoom: function() {
        if (this.model.isValid()) {
            this.cleanRoom();
            var canvas = document.getElementById('room-canvas');
            var context = canvas.getContext('2d');

            // We set absciss & ordinate value to 0
            var x = 0;
            var y = 0;

            if (this.model.get("roomType") == "squared") {
                // If the room is squared (works with rectangle) draw a grid
                for (var j = 0; j < this.model.get("height"); j++) {
                    for (var i = 0; i < this.model.get("width"); i++) {
                        context.moveTo(x, y);
                        context.lineTo(window.blockSize + x, y);
                        context.lineTo(window.blockSize + x, window.blockSize + y);
                        context.lineTo(x, y + window.blockSize);
                        context.lineTo(x, y);
                        x = x + window.blockSize;
                    }
                    y = y + window.blockSize;
                    x = 0;
                }
            } else if (this.model.get("roomType") == "rounded") {
                // If the room is rounded draw a circle
                var center = this.model.get("radius") * blockSize;
                var radius = this.model.get("radius") * blockSize

                context.beginPath();
                context.arc(center, center, radius, 0, 2 * Math.PI, false);
            }
            context.strokeStyle = "tomato";
            context.stroke();
        }
    },
});
