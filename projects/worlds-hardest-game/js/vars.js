// Determine if browser is mobile
var mobile = false;
(function (a) {
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    )
  )
    mobile = true;
})(navigator.userAgent || navigator.vendor || window.opera);
////////////////////////////////

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const FPS = 40;
const BAR_HEIGHT = 50;
const BAR_TEXT_FIX = 10;
const TILE_SIZE = 40;
const TILES_X = 20;
const TILES_Y = 15;
const PLAYER_SIZE = 28;
const ENEMY_SIZE = 16.5;
const ENEMY_SIZE_HIT = 12.5;
const COIN_SIZE = 11.5;
const OUTLINE_SIZE = 4;
const PLAYER_SPEED = 3;
const INTERMISSION_TEXT_SPACE = 5;
const INTERMISSION_Y_FIX = 10;
const INTERMISSION_TIMER_TOT = FPS * 2;
const DIE_FADE_SPEED = 0.03;
const RESPAWN_FADE_SPEED = 0.06;
const CHECK_FLASH_FADE_SPEED = 0.03;
const FINISH_LEVEL_TIMER_TOT = FPS * 2;
const COIN_FADE_SPEED = 0.1;
const COIN_SHINE_FREQ = FPS * 4;
const COIN_SHINE_FADE_IN_SPEED = 0.1;
const COIN_SHINE_FADE_OUT_SPEED = 0.05;
const CARVE = Math.floor(PLAYER_SIZE / 2);
const SHADOW_OPACITY = 0.5;
const WIN_LEVEL_FADE_SPEED = 0.02;
const INGAME_MENU_BG_ALPHA = 0.75;
const INSTRUCTIONS_TEXT_SIZE = 24;
const INSTRUCTIONS_Y_0 = BAR_HEIGHT + 40;
const INSTRUCTIONS_Y_1 = INSTRUCTIONS_Y_0 + 33;
const INSTRUCTIONS_TIMER_TOT = FPS * 10;
const INSTRUCTIONS_FADE_IN_SPEED = 0.05;
const INSTRUCTIONS_FADE_OUT_SPEED = 0.02;
const INSTRUCTIONS_WAIT_TIME_TOT = FPS * 3;
const IG_BUTTONS_TOP = 130;
const IG_BTN_TEXT_SIZE = 25;
const IG_BTN_SPACE = 50;
const LS_PAGE_TOT = 18;
const LS_ALL_TOT = 30;
const RAINBOW_SPEED = 0.02;
const WALLS_PURPLE = 20;
const WALLS_RED = 30;
const TOTAL_LEVELS = 30;
const MENU_IMG_WIDTH = 800;
const MENU_IMG_HEIGHT = 500;

const LINK_STEPHEN = "https://www.youtube.com/user/CoozyMcMillan";
const LINK_COOLMATH = "http://www.coolmath-games.com/";
const LINK_SNAYK = "https://snayk.bandcamp.com/";

var hideKeys = false;

var img_mainMenu;
var img_mainMenu_playGame;
var img_mainMenu_loadGame;
var img_mainMenu_levelSelect;
//var img_mainMenu_moreGames;
var loadedImages = 0;
var totalImagesSet = 4;
if (mobile) {
  totalImagesSet = 1;
}
const TOTAL_IMAGES = totalImagesSet;

var keyUp = false;
var keyDown = false;
var keyRight = false;
var keyLeft = false;

var music;
var sfx_bounce0;
var sfx_bounce1;
var sfx_checkpoint;
var sfx_click;
var sfx_coin;
var sfx_die;
var sfx_win;
var sfx_intermission;
var soundsToMute = [];
const TOTAL_SOUNDS = 9;
var loadedSounds = 0;
var loadBarAlpha = 1;
var loadBarFade = 0.025;
var loadedAssets = 0;
const TOTAL_ASSETS = TOTAL_IMAGES + TOTAL_SOUNDS;

var FSOn = false;
var canvasWidth = 800;
var canvasHeight = 600;
var level = 1;
var deaths = 0;
var curCheck = 0;
var checkFlashAlpha = 0;
var muteSFX = (muteMusic = false);
var paused = false;
var mouseX = 0,
  mouseY = 0;
var mouseDown = false;
var playerAlpha = 1;
var state = null;
var intermissionTimer = 0;
var finishLevelTimer = 0;
var coinShineTimer = 0;
var instructionsTimer = 0;
var instructionsOn = false;
var instructionsWaiting = false;
var instructionsFadingIn = false;
var instructionsFadingOut = false;
var instructionsAlpha = 0;
var cursorType = 0;
var justClicked = false;
var ls_page = 1;
var instrForLevel = null;
var firstTimeOnMainMenu = true;
var invincible = false;
var invincible_permanent = false;
var hotkeyDown_space = false;
var hotkeyDown_m = false;
var hotkeyDown_p = false;
var bouncingEnabled = false;
var gameTimer = 0;
var oldTime = 0;
var pauseTime = 0;
var justLoaded = false;
var justLoadedTimer = false;
var coinsSave = [-99];

