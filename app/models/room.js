var SquaredRoom = Backbone.Model.extend({
    defaults: {
        height: 1,
        width: 1,
        roomType: "squared"
    },

    initialize: function(attributes) {
        if (!typeof attributes.height === "undefined") {
            this.set("height", attributes.height);
        }

        if (!typeof attributes.width === "undefined") {
            this.set("width", attributes.width);
        }
    },

    validate: function(attributes) {
        if (attributes.height < 1 || attributes.height > 20 || attributes.width < 1 || attributes.width > 20) {
            return "The room height and width should be between 1 and 20";
        } else if (!$.isNumeric(attributes.height) || !$.isNumeric(attributes.width)) {
            return "The room height and width should be a number";
        }
    },
});

var RoundedRoom = Backbone.Model.extend({
    defaults: {
        radius: 1,
        roomType: "rounded"
    },
});
