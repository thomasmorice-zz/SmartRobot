var RobotView = Backbone.View.extend({

    el: "body",
    events: {
        "click .rotate": "rotate",
        "click .rotate": "rotate",
        "click .move-on": "moveOn",
        "change .languages-radio": "changeLanguage",
        "keydown": "keyAction"
    },

    initialize: function() {
        this.drawRobot();
    },

    drawRobot: function() {
        marginLeftValue = -750 / 2 + window.blockSize * this.model.get("xValue") + "px";
        marginTopValue = blockSize * this.model.get("yValue") + "px";
        this.$("#robot-icon").css("marginLeft", marginLeftValue);
        this.$("#robot-icon").css("marginTop", marginTopValue);
        this.$("#robot-icon").show();
        this.drawRobotNextMove();
        this.showControls();
        this.initLanguage();
        this.setLanguageKeyboardAnnotation();
        this.refreshCurrentPositionLabel();
    },

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
        this.$("#robot-icon-next-move").css("marginLeft", -750 / 2 + window.blockSize * nextMovePositionX + "px");
        this.$("#robot-icon-next-move").css("marginTop", window.blockSize * nextMovePositionY + "px");

        this.$("#robot-icon-next-move").show();
    },

    showControls: function() {
        this.$("#controls").show();
    },

    rotate: function(event) {
        var direction = $(event.currentTarget).data('direction');
        this.model.turn(direction);
        this.drawRobot();
    },

    moveOn: function() {
        this.model.moveOn();
        this.drawRobot();
    },

    changeLanguage: function(event) {
        var abbreviation = $(event.currentTarget).data('abbreviation');
        this.model.set("language", Languages[abbreviation]);
        this.setLanguageKeyboardAnnotation();
    },

    initLanguage: function() {
        var abbreviation = _.invert(Languages)[this.model.get("language")];
        this.$("#language-" + abbreviation).prop('checked', true);
    },

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

    keyAction: function(event) {
        var code = event.keyCode || event.which;
        // V = 86 - H = 72 - G = 71
        // R = 82- L = 76- F = 70
        switch (code) {
            case 86: // V key presssed
                this.model.moveAction("V");
                break;
            case 72: // H key presssed
                this.model.moveAction("H");
                break;
            case 71: // G key presssed
                this.model.moveAction("G");
                break;
            case 82: // R key presssed
                this.model.moveAction("R");
                break;
            case 76: // L key presssed
                this.model.moveAction("L");
                break;
            case 70: // F key presssed
                this.model.moveAction("F");
                break;
        }
        this.drawRobot();
    },

    refreshCurrentPositionLabel: function() {
        this.$("#current-robot-position").html(this.model.getPosition());
    }

});
