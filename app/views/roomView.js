var RoomView = Backbone.View.extend({

    el: ".room-view",
    events: {
        "click #create-squared-room": "createSquaredRoom",
        "click #create-rounded-room": "createRoundedRoom",
    },

    initialize: function() {},

    createSquaredRoom: function() {
        this.model = new SquaredRoom();
        var height = prompt("Please enter a number for the room height:");
        var width = prompt("Please enter a number for the room width:");
        this.model.set("height", height);
        this.model.set("width", width);
        console.log(this.model);
    },

    createRoundedRoom: function() {
        this.model = new RoundedRoom();
        var radius = prompt("Please enter a number for the room radius:");
        this.model.set("radius", radius);
        console.log(this.model);
    },

});
