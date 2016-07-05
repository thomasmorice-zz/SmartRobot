var Room = Backbone.Model.extend({});

var SquaredRoom = Room.extend({
    defaults: {
        height: 0,
        width: 0,
    },

    validate: function(attributes) {
        if (attributes.height < 1 || attributes.height > 10 || attributes.width < 1 || attributes.width > 10) {
            return "The room height and width should be between 1 and 10";
        } else if (!$.isNumeric(attributes.height) || !$.isNumeric(attributes.width)){
            return "The room height and width should be a number";
        }
    },
});

var RoundedRoom = Room.extend({
    defaults: {
        radius: 0,
    },
});
