/* version 1.1

	KONGREGATE (C) API Extension for GameMaker:Studio

--	Written by Dexter Friedman (July 15, 2012)
--	Feel free to redistribute this extension, but don't
    violate Kongregate's terms of service, if they have any.
    I just made a Javascript wrapper. Please don't sue me!


------ Version History -------
------ Version 1.1

  (March 6, 2013)

 > Added kongGetUserID()
 > Made error console output print to console.error

------ Version 1.0 >

  (July 15, 2012)

 > Created most of the wrapper functions for the Kongregate API
 > Ensured all function calls are surrounded by try-catch so that
    users can test locally without trouble.
	
*/

var version = "1.1";

// Load the API
// Define control functions

function kongGetAPI() {
  // Returns the API object
  try {
    if (typeof parent.kongregate === "undefined") {
      throw "APIUndefinedException";
    }
    return parent.kongregate;
  } catch (e) {
    if ((e = "APIUndefinedException")) {
      // Log this to the javascript console

      logError();

      //console.error("GameMaker:Studio <KongAPI Extension by Afrodynamics> - Kongregate API not loaded!");
    }
    return -1;
  }
}

function kongInit() {
  // Initialization Function for the whole extension
  try {
    parent.kongregate.services.connect();
    console.log("GameMaker:Studio <KongAPI Extension " + version + " by Afrodynamics> - Kongregate API initialized!");
    console.log("GameMaker:Studio <KongAPI Extension " + version + " by Afrodynamics> - Succesfully connected to Kongregate services!");
  } catch (e) {
    console.error("GameMaker:Studio <KongAPI Extension " + version + " by Afrodynamics> - ERROR! Kongregate API not initialized!");
    console.error("GameMaker:Studio <KongAPI Extension " + version + " by Afrodynamics> - You are not playing on kongregate.com!");
    return -1;
  }
}

function logError() {
  console.error("GameMaker:Studio <KongAPI Extension " + version + " by Afrodynamics> - Kongregate API not loaded!");
  console.error("Play the game on Kongregate's website in a preview window to avoid this error.");
}

/*
 *							-	API	-	FUNCTIONS	-
 *
 *		All functions will return String or Double to GameMaker:Studio
 *		All functions are within try-catch statements so you can test locally.
 *		If the game isn't hosted in the kongregate preview window, kongregate
 *		API calls will throw execeptions. The try-catch prevents this.
 *
 *		If exceptions are caught, functions returning double will return -1
 *		If exceptions are caught, functions returning strings will return ""
 *		If exceptions are caught for void functions, -1 is returned as well.
 *
 */

// -------------- GENERAL KONGREGATE FUNCTIONS --------------

function kongSubmitStat(argument0, argument1) {
  /* 
		Submits a stat to the kongregate API, returns true if successful
		
		arg0 = String (stat name)
		arg1 = Number (stat)

		You define Kongregate stats on kongregate's website, and
		refer to them by their name strings (which you defined on
		their site.)
	 
	*/
  try {
    kongregate = kongGetAPI();
    kongregate.stats.submit(argument0, argument1);
    return 1;
  } catch (e) {
    logError();
    return -1;
  }
}

function kongGetUsername() {
  // Returns a string of the username, or empty string if there's an exception

  try {
    return kongGetAPI().services.getUsername();
  } catch (e) {
    logError();
    return "";
  }
}

function kongGetUserID() {
  // Returns a String containing the unique user ID associated with the current player.
  // If the player is not signed in or you aren't viewing the game in a Kongregate preview
  // window, it'll return ""

  try {
    var id = kongGetAPI().services.getUserID();
    console.log(id);

    if (id == 0) {
      return "";
    } else {
      return id;
    }
  } catch (e) {
    logError();
    return "";
  }
}

function kongIsGuest() {
  // returns true if user is guest, false if logged in
  // returns -1 if we aren't on kongregate
  try {
    if (kongGetAPI().services.isGuest()) {
      // If we are a Guest, return true to GM
      // In JS, there is a boolean object. This is to be precise.
      return 1;
    } else {
      return 0;
    }
  } catch (e) {
    // Remember, if we return -1, that means we aren't on kongregate at all!
    logError();
    return -1;
  }
}

function kongShowRegistrationBox() {
  // Shows a kongregate registration box

  try {
    if (kongIsGuest()) {
      kongGetAPI().services.showRegistrationBox();
      return 1;
    } else {
      return 0;
    }
  } catch (e) {
    logError();
    return -1;
  }
}

// ----------- KONGREGATE CHAT API FUNCTIONS -------------

function kongChatDisplayMessage(argument0, argument1) {
  // Displays chat message
  // arg0 = message, arg1 = username
  try {
    kongGetAPI().chat.displayMessage(argument0, argument1);
  } catch (e) {
    logError();
    return -1;
  }
}

function kongChatClearMessages() {
  // Clears messages in Kongregate Chat Window, returns true
  try {
    kongGetAPI().chat.clearMessages();
    return 1;
  } catch (e) {
    logError();
    return -1;
  }
}

function kongChatShowTab(argument0, argument1, argument2) {
  /*
	arg0 - Name of the tab (word in tab itself)
	arg1 - Description of the tab
	arg2 - Relative size of the canvas, 0 being the smallest, 1 being the largest (default 0.5)
	*/
  try {
    kongGetAPI().chat.showTab(argument0, argument1, { size: argument2 });
    return 1;
  } catch (e) {
    logError();
    return -1;
  }
}

function kongChatCloseTab() {
  // Closes the tab opened by kongChatShowTab()
  try {
    kongGetAPI().chat.closeTab();
    return 1;
  } catch (e) {
    logError();
    return -1;
  }
}

// --------------- OTHER -----------------