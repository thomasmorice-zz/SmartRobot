var RobotView = Backbone.View.extend({

    el: ".robot-view",

    initialize: function() {
        this.drawRobot();
    },

    drawRobot: function(blockSize, fullCanvasSize) {
        this.$(".robot-icon").css("marginLeft",-fullCanvasSize/2 + blockSize * this.model.get("xValue")+"px");
        this.$(".robot-icon").css("marginTop",blockSize * this.model.get("yValue")+"px");
        this.$el.show();
    }

});
