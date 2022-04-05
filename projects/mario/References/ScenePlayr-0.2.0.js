var ScenePlayr;
(function (ScenePlayr_1) {
    "use strict";
    /**
     * A cutscene runner for jumping between scenes and their routines.
     */
    var ScenePlayr = (function () {
        /**
         * Initializes a new instance of the ScenePlayr class.
         *
         * @param [settings]   Settings to be used for initialization.
         */
        function ScenePlayr(settings) {
            if (settings === void 0) { settings = {}; }
            this.cutscenes = settings.cutscenes || {};
            this.cutsceneArguments = settings.cutsceneArguments || [];
        }
        /* Simple gets
        */
        /**
         * @returns The complete listing of cutscenes that may be played.
         */
        ScenePlayr.prototype.getCutscenes = function () {
            return this.cutscenes;
        };
        /**
         * @returns The currently playing cutscene.
         */
        ScenePlayr.prototype.getCutscene = function () {
            return this.cutscene;
        };
        /**
         * @returns The cutscene referred to by the given name.
         */
        ScenePlayr.prototype.getOtherCutscene = function (name) {
            return this.cutscenes[name];
        };
        /**
         * @returns The currently playing routine.
         */
        ScenePlayr.prototype.getRoutine = function () {
            return this.routine;
        };
        /**
         * @param name   The name of a routine to return.
         * @returns The routine within the current cutscene referred to
         *          by the given name.
         */
        ScenePlayr.prototype.getOtherRoutine = function (name) {
            return this.cutscene.routines[name];
        };
        /**
         * @returns The name of the currently playing cutscene.
         */
        ScenePlayr.prototype.getCutsceneName = function () {
            return this.cutsceneName;
        };
        /**
         * @returns The settings used by the current cutscene.
         */
        ScenePlayr.prototype.getCutsceneSettings = function () {
            return this.cutsceneSettings;
        };
        /**
         * Adds a setting to the internal cutscene settings.
         *
         * @param key   The key for the new setting.
         * @param value   The value for the new setting.
         */
        ScenePlayr.prototype.addCutsceneSetting = function (key, value) {
            this.cutsceneSettings[key] = value;
        };
        /* Playback
        */
        /**
         * Starts the cutscene of the given name, keeping the settings Object (if
         * given one). The cutsceneArguments unshift the settings, and if the
         * cutscene specifies a firstRoutine, it's started.
         *
         * @param name   The name of the cutscene to play.
         * @param [settings]   Additional settings to be kept persistently
         *                     throughout the cutscene.
         */
        ScenePlayr.prototype.startCutscene = function (name, settings, args) {
            if (settings === void 0) { settings = {}; }
            if (!name) {
                throw new Error("No name given to ScenePlayr.playScene.");
            }
            if (this.cutsceneName) {
                this.stopCutscene();
            }
            this.cutscene = this.cutscenes[name];
            this.cutsceneName = name;
            this.cutsceneSettings = settings || {};
            this.cutsceneSettings.cutscene = this.cutscene;
            this.cutsceneSettings.cutsceneName = name;
            this.cutsceneArguments.push(this.cutsceneSettings);
            if (this.cutscene.firstRoutine) {
                this.playRoutine.apply(this, [this.cutscene.firstRoutine].concat(args));
            }
        };
        /**
         * Returns this.startCutscene bound to the given name and settings.
         *
         * @param name   The name of the cutscene to play.
         * @param settings   Additional settings to be kept as a persistent Object
         *                   throughout the cutscene.
         * @param args   Arguments for the firstRoutine, if it exists.
         */
        ScenePlayr.prototype.bindCutscene = function (name, settings, args) {
            if (settings === void 0) { settings = {}; }
            return this.startCutscene.bind(this, name, args);
        };
        /**
         * Stops the currently playing cutscene and clears the internal data.
         */
        ScenePlayr.prototype.stopCutscene = function () {
            this.routine = undefined;
            this.cutscene = undefined;
            this.cutsceneName = undefined;
            this.cutsceneSettings = undefined;
            this.cutsceneArguments.pop();
        };
        /**
         * Plays a particular routine within the current cutscene, passing
         * the given args as cutsceneSettings.routineArguments.
         *
         * @param name   The name of the routine to play.
         * @param args   Any additional arguments to pass to the routine.
         */
        ScenePlayr.prototype.playRoutine = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!this.cutscene) {
                throw new Error("No cutscene is currently playing.");
            }
            if (!this.cutscene.routines[name]) {
                throw new Error("The " + this.cutsceneName + " cutscene does not contain a " + name + " routine.");
            }
            // Copy the given ...args to a new Array from this.cutsceneArguments
            // This is better than args.unshift to not modify args, if they're given directly
            var routineArgs = this.cutsceneArguments.slice();
            routineArgs.push.apply(routineArgs, args);
            this.routine = this.cutscene.routines[name];
            this.cutsceneSettings.routine = this.routine;
            this.cutsceneSettings.routineName = name;
            this.cutsceneSettings.routineArguments = args;
            this.routine.apply(this, routineArgs);
        };
        /**
         * Returns this.startCutscene bound to the given name and arguments.
         *
         * @param name   The name of the cutscene to play.
         * @param args   Any additional arguments to pass to the routine.
         */
        ScenePlayr.prototype.bindRoutine = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_a = this.playRoutine).bind.apply(_a, [this, name].concat(args));
            var _a;
        };
        return ScenePlayr;
    })();
    ScenePlayr_1.ScenePlayr = ScenePlayr;
})(ScenePlayr || (ScenePlayr = {}));
