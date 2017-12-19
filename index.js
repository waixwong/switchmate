"use strict";

var SwitchMate = require('node-switchmate3');
var Switchmate3Device = SwitchMate.Switchmate3Device;

const switchmate_A = 'c847a87153c5';
const switchmate_B = 'e9ee7459a8f2';

function createTestSession()
{
    console.log('Finding ' + switchmate_A + '.');
    Switchmate3Device.discoverById(switchmate_A, onFound);

    console.log('Finding ' + switchmate_B + '.');
    Switchmate3Device.discoverById(switchmate_B, onFound);
}

/*
function onFound(Switchmate3)
{
    Switchmate3Device.stopDiscoverAll(onFound);
    console.log('found');
    Switchmate3.on('disconnect', function ()
    {
        console.log('disconnect');
        Switchmate3.startPollingSwitchmate3();
    });
    Switchmate3.on('toggleStateChange', function (state, id)
    {
        console.log(id+' changed to ' + state);
    });

    Switchmate3.on('unreachable', function (id)
    {
        console.log(id+' is now unreachable.');
    });

    Switchmate3.on('reachable', function (id)
    {
        console.log(id + ' is now reachable.');
    });
    Switchmate3.connectAndSetup(function ()
    {
        console.log('connected');
        Switchmate3.disconnect();
    });
}
*/

function onFound(Switchmate3)
{
    console.log('found');
    var targetState = process.argv[3];
    var ToggleMode = Switchmate3.ToggleMode();

    ToggleMode.event.on('msg', function (msg)
    {
        console.log(msg);
    }); //set event listener for logging.

    ToggleMode.event.on('success',onSuccess);
    ToggleMode.event.on('fail', onFail);

    if (targetState === 'identify')
    {
        ToggleMode.IdentifySwitchmate3();
    }
    else
    {
        (targetState === 'on') ? ToggleMode.TurnOn() : ToggleMode.TurnOff();
    }
}

function onSuccess()
{
    console.log('Success!');
    process.exit();
}

function onFail()
{
    console.log('Failed!');
    process.exit();
}


createTestSession();