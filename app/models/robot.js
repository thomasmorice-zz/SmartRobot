var Compass = {
    "N": "North",
    "E": "East",
    "S": "South",
    "W": "West"
};

var Languages = {
    "swe": "Swedish",
    "eng": "English"
}


var Robot = Backbone.Model.extend({
    defaults: {
        xValue: 1,
        yValue: 1,
        language: Languages.swe,
        compassValue: 'N',
    },

    initialize: function(attributes) {
        if (!typeof attributes.xValue === "undefined") {
            this.set("xValue", attributes.xValue);
        }

        if (!typeof attributes.yValue === "undefined") {
            this.set("yValue", attributes.yValue);
        }

        if (!typeof attributes.language === "undefined") {
            this.set("language", attributes.language);
        }
    },


    validate: function(attributes) {
        if (attributes.xValue < 1 || attributes.xValue > attributes.roomWidth || attributes.yValue < 1 || attributes.yValue > attributes.roomHeight) {
            return "The robot position is outside the map";
        } else if (!$.isNumeric(attributes.xValue) || !$.isNumeric(attributes.yValue)) {
            return "The robot (x-axis or y-axis) is not a valid number";
        }
    },


    getPosition: function() {
        return this.get('xValue') + ' ' + this.get('yValue') + ' ' + this.get('compassValue');
    },
    moveOn: function(isClone) {
        if (isClone || this.canMoveOn()) {
            switch (this.get('compassValue')) {
                case 'N': // Moving North
                    this.set('yValue', this.get('yValue') - 1);
                    break;
                case 'E': // Moving East
                    this.set('xValue', this.get('xValue') + 1);
                    break;
                case 'S': // Moving South
                    this.set('yValue', this.get('yValue') + 1);
                    break;
                case 'W': // Moving West
                    this.set('xValue', this.get('xValue') - 1);
                    break;
            }
        }
    },
    canMoveOn: function() {
        var result = false;
        var cloneRobot = this.model = this.clone();
        cloneRobot.moveOn(true);
        if (cloneRobot.isInsideRoom()) {
            result = true;
        }
        return result;
    },

    isInsideRoom: function() {
        var result = true;
        if (this.get("xValue") > this.get("room").get("width") - 1 || this.get("xValue") < 0) {
            result = false;
            Materialize.toast('Going to far on x-axis', 4000);
        } else if (this.get("yValue") > this.get("room").get("height") - 1 || this.get("yValue") < 0) {
            result = false;
            Materialize.toast('Going to far on y-axis', 4000);
        }

        return result;
    },

    turn: function(direction) {
        if (direction == "right") {
            switch (this.get('compassValue')) {
                case 'N': // Turning East
                    this.set('compassValue', 'E');
                    break;
                case 'E': // Turning SOuth
                    this.set('compassValue', 'S');
                    break;
                case 'S': // Turning West
                    this.set('compassValue', 'W');
                    break;
                case 'W': // Turning North
                    this.set('compassValue', 'N');
                    break;
            }
        } else if (direction == "left") {
            switch (this.get('compassValue')) {
                case 'N': // Turning East
                    this.set('compassValue', 'W');
                    break;
                case 'E': // Turning SOuth
                    this.set('compassValue', 'N');
                    break;
                case 'S': // Turning West
                    this.set('compassValue', 'E');
                    break;
                case 'W': // Turning North
                    this.set('compassValue', 'S');
                    break;
            }
        }
    },

    addMoveSequence: function(sequence) {
        for (var i = 0; i < sequence.length; i++) {
            var action = sequence[i];
            this.moveAction(action);
        }
    },

    moveAction(action) {
        if (this.get("language") == Languages.swe) {
            // V = turn left - H = turn right - G = Go forward
            if (action == "V") {
                this.turn("left");
            } else if (action == "H") {
                this.turn("right");
            } else if (action == "G") {
                this.moveOn();
            }
        } else if (this.get("language") == Languages.eng) {
            // V = turn left - H = turn right - G = Go forward
            if (action == "L") {
                this.turn("left");
            } else if (action == "R") {
                this.turn("right");
            } else if (action == "F") {
                this.moveOn();
            }
        }
    }
});
