/*
 * Room.js
 * There are two types of room available, Squared and Rounded which has to be validate and initialized differently
 */


/*
 * SquaredRoom - Backbone.Model
 * The model for a squared room
 * Contain height, width and a roomType "squared"
 */
var SquaredRoom = Backbone.Model.extend({
    defaults: {
        height: 1,
        width: 1,
        roomType: "squared"
    },

    // SquaredRoom initialization
    initialize: function(attributes) {
        if (!typeof attributes.height === "undefined") {
            this.set("height", attributes.height);
        }

        if (!typeof attributes.width === "undefined") {
            this.set("width", attributes.width);
        }
    },

    // SquaredRoom validation (call with isValid() method)
    validate: function(attributes) {
        if (attributes.height < 1 || attributes.height > 20 || attributes.width < 1 || attributes.width > 20) {
            return "The room height and width should be between 1 and 20";
        } else if (!$.isNumeric(attributes.height) || !$.isNumeric(attributes.width)) {
            return "The room height and width should be a number";
        }
    },
});

/*
 * RoundedRoom - Backbone.Model
 * The model for a rounded room
 * Contain radius and a roomType "rounded"
 */
var RoundedRoom = Backbone.Model.extend({
    defaults: {
        radius: 1,
        roomType: "rounded"
    },

    // RoundedRoom initialization
    initialize: function(attributes) {
        if (!typeof attributes.radius === "undefined") {
            this.set("radius", attributes.radius);
        }
    },

    // RoundedRoom validation (call with isValid() method)
    validate: function(attributes) {
        if (attributes.radius < 1 || attributes.radius > 20) {
            return "The room radius should be between 1 and 10";
        } else if (!$.isNumeric(attributes.radius)) {
            return "The room radius should be a number";
        }
    },
});