var finish_title_spacing = 40;
var finish_text_startX = 258;
var finish_text_startY = 150;
var finish_text_speed_max = 2;
var finish_text_speed_inc = 0.2;
var finish_text_staggerFrames = 5;
var finishText = "YOU WIN!";
var finishTextSpeed = [];
var finish_data_left = 270;
var finish_data_right = 530;

function LSOnRightPage(page) {
  return ls_page == page;
}

function correctGamePause(val) {
  return paused == val;
}

// convert width, height for scaling
function cw(n) {
  var rat = canvasWidth / CANVAS_WIDTH;
  n *= rat;
  return n;
}

function ch(n) {
  var rat = canvasHeight / CANVAS_HEIGHT;
  n *= rat;
  return n;
}

function cwh(n) {
  if (mobile) {
    var w = cw(n);
    var h = ch(n);
    if (w > h) return h;
    else return w;
  } else {
    return n;
  }
}

function offset(x, y) {
  if (mobile) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    this.x = x;
    this.y = y;
  } else {
    this.x = 0;
    this.y = 0;
  }
}

var os = new offset();

function calcOffset() {
  if (mobile) {
    var trueRatio = CANVAS_WIDTH / CANVAS_HEIGHT;
    var curRatio = canvasWidth / canvasHeight;

    if (curRatio > trueRatio) {
      os.x = (canvasWidth - cwh(CANVAS_WIDTH)) / 2;
      os.y = 0;
    } else if (curRatio < trueRatio) {
      os.x = 0;
      os.y = (canvasHeight - cwh(CANVAS_HEIGHT)) / 2;
    } else {
      os.x = 0;
      os.y = 0;
    }
  } else {
    os.x = 0;
    os.y = 0;
  }
}

const WALL_BORDER_TOP = 1;
const WALL_BORDER_BOTTOM = 2;
const WALL_BORDER_RIGHT = 2;
const WALL_BORDER_LEFT = 1;

const player_size_min = 0.5;
const player_size_max = 2;

const player_size_min_less = 0.75;
const player_size_max_less = 1.5;

const player_size_min_less2 = 0.9;
const player_size_max_less2 = 1.2;

const bounce_0_y_start = -500;
var bounce_0_y_speed = (bounce_0_y_speed_reset = 0);
const bounce_0_y_speed_max = 20;
const bounce_0_y_accel = 0.3;

var bounce_0_width_speed = (bounce_0_width_speed_reset = 0);
const bounce_0_width_speed_max = 0.05;
const bounce_0_width_accel = 0.0003;

var bounce_0_height_speed = (bounce_0_height_speed = 0);
const bounce_0_height_speed_max = 0.05;
const bounce_0_height_accel = 0.0006;

var bounce_1_size_speed = (bounce_1_size_speed_reset = 0.35);
const bounce_1_size_decel = 0.05;
const bounce_1_size_speed_min = 0.025;

var bounce_2_size_speed = (bounce_2_size_speed_reset = bounce_1_size_speed_min);
const bounce_2_size_accel = bounce_1_size_decel;
const bounce_2_size_speed_max = bounce_1_size_speed;

var bounce_3_stage = (bounce_3_stage_reset = 0);
var bounce_3_y_speed = (bounce_3_y_speed_start = bounce_3_y_speed_reset = -5);
const bounce_3_y_accel = 1;
const bounce_3_y_speed_max = -10;

var bounce_3_width_speed = (bounce_3_width_speed_reset = 0);
const bounce_3_width_accel = 0.015;

var bounce_3_height_speed = (bounce_3_height_speed_reset = 0);
const bounce_3_height_accel = 0.015;

var bounce_4_size_speed = (bounce_4_size_speed_reset = 0.2);
const bounce_4_size_decel = 0.025;
const bounce_4_size_speed_min = 0.03;

var bounce_5_size_speed = (bounce_5_size_speed_reset = bounce_4_size_speed_min);
const bounce_5_size_accel = bounce_4_size_decel;
const bounce_5_size_speed_max = bounce_4_size_speed;

var bounce_6_stage = (bounce_6_stage_reset = 0);
var bounce_6_y_speed = (bounce_6_y_speed_start = bounce_6_y_speed_reset = -2);
const bounce_6_y_accel = 0.75;
const bounce_6_y_speed_max = -5;

var bounce_6_width_speed = (bounce_6_width_speed_reset = 0);
const bounce_6_width_accel = 0.01;

var bounce_6_height_speed = (bounce_6_height_speed_reset = 0);
const bounce_6_height_accel = 0.01;

var bounce_7_size_speed = (bounce_7_size_speed_reset = 0.05);
const bounce_7_size_decel = 0.0005;
const bounce_7_size_speed_min = 0.01;

var bounce_8_size_speed = (bounce_8_size_speed_reset = bounce_7_size_speed_min);
const bounce_8_size_accel = bounce_7_size_decel;
const bounce_8_size_speed_max = bounce_7_size_speed;
