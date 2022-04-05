/// <reference path="ItemsHoldr-0.2.1.ts" />
var AudioPlayr;
(function (AudioPlayr_1) {
    "use strict";
    /**
     * An audio library to automate preloading and controlled playback of multiple
     * audio tracks, with support for different browsers' preferred file types.
     */
    var AudioPlayr = (function () {
        /**
         * Initializes a new instance of the AudioPlayr class.
         *
         * @param settings   Settings to use for initialization.
         */
        function AudioPlayr(settings) {
            if (typeof settings.library === "undefined") {
                throw new Error("No library given to AudioPlayr.");
            }
            if (typeof settings.directory === "undefined") {
                throw new Error("No directory given to AudioPlayr.");
            }
            if (typeof settings.fileTypes === "undefined") {
                throw new Error("No fileTypes given to AudioPlayr.");
            }
            if (!settings.ItemsHolder) {
                throw new Error("No ItemsHoldr given to AudioPlayr.");
            }
            var volumeInitial;
            this.ItemsHolder = settings.ItemsHolder;
            this.directory = settings.directory;
            this.fileTypes = settings.fileTypes;
            this.getThemeDefault = settings.getThemeDefault || "Theme";
            this.getVolumeLocal = typeof settings.getVolumeLocal === "undefined"
                ? 1 : settings.getVolumeLocal;
            // Sounds should always start blank
            this.sounds = {};
            // Preload everything!
            this.generateLibraryFromSettings(settings.library);
            volumeInitial = this.ItemsHolder.getItem("volume");
            if (volumeInitial === undefined) {
                this.setVolume(1);
            }
            else {
                this.setVolume(volumeInitial);
            }
            this.setMuted(this.ItemsHolder.getItem("muted") || false);
        }
        /* Simple getters
        */
        /**
         * @returns The listing of <audio> Elements, keyed by name.
         */
        AudioPlayr.prototype.getLibrary = function () {
            return this.library;
        };
        /**
         * @returns The allowed filetypes for audio files.
         */
        AudioPlayr.prototype.getFileTypes = function () {
            return this.fileTypes;
        };
        /**
         * @returns The currently playing <audio> Elements, keyed by name.
         */
        AudioPlayr.prototype.getSounds = function () {
            return this.sounds;
        };
        /**
         * @returns The current playing theme's <audio> Element.
         */
        AudioPlayr.prototype.getTheme = function () {
            return this.theme;
        };
        /**
         * @returns The name of the currently playing theme.
         */
        AudioPlayr.prototype.getThemeName = function () {
            return this.themeName;
        };
        /**
         * @returns The directory under which all filetype directories are to be located.
         */
        AudioPlayr.prototype.getDirectory = function () {
            return this.directory;
        };
        /* Playback modifiers
        */
        /**
         * @returns The current volume as a Number in [0,1], retrieved by the ItemsHoldr.
         */
        AudioPlayr.prototype.getVolume = function () {
            return Number(this.ItemsHolder.getItem("volume") || 0);
        };
        /**
         * Sets the current volume. If not muted, all sounds will have their volume
         * updated.
         *
         * @param volume   A Number in [0,1] to set as the current volume.
         */
        AudioPlayr.prototype.setVolume = function (volume) {
            var i;
            if (!this.getMuted()) {
                for (i in this.sounds) {
                    if (this.sounds.hasOwnProperty(i)) {
                        this.sounds[i].volume = Number(this.sounds[i].getAttribute("volumeReal")) * volume;
                    }
                }
            }
            this.ItemsHolder.setItem("volume", volume.toString());
        };
        /**
         * @returns Whether this is currently muted.
         */
        AudioPlayr.prototype.getMuted = function () {
            return Boolean(Number(this.ItemsHolder.getItem("muted")));
        };
        /**
         * Calls either setMutedOn or setMutedOff as is appropriate.
         *
         * @param muted   The new status for muted.
         */
        AudioPlayr.prototype.setMuted = function (muted) {
            this.getMuted() ? this.setMutedOn() : this.setMutedOff();
        };
        /**
         * Calls either setMutedOn or setMutedOff to toggle whether this is muted.
         */
        AudioPlayr.prototype.toggleMuted = function () {
            this.setMuted(!this.getMuted());
        };
        /**
         * Sets volume to 0 in all currently playing sounds and stores the muted
         * status as on in the internal ItemsHoldr.
         */
        AudioPlayr.prototype.setMutedOn = function () {
            var i;
            for (i in this.sounds) {
                if (this.sounds.hasOwnProperty(i)) {
                    this.sounds[i].volume = 0;
                }
            }
            this.ItemsHolder.setItem("muted", "1");
        };
        /**
         * Sets sound volumes to their actual volumes and stores the muted status
         * as off in the internal ItemsHoldr.
         */
        AudioPlayr.prototype.setMutedOff = function () {
            var volume = this.getVolume(), sound, i;
            for (i in this.sounds) {
                if (this.sounds.hasOwnProperty(i)) {
                    sound = this.sounds[i];
                    sound.volume = Number(sound.getAttribute("volumeReal")) * volume;
                }
            }
            this.ItemsHolder.setItem("muted", "0");
        };
        /* Other modifiers
        */
        /**
         * @returns The Function or Number used as the volume setter for local sounds.
         */
        AudioPlayr.prototype.getGetVolumeLocal = function () {
            return this.getVolumeLocal;
        };
        /**
         * @param getVolumeLocal   A new Function or Number to use as the volume setter
         *                         for local sounds.
         */
        AudioPlayr.prototype.setGetVolumeLocal = function (getVolumeLocalNew) {
            this.getVolumeLocal = getVolumeLocalNew;
        };
        /**
         * @returns The Function or String used to get the default theme for playTheme.
         */
        AudioPlayr.prototype.getGetThemeDefault = function () {
            return this.getThemeDefault;
        };
        /**
         * @param getThemeDefaultNew A new Function or String to use as the source for
         *                           theme names in default playTheme calls.
         */
        AudioPlayr.prototype.setGetThemeDefault = function (getThemeDefaultNew) {
            this.getThemeDefault = getThemeDefaultNew;
        };
        /* Playback
        */
        /**
         * Plays the sound of the given name.
         *
         * @param name   The name of the sound to play.
         * @returns The sound's <audio> element, now playing.
         * @remarks Internally, this stops any previously playing sound of that name
         *          and starts a new one, with volume set to the current volume and
         *          muted status. If the name wasn't previously being played (and
         *          therefore a new Element has been created), an event listener is
         *          added to delete it from sounds after.
         */
        AudioPlayr.prototype.play = function (name) {
            var sound, used;
            // If the sound isn't yet being played, see if it's in the library
            if (!this.sounds.hasOwnProperty(name)) {
                // If the sound also isn't in the library, it's unknown
                if (!this.library.hasOwnProperty(name)) {
                    throw new Error("Unknown name given to AudioPlayr.play: '" + name + "'.");
                }
                sound = this.sounds[name] = this.library[name];
            }
            else {
                sound = this.sounds[name];
            }
            this.soundStop(sound);
            if (this.getMuted()) {
                sound.volume = 0;
            }
            else {
                sound.setAttribute("volumeReal", "1");
                sound.volume = this.getVolume();
            }
            this.playSound(sound);
            used = Number(sound.getAttribute("used"));
            // If this is the song's first play, let it know how to stop
            if (!used) {
                sound.setAttribute("used", String(used + 1));
                sound.addEventListener("ended", this.soundFinish.bind(this, name));
            }
            sound.setAttribute("name", name);
            return sound;
        };
        /**
         * Pauses all currently playing sounds.
         */
        AudioPlayr.prototype.pauseAll = function () {
            var i;
            for (i in this.sounds) {
                if (this.sounds.hasOwnProperty(i)) {
                    this.pauseSound(this.sounds[i]);
                }
            }
        };
        /**
         * Un-pauses (resumes) all currently paused sounds.
         */
        AudioPlayr.prototype.resumeAll = function () {
            var i;
            for (i in this.sounds) {
                if (!this.sounds.hasOwnProperty(i)) {
                    continue;
                }
                this.playSound(this.sounds[i]);
            }
        };
        /**
         * Pauses the currently playing theme, if there is one.
         */
        AudioPlayr.prototype.pauseTheme = function () {
            if (this.theme) {
                this.pauseSound(this.theme);
            }
        };
        /**
         * Resumes the theme, if there is one and it's paused.
         */
        AudioPlayr.prototype.resumeTheme = function () {
            if (this.theme) {
                this.playSound(this.theme);
            }
        };
        /**
         * Stops all sounds and any theme, and removes all references to them.
         */
        AudioPlayr.prototype.clearAll = function () {
            this.pauseAll();
            this.clearTheme();
            this.sounds = {};
        };
        /**
         * Pauses and removes the theme, if there is one.
         */
        AudioPlayr.prototype.clearTheme = function () {
            if (!this.theme) {
                return;
            }
            this.pauseTheme();
            delete this.sounds[this.theme.getAttribute("name")];
            this.theme = undefined;
            this.themeName = undefined;
        };
        /**
         * "Local" version of play that changes the output sound's volume depending
         * on the result of a getVolumeLocal call.
         *
         * @param name   The name of the sound to play.
         * @param location   An argument for getVolumeLocal, if that's a Function.
         * @returns The sound's <audio> element, now playing.
         */
        AudioPlayr.prototype.playLocal = function (name, location) {
            var sound = this.play(name), volumeReal;
            switch (this.getVolumeLocal.constructor) {
                case Function:
                    volumeReal = this.getVolumeLocal(location);
                    break;
                case Number:
                    volumeReal = this.getVolumeLocal;
                    break;
                default:
                    volumeReal = Number(this.getVolumeLocal) || 1;
                    break;
            }
            sound.setAttribute("volumeReal", String(volumeReal));
            if (this.getMuted()) {
                sound.volume = 0;
            }
            else {
                sound.volume = volumeReal * this.getVolume();
            }
            return sound;
        };
        /**
         * Pauses any previously playing theme and starts playback of a new theme.
         *
         * @param name   The name of the sound to be used as the theme. If not
         *               provided, getThemeDefault is used to
         *                          provide one.
         * @param loop   Whether the theme should always loop (by default, true).
         * @returns The theme's <audio> element, now playing.
         * @remarks This is different from normal sounds in that it normally loops
         *          and is controlled by pauseTheme and co. If loop is on and the
         *          sound wasn't already playing, an event listener is added for
         *          when it ends.
         */
        AudioPlayr.prototype.playTheme = function (name, loop) {
            this.pauseTheme();
            // Loop defaults to true
            loop = typeof loop !== "undefined" ? loop : true;
            // If name isn't given, use the default getter
            if (typeof name === "undefined") {
                switch (this.getThemeDefault.constructor) {
                    case Function:
                        name = this.getThemeDefault();
                        break;
                    default:
                        name = this.getThemeDefault;
                        break;
                }
            }
            // If a theme already exists, kill it
            if (typeof this.theme !== "undefined" && this.theme.hasAttribute("name")) {
                delete this.sounds[this.theme.getAttribute("name")];
            }
            this.themeName = name;
            this.theme = this.sounds[name] = this.play(name);
            this.theme.loop = loop;
            // If it's used (no repeat), add the event listener to resume theme
            if (this.theme.getAttribute("used") === "1") {
                this.theme.addEventListener("ended", this.playTheme.bind(this));
            }
            return this.theme;
        };
        /**
         * Wrapper around playTheme that plays a sound, then a theme. This is
         * implemented using an event listener on the sound's ending.
         *
         * @param prefix    The name of a sound to play before the theme.
         * @param name   The name of the sound to be used as the theme. If not
         *               provided, getThemeDefault is used to
         *                          provide one.
         * @param loop   Whether the theme should always loop (by default, false).
         * @returns The sound's <audio> element, now playing.
         */
        AudioPlayr.prototype.playThemePrefixed = function (prefix, name, loop) {
            var sound = this.play(prefix);
            this.pauseTheme();
            // If name isn't given, use the default getter
            if (typeof name === "undefined") {
                switch (this.getThemeDefault.constructor) {
                    case Function:
                        name = this.getThemeDefault();
                        break;
                    default:
                        name = this.getThemeDefault;
                        break;
                }
            }
            this.addEventListener(prefix, "ended", this.playTheme.bind(this, prefix + " " + name, loop));
            return sound;
        };
        /* Public utilities
        */
        /**
         * Adds an event listener to a currently playing sound. The sound will keep
         * track of event listeners via an .addedEvents attribute, so they can be
         * cancelled later.
         *
         * @param name   The name of the sound.
         * @param event   The name of the event, such as "ended".
         * @param callback   The Function to be called by the event.
         */
        AudioPlayr.prototype.addEventListener = function (name, event, callback) {
            var sound = this.library[name];
            if (!sound) {
                throw new Error("Unknown name given to addEventListener: '" + name + "'.");
            }
            if (!sound.addedEvents) {
                sound.addedEvents = {};
            }
            if (!sound.addedEvents[event]) {
                sound.addedEvents[event] = [callback];
            }
            else {
                sound.addedEvents[event].push(callback);
            }
            sound.addEventListener(event, callback);
        };
        /**
         * Clears all events added by this.addEventListener to a sound under a given
         * event.
         *
         * @param name   The name of the sound.
         * @param event   The name of the event, such as "ended".
         */
        AudioPlayr.prototype.removeEventListeners = function (name, event) {
            var sound = this.library[name], events, i;
            if (!sound) {
                throw new Error("Unknown name given to removeEventListeners: '" + name + "'.");
            }
            if (!sound.addedEvents) {
                return;
            }
            events = sound.addedEvents[event];
            if (!events) {
                return;
            }
            for (i = 0; i < events.length; i += 1) {
                sound.removeEventListener(event, events[i]);
            }
            events.length = 0;
        };
        /**
         * Adds an event listener to a sound. If the sound doesn't exist or has
         * finished playing, it's called immediately.
         *
         * @param name   The name of the sound.
         * @param event   The name of the event, such as "onended".
         * @param callback   The Function to be called by the event.
         */
        AudioPlayr.prototype.addEventImmediate = function (name, event, callback) {
            if (!this.sounds.hasOwnProperty(name) || this.sounds[name].paused) {
                callback();
                return;
            }
            this.sounds[name].addEventListener(event, callback);
        };
        /* Private utilities
        */
        /**
         * Called when a sound has completed to get it out of sounds.
         *
         * @param name   The name of the sound that just finished.
         */
        AudioPlayr.prototype.soundFinish = function (name) {
            if (this.sounds.hasOwnProperty(name)) {
                delete this.sounds[name];
            }
        };
        /**
         * Carefully stops a sound. HTMLAudioElement don't natively have a .stop()
         * function, so this is the shim to do that.
         */
        AudioPlayr.prototype.soundStop = function (sound) {
            this.pauseSound(sound);
            if (sound.readyState) {
                sound.currentTime = 0;
            }
        };
        /* Private loading / resetting
        */
        /**
         * Loads every sound defined in the library via AJAX. Sounds are loaded
         * into <audio> elements via createAudio and stored in the library.
         */
        AudioPlayr.prototype.generateLibraryFromSettings = function (librarySettings) {
            var directory = {}, directorySoundNames, directoryName, name, j;
            this.library = {};
            this.directories = {};
            // For each given directory (e.g. names, themes):
            for (directoryName in librarySettings) {
                if (!librarySettings.hasOwnProperty(directoryName)) {
                    continue;
                }
                directory = {};
                directorySoundNames = librarySettings[directoryName];
                // For each audio file to be loaded in that directory:
                for (j = 0; j < directorySoundNames.length; j += 1) {
                    name = directorySoundNames[j];
                    // Create the sound and store it in the container
                    this.library[name] = directory[name] = this.createAudio(name, directoryName);
                }
                // The full directory is stored in the master directories
                this.directories[directoryName] = directory;
            }
        };
        /**
         * Creates an audio element, gives it sources, and starts preloading.
         *
         * @param name   The name of the sound to play.
         * @param sectionName   The name of the directory containing the sound.
         * @returns An <audio> element ocntaining the sound, currently playing.
         */
        AudioPlayr.prototype.createAudio = function (name, directory) {
            var sound = document.createElement("audio"), sourceType, child, i;
            // Create an audio source for each child
            for (i = 0; i < this.fileTypes.length; i += 1) {
                sourceType = this.fileTypes[i];
                child = document.createElement("source");
                child.type = "audio/" + sourceType;
                child.src = this.directory + "/" + directory + "/" + sourceType + "/" + name + "." + sourceType;
                sound.appendChild(child);
            }
            // This preloads the sound.
            sound.volume = 0;
            sound.setAttribute("volumeReal", "1");
            sound.setAttribute("used", "0");
            this.playSound(sound);
            return sound;
        };
        /**
         * Utility to try to play a sound, which may not be possible in headless
         * environments like PhantomJS.
         *
         * @param sound   An <audio> element to play.
         * @returns Whether the sound was able to play.
         */
        AudioPlayr.prototype.playSound = function (sound) {
            if (sound && sound.play) {
                sound.play();
                return true;
            }
            return false;
        };
        /**
         * Utility to try to pause a sound, which may not be possible in headless
         * environments like PhantomJS.
         *
         * @param sound   An <audio> element to pause.
         * @returns Whether the sound was able to pause.
         */
        AudioPlayr.prototype.pauseSound = function (sound) {
            if (sound && sound.pause) {
                sound.pause();
                return true;
            }
            return false;
        };
        return AudioPlayr;
    })();
    AudioPlayr_1.AudioPlayr = AudioPlayr;
})(AudioPlayr || (AudioPlayr = {}));
