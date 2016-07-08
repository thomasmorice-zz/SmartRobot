/*
 * SmartRobot Tests
 * Test case that should be runned using SpecRunner.html
 */

// Test that a squared room is correctly initialized
describe('SquaredRoom model', function() {
    describe('when instantiated', function() {
        var defaultSquaredRoom = new SquaredRoom({});
        var customSquaredRoom = new SquaredRoom({
            height: 5,
            width: 10
        });
        it('should exhibit height and width', function() {
            expect(customSquaredRoom.get('height')).toEqual(5);
            expect(customSquaredRoom.get('width')).toEqual(10);
        });
        it('should have default height and width', function() {
            var roundedRoom = new RoundedRoom({});
            expect(defaultSquaredRoom.get('height')).toBeDefined();
            expect(defaultSquaredRoom.get('width')).toBeDefined();
        });
        it('should have a squared room type', function() {
            expect(defaultSquaredRoom.get('roomType')).toEqual("squared");
        });
    });
});

// Test that a rounded room is correctly initialized
describe('RoundedRoom model', function() {
    describe('when instantiated', function() {
        var defaultRoundedRoom = new RoundedRoom({});
        var customRoundedRoom = new RoundedRoom({
            radius: 10
        });
        it('should exhibit radius', function() {
            expect(customRoundedRoom.get('radius')).toEqual(10);
        });
        it('should have default radius', function() {
            expect(defaultRoundedRoom.get('radius')).toBeDefined();
        });
        it('should have a rounded room type', function() {
            expect(defaultRoundedRoom.get('roomType')).toEqual("rounded");
        });
    });
});

// Test that a robot is correctly initialized
describe('Robot model', function() {
    describe('when instantiated', function() {
        var defaultRobot = new Robot({});
        var customRobot = new Robot({
            xValue: 7,
            yValue: 4,
            language: Languages.eng,
            compassValue: 'E'
        });
        it('should exhibit x,y,compass custom value', function() {
            expect(customRobot.getPosition()).toEqual("7 4 E");
        });
        it('should speak english when asked for', function() {
            expect(customRobot.get('language')).toEqual("English");
        });
        it('should have a default position', function() {
            expect(customRobot.get("xValue")).toBeDefined();
            expect(customRobot.get("yValue")).toBeDefined();
            expect(customRobot.get("compassValue")).toBeDefined();
        });
        it('should have a default language', function() {
            expect(customRobot.get("language")).toBeDefined();
        });
    });

    describe('when a swedish robot is moving inside a squared room', function() {
        var room = new SquaredRoom({})
        var customRobot = new Robot({
            xValue: 1,
            yValue: 2,
            room: room
        });
        it('should execute the sequence and have the correct position after', function() {
            customRobot.addMoveSequence("HGHGGHGHG");
            expect(customRobot.getPosition()).toEqual("1 3 N");
        });
    });

    describe('when an english robot is moving inside a rounded room', function() {
        var room = new RoundedRoom({})
        var customRobot = new Robot({
            xValue: 0,
            yValue: 0,
            language: Languages.eng,
            room: room,
        });
        it('should execute the sequence and have the correct position after', function() {
            customRobot.addMoveSequence("RRFLFFLRF");
            expect(customRobot.getPosition()).toEqual("3 1 E");
        });
    });
});
