// A compass object which will helps us manage the
var Compass = {
    "N": "North",
    "E": "East",
    "S": "South",
    "W": "West"
};

// A languages object which contains available languages
// todo: use this object to construct radio button on page dinamically
var Languages = {
    "swe": "Swedish",
    "eng": "English"
}

/*
 * Robot - Backbone.Model
 * The model for a robot
 */
var Robot = Backbone.Model.extend({
    defaults: {
        xValue: 1, // abciss position
        yValue: 2, // ordinate position
        language: Languages.swe, // current language
        compassValue: 'N', // direction where the robot is looking
        keyboardEnabled: true // if false, the robot will not move when keys are pressed
    },

    /*
     * Function initialize
     * Check for the attributes, use them if they are valid
     */
    initialize: function(attributes) {
        if (typeof attributes.xValue === "undefined" && this.get("room").get("roomType") == "rounded") {
            // if the room is rounded and there is no parameter for X
            this.set("xValue", 0);
        }

        if (typeof attributes.yValue === "undefined" && this.get("room").get("roomType") == "rounded") {
            // if the room is rounded and there is no parameter for X
            this.set("yValue", 0);
        }
    },

    /*
     * Function validate
     * Call isValid() from the app to trigger this funtion
     * if isValid() is not true, the response will be the message returned from this function
     */
    validate: function(attributes) {
        if (attributes.xValue < 1 || attributes.xValue > attributes.roomWidth || attributes.yValue < 1 || attributes.yValue > attributes.roomHeight) {
            return "The robot position is outside the map";
        } else if (!$.isNumeric(attributes.xValue) || !$.isNumeric(attributes.yValue)) {
            return "The robot (x-axis or y-axis) is not a valid number";
        }
    },

    /*
     * Function getPosition
     * Get the current position of the robot
     */
    getPosition: function() {
        return this.get('xValue') + ' ' + this.get('yValue') + ' ' + this.get('compassValue');
    },

    /*
     * Function moveOn
     * Move the robot forward
     * if the method is called from a clone, the robot will not move
     */
    moveOn: function(isClone) {
        var hasMoveOn = true;
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
        } else {
            // The robot cannot move forward because.. the room is too small
            hasMoveOn = false;
        }
        return hasMoveOn;
    },

    /*
     * Function canMoveOn
     * Method is useful to know if the robot can move forward
     * We check for the clone position after he has been moved to be sure he is still in the room
     */
    canMoveOn: function() {
        var result = false;
        var cloneRobot = this.model = this.clone();
        cloneRobot.moveOn(true);
        if (cloneRobot.isInsideRoom()) {
            result = true;
        }
        return result;
    },

    /*
     * Function isInsideRoom
     * If the robot is trying to escape the room, result will be false
     */
    isInsideRoom: function() {
        var result = true;
        if (this.get("room").get("roomType") == "squared") {
            if (this.get("xValue") > this.get("room").get("width") - 1 || this.get("xValue") < 0) {
                result = false;
            } else if (this.get("yValue") > this.get("room").get("height") - 1 || this.get("yValue") < 0) {
                result = false;
            }
        } else if (this.get("room").get("roomType") == "rounded") {
            var radius = this.get("room").get("radius");
            // The equation used to get the max value for a coordinate in the circle is
            // square(x) + square(y) = square(radius)
            var maxValueForY = Math.abs(Math.trunc(Math.sqrt(radius * radius - this.get("xValue") * this.get("xValue"))));
            var maxValueForX = Math.abs(Math.trunc(Math.sqrt(radius * radius - this.get("yValue") * this.get("yValue"))));

            if (Math.abs(this.get("xValue")) > maxValueForX || Math.abs(this.get("yValue")) > maxValueForY) {
                result = false;
            }
        }

        return result;
    },

    /*
     * Function turn
     * check for the current language of the robot and turn him if the key is correct
     */
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

    /*
     * Function addMoveSequence
     * A move sequence is passed, we parse every character and process each action
     */
    addMoveSequence: function(sequence) {
        var robotTryToEscape = false;
        for (var i = 0; i < sequence.length; i++) {
            var action = sequence[i];
            robotTryToEscape = this.moveAction(action);
        }
        return robotTryToEscape
    },

    /*
     * Function moveAction
     * Check the action and do the move if the robot understand it
     * todo: create model for keyboard to manage it dynamically
     */
    moveAction(action) {
        action = action.toUpperCase();
        var hasMoved = true;
        if (this.get("language") == Languages.swe) {
            // V = turn left - H = turn right - G = Go forward
            if (action == "V") {
                this.turn("left");
            } else if (action == "H") {
                this.turn("right");
            } else if (action == "G") {
                if (!this.moveOn()) {
                    hasMoved = false;
                }
            }
        } else if (this.get("language") == Languages.eng) {
            // L = turn left - R = turn right - F = Go forward
            if (action == "L") {
                this.turn("left");
            } else if (action == "R") {
                this.turn("right");
            } else if (action == "F") {
                if (!this.moveOn()) {
                    hasMoved = false;
                }
            }
        }
        return hasMoved;
    }
});
