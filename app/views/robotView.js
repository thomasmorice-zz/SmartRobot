/*
 * RobotView - Backbone.View
 * Needed if we want to show what happen on the page when we move the robot
 */

var RobotView = Backbone.View.extend({
    // We set the current el to the body so 'keydown' event can be trigered
    el: "body",
    events: {
        "click .rotate": "rotate", // When "rotate" button is clicked
        "click .move-on": "moveOn", // When move-on button is clicked
        "click #button-launch-sequence": "addMoveSequence", // When the input sequence has valeu and the button to launch sequence is clicked
        "change #switch-keyboard-input": "switchKeyboardEnabled", // When we want to enable/disable the keyboard shrtcuts with the switch
        "change .languages-radio": "changeLanguage", // When we change
        "keydown": "keyAction" // When a key on the keyboard is pressed
    },

    /*
     * Function initialize
     * When we instanciate a new robotView, it is instantly drawn on the screen at the position of the model
     */
    initialize: function() {
        this.drawRobot();
    },

    /*
     * Function drawRobot
     * Called whenever we need to render the robot somewhere
     * todo: use the render function
     */
    drawRobot: function() {
        if (this.model.get("room").get("roomType") == "squared") {
            marginLeftValue = -750 / 2 + blockSize * this.model.get("xValue") + "px";
            marginTopValue = blockSize * this.model.get("yValue") + "px";
        } else if (this.model.get("room").get("roomType") == "rounded") {
            marginLeftValue = -780 / 2 + blockSize * (this.model.get("xValue") + this.model.get("room").get("radius")) + "px";
            marginTopValue = -18 + blockSize * (this.model.get("yValue") + this.model.get("room").get("radius")) + "px";
        }

        this.$("#robot-icon").css("marginLeft", marginLeftValue);
        this.$("#robot-icon").css("marginTop", marginTopValue);
        this.$("#robot-icon").show();
        this.$("#input-launch-action-sequence").show();
        this.drawRobotNextMove();
        this.showControls();
        this.initLanguage();
        this.setLanguageKeyboardAnnotation();
        this.refreshCurrentPositionLabel();
    },

    /*
     * Function drawRobotNextMove
     * This show a robot which blink, at the position where the robot will be
     * If he moves forward
     */
    drawRobotNextMove: function() {
        nextMovePositionX = this.model.get("xValue");
        nextMovePositionY = this.model.get("yValue");
        if (this.model.get("compassValue") == 'N') {
            nextMovePositionY--;
        } else if (this.model.get("compassValue") == 'E') {
            nextMovePositionX++;
        } else if (this.model.get("compassValue") == 'S') {
            nextMovePositionY++;
        } else if (this.model.get("compassValue") == 'W') {
            nextMovePositionX--;
        }
        if (this.model.get("room").get("roomType") == "squared") {
            this.$("#robot-icon-next-move").css("marginLeft", -750 / 2 + window.blockSize * nextMovePositionX + "px");
            this.$("#robot-icon-next-move").css("marginTop", window.blockSize * nextMovePositionY + "px");
        } else if (this.model.get("room").get("roomType") == "rounded") {
            this.$("#robot-icon-next-move").css("marginLeft", -780 / 2 + blockSize * (nextMovePositionX + this.model.get("room").get("radius")) + "px");
            this.$("#robot-icon-next-move").css("marginTop", -18 + blockSize * (nextMovePositionY + this.model.get("room").get("radius")) + "px");
        }

        this.$("#robot-icon-next-move").show();
    },

    /*
     * Function showControls
     * It shows buttons that can be useful to make the robot move
     */
    showControls: function() {
        this.$("#controls").show();
    },

    /*
     * Function rotate
     * When we want the robot to rotate, we change his direction
     * and draw the robot next move (the one who blink)
     */
    rotate: function(event) {
        var direction = $(event.currentTarget).data('direction');
        this.model.turn(direction);
        this.drawRobotNextMove();
    },

    /*
     * Function moveOn
     * When we want the robot to move forward, we call the model to do so
     * and redraw the robot
     */
    moveOn: function() {
        if (!this.model.moveOn()) {
            this.alertRobotTryToEscape();
        } else {
            this.drawRobot();
        }

    },

    /*
     * Function changeLanguage
     * If we want to change the language of the robot
     * this affects the keyboard shortcut
     */
    changeLanguage: function(event) {
        var abbreviation = $(event.currentTarget).data('abbreviation');
        this.model.set("language", Languages[abbreviation]);
        this.setLanguageKeyboardAnnotation();
    },

    /*
     * Function initLanguage
     * We set the default robot language as checked on page
     */
    initLanguage: function() {
        var abbreviation = _.invert(Languages)[this.model.get("language")];
        this.$("#language-" + abbreviation).prop('checked', true);
    },

    /*
     * Function setLanguageKeyboardAnnotation
     * Add annotation on buttons to move the robot
     * it can helps if you have blackout :/
     */
    setLanguageKeyboardAnnotation: function() {
        if (this.model.get("language") == Languages.swe) {
            this.$(".keyboard-shortcut-right").html("(h)");
            this.$(".keyboard-shortcut-left").html("(v)");
            this.$(".keyboard-shortcut-go").html("(g)");
        } else {
            this.$(".keyboard-shortcut-right").html("(r)");
            this.$(".keyboard-shortcut-left").html("(l)");
            this.$(".keyboard-shortcut-go").html("(f)");
        }
    },

    /*
     * Function keyAction
     * Called whenever a key is pressed, passing the command to the model
     * We make no condition on language here, if the robot don't understand a key, he will note move
     * V or R = Turn Right
     * H or L = Turn left
     * G or F = Move Forward
     */
    keyAction: function(event) {
        var code = event.keyCode || event.which;
        var hasMoved = true;
        if (this.model.get("keyboardEnabled")) {
            switch (code) {
                case 86: // V key pressed
                    hasMoved = this.model.moveAction("V");
                    break;
                case 72: // H key pressed
                    hasMoved = this.model.moveAction("H");
                    break;
                case 71: // G key pressed
                    hasMoved = this.model.moveAction("G");
                    break;
                case 82: // R key pressed
                    hasMoved = this.model.moveAction("R");
                    break;
                case 76: // L key pressed
                    hasMoved = this.model.moveAction("L");
                    break;
                case 70: // F key pressed
                    hasMoved = this.model.moveAction("F");
                    break;
            }
            this.drawRobot();
            if (!hasMoved) {
                this.alertRobotTryToEscape();
            }
        }
    },

    /*
     * Function refreshCurrentPositionLabel
     * Refresh the little label which indicates the current position of the robot
     */
    refreshCurrentPositionLabel: function() {
        this.$("#current-robot-position").html(this.model.getPosition());
    },

    /*
     * Function addMoveSequence
     * Call the model with the move sequence that has been put inside the <input>
     */
    addMoveSequence: function(event) {
        if (!this.model.addMoveSequence(this.$("#input-action_sequence").val())) {
            // The robot is trying to escape !
            this.alertRobotTryToEscape();
        }
        this.drawRobot();
    },

    /*
     * Function switchKeyboardEnabled
     * Switch the keyboard if we want to disable all the events
     * todo: remove the robot attribute keyboardEnabled and manage keydown event instead
     */
    switchKeyboardEnabled: function() {
        this.model.set("keyboardEnabled", !this.model.get("keyboardEnabled"));
    },

    /*
     * Function alertRobotTryToEscape
     * Add alert (toast message) when the robot is trying to escape !
     */
    alertRobotTryToEscape: function() {
        Materialize.toast('The robot is trying to escape !!', 4000);
    }


});
