var enemies = [
    [],
    // level 1
    [new simpleEnemy(250, 550, 220, 220, 7, 0), new simpleEnemy(550, 250, 260, 260, 7, 0), new simpleEnemy(250, 550, 300, 300, 7, 0), new simpleEnemy(550, 250, 340, 340, 7, 0), new simpleEnemy(250, 550, 380, 380, 7, 0)],
  
    // level 2
    [
      new simpleEnemy(220, 220, 171, 429, 0, 5),
      new simpleEnemy(260, 260, 429, 171, 0, 5),
      new simpleEnemy(300, 300, 171, 429, 0, 5),
      new simpleEnemy(340, 340, 429, 171, 0, 5),
      new simpleEnemy(380, 380, 171, 429, 0, 5),
      new simpleEnemy(420, 420, 429, 171, 0, 5),
      new simpleEnemy(460, 460, 171, 429, 0, 5),
      new simpleEnemy(500, 500, 429, 171, 0, 5),
      new simpleEnemy(540, 540, 171, 429, 0, 5),
      new simpleEnemy(580, 580, 429, 171, 0, 5),
    ],
  
    // level 3
    [
      new linearEnemy([
        [260, 260, 360, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 360, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 340, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 340, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 320, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 320, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 300, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 300, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 280, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 280, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 260, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 260, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 240, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 240, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 220, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 220, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 200, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 200, 0, 4],
      ]),
      new linearEnemy([
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
      ]),
      new linearEnemy([
        [280, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 280, 420, 180, 4, 0],
      ]),
      new linearEnemy([
        [300, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 300, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [320, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 320, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [340, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 340, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [360, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 360, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [380, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 380, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [400, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 400, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [420, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 420, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [440, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 440, 180, 180, 4, 0],
      ]),
  
      new linearEnemy([
        [360, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 360, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [380, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 380, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [400, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 400, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [420, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 420, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [440, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 440, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [460, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 460, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [480, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 480, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [500, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 500, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [520, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 520, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 400, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 400, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 380, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 380, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 360, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 360, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 340, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 340, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 320, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 320, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 300, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 300, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 280, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 280, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 260, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 260, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 240, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 240, 0, 4],
      ]),
    ],
  
    // level 4
    [
      /*
          new simpleCircularEnemy(440, 360, 140, 0, 2.75),
          new simpleCircularEnemy(440, 360, 120, 0, 2.75),
          new simpleCircularEnemy(440, 360, 100, 0, 2.75),
          new simpleCircularEnemy(440, 360, 80, 0, 2.75),
          new simpleCircularEnemy(440, 360, 60, 0, 2.75),
          new simpleCircularEnemy(440, 360, 40, 0, 2.75),
          new simpleCircularEnemy(440, 360, 20, 0, 2.75),
          new simpleCircularEnemy(440, 360, 140, 120, 2.75),
          new simpleCircularEnemy(440, 360, 120, 120, 2.75),
          new simpleCircularEnemy(440, 360, 100, 120, 2.75),
          new simpleCircularEnemy(440, 360, 80, 120, 2.75),
          new simpleCircularEnemy(440, 360, 60, 120, 2.75),
          new simpleCircularEnemy(440, 360, 40, 120, 2.75),
          new simpleCircularEnemy(440, 360, 20, 120, 2.75),
          new simpleCircularEnemy(440, 360, 140, 240, 2.75),
          new simpleCircularEnemy(440, 360, 120, 240, 2.75),
          new simpleCircularEnemy(440, 360, 100, 240, 2.75),
          new simpleCircularEnemy(440, 360, 80, 240, 2.75),
          new simpleCircularEnemy(440, 360, 60, 240, 2.75),
          new simpleCircularEnemy(440, 360, 40, 240, 2.75),
          new simpleCircularEnemy(440, 360, 20, 240, 2.75),
          */
      new simpleCircularEnemy(440, 360, 20, 0, 2.5),
      new simpleCircularEnemy(440, 360, 40, 0, 2.5),
      new simpleCircularEnemy(440, 360, 60, 0, 2.5),
      new simpleCircularEnemy(440, 360, 80, 0, 2.5),
      new simpleCircularEnemy(440, 360, 100, 0, 2.5),
      new simpleCircularEnemy(440, 360, 120, 0, 2.5),
      new simpleCircularEnemy(440, 360, 140, 0, 2.5),
  
      new simpleCircularEnemy(440, 360, 20, 90, 2.5),
      new simpleCircularEnemy(440, 360, 40, 90, 2.5),
      new simpleCircularEnemy(440, 360, 60, 90, 2.5),
      new simpleCircularEnemy(440, 360, 80, 90, 2.5),
      new simpleCircularEnemy(440, 360, 100, 90, 2.5),
      new simpleCircularEnemy(440, 360, 120, 90, 2.5),
      new simpleCircularEnemy(440, 360, 140, 90, 2.5),
  
      new simpleCircularEnemy(440, 360, 20, 180, 2.5),
      new simpleCircularEnemy(440, 360, 40, 180, 2.5),
      new simpleCircularEnemy(440, 360, 60, 180, 2.5),
      new simpleCircularEnemy(440, 360, 80, 180, 2.5),
      new simpleCircularEnemy(440, 360, 100, 180, 2.5),
      new simpleCircularEnemy(440, 360, 120, 180, 2.5),
      new simpleCircularEnemy(440, 360, 140, 180, 2.5),
  
      new simpleCircularEnemy(440, 360, 20, 270, 2.5),
      new simpleCircularEnemy(440, 360, 40, 270, 2.5),
      new simpleCircularEnemy(440, 360, 60, 270, 2.5),
      new simpleCircularEnemy(440, 360, 80, 270, 2.5),
      new simpleCircularEnemy(440, 360, 100, 270, 2.5),
      new simpleCircularEnemy(440, 360, 120, 270, 2.5),
      new simpleCircularEnemy(440, 360, 140, 270, 2.5),
  
      new staticEnemy(440, 360),
    ],
  
    // level 5
    [
      new simpleCircularEnemy(400, 300, 40, 270, -2),
      new simpleCircularEnemy(400, 300, 40, 90, -2),
      new simpleCircularEnemy(400, 300, 120, 270, 2),
      new simpleCircularEnemy(400, 300, 120, 90, 2),
      new simpleCircularEnemy(400, 300, 200, 270, 2),
      new simpleCircularEnemy(400, 300, 200, 90, 2),
      new simpleCircularEnemy(400, 300, 280, 270, 2),
      new simpleCircularEnemy(400, 300, 280, 90, 2),
    ],
  
    // level 6
    [
      new staticEnemy(320, 200),
      new staticEnemy(480, 200),
      new staticEnemy(640, 200),
      new staticEnemy(160, 440),
      new staticEnemy(320, 440),
      new staticEnemy(480, 440),
      new staticEnemy(640, 440),
      new simpleCircularEnemy(320, 200, 25, 0, 2.5),
      new simpleCircularEnemy(320, 200, 50, 0, 2.5),
      new simpleCircularEnemy(320, 200, 75, 0, 2.5),
      new simpleCircularEnemy(320, 200, 25, 120, 2.5),
      new simpleCircularEnemy(320, 200, 50, 120, 2.5),
      new simpleCircularEnemy(320, 200, 75, 120, 2.5),
      new simpleCircularEnemy(320, 200, 25, 240, 2.5),
      new simpleCircularEnemy(320, 200, 50, 240, 2.5),
      new simpleCircularEnemy(320, 200, 75, 240, 2.5),
      new simpleCircularEnemy(480, 200, 25, 0, -2.5),
      new simpleCircularEnemy(480, 200, 50, 0, -2.5),
      new simpleCircularEnemy(480, 200, 75, 0, -2.5),
      new simpleCircularEnemy(480, 200, 25, 120, -2.5),
      new simpleCircularEnemy(480, 200, 50, 120, -2.5),
      new simpleCircularEnemy(480, 200, 75, 120, -2.5),
      new simpleCircularEnemy(480, 200, 25, 240, -2.5),
      new simpleCircularEnemy(480, 200, 50, 240, -2.5),
      new simpleCircularEnemy(480, 200, 75, 240, -2.5),
      new simpleCircularEnemy(640, 200, 25, 0, 2.5),
      new simpleCircularEnemy(640, 200, 50, 0, 2.5),
      new simpleCircularEnemy(640, 200, 75, 0, 2.5),
      new simpleCircularEnemy(640, 200, 25, 120, 2.5),
      new simpleCircularEnemy(640, 200, 50, 120, 2.5),
      new simpleCircularEnemy(640, 200, 75, 120, 2.5),
      new simpleCircularEnemy(640, 200, 25, 240, 2.5),
      new simpleCircularEnemy(640, 200, 50, 240, 2.5),
      new simpleCircularEnemy(640, 200, 75, 240, 2.5),
      new simpleCircularEnemy(160, 440, 25, 0, -2.5),
      new simpleCircularEnemy(160, 440, 50, 0, -2.5),
      new simpleCircularEnemy(160, 440, 75, 0, -2.5),
      new simpleCircularEnemy(160, 440, 25, 120, -2.5),
      new simpleCircularEnemy(160, 440, 50, 120, -2.5),
      new simpleCircularEnemy(160, 440, 75, 120, -2.5),
      new simpleCircularEnemy(160, 440, 25, 240, -2.5),
      new simpleCircularEnemy(160, 440, 50, 240, -2.5),
      new simpleCircularEnemy(160, 440, 75, 240, -2.5),
      new simpleCircularEnemy(320, 440, 25, 0, 2.5),
      new simpleCircularEnemy(320, 440, 50, 0, 2.5),
      new simpleCircularEnemy(320, 440, 75, 0, 2.5),
      new simpleCircularEnemy(320, 440, 25, 120, 2.5),
      new simpleCircularEnemy(320, 440, 50, 120, 2.5),
      new simpleCircularEnemy(320, 440, 75, 120, 2.5),
      new simpleCircularEnemy(320, 440, 25, 240, 2.5),
      new simpleCircularEnemy(320, 440, 50, 240, 2.5),
      new simpleCircularEnemy(320, 440, 75, 240, 2.5),
      new simpleCircularEnemy(480, 440, 25, 0, -2.5),
      new simpleCircularEnemy(480, 440, 50, 0, -2.5),
      new simpleCircularEnemy(480, 440, 75, 0, -2.5),
      new simpleCircularEnemy(480, 440, 25, 120, -2.5),
      new simpleCircularEnemy(480, 440, 50, 120, -2.5),
      new simpleCircularEnemy(480, 440, 75, 120, -2.5),
      new simpleCircularEnemy(480, 440, 25, 240, -2.5),
      new simpleCircularEnemy(480, 440, 50, 240, -2.5),
      new simpleCircularEnemy(480, 440, 75, 240, -2.5),
      new simpleCircularEnemy(640, 440, 25, 0, 2.5),
      new simpleCircularEnemy(640, 440, 50, 0, 2.5),
      new simpleCircularEnemy(640, 440, 75, 0, 2.5),
      new simpleCircularEnemy(640, 440, 25, 120, 2.5),
      new simpleCircularEnemy(640, 440, 50, 120, 2.5),
      new simpleCircularEnemy(640, 440, 75, 120, 2.5),
      new simpleCircularEnemy(640, 440, 25, 240, 2.5),
      new simpleCircularEnemy(640, 440, 50, 240, 2.5),
      new simpleCircularEnemy(640, 440, 75, 240, 2.5),
    ],
  
    // level 7
    [
      /*
          new staticEnemy(400, 130),
          new staticEnemy(400, 150),
          new staticEnemy(400, 170),
          new staticEnemy(400, 190),
          new staticEnemy(400, 210),
          new staticEnemy(400, 230),
          new staticEnemy(400, 250),
          new staticEnemy(400, 270),
          new staticEnemy(400, 290),
          */
      new simpleEnemy(220, 220, 131, 469, 0, 10),
      new simpleEnemy(260, 260, 469, 131, 0, 10),
      new simpleEnemy(300, 300, 131, 469, 0, 10),
      new simpleEnemy(340, 340, 469, 131, 0, 10),
      new simpleEnemy(380, 380, 131, 469, 0, 10),
      new simpleEnemy(420, 420, 469, 131, 0, 10),
      new simpleEnemy(460, 460, 131, 469, 0, 10),
      new simpleEnemy(500, 500, 469, 131, 0, 10),
      new simpleEnemy(540, 540, 131, 469, 0, 10),
      new simpleEnemy(580, 580, 469, 131, 0, 10),
    ],
  
    // level 8
    [
      new linearEnemy([
        [220, 340, 140, 140, 3, 0],
        [340, 340, 140, 260, 0, 3],
        [340, 220, 260, 260, 3, 0],
        [220, 220, 260, 140, 0, 3],
      ]),
      new linearEnemy([
        [220, 340, 260, 260, 3, 0],
        [340, 340, 260, 380, 0, 3],
        [340, 220, 380, 380, 3, 0],
        [220, 220, 380, 260, 0, 3],
      ]),
      new linearEnemy([
        [220, 340, 380, 380, 3, 0],
        [340, 340, 380, 460, 0, 3],
        [340, 220, 460, 460, 3, 0],
        [220, 220, 460, 380, 0, 3],
      ]),
      new linearEnemy([
        [460, 580, 140, 140, 3, 0],
        [580, 580, 140, 220, 0, 3],
        [580, 460, 220, 220, 3, 0],
        [460, 460, 220, 140, 0, 3],
      ]),
      new linearEnemy([
        [460, 580, 220, 220, 3, 0],
        [580, 580, 220, 460, 0, 3],
        [580, 460, 460, 460, 3, 0],
        [460, 460, 460, 220, 0, 3],
      ]),
      new linearEnemy([
        [340, 460, 180, 180, 3, 0],
        [460, 460, 180, 420, 0, 3],
        [460, 340, 420, 420, 3, 0],
        [340, 340, 420, 180, 0, 3],
      ]),
      new linearEnemy([
        [580, 580, 460, 220, 0, 3],
        [580, 460, 220, 220, 3, 0],
        [460, 460, 220, 460, 0, 3],
        [460, 580, 460, 460, 3, 0],
      ]),
    ],
  
    // level 9
    [
      new staticEnemy(200, 210),
      new staticEnemy(200, 230),
      new staticEnemy(250, 160),
      new staticEnemy(270, 160),
      new staticEnemy(360, 170),
      new staticEnemy(360, 190),
      new staticEnemy(130, 320),
      new staticEnemy(150, 320),
      new staticEnemy(200, 410),
      new staticEnemy(200, 430),
      new staticEnemy(250, 360),
      new staticEnemy(270, 360),
      new staticEnemy(320, 370),
      new staticEnemy(320, 390),
      new staticEnemy(410, 240),
      new staticEnemy(430, 240),
      new staticEnemy(380, 330),
      new staticEnemy(380, 350),
      new staticEnemy(620, 450),
      new staticEnemy(620, 470),
      new staticEnemy(530, 440),
      new staticEnemy(550, 440),
      new staticEnemy(490, 360),
      new staticEnemy(510, 360),
      new staticEnemy(530, 280),
      new staticEnemy(550, 280),
      new staticEnemy(570, 230),
      new staticEnemy(590, 230),
      new staticEnemy(640, 170),
      new staticEnemy(640, 190),
      new staticEnemy(660, 170),
      new linearEnemy([
        [460, 460, 210, 300, 0, 5],
        [460, 410, 300, 300, 5, 0],
        [410, 460, 300, 300, 5, 0],
        [460, 460, 300, 210, 0, 5],
      ]),
      new linearEnemy([
        [700, 700, 130, 240, 0, 5],
        [700, 660, 240, 240, 5, 0],
        [660, 700, 240, 240, 5, 0],
        [700, 700, 240, 130, 0, 5],
      ]),
      new linearEnemy([
        [530, 620, 460, 460, 5, 0],
        [620, 620, 460, 410, 0, 5],
        [620, 620, 410, 460, 0, 5],
        [620, 530, 460, 460, 5, 0],
      ]),
      new linearEnemy([
        [100, 140, 220, 220, 7.5, 0],
        [140, 140, 220, 260, 0, 7.5],
        [140, 100, 260, 260, 7.5, 0],
        [100, 100, 260, 220, 0, 7.5],
      ]),
      new linearEnemy([
        [260, 300, 220, 220, 7.5, 0],
        [300, 300, 220, 260, 0, 7.5],
        [300, 260, 260, 260, 7.5, 0],
        [260, 260, 260, 220, 0, 7.5],
      ]),
      new linearEnemy([
        [420, 460, 140, 140, 7.5, 0],
        [460, 460, 140, 180, 0, 7.5],
        [460, 420, 180, 180, 7.5, 0],
        [420, 420, 180, 140, 0, 7.5],
      ]),
      new linearEnemy([
        [540, 580, 140, 140, 7.5, 0],
        [580, 580, 140, 180, 0, 7.5],
        [580, 540, 180, 180, 7.5, 0],
        [540, 540, 180, 140, 0, 7.5],
      ]),
      new linearEnemy([
        [100, 140, 420, 420, 7.5, 0],
        [140, 140, 420, 460, 0, 7.5],
        [140, 100, 460, 460, 7.5, 0],
        [100, 100, 460, 420, 0, 7.5],
      ]),
      new linearEnemy([
        [260, 300, 420, 420, 7.5, 0],
        [300, 300, 420, 460, 0, 7.5],
        [300, 260, 460, 460, 7.5, 0],
        [260, 260, 460, 420, 0, 7.5],
      ]),
      new linearEnemy([
        [540, 580, 340, 340, 7.5, 0],
        [580, 580, 340, 380, 0, 7.5],
        [580, 540, 380, 380, 7.5, 0],
        [540, 540, 380, 340, 0, 7.5],
      ]),
    ],
  
    // level 10
    [
      new simpleEnemy(290, 350, 260, 260, 1.5, 0),
      new simpleEnemy(350, 290, 300, 300, 1.5, 0),
      new simpleEnemy(290, 350, 340, 340, 1.5, 0),
      new simpleEnemy(210, 270, 340, 340, 1.5, 0),
      new simpleEnemy(270, 210, 380, 380, 1.5, 0),
      new simpleEnemy(210, 270, 420, 420, 1.5, 0),
      new simpleEnemy(300, 300, 410, 470, 0, 1.5),
      new simpleEnemy(340, 340, 470, 410, 0, 1.5),
      new simpleEnemy(380, 380, 410, 470, 0, 1.5),
      new simpleEnemy(420, 420, 470, 410, 0, 1.5),
      new simpleEnemy(460, 460, 410, 470, 0, 1.5),
      new simpleEnemy(500, 500, 470, 410, 0, 1.5),
      new simpleEnemy(450, 510, 260, 260, 1.5, 0),
      new simpleEnemy(510, 450, 300, 300, 1.5, 0),
      new simpleEnemy(450, 510, 340, 340, 1.5, 0),
      new simpleEnemy(530, 590, 340, 340, 1.5, 0),
      new simpleEnemy(590, 530, 380, 380, 1.5, 0),
      new simpleEnemy(530, 590, 420, 420, 1.5, 0),
    ],
  
    // level 11
    [
      new staticEnemy(420, 300),
      new pauseCircularEnemy_1_4(420, 300, 20, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 20, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 40, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 60, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 80, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 100, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 120, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 140, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 160, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 180, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 200, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 220, 90, 0, 3, FPS * 1.6),
  
      new pauseCircularEnemy_1_4(420, 300, 20, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 20, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 40, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 60, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 80, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 100, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 120, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 140, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 160, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 180, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 200, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 220, 180, 90, 3, FPS * 1.6),
  
      new pauseCircularEnemy_1_4(420, 300, 20, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 20, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 40, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 60, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 80, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 100, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 120, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 140, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 160, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 180, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 200, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 220, 270, 180, 3, FPS * 1.6),
  
      new pauseCircularEnemy_1_4(420, 300, 20, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 20, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 40, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 60, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 80, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 100, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 120, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 140, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 160, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 180, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 200, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 220, 360, 270, 3, FPS * 1.6),
    ],
  
    // level 12
    [
      new staticEnemy(670, 350),
      new staticEnemy(650, 350),
      new staticEnemy(630, 350),
      new staticEnemy(610, 350),
      new staticEnemy(490, 350),
      new staticEnemy(470, 350),
      new staticEnemy(450, 350),
  
      new staticEnemy(450, 330),
      new staticEnemy(450, 310),
      new staticEnemy(450, 290),
      new staticEnemy(450, 270),
      new staticEnemy(450, 250),
      new staticEnemy(450, 230),
      new staticEnemy(450, 210),
      new staticEnemy(450, 190),
      new staticEnemy(450, 170),
      new staticEnemy(450, 150),
  
      new staticEnemy(430, 150),
      new staticEnemy(410, 150),
      new staticEnemy(390, 150),
      new staticEnemy(370, 150),
      new staticEnemy(350, 150),
      new staticEnemy(250, 150),
      new staticEnemy(230, 150),
      new staticEnemy(210, 150),
      new staticEnemy(190, 150),
      new staticEnemy(170, 150),
      new staticEnemy(150, 150),
      new staticEnemy(130, 150),
      new staticEnemy(110, 150),
      new staticEnemy(110, 170),
      new staticEnemy(110, 190),
      new staticEnemy(110, 210),
      new staticEnemy(110, 230),
      new staticEnemy(110, 250),
      new staticEnemy(110, 270),
      new staticEnemy(110, 290),
      new staticEnemy(110, 310),
      new staticEnemy(110, 330),
  
      new staticEnemy(210, 250),
      new staticEnemy(210, 230),
      new staticEnemy(210, 210),
      new staticEnemy(230, 230),
      new staticEnemy(250, 250),
      new staticEnemy(270, 250),
      new staticEnemy(290, 250),
      new staticEnemy(310, 250),
      new staticEnemy(330, 250),
      new staticEnemy(350, 250),
      new staticEnemy(370, 230),
      new staticEnemy(390, 210),
      new staticEnemy(390, 230),
      new staticEnemy(390, 250),
      new staticEnemy(390, 270),
      new staticEnemy(390, 290),
      new staticEnemy(390, 310),
      new staticEnemy(390, 330),
  
      new staticEnemy(330, 170),
      new staticEnemy(310, 190),
      new staticEnemy(290, 190),
      new staticEnemy(270, 170),
  
      new staticEnemy(390, 350),
      new staticEnemy(370, 350),
      new staticEnemy(350, 350),
      new staticEnemy(330, 350),
      new staticEnemy(310, 350),
      new staticEnemy(290, 350),
      new staticEnemy(270, 350),
      new staticEnemy(250, 350),
      new staticEnemy(230, 350),
      new staticEnemy(210, 350),
      new staticEnemy(190, 350),
      new staticEnemy(170, 350),
      new staticEnemy(150, 350),
      new staticEnemy(130, 350),
      new staticEnemy(110, 350),
      new staticEnemy(110, 370),
      new staticEnemy(110, 390),
      new staticEnemy(110, 410),
      new staticEnemy(110, 430),
  
      new staticEnemy(690, 350),
      new staticEnemy(690, 370),
      new staticEnemy(690, 390),
      new staticEnemy(690, 410),
      new staticEnemy(690, 430),
      new staticEnemy(690, 450),
      new staticEnemy(670, 450),
      new staticEnemy(650, 450),
      new staticEnemy(630, 450),
      new staticEnemy(610, 450),
      new staticEnemy(590, 450),
      new staticEnemy(570, 450),
      new staticEnemy(550, 450),
      new staticEnemy(530, 450),
      new staticEnemy(510, 450),
      new staticEnemy(490, 450),
      new staticEnemy(350, 450),
      new staticEnemy(330, 450),
      new staticEnemy(310, 450),
      new staticEnemy(290, 450),
      new staticEnemy(270, 450),
      new staticEnemy(250, 450),
      new staticEnemy(230, 450),
      new staticEnemy(210, 450),
      new staticEnemy(190, 450),
      new staticEnemy(170, 450),
      new staticEnemy(150, 450),
      new staticEnemy(130, 450),
      new staticEnemy(110, 450),
  
      new staticEnemy(370, 250),
      new staticEnemy(370, 270),
      new staticEnemy(370, 290),
      new staticEnemy(370, 310),
      new staticEnemy(370, 330),
  
      new staticEnemy(350, 270),
      new staticEnemy(330, 270),
      new staticEnemy(310, 270),
      new staticEnemy(290, 270),
  
      new staticEnemy(350, 330),
      new staticEnemy(330, 330),
      new staticEnemy(310, 330),
      new staticEnemy(290, 330),
      new staticEnemy(270, 330),
      new staticEnemy(250, 330),
      new staticEnemy(230, 330),
      new staticEnemy(210, 330),
      new staticEnemy(230, 310),
      new staticEnemy(230, 250),
      new staticEnemy(190, 250),
      new staticEnemy(170, 250),
      new staticEnemy(170, 270),
      new staticEnemy(190, 330),
      new staticEnemy(170, 330),
      new staticEnemy(150, 330),
      new staticEnemy(130, 330),
  
      new staticEnemy(430, 410),
      new staticEnemy(410, 410),
  
      new staticEnemy(590, 370),
      new staticEnemy(570, 370),
      new staticEnemy(550, 390),
      new staticEnemy(530, 390),
      new staticEnemy(510, 370),
      new staticEnemy(450, 410),
      new staticEnemy(470, 430),
  
      new staticEnemy(330, 370),
      new staticEnemy(310, 370),
      new staticEnemy(290, 370),
      new staticEnemy(270, 370),
      new staticEnemy(290, 390),
      new staticEnemy(310, 390),
  
      new staticEnemy(370, 430),
      new staticEnemy(390, 410),
      new staticEnemy(210, 410),
      new staticEnemy(210, 430),
      new staticEnemy(230, 430),
  
      new simpleEnemy(410, 410, 130, 470, 0, 3.8),
      new simpleEnemy(430, 430, 130, 470, 0, 3.8),
      new simpleEnemy(330, 330, 470, 130, 0, 3.8),
      new simpleEnemy(350, 350, 470, 130, 0, 3.8),
      new simpleEnemy(250, 250, 130, 470, 0, 3.8),
      new simpleEnemy(270, 270, 130, 470, 0, 3.8),
    ],
  
    // level 13
    [
      new simpleEnemy(210, 590, 300, 300, 6, 0),
      new simpleEnemy(590, 210, 260, 260, 6, 0),
      new simpleEnemy(590, 210, 340, 340, 6, 0),
      new simpleEnemy(210, 590, 380, 380, 6, 0),
      new simpleEnemy(210, 590, 220, 220, 6, 0),
      new simpleEnemy(590, 210, 180, 180, 6, 0),
      new simpleEnemy(590, 210, 420, 420, 6, 0),
  
      new simpleEnemy(220, 220, 170, 430, 0, 4.1),
      new simpleEnemy(260, 260, 430, 170, 0, 4.1),
      new simpleEnemy(300, 300, 170, 430, 0, 4.1),
      new simpleEnemy(340, 340, 430, 170, 0, 4.1),
      new simpleEnemy(380, 380, 170, 430, 0, 4.1),
      new simpleEnemy(420, 420, 430, 170, 0, 4.1),
      new simpleEnemy(460, 460, 170, 430, 0, 4.1),
      new simpleEnemy(500, 500, 430, 170, 0, 4.1),
      new simpleEnemy(540, 540, 170, 430, 0, 4.1),
      new simpleEnemy(580, 580, 430, 170, 0, 4.1),
    ],
  
    // level 14
    [
      new staticEnemy(340, 380),
      new staticEnemy(500, 380),
      new staticEnemy(660, 380),
  
      new simpleEnemy(260, 260, 330, 430, 0, 2),
      new simpleEnemy(420, 420, 430, 330, 0, 2),
      new simpleEnemy(580, 580, 330, 430, 0, 2),
  
      new simpleCircularEnemy(340, 380, 20, 0, -3.6),
      new simpleCircularEnemy(340, 380, 40, 0, -3.6),
      new simpleCircularEnemy(340, 380, 60, 0, -3.6),
      new simpleCircularEnemy(340, 380, 20, 120, -3.6),
      new simpleCircularEnemy(340, 380, 40, 120, -3.6),
      new simpleCircularEnemy(340, 380, 60, 120, -3.6),
      new simpleCircularEnemy(340, 380, 20, 240, -3.6),
      new simpleCircularEnemy(340, 380, 40, 240, -3.6),
      new simpleCircularEnemy(340, 380, 60, 240, -3.6),
  
      new simpleCircularEnemy(500, 380, 20, 0, 3.6),
      new simpleCircularEnemy(500, 380, 40, 0, 3.6),
      new simpleCircularEnemy(500, 380, 60, 0, 3.6),
      new simpleCircularEnemy(500, 380, 20, 120, 3.6),
      new simpleCircularEnemy(500, 380, 40, 120, 3.6),
      new simpleCircularEnemy(500, 380, 60, 120, 3.6),
      new simpleCircularEnemy(500, 380, 20, 240, 3.6),
      new simpleCircularEnemy(500, 380, 40, 240, 3.6),
      new simpleCircularEnemy(500, 380, 60, 240, 3.6),
  
      new simpleCircularEnemy(660, 380, 20, 0, -3.6),
      new simpleCircularEnemy(660, 380, 40, 0, -3.6),
      new simpleCircularEnemy(660, 380, 60, 0, -3.6),
      new simpleCircularEnemy(660, 380, 20, 120, -3.6),
      new simpleCircularEnemy(660, 380, 40, 120, -3.6),
      new simpleCircularEnemy(660, 380, 60, 120, -3.6),
      new simpleCircularEnemy(660, 380, 20, 240, -3.6),
      new simpleCircularEnemy(660, 380, 40, 240, -3.6),
      new simpleCircularEnemy(660, 380, 60, 240, -3.6),
    ],
  
    // level 15
    [
      new simpleEnemy(60, 60, 250, 470, 0, 6),
      new simpleEnemy(100, 100, 470, 250, 0, 6),
      new simpleEnemy(140, 140, 250, 470, 0, 6),
      new simpleEnemy(660, 660, 350, 130, 0, 6),
      new simpleEnemy(700, 700, 130, 350, 0, 6),
      new simpleEnemy(740, 740, 350, 130, 0, 6),
      new simpleEnemy(180, 180, 470, 370, 0, 6),
      new simpleEnemy(460, 460, 370, 470, 0, 6),
      new simpleEnemy(340, 340, 230, 130, 0, 6),
      new simpleEnemy(620, 620, 130, 230, 0, 6),
      new simpleEnemy(220, 220, 130, 470, 0, 6),
      new simpleEnemy(260, 260, 470, 130, 0, 6),
      new simpleEnemy(300, 300, 130, 470, 0, 6),
      new simpleEnemy(380, 380, 130, 470, 0, 6),
      new simpleEnemy(420, 420, 470, 130, 0, 6),
      new simpleEnemy(500, 500, 470, 130, 0, 6),
      new simpleEnemy(540, 540, 130, 470, 0, 6),
      new simpleEnemy(580, 580, 470, 130, 0, 6),
    ],
  
    // level 16
    [
      new linearEnemy([
        [140, 180, 180, 180, 3.5, 0],
        [180, 180, 180, 220, 0, 3.5],
        [180, 140, 220, 220, 3.5, 0],
        [140, 140, 220, 180, 0, 3.5],
      ]),
      new linearEnemy([
        [220, 260, 180, 180, 3.5, 0],
        [260, 260, 180, 220, 0, 3.5],
        [260, 220, 220, 220, 3.5, 0],
        [220, 220, 220, 180, 0, 3.5],
      ]),
  
      new linearEnemy([
        [140, 180, 260, 260, 3.5, 0],
        [180, 180, 260, 300, 0, 3.5],
        [180, 140, 300, 300, 3.5, 0],
        [140, 140, 300, 260, 0, 3.5],
      ]),
      new linearEnemy([
        [220, 260, 260, 260, 3.5, 0],
        [260, 260, 260, 300, 0, 3.5],
        [260, 220, 300, 300, 3.5, 0],
        [220, 220, 300, 260, 0, 3.5],
      ]),
      new linearEnemy([
        [140, 180, 340, 340, 3.5, 0],
        [180, 180, 340, 380, 0, 3.5],
        [180, 140, 380, 380, 3.5, 0],
        [140, 140, 380, 340, 0, 3.5],
      ]),
      new linearEnemy([
        [220, 260, 340, 340, 3.5, 0],
        [260, 260, 340, 380, 0, 3.5],
        [260, 220, 380, 380, 3.5, 0],
        [220, 220, 380, 340, 0, 3.5],
      ]),
      new linearEnemy([
        [140, 180, 340, 340, 3.5, 0],
        [180, 180, 340, 380, 0, 3.5],
        [180, 140, 380, 380, 3.5, 0],
        [140, 140, 380, 340, 0, 3.5],
      ]),
      new linearEnemy([
        [220, 260, 420, 420, 3.5, 0],
        [260, 260, 420, 460, 0, 3.5],
        [260, 220, 460, 460, 3.5, 0],
        [220, 220, 460, 420, 0, 3.5],
      ]),
      new linearEnemy([
        [140, 180, 420, 420, 3.5, 0],
        [180, 180, 420, 460, 0, 3.5],
        [180, 140, 460, 460, 3.5, 0],
        [140, 140, 460, 420, 0, 3.5],
      ]),
  
      new linearEnemy([
        [300, 340, 420, 420, 3.5, 0],
        [340, 340, 420, 460, 0, 3.5],
        [340, 300, 460, 460, 3.5, 0],
        [300, 300, 460, 420, 0, 3.5],
      ]),
      new linearEnemy([
        [380, 420, 420, 420, 3.5, 0],
        [420, 420, 420, 460, 0, 3.5],
        [420, 380, 460, 460, 3.5, 0],
        [380, 380, 460, 420, 0, 3.5],
      ]),
      new linearEnemy([
        [460, 500, 180, 180, 3.5, 0],
        [500, 500, 180, 220, 0, 3.5],
        [500, 460, 220, 220, 3.5, 0],
        [460, 460, 220, 180, 0, 3.5],
      ]),
      new linearEnemy([
        [380, 420, 180, 180, 3.5, 0],
        [420, 420, 180, 220, 0, 3.5],
        [420, 380, 220, 220, 3.5, 0],
        [380, 380, 220, 180, 0, 3.5],
      ]),
      new linearEnemy([
        [540, 580, 180, 180, 3.5, 0],
        [580, 580, 180, 220, 0, 3.5],
        [580, 540, 220, 220, 3.5, 0],
        [540, 540, 220, 180, 0, 3.5],
      ]),
      new linearEnemy([
        [620, 660, 180, 180, 3.5, 0],
        [660, 660, 180, 220, 0, 3.5],
        [660, 620, 220, 220, 3.5, 0],
        [620, 620, 220, 180, 0, 3.5],
      ]),
  
      new linearEnemy([
        [340, 380, 260, 260, 3.5, 0],
        [380, 380, 260, 300, 0, 3.5],
        [380, 340, 300, 300, 3.5, 0],
        [340, 340, 300, 260, 0, 3.5],
      ]),
      new linearEnemy([
        [420, 460, 260, 260, 3.5, 0],
        [460, 460, 260, 300, 0, 3.5],
        [460, 420, 300, 300, 3.5, 0],
        [420, 420, 300, 260, 0, 3.5],
      ]),
      new linearEnemy([
        [340, 380, 340, 340, 3.5, 0],
        [380, 380, 340, 380, 0, 3.5],
        [380, 340, 380, 380, 3.5, 0],
        [340, 340, 380, 340, 0, 3.5],
      ]),
      new linearEnemy([
        [420, 460, 340, 340, 3.5, 0],
        [460, 460, 340, 380, 0, 3.5],
        [460, 420, 380, 380, 3.5, 0],
        [420, 420, 380, 340, 0, 3.5],
      ]),
  
      new linearEnemy([
        [540, 580, 260, 260, 3.5, 0],
        [580, 580, 260, 300, 0, 3.5],
        [580, 540, 300, 300, 3.5, 0],
        [540, 540, 300, 260, 0, 3.5],
      ]),
      new linearEnemy([
        [620, 660, 260, 260, 3.5, 0],
        [660, 660, 260, 300, 0, 3.5],
        [660, 620, 300, 300, 3.5, 0],
        [620, 620, 300, 260, 0, 3.5],
      ]),
  
      new linearEnemy([
        [540, 580, 340, 340, 3.5, 0],
        [580, 580, 340, 380, 0, 3.5],
        [580, 540, 380, 380, 3.5, 0],
        [540, 540, 380, 340, 0, 3.5],
      ]),
      new linearEnemy([
        [620, 660, 340, 340, 3.5, 0],
        [660, 660, 340, 380, 0, 3.5],
        [660, 620, 380, 380, 3.5, 0],
        [620, 620, 380, 340, 0, 3.5],
      ]),
  
      new linearEnemy([
        [540, 580, 420, 420, 3.5, 0],
        [580, 580, 420, 460, 0, 3.5],
        [580, 540, 460, 460, 3.5, 0],
        [540, 540, 460, 420, 0, 3.5],
      ]),
      new linearEnemy([
        [620, 660, 420, 420, 3.5, 0],
        [660, 660, 420, 460, 0, 3.5],
        [660, 620, 460, 460, 3.5, 0],
        [620, 620, 460, 420, 0, 3.5],
      ]),
    ],
  
    // level 17
    [
      new staticEnemy(210, 190),
      new staticEnemy(210, 170),
      new staticEnemy(230, 190),
      new staticEnemy(230, 170),
      new staticEnemy(330, 430),
      new staticEnemy(350, 430),
      new staticEnemy(330, 410),
      new staticEnemy(350, 410),
      new staticEnemy(590, 370),
      new staticEnemy(590, 390),
      new staticEnemy(570, 370),
      new staticEnemy(570, 390),
      new simpleEnemy(180, 180, 90, 470, 0, 3),
      new simpleEnemy(170, 710, 180, 180, 3, 0),
      new simpleEnemy(90, 630, 460, 460, 3, 0),
      new simpleEnemy(250, 630, 260, 260, 3, 0),
      new simpleEnemy(330, 710, 380, 380, 3, 0),
      new simpleEnemy(340, 340, 510, 130, 0, 3),
      new simpleEnemy(620, 620, 510, 130, 0, 3),
    ],
  
    // level 18
    [
      new simpleEnemy(260, 260, 210, 390, 0, 6),
      new simpleEnemy(300, 300, 390, 210, 0, 6),
      new simpleEnemy(340, 340, 210, 390, 0, 6),
      new simpleEnemy(380, 380, 390, 210, 0, 6),
      new simpleEnemy(420, 420, 210, 390, 0, 6),
      new simpleEnemy(460, 460, 390, 210, 0, 6),
      new simpleEnemy(500, 500, 210, 390, 0, 6),
      new simpleEnemy(540, 540, 390, 210, 0, 6),
    ],
  
    // level 19
    [
      new simpleEnemy(220, 220, 210, 390, 0, 5),
      new simpleEnemy(260, 260, 390, 210, 0, 5),
      new simpleEnemy(300, 300, 210, 390, 0, 5),
      new simpleEnemy(340, 340, 390, 210, 0, 5),
      new simpleEnemy(380, 380, 210, 390, 0, 5),
      new simpleEnemy(420, 420, 390, 210, 0, 5),
      new simpleEnemy(460, 460, 210, 390, 0, 5),
      new simpleEnemy(500, 500, 390, 210, 0, 5),
      new simpleEnemy(540, 540, 210, 390, 0, 5),
      new simpleEnemy(580, 580, 390, 210, 0, 5),
      new linearEnemy([
        [210, 380, 210, 390, 5, 5],
        [380, 540, 390, 210, 5, 5],
        [540, 590, 210, 260, 5, 5],
        [590, 460, 260, 390, 5, 5],
        [460, 300, 390, 210, 5, 5],
        [300, 210, 210, 300, 5, 5],
        [210, 300, 300, 390, 5, 5],
        [300, 460, 390, 210, 5, 5],
        [460, 590, 210, 340, 5, 5],
        [590, 540, 340, 390, 5, 5],
        [540, 380, 390, 210, 5, 5],
        [380, 210, 210, 390, 5, 5],
        [210, 380, 390, 210, 5, 5],
        [380, 540, 210, 390, 5, 5],
        [540, 590, 390, 340, 5, 5],
        [590, 460, 340, 210, 5, 5],
        [460, 300, 210, 390, 5, 5],
        [300, 210, 390, 300, 5, 5],
        [210, 300, 300, 210, 5, 5],
        [300, 460, 210, 390, 5, 5],
        [460, 590, 390, 260, 5, 5],
        [590, 540, 260, 210, 5, 5],
        [540, 380, 210, 390, 5, 5],
        [380, 210, 390, 210, 5, 5],
      ]),
      new linearEnemy([
        [210, 380, 390, 210, 5, 5],
        [380, 540, 210, 390, 5, 5],
        [540, 590, 390, 340, 5, 5],
        [590, 460, 340, 210, 5, 5],
        [460, 300, 210, 390, 5, 5],
        [300, 210, 390, 300, 5, 5],
        [210, 300, 300, 210, 5, 5],
        [300, 460, 210, 390, 5, 5],
        [460, 590, 390, 260, 5, 5],
        [590, 540, 260, 210, 5, 5],
        [540, 380, 210, 390, 5, 5],
        [380, 210, 390, 210, 5, 5],
        [210, 380, 210, 390, 5, 5],
        [380, 540, 390, 210, 5, 5],
        [540, 590, 210, 260, 5, 5],
        [590, 460, 260, 390, 5, 5],
        [460, 300, 390, 210, 5, 5],
        [300, 210, 210, 300, 5, 5],
        [210, 300, 300, 390, 5, 5],
        [300, 460, 390, 210, 5, 5],
        [460, 590, 210, 340, 5, 5],
        [590, 540, 340, 390, 5, 5],
        [540, 380, 390, 210, 5, 5],
        [380, 210, 210, 390, 5, 5],
      ]),
    ],
  
    // level 20
    [
      new simpleEnemy(220, 220, 170, 390, 0, 2.4),
      new simpleEnemy(340, 340, 170, 390, 0, 2.4),
      new simpleEnemy(460, 460, 170, 390, 0, 2.4),
      new simpleEnemy(580, 580, 170, 390, 0, 2.4),
      new simpleEnemy(700, 700, 170, 390, 0, 2.4),
      new simpleEnemy(350, 210, 180, 180, 2.4, 0),
      new simpleEnemy(350, 210, 300, 300, 2.4, 0),
      new simpleEnemy(590, 450, 180, 180, 2.4, 0),
      new simpleEnemy(590, 450, 300, 300, 2.4, 0),
      new simpleEnemy(470, 330, 260, 260, 2.4, 0),
      new simpleEnemy(470, 330, 380, 380, 2.4, 0),
      new simpleEnemy(710, 570, 260, 260, 2.4, 0),
      new simpleEnemy(710, 570, 380, 380, 2.4, 0),
    ],
  
    // level 21
    [
      new simpleEnemy(180, 180, 130, 470, 0, 9),
      new simpleEnemy(220, 220, 130, 470, 0, 6),
      new simpleEnemy(260, 260, 130, 470, 0, 3),
      new simpleEnemy(300, 300, 130, 470, 0, 9),
      new simpleEnemy(340, 340, 130, 470, 0, 6),
      new simpleEnemy(380, 380, 130, 470, 0, 3),
      new simpleEnemy(420, 420, 130, 470, 0, 9),
      new simpleEnemy(460, 460, 130, 470, 0, 6),
      new simpleEnemy(500, 500, 130, 470, 0, 3),
      new simpleEnemy(540, 540, 130, 470, 0, 9),
      new simpleEnemy(580, 580, 130, 470, 0, 6),
      new simpleEnemy(620, 620, 130, 470, 0, 3),
    ],
  
    // level 22
    [
      new linearEnemy([
        [460, 660, 100, 100, 4.5, 0],
        [660, 660, 100, 140, 0, 4.5],
        [660, 460, 140, 140, 4.5, 0],
        [460, 460, 140, 100, 0, 4.5],
      ]),
      new linearEnemy([
        [660, 460, 140, 140, 4.5, 0],
        [460, 460, 140, 100, 0, 4.5],
        [460, 660, 100, 100, 4.5, 0],
        [660, 660, 100, 140, 0, 4.5],
      ]),
      new linearEnemy([
        [460, 660, 260, 260, 4.5, 0],
        [660, 660, 260, 300, 0, 4.5],
        [660, 460, 300, 300, 4.5, 0],
        [460, 460, 300, 260, 0, 4.5],
      ]),
      new linearEnemy([
        [660, 460, 300, 300, 4.5, 0],
        [460, 460, 300, 260, 0, 4.5],
        [460, 660, 260, 260, 4.5, 0],
        [660, 660, 260, 300, 0, 4.5],
      ]),
      new linearEnemy([
        [460, 660, 460, 460, 4.5, 0],
        [660, 660, 460, 500, 0, 4.5],
        [660, 460, 500, 500, 4.5, 0],
        [460, 460, 500, 460, 0, 4.5],
      ]),
      new linearEnemy([
        [660, 460, 500, 500, 4.5, 0],
        [460, 460, 500, 460, 0, 4.5],
        [460, 660, 460, 460, 4.5, 0],
        [660, 660, 460, 500, 0, 4.5],
      ]),
      new linearEnemy([
        [140, 340, 100, 100, 4.5, 0],
        [340, 340, 100, 140, 0, 4.5],
        [340, 140, 140, 140, 4.5, 0],
        [140, 140, 140, 100, 0, 4.5],
      ]),
      new linearEnemy([
        [340, 140, 140, 140, 4.5, 0],
        [140, 140, 140, 100, 0, 4.5],
        [140, 340, 100, 100, 4.5, 0],
        [340, 340, 100, 140, 0, 4.5],
      ]),
      new linearEnemy([
        [300, 300, 500, 300, 0, 4.5],
        [300, 340, 300, 300, 4.5, 0],
        [340, 340, 300, 500, 0, 4.5],
        [340, 300, 500, 500, 4.5, 0],
      ]),
      new linearEnemy([
        [340, 340, 300, 500, 0, 4.5],
        [340, 300, 500, 500, 4.5, 0],
        [300, 300, 500, 300, 0, 4.5],
        [300, 340, 300, 300, 4.5, 0],
      ]),
      new linearEnemy([
        [620, 620, 420, 340, 0, 4.5],
        [620, 660, 340, 340, 4.5, 0],
        [660, 660, 340, 420, 0, 4.5],
        [660, 620, 420, 420, 4.5, 0],
      ]),
      new linearEnemy([
        [460, 500, 180, 180, 4.5, 0],
        [500, 500, 180, 220, 0, 4.5],
        [500, 460, 220, 220, 4.5, 0],
        [460, 460, 220, 180, 0, 4.5],
      ]),
      new linearEnemy([
        [380, 420, 460, 460, 4.5, 0],
        [420, 420, 460, 500, 0, 4.5],
        [420, 380, 500, 500, 4.5, 0],
        [380, 380, 500, 460, 0, 4.5],
      ]),
      new linearEnemy([
        [300, 300, 260, 180, 0, 4.5],
        [300, 340, 180, 180, 4.5, 0],
        [340, 340, 180, 260, 0, 4.5],
        [340, 300, 260, 260, 4.5, 0],
      ]),
      new linearEnemy([
        [60, 100, 100, 100, 4.5, 0],
        [100, 100, 100, 140, 0, 4.5],
        [100, 60, 140, 140, 4.5, 0],
        [60, 60, 140, 100, 0, 4.5],
      ]),
      new linearEnemy([
        [60, 60, 260, 180, 0, 4.5],
        [60, 100, 180, 180, 4.5, 0],
        [100, 100, 180, 260, 0, 4.5],
        [100, 60, 260, 260, 4.5, 0],
      ]),
      new linearEnemy([
        [60, 60, 500, 300, 0, 4.5],
        [60, 100, 300, 300, 4.5, 0],
        [100, 100, 300, 500, 0, 4.5],
        [100, 60, 500, 500, 4.5, 0],
      ]),
      new linearEnemy([
        [100, 100, 300, 500, 0, 4.5],
        [100, 60, 500, 500, 4.5, 0],
        [60, 60, 500, 300, 0, 4.5],
        [60, 100, 300, 300, 4.5, 0],
      ]),
      new linearEnemy([
        [180, 260, 300, 300, 4.5, 0],
        [260, 260, 300, 340, 0, 4.5],
        [260, 180, 340, 340, 4.5, 0],
        [180, 180, 340, 300, 0, 4.5],
      ]),
    ],
  
    // level 23
    [
      new staticEnemy(400, 300),
      new reverseCircularEnemy(400, 300, 20, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 40, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 60, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 80, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 100, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 120, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 140, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 160, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 180, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 200, 0, 360, 1.9),
  
      new reverseCircularEnemy(400, 300, 20, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 40, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 60, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 80, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 100, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 120, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 140, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 160, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 180, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 200, 90, 450, 1.9),
  
      new reverseCircularEnemy(400, 300, 20, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 40, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 60, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 80, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 100, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 120, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 140, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 160, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 180, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 200, 180, 540, 1.9),
  
      new reverseCircularEnemy(400, 300, 20, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 40, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 60, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 80, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 100, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 120, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 140, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 160, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 180, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 200, 270, 630, 1.9),
    ],
  
    // level 24
    [
      new simpleEnemy(90, 710, 220, 220, 5, 0),
      new simpleEnemy(710, 90, 260, 260, 5, 0),
      new simpleEnemy(90, 710, 300, 300, 5, 0),
      new simpleEnemy(710, 90, 340, 340, 5, 0),
      new simpleEnemy(90, 710, 380, 380, 5, 0),
  
      new simpleEnemy(100, 100, 210, 390, 0, 5),
      new simpleEnemy(140, 140, 390, 210, 0, 5),
      new simpleEnemy(180, 180, 210, 390, 0, 5),
      new simpleEnemy(220, 220, 390, 210, 0, 5),
      new simpleEnemy(260, 260, 210, 390, 0, 5),
      new simpleEnemy(300, 300, 390, 210, 0, 5),
      new simpleEnemy(340, 340, 210, 390, 0, 5),
      new simpleEnemy(380, 380, 390, 210, 0, 5),
      new simpleEnemy(420, 420, 210, 390, 0, 5),
      new simpleEnemy(460, 460, 390, 210, 0, 5),
      new simpleEnemy(500, 500, 210, 390, 0, 5),
      new simpleEnemy(540, 540, 390, 210, 0, 5),
      new simpleEnemy(580, 580, 210, 390, 0, 5),
      new simpleEnemy(620, 620, 390, 210, 0, 5),
      new simpleEnemy(660, 660, 210, 390, 0, 5),
      new simpleEnemy(700, 700, 390, 210, 0, 5),
    ],
  
    // level 25
    [
      new staticEnemy(120, 440),
      new simpleCircularEnemy(120, 440, 20, 0, -3.75),
      new simpleCircularEnemy(120, 440, 40, 0, -3.75),
      new simpleCircularEnemy(120, 440, 60, 0, -3.75),
      new simpleCircularEnemy(120, 440, 80, 0, -3.75),
      new simpleCircularEnemy(120, 440, 20, 180, -3.75),
      new simpleCircularEnemy(120, 440, 40, 180, -3.75),
      new simpleCircularEnemy(120, 440, 60, 180, -3.75),
      new simpleCircularEnemy(120, 440, 80, 180, -3.75),
  
      new simpleEnemy(50, 110, 180, 180, 2.5, 0),
      new simpleEnemy(130, 190, 180, 180, 2.5, 0),
      new simpleEnemy(50, 110, 200, 200, 2.5, 0),
      new simpleEnemy(130, 190, 200, 200, 2.5, 0),
      new simpleEnemy(50, 110, 220, 220, 2.5, 0),
      new simpleEnemy(130, 190, 220, 220, 2.5, 0),
      new simpleEnemy(50, 110, 240, 240, 2.5, 0),
      new simpleEnemy(130, 190, 240, 240, 2.5, 0),
      new simpleEnemy(50, 110, 260, 260, 2.5, 0),
      new simpleEnemy(130, 190, 260, 260, 2.5, 0),
      new simpleEnemy(50, 110, 280, 280, 2.5, 0),
      new simpleEnemy(130, 190, 280, 280, 2.5, 0),
      new simpleEnemy(50, 110, 300, 300, 2.5, 0),
      new simpleEnemy(130, 190, 300, 300, 2.5, 0),
      new simpleEnemy(50, 110, 320, 320, 2.5, 0),
      new simpleEnemy(130, 190, 320, 320, 2.5, 0),
      new simpleEnemy(50, 110, 340, 340, 2.5, 0),
      new simpleEnemy(130, 190, 340, 340, 2.5, 0),
      new simpleEnemy(50, 110, 360, 360, 2.5, 0),
      new simpleEnemy(130, 190, 360, 360, 2.5, 0),
      new simpleEnemy(50, 110, 380, 380, 2.5, 0),
      new simpleEnemy(130, 190, 380, 380, 2.5, 0),
  
      new simpleEnemy(180, 180, 430, 370, 0, 2.5),
      new simpleEnemy(180, 180, 510, 450, 0, 2.5),
      new simpleEnemy(200, 200, 430, 370, 0, 2.5),
      new simpleEnemy(200, 200, 510, 450, 0, 2.5),
      new simpleEnemy(220, 220, 430, 370, 0, 2.5),
      new simpleEnemy(220, 220, 510, 450, 0, 2.5),
      new simpleEnemy(240, 240, 430, 370, 0, 2.5),
      new simpleEnemy(240, 240, 510, 450, 0, 2.5),
      new simpleEnemy(260, 260, 430, 370, 0, 2.5),
      new simpleEnemy(260, 260, 510, 450, 0, 2.5),
      new simpleEnemy(280, 280, 430, 370, 0, 2.5),
      new simpleEnemy(280, 280, 510, 450, 0, 2.5),
      new simpleEnemy(300, 300, 430, 370, 0, 2.5),
      new simpleEnemy(300, 300, 510, 450, 0, 2.5),
      new simpleEnemy(320, 320, 430, 370, 0, 2.5),
      new simpleEnemy(320, 320, 510, 450, 0, 2.5),
      new simpleEnemy(340, 340, 430, 370, 0, 2.5),
      new simpleEnemy(340, 340, 510, 450, 0, 2.5),
      new simpleEnemy(360, 360, 430, 370, 0, 2.5),
      new simpleEnemy(360, 360, 510, 450, 0, 2.5),
      new simpleEnemy(380, 380, 430, 370, 0, 2.5),
      new simpleEnemy(380, 380, 510, 450, 0, 2.5),
      new simpleEnemy(400, 400, 510, 450, 0, 2.5),
      new simpleEnemy(420, 420, 510, 450, 0, 2.5),
      new simpleEnemy(440, 440, 510, 450, 0, 2.5),
      new simpleEnemy(460, 460, 430, 370, 0, 2.5),
      new simpleEnemy(460, 460, 510, 450, 0, 2.5),
      new simpleEnemy(480, 480, 430, 370, 0, 2.5),
      new simpleEnemy(480, 480, 510, 450, 0, 2.5),
      new simpleEnemy(500, 500, 430, 370, 0, 2.5),
      new simpleEnemy(500, 500, 510, 450, 0, 2.5),
      new simpleEnemy(520, 520, 430, 370, 0, 2.5),
      new simpleEnemy(520, 520, 510, 450, 0, 2.5),
      new simpleEnemy(540, 540, 430, 370, 0, 2.5),
      new simpleEnemy(540, 540, 510, 450, 0, 2.5),
      new simpleEnemy(560, 560, 430, 370, 0, 2.5),
      new simpleEnemy(560, 560, 510, 450, 0, 2.5),
      new simpleEnemy(580, 580, 430, 370, 0, 2.5),
      new simpleEnemy(580, 580, 510, 450, 0, 2.5),
      new simpleEnemy(600, 600, 430, 370, 0, 2.5),
      new simpleEnemy(600, 600, 510, 450, 0, 2.5),
      new simpleEnemy(620, 620, 430, 370, 0, 2.5),
      new simpleEnemy(620, 620, 510, 450, 0, 2.5),
      new simpleEnemy(640, 640, 430, 370, 0, 2.5),
      new simpleEnemy(640, 640, 510, 450, 0, 2.5),
      new simpleEnemy(660, 660, 430, 370, 0, 2.5),
      new simpleEnemy(660, 660, 510, 450, 0, 2.5),
    ],
  
    // level 26
    [
      new simpleEnemy(340, 340, 390, 250, 0, 6),
      new simpleEnemy(300, 300, 210, 350, 0, 6),
      new simpleEnemy(260, 260, 310, 170, 0, 6),
      new simpleEnemy(220, 220, 130, 270, 0, 6),
      new simpleEnemy(180, 180, 230, 90, 0, 6),
  
      new simpleEnemy(460, 460, 390, 250, 0, 6),
      new simpleEnemy(500, 500, 210, 350, 0, 6),
      new simpleEnemy(540, 540, 310, 170, 0, 6),
      new simpleEnemy(580, 580, 130, 270, 0, 6),
      new simpleEnemy(620, 620, 230, 90, 0, 6),
  
      new simpleEnemy(60, 60, 510, 370, 0, 6),
      new simpleEnemy(100, 100, 370, 510, 0, 6),
      new simpleEnemy(140, 140, 510, 370, 0, 6),
      new simpleEnemy(180, 180, 370, 510, 0, 6),
      new simpleEnemy(220, 220, 510, 370, 0, 6),
      new simpleEnemy(260, 260, 370, 510, 0, 6),
      new simpleEnemy(300, 300, 510, 370, 0, 6),
  
      new simpleEnemy(500, 500, 510, 370, 0, 6),
      new simpleEnemy(540, 540, 370, 510, 0, 6),
      new simpleEnemy(580, 580, 510, 370, 0, 6),
      new simpleEnemy(620, 620, 370, 510, 0, 6),
      new simpleEnemy(660, 660, 510, 370, 0, 6),
      new simpleEnemy(700, 700, 370, 510, 0, 6),
      new simpleEnemy(740, 740, 510, 370, 0, 6),
    ],
  
    // level 27
    [
      new simpleEnemy(180, 180, 130, 250, 0, 1.5),
      new simpleEnemy(180, 180, 150, 270, 0, 1.5),
      new simpleEnemy(180, 180, 170, 290, 0, 1.5),
      new simpleEnemy(180, 180, 190, 310, 0, 1.5),
      new simpleEnemy(180, 180, 290, 410, 0, 1.5),
      new simpleEnemy(180, 180, 310, 430, 0, 1.5),
      new simpleEnemy(180, 180, 330, 450, 0, 1.5),
      new simpleEnemy(180, 180, 350, 470, 0, 1.5),
  
      new simpleEnemy(220, 220, 130, 230, 0, 2),
      new simpleEnemy(220, 220, 250, 350, 0, 2),
      new simpleEnemy(220, 220, 370, 470, 0, 2),
  
      new simpleEnemy(260, 260, 130, 350, 0, 3),
      new simpleEnemy(260, 260, 150, 370, 0, 3),
      new simpleEnemy(260, 260, 170, 390, 0, 3),
      new simpleEnemy(260, 260, 190, 410, 0, 3),
      new simpleEnemy(260, 260, 210, 430, 0, 3),
      new simpleEnemy(260, 260, 230, 450, 0, 3),
      new simpleEnemy(260, 260, 250, 470, 0, 3),
  
      new simpleEnemy(300, 300, 250, 130, 0, 1.5),
      new simpleEnemy(300, 300, 270, 150, 0, 1.5),
      new simpleEnemy(300, 300, 290, 170, 0, 1.5),
      new simpleEnemy(300, 300, 310, 190, 0, 1.5),
      new simpleEnemy(300, 300, 410, 290, 0, 1.5),
      new simpleEnemy(300, 300, 430, 310, 0, 1.5),
      new simpleEnemy(300, 300, 450, 330, 0, 1.5),
      new simpleEnemy(300, 300, 470, 350, 0, 1.5),
  
      new simpleEnemy(340, 340, 230, 130, 0, 2),
      new simpleEnemy(340, 340, 350, 250, 0, 2),
      new simpleEnemy(340, 340, 470, 370, 0, 2),
  
      new simpleEnemy(380, 380, 350, 130, 0, 3),
      new simpleEnemy(380, 380, 370, 150, 0, 3),
      new simpleEnemy(380, 380, 390, 170, 0, 3),
      new simpleEnemy(380, 380, 410, 190, 0, 3),
      new simpleEnemy(380, 380, 430, 210, 0, 3),
      new simpleEnemy(380, 380, 450, 230, 0, 3),
      new simpleEnemy(380, 380, 470, 250, 0, 3),
  
      new simpleEnemy(420, 420, 130, 350, 0, 3),
      new simpleEnemy(420, 420, 150, 370, 0, 3),
      new simpleEnemy(420, 420, 170, 390, 0, 3),
      new simpleEnemy(420, 420, 190, 410, 0, 3),
      new simpleEnemy(420, 420, 210, 430, 0, 3),
      new simpleEnemy(420, 420, 230, 450, 0, 3),
      new simpleEnemy(420, 420, 250, 470, 0, 3),
  
      new simpleEnemy(460, 460, 130, 230, 0, 2),
      new simpleEnemy(460, 460, 250, 350, 0, 2),
      new simpleEnemy(460, 460, 370, 470, 0, 2),
  
      new simpleEnemy(500, 500, 130, 250, 0, 1.5),
      new simpleEnemy(500, 500, 150, 270, 0, 1.5),
      new simpleEnemy(500, 500, 170, 290, 0, 1.5),
      new simpleEnemy(500, 500, 190, 310, 0, 1.5),
      new simpleEnemy(500, 500, 290, 410, 0, 1.5),
      new simpleEnemy(500, 500, 310, 430, 0, 1.5),
      new simpleEnemy(500, 500, 330, 450, 0, 1.5),
      new simpleEnemy(500, 500, 350, 470, 0, 1.5),
  
      new simpleEnemy(540, 540, 230, 130, 0, 2),
      new simpleEnemy(540, 540, 350, 250, 0, 2),
      new simpleEnemy(540, 540, 470, 370, 0, 2),
  
      new simpleEnemy(580, 580, 350, 130, 0, 3),
      new simpleEnemy(580, 580, 370, 150, 0, 3),
      new simpleEnemy(580, 580, 390, 170, 0, 3),
      new simpleEnemy(580, 580, 410, 190, 0, 3),
      new simpleEnemy(580, 580, 430, 210, 0, 3),
      new simpleEnemy(580, 580, 450, 230, 0, 3),
      new simpleEnemy(580, 580, 470, 250, 0, 3),
  
      new simpleEnemy(620, 620, 130, 230, 0, 2),
      new simpleEnemy(620, 620, 250, 350, 0, 2),
      new simpleEnemy(620, 620, 370, 470, 0, 2),
    ],
  
    // level 28
    [
      new simpleEnemy(140, 140, 330, 510, 0, 5),
      new simpleEnemy(180, 180, 510, 330, 0, 5),
      new simpleEnemy(220, 220, 330, 510, 0, 5),
      new simpleEnemy(260, 260, 510, 330, 0, 5),
      new simpleEnemy(300, 300, 330, 510, 0, 5),
      new simpleEnemy(340, 340, 510, 330, 0, 5),
      new simpleEnemy(380, 380, 330, 510, 0, 5),
      new simpleEnemy(420, 420, 510, 330, 0, 5),
      new simpleEnemy(460, 460, 330, 510, 0, 5),
      new simpleEnemy(500, 500, 510, 330, 0, 5),
      new simpleEnemy(540, 540, 330, 510, 0, 5),
      new simpleEnemy(580, 580, 510, 330, 0, 5),
      new simpleEnemy(620, 620, 330, 510, 0, 5),
      new simpleEnemy(660, 660, 510, 330, 0, 5),
      new simpleEnemy(700, 700, 330, 510, 0, 5),
  
      new simpleEnemy(140, 140, 270, 90, 0, 5),
      new simpleEnemy(180, 180, 90, 270, 0, 5),
      new simpleEnemy(220, 220, 270, 90, 0, 5),
      new simpleEnemy(260, 260, 90, 270, 0, 5),
      new simpleEnemy(300, 300, 270, 90, 0, 5),
      new simpleEnemy(340, 340, 90, 270, 0, 5),
      new simpleEnemy(380, 380, 270, 90, 0, 5),
      new simpleEnemy(420, 420, 90, 270, 0, 5),
      new simpleEnemy(460, 460, 270, 90, 0, 5),
      new simpleEnemy(500, 500, 90, 270, 0, 5),
      new simpleEnemy(540, 540, 270, 90, 0, 5),
      new simpleEnemy(580, 580, 90, 270, 0, 5),
      new simpleEnemy(620, 620, 270, 90, 0, 5),
      new simpleEnemy(660, 660, 90, 270, 0, 5),
      new simpleEnemy(700, 700, 270, 90, 0, 5),
  
      new simpleEnemy(310, 130, 500, 500, 5, 0),
      new simpleEnemy(310, 130, 460, 460, 5, 0),
      new simpleEnemy(310, 130, 420, 420, 5, 0),
      new simpleEnemy(310, 130, 380, 380, 5, 0),
  
      new simpleEnemy(510, 330, 460, 460, 5, 0),
      new simpleEnemy(510, 330, 420, 420, 5, 0),
      new simpleEnemy(510, 330, 380, 380, 5, 0),
      new simpleEnemy(510, 330, 340, 340, 5, 0),
  
      new simpleEnemy(710, 530, 500, 500, 5, 0),
      new simpleEnemy(710, 530, 460, 460, 5, 0),
      new simpleEnemy(710, 530, 420, 420, 5, 0),
      new simpleEnemy(710, 530, 380, 380, 5, 0),
  
      new simpleEnemy(310, 130, 260, 260, 5, 0),
      new simpleEnemy(310, 130, 180, 180, 5, 0),
      new simpleEnemy(310, 130, 140, 140, 5, 0),
      new simpleEnemy(310, 130, 100, 100, 5, 0),
  
      new simpleEnemy(510, 330, 260, 260, 5, 0),
      new simpleEnemy(510, 330, 220, 220, 5, 0),
      new simpleEnemy(510, 330, 180, 180, 5, 0),
      new simpleEnemy(510, 330, 100, 100, 5, 0),
  
      new simpleEnemy(710, 530, 260, 260, 5, 0),
      new simpleEnemy(710, 530, 180, 180, 5, 0),
      new simpleEnemy(710, 530, 140, 140, 5, 0),
      new simpleEnemy(710, 530, 100, 100, 5, 0),
    ],
  
    // level 29
    [
      new simpleEnemy(90, 710, 220, 220, 6, 0),
      new simpleEnemy(710, 90, 260, 260, 6, 0),
      new simpleEnemy(90, 710, 300, 300, 6, 0),
      new simpleEnemy(710, 90, 340, 340, 6, 0),
      new simpleEnemy(90, 710, 380, 380, 6, 0),
      new simpleEnemy(710, 90, 420, 420, 6, 0),
      new simpleEnemy(90, 710, 460, 460, 6, 0),
  
      new simpleEnemy(100, 100, 210, 470, 0, 6),
      new simpleEnemy(140, 140, 470, 210, 0, 6),
      new simpleEnemy(180, 180, 210, 470, 0, 6),
      new simpleEnemy(220, 220, 470, 210, 0, 6),
      new simpleEnemy(260, 260, 210, 470, 0, 6),
      new simpleEnemy(300, 300, 470, 210, 0, 6),
      new simpleEnemy(340, 340, 210, 470, 0, 6),
      new simpleEnemy(380, 380, 470, 210, 0, 6),
      new simpleEnemy(420, 420, 210, 470, 0, 6),
      new simpleEnemy(460, 460, 470, 210, 0, 6),
      new simpleEnemy(500, 500, 210, 470, 0, 6),
      new simpleEnemy(540, 540, 470, 210, 0, 6),
      new simpleEnemy(580, 580, 210, 470, 0, 6),
      new simpleEnemy(620, 620, 470, 210, 0, 6),
      new simpleEnemy(660, 660, 210, 470, 0, 6),
      new simpleEnemy(700, 700, 470, 210, 0, 6),
    ],
  
    // level 30
    [
      new simpleEnemy(60, 60, 90, 430, 0, 2),
      new simpleEnemy(100, 100, 430, 90, 0, 2),
      new simpleEnemy(140, 140, 90, 430, 0, 2),
      new simpleEnemy(180, 180, 430, 90, 0, 2),
      new simpleEnemy(220, 220, 90, 430, 0, 2),
      new simpleEnemy(260, 260, 430, 90, 0, 2),
      new simpleEnemy(300, 300, 90, 430, 0, 2),
      new simpleEnemy(340, 340, 430, 90, 0, 2),
      new simpleEnemy(380, 380, 90, 430, 0, 2),
      new simpleEnemy(420, 420, 430, 90, 0, 2),
      new simpleEnemy(460, 460, 90, 430, 0, 2),
      new simpleEnemy(500, 500, 430, 90, 0, 2),
      new simpleEnemy(540, 540, 90, 430, 0, 2),
      new simpleEnemy(580, 580, 430, 90, 0, 2),
      new simpleEnemy(620, 620, 90, 430, 0, 2),
      new simpleEnemy(660, 660, 430, 90, 0, 2),
      new simpleEnemy(700, 700, 90, 430, 0, 2),
      new simpleEnemy(740, 740, 430, 90, 0, 2),
      new linearEnemy([
        [60, 700, 100, 100, 5.5, 0],
        [700, 700, 100, 380, 0, 5.5],
        [700, 60, 380, 380, 5.5, 0],
        [60, 60, 380, 100, 0, 5.5],
      ]),
      new linearEnemy([
        [80, 720, 100, 100, 5.5, 0],
        [720, 720, 100, 380, 0, 5.5],
        [720, 80, 380, 380, 5.5, 0],
        [80, 80, 380, 100, 0, 5.5],
      ]),
      new linearEnemy([
        [100, 740, 100, 100, 5.5, 0],
        [740, 740, 100, 380, 0, 5.5],
        [740, 100, 380, 380, 5.5, 0],
        [100, 100, 380, 100, 0, 5.5],
      ]),
      new linearEnemy([
        [60, 700, 120, 120, 5.5, 0],
        [700, 700, 120, 400, 0, 5.5],
        [700, 60, 400, 400, 5.5, 0],
        [60, 60, 400, 120, 0, 5.5],
      ]),
      new linearEnemy([
        [80, 720, 120, 120, 5.5, 0],
        [720, 720, 120, 400, 0, 5.5],
        [720, 80, 400, 400, 5.5, 0],
        [80, 80, 400, 120, 0, 5.5],
      ]),
      new linearEnemy([
        [100, 740, 120, 120, 5.5, 0],
        [740, 740, 120, 400, 0, 5.5],
        [740, 100, 400, 400, 5.5, 0],
        [100, 100, 400, 120, 0, 5.5],
      ]),
      new linearEnemy([
        [60, 700, 140, 140, 5.5, 0],
        [700, 700, 140, 420, 0, 5.5],
        [700, 60, 420, 420, 5.5, 0],
        [60, 60, 420, 140, 0, 5.5],
      ]),
      new linearEnemy([
        [80, 720, 140, 140, 5.5, 0],
        [720, 720, 140, 420, 0, 5.5],
        [720, 80, 420, 420, 5.5, 0],
        [80, 80, 420, 140, 0, 5.5],
      ]),
      new linearEnemy([
        [100, 740, 140, 140, 5.5, 0],
        [740, 740, 140, 420, 0, 5.5],
        [740, 100, 420, 420, 5.5, 0],
        [100, 100, 420, 140, 0, 5.5],
      ]),
      new linearEnemy([
        [700, 60, 380, 380, 5.5, 0],
        [60, 60, 380, 100, 0, 5.5],
        [60, 700, 100, 100, 5.5, 0],
        [700, 700, 100, 380, 0, 5.5],
      ]),
      new linearEnemy([
        [720, 80, 380, 380, 5.5, 0],
        [80, 80, 380, 100, 0, 5.5],
        [80, 720, 100, 100, 5.5, 0],
        [720, 720, 100, 380, 0, 5.5],
      ]),
      new linearEnemy([
        [740, 100, 380, 380, 5.5, 0],
        [100, 100, 380, 100, 0, 5.5],
        [100, 740, 100, 100, 5.5, 0],
        [740, 740, 100, 380, 0, 5.5],
      ]),
      new linearEnemy([
        [700, 60, 400, 400, 5.5, 0],
        [60, 60, 400, 120, 0, 5.5],
        [60, 700, 120, 120, 5.5, 0],
        [700, 700, 120, 400, 0, 5.5],
      ]),
      new linearEnemy([
        [720, 80, 400, 400, 5.5, 0],
        [80, 80, 400, 120, 0, 5.5],
        [80, 720, 120, 120, 5.5, 0],
        [720, 720, 120, 400, 0, 5.5],
      ]),
      new linearEnemy([
        [740, 100, 400, 400, 5.5, 0],
        [100, 100, 400, 120, 0, 5.5],
        [100, 740, 120, 120, 5.5, 0],
        [740, 740, 120, 400, 0, 5.5],
      ]),
      new linearEnemy([
        [700, 60, 420, 420, 5.5, 0],
        [60, 60, 420, 140, 0, 5.5],
        [60, 700, 140, 140, 5.5, 0],
        [700, 700, 140, 420, 0, 5.5],
      ]),
      new linearEnemy([
        [720, 80, 420, 420, 5.5, 0],
        [80, 80, 420, 140, 0, 5.5],
        [80, 720, 140, 140, 5.5, 0],
        [720, 720, 140, 420, 0, 5.5],
      ]),
      new linearEnemy([
        [740, 100, 420, 420, 5.5, 0],
        [100, 100, 420, 140, 0, 5.5],
        [100, 740, 140, 140, 5.5, 0],
        [740, 740, 140, 420, 0, 5.5],
      ]),
      new linearEnemy([
        [140, 620, 180, 180, 5.5, 0],
        [620, 620, 180, 300, 0, 5.5],
        [620, 140, 300, 300, 5.5, 0],
        [140, 140, 300, 180, 0, 5.5],
      ]),
      new linearEnemy([
        [160, 640, 180, 180, 5.5, 0],
        [640, 640, 180, 300, 0, 5.5],
        [640, 160, 300, 300, 5.5, 0],
        [160, 160, 300, 180, 0, 5.5],
      ]),
      new linearEnemy([
        [180, 660, 180, 180, 5.5, 0],
        [660, 660, 180, 300, 0, 5.5],
        [660, 180, 300, 300, 5.5, 0],
        [180, 180, 300, 180, 0, 5.5],
      ]),
      new linearEnemy([
        [140, 620, 200, 200, 5.5, 0],
        [620, 620, 200, 320, 0, 5.5],
        [620, 140, 320, 320, 5.5, 0],
        [140, 140, 320, 200, 0, 5.5],
      ]),
      new linearEnemy([
        [160, 640, 200, 200, 5.5, 0],
        [640, 640, 200, 320, 0, 5.5],
        [640, 160, 320, 320, 5.5, 0],
        [160, 160, 320, 200, 0, 5.5],
      ]),
      new linearEnemy([
        [180, 660, 200, 200, 5.5, 0],
        [660, 660, 200, 320, 0, 5.5],
        [660, 180, 320, 320, 5.5, 0],
        [180, 180, 320, 200, 0, 5.5],
      ]),
      new linearEnemy([
        [140, 620, 220, 220, 5.5, 0],
        [620, 620, 220, 340, 0, 5.5],
        [620, 140, 340, 340, 5.5, 0],
        [140, 140, 340, 220, 0, 5.5],
      ]),
      new linearEnemy([
        [160, 640, 220, 220, 5.5, 0],
        [640, 640, 220, 340, 0, 5.5],
        [640, 160, 340, 340, 5.5, 0],
        [160, 160, 340, 220, 0, 5.5],
      ]),
      new linearEnemy([
        [180, 660, 220, 220, 5.5, 0],
        [660, 660, 220, 340, 0, 5.5],
        [660, 180, 340, 340, 5.5, 0],
        [180, 180, 340, 220, 0, 5.5],
      ]),
      new linearEnemy([
        [620, 140, 300, 300, 5.5, 0],
        [140, 140, 300, 180, 0, 5.5],
        [140, 620, 180, 180, 5.5, 0],
        [620, 620, 180, 300, 0, 5.5],
      ]),
      new linearEnemy([
        [640, 160, 300, 300, 5.5, 0],
        [160, 160, 300, 180, 0, 5.5],
        [160, 640, 180, 180, 5.5, 0],
        [640, 640, 180, 300, 0, 5.5],
      ]),
      new linearEnemy([
        [660, 180, 300, 300, 5.5, 0],
        [180, 180, 300, 180, 0, 5.5],
        [180, 660, 180, 180, 5.5, 0],
        [660, 660, 180, 300, 0, 5.5],
      ]),
      new linearEnemy([
        [620, 140, 320, 320, 5.5, 0],
        [140, 140, 320, 200, 0, 5.5],
        [140, 620, 200, 200, 5.5, 0],
        [620, 620, 200, 320, 0, 5.5],
      ]),
      new linearEnemy([
        [640, 160, 320, 320, 5.5, 0],
        [160, 160, 320, 200, 0, 5.5],
        [160, 640, 200, 200, 5.5, 0],
        [640, 640, 200, 320, 0, 5.5],
      ]),
      new linearEnemy([
        [660, 180, 320, 320, 5.5, 0],
        [180, 180, 320, 200, 0, 5.5],
        [180, 660, 200, 200, 5.5, 0],
        [660, 660, 200, 320, 0, 5.5],
      ]),
      new linearEnemy([
        [620, 140, 340, 340, 5.5, 0],
        [140, 140, 340, 220, 0, 5.5],
        [140, 620, 220, 220, 5.5, 0],
        [620, 620, 220, 340, 0, 5.5],
      ]),
      new linearEnemy([
        [640, 160, 340, 340, 5.5, 0],
        [160, 160, 340, 220, 0, 5.5],
        [160, 640, 220, 220, 5.5, 0],
        [640, 640, 220, 340, 0, 5.5],
      ]),
      new linearEnemy([
        [660, 180, 340, 340, 5.5, 0],
        [180, 180, 340, 220, 0, 5.5],
        [180, 660, 220, 220, 5.5, 0],
        [660, 660, 220, 340, 0, 5.5],
      ]),
      new simpleEnemy(210, 570, 250, 250, 5.5, 0),
      new simpleEnemy(230, 590, 250, 250, 5.5, 0),
      new simpleEnemy(210, 570, 270, 270, 5.5, 0),
      new simpleEnemy(230, 590, 270, 270, 5.5, 0),
    ],
  ];
  
  function staticEnemy(x, y, enemyType) {
    if (enemyType == null) enemyType = "static";
    this.x = x;
    this.y = y;
    this.simpleX = this.x / 40;
    this.simpleY = this.y / 40;
    this.enemyType = enemyType;
  }
  
  function simpleEnemy(startX, endX, startY, endY, xSpeed, ySpeed, stage, enemyType) {
    if (enemyType == null) enemyType = "simple";
    if (stage == null) stage = 0;
    this.x = startX;
    this.y = startY;
    this.simpleX = this.x / 40;
    this.simpleY = this.y / 40;
    this.startX = startX;
    this.endX = endX;
    this.startY = startY;
    this.endY = endY;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.stage = stage;
    this.enemyType = enemyType;
  }
  
  function linearEnemy(movement, stage, enemyType) {
    if (enemyType == null) enemyType = "linear";
  
    if (stage == null) stage = 0;
  
    this.x = movement[0][0];
    this.y = movement[0][2];
    this.simpleX = this.x / 40;
    this.simpleY = this.y / 40;
    this.movement = movement;
    this.stage = stage;
    this.enemyType = enemyType;
  }
  
  function simpleCircularEnemy(centerX, centerY, radius, startAngle, speed, angle, enemyType) {
    if (angle == null) angle = startAngle;
    if (enemyType == null) enemyType = "simpleCircular";
  
    this.x = radius * Math.cos(angle * (Math.PI / 180)) + centerX;
    this.y = radius * Math.sin(angle * (Math.PI / 180)) + centerY;
    this.simpleX = this.x / 40;
    this.simpleY = this.y / 40;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.speed = speed;
    this.startAngle = startAngle;
    this.angle = startAngle;
    this.enemyType = enemyType;
  }
  
  function pauseCircularEnemy_1_4(centerX, centerY, radius, startAngle, endAngle, speed, pauseTotal, stage, angle, enemyType) {
    if (stage == null) stage = 0;
    if (angle == null) angle = startAngle;
    if (enemyType == null) enemyType = "pauseCircular_1_4";
  
    this.x = radius * Math.cos(angle * (Math.PI / 180)) + centerX;
    this.y = radius * Math.sin(angle * (Math.PI / 180)) + centerY;
    this.simpleX = this.x / 40;
    this.simpleY = this.y / 40;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.speed = speed;
    this.pauseTotal = pauseTotal;
    this.pauseTimer = 0;
    this.angle = startAngle;
    this.stage = stage;
    this.enemyType = enemyType;
  }
  
  function reverseCircularEnemy(centerX, centerY, radius, startAngle, endAngle, speed, stage, angle, enemyType) {
    if (stage == null) stage = 0;
    if (angle == null) angle = startAngle;
    if (enemyType == null) enemyType = "reverseCircular";
  
    this.x = radius * Math.cos(angle * (Math.PI / 180)) + centerX;
    this.y = radius * Math.sin(angle * (Math.PI / 180)) + centerY;
    this.simpleX = this.x / 40;
    this.simpleY = this.y / 40;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.speed = speed;
    this.angle = startAngle;
    this.stage = stage;
    this.enemyType = enemyType;
  }
  
  function resetEnemies(l) {
    for (var i = 0; i < enemies[l].length; i++) {
      if (enemies[l][i].enemyType == "simple") {
        enemies[l][i].x = enemies[l][i].startX;
        enemies[l][i].y = enemies[l][i].startY;
        enemies[l][i].simpleX = enemies[l][i].x / 40;
        enemies[l][i].simpleY = enemies[l][i].y / 40;
        enemies[l][i].stage = 0;
      } else if (enemies[l][i].enemyType == "linear") {
        enemies[l][i].x = enemies[l][i].movement[0][0];
        enemies[l][i].y = enemies[l][i].movement[0][2];
        enemies[l][i].simpleX = enemies[l][i].x / 40;
        enemies[l][i].simpleY = enemies[l][i].y / 40;
        enemies[l][i].stage = 0;
      } else if (enemies[l][i].enemyType == "simpleCircular") {
        enemies[l][i].angle = enemies[l][i].startAngle;
        enemies[l][i].x = enemies[l][i].radius * Math.cos(enemies[l][i].angle * (Math.PI / 180)) + enemies[l][i].centerX;
        enemies[l][i].y = enemies[l][i].radius * Math.sin(enemies[l][i].angle * (Math.PI / 180)) + enemies[l][i].centerY;
        enemies[l][i].simpleX = enemies[l][i].x / 40;
        enemies[l][i].simpleY = enemies[l][i].y / 40;
      }
    }
  }
  
  function drawEnemies() {
    if (state == "game") {
      // colors
      var enemyFillColor, enemyOutlineColor;
      if (level >= WALLS_RED) {
        enemyFillColor = ENEMY_FILL_COLOR_2;
        enemyOutlineColor = ENEMY_OUTLINE_COLOR_2;
      } else if (level >= WALLS_PURPLE) {
        enemyFillColor = ENEMY_FILL_COLOR_1;
        enemyOutlineColor = ENEMY_OUTLINE_COLOR_1;
      } else {
        enemyFillColor = ENEMY_FILL_COLOR_0;
        enemyOutlineColor = ENEMY_OUTLINE_COLOR_0;
      }
  
      for (var i = 0; i < enemies[level].length; i++) {
        canvas.beginPath();
        canvas.arc(cwh(enemies[level][i].x) + os.x, cwh(enemies[level][i].y) + os.y, cwh(ENEMY_SIZE) / 2, 0, 2 * Math.PI, false);
        canvas.fillStyle = enemyFillColor;
        canvas.fill();
        canvas.lineWidth = cwh(4);
        canvas.strokeStyle = enemyOutlineColor;
        canvas.stroke();
      }
    }
  }
  
  function updateEnemies() {
    if ((state == "game" || state == "level_select") && !paused && !player.dying) {
      // game
      if (state == "game") {
        for (var n = 0; n < enemies[level].length; n++) {
          updateSimpleEnemy(n);
          updateLinearEnemy(n);
          updateSimpleCircularEnemy(n);
          updatePauseCircularEnemy_1_4(n);
          updateReverseCircularEnemy(n);
        }
      }
  
      // level select
      else if (state == "level_select" && !mobile) {
        for (var i = 1; i < LS_ALL_TOT + 1; i++) {
          for (var n = 0; n < enemies[i].length; n++) {
            updateSimpleEnemy(n, i);
            updateLinearEnemy(n, i);
            updateSimpleCircularEnemy(n, i);
            updatePauseCircularEnemy_1_4(n, i);
            updateReverseCircularEnemy(n, i);
          }
        }
      }
    }
  }
  
  function updateSimpleCircularEnemy(n, l) {
    if (l == null) l = level;
    var e = enemies[l][n];
    if (e.enemyType == "simpleCircular") {
      var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
      var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
      e.x = newX + e.centerX;
      e.y = newY + e.centerY;
  
      e.angle += e.speed;
  
      e.simpleX = e.x / 40;
      e.simpleY = e.y / 40;
    }
  }
  
  function updateReverseCircularEnemy(n, l) {
    if (l == null) l = level;
    var e = enemies[l][n];
    if (e.enemyType == "reverseCircular") {
      if (e.stage == 0) {
        var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
        var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
        e.x = newX + e.centerX;
        e.y = newY + e.centerY;
  
        e.angle += e.speed;
  
        e.simpleX = e.x / 40;
        e.simpleY = e.y / 40;
  
        if (e.angle >= e.endAngle) {
          e.stage = 1;
          e.angle = e.endAngle;
        }
      } else if (e.stage == 1) {
        var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
        var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
        e.x = newX + e.centerX;
        e.y = newY + e.centerY;
  
        e.angle -= e.speed;
  
        e.simpleX = e.x / 40;
        e.simpleY = e.y / 40;
  
        if (e.angle <= e.startAngle) {
          e.stage = 0;
          e.angle = e.startAngle;
        }
      }
    }
  }
  
  function updatePauseCircularEnemy_1_4(n, l) {
    if (l == null) l = level;
    var e = enemies[l][n];
    if (e.enemyType == "pauseCircular_1_4") {
      if (e.stage == 0) {
        if (e.pauseTimer < e.pauseTotal) {
          e.pauseTimer++;
        } else {
          e.pauseTimer = 0;
          e.stage = 1;
        }
      } else {
        if (e.startAngle < e.endAngle) {
          if (e.angle < e.endAngle) {
            var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
            var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
            e.x = newX + e.centerX;
            e.y = newY + e.centerY;
  
            e.angle += e.speed;
  
            e.simpleX = e.x / 40;
            e.simpleY = e.y / 40;
          } else {
            e.angle = e.startAngle;
  
            var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
            var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
            e.x = newX + e.centerX;
            e.y = newY + e.centerY;
  
            e.simpleX = e.x / 40;
            e.simpleY = e.y / 40;
  
            e.pauseTimer = 0;
            e.stage = 0;
          }
        } else if (e.startAngle > e.endAngle) {
          if (e.angle > e.endAngle) {
            var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
            var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
            e.x = newX + e.centerX;
            e.y = newY + e.centerY;
  
            e.angle -= e.speed;
  
            e.simpleX = e.x / 40;
            e.simpleY = e.y / 40;
          } else {
            e.angle = e.startAngle;
  
            var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
            var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
            e.x = newX + e.centerX;
            e.y = newY + e.centerY;
  
            e.simpleX = e.x / 40;
            e.simpleY = e.y / 40;
  
            e.pauseTimer = 0;
            e.stage = 0;
          }
        }
      }
    }
  }
  
  function updateSimpleEnemy(n, l) {
    if (l == null) l = level;
    if (enemies[l][n].enemyType == "simple") {
      // stage 0
      if (enemies[l][n].stage == 0) {
        // x
        if (enemies[l][n].startX < enemies[l][n].endX) {
          if (enemies[l][n].x < enemies[l][n].endX) {
            enemies[l][n].x += enemies[l][n].xSpeed;
          }
          if (enemies[l][n].x >= enemies[l][n].endX) {
            enemies[l][n].x = enemies[l][n].endX;
            enemies[l][n].stage = 1;
          }
        } else if (enemies[l][n].startX > enemies[l][n].endX) {
          if (enemies[l][n].x > enemies[l][n].endX) {
            enemies[l][n].x -= enemies[l][n].xSpeed;
          }
          if (enemies[l][n].x <= enemies[l][n].endX) {
            enemies[l][n].x = enemies[l][n].endX;
            enemies[l][n].stage = 1;
          }
        }
  
        // y
        if (enemies[l][n].startY < enemies[l][n].endY) {
          if (enemies[l][n].y < enemies[l][n].endY) {
            enemies[l][n].y += enemies[l][n].ySpeed;
          }
          if (enemies[l][n].y >= enemies[l][n].endY) {
            enemies[l][n].y = enemies[l][n].endY;
            enemies[l][n].stage = 1;
          }
        } else if (enemies[l][n].startY > enemies[l][n].endY) {
          if (enemies[l][n].y > enemies[l][n].endY) {
            enemies[l][n].y -= enemies[l][n].ySpeed;
          }
          if (enemies[l][n].y <= enemies[l][n].endY) {
            enemies[l][n].y = enemies[l][n].endY;
            enemies[l][n].stage = 1;
          }
        }
      }
  
      // stage 1
      else if (enemies[l][n].stage == 1) {
        // x
        if (enemies[l][n].startX < enemies[l][n].endX) {
          if (enemies[l][n].x > enemies[l][n].startX) {
            enemies[l][n].x -= enemies[l][n].xSpeed;
          }
          if (enemies[l][n].x <= enemies[l][n].startX) {
            enemies[l][n].x = enemies[l][n].startX;
            enemies[l][n].stage = 0;
          }
        } else if (enemies[l][n].startX > enemies[l][n].endX) {
          if (enemies[l][n].x < enemies[l][n].startX) {
            enemies[l][n].x += enemies[l][n].xSpeed;
          }
          if (enemies[l][n].x >= enemies[l][n].startX) {
            enemies[l][n].x = enemies[l][n].startX;
            enemies[l][n].stage = 0;
          }
        }
  
        // y
        if (enemies[l][n].startY < enemies[l][n].endY) {
          if (enemies[l][n].y > enemies[l][n].startY) {
            enemies[l][n].y -= enemies[l][n].ySpeed;
          }
          if (enemies[l][n].y <= enemies[l][n].startY) {
            enemies[l][n].y = enemies[l][n].startY;
            enemies[l][n].stage = 0;
          }
        } else if (enemies[l][n].startY > enemies[l][n].endY) {
          if (enemies[l][n].y < enemies[l][n].startY) {
            enemies[l][n].y += enemies[l][n].ySpeed;
          }
          if (enemies[l][n].y >= enemies[l][n].startY) {
            enemies[l][n].y = enemies[l][n].startY;
            enemies[l][n].stage = 0;
          }
        }
      }
      enemies[l][n].simpleX = enemies[l][n].x / 40;
      enemies[l][n].simpleY = enemies[l][n].y / 40;
    }
  }
  
  function updateLinearEnemy(n, l) {
    if (l == null) l = level;
  
    if (enemies[l][n].enemyType == "linear") {
      var startX = enemies[l][n].movement[enemies[l][n].stage][0];
      var endX = enemies[l][n].movement[enemies[l][n].stage][1];
      var startY = enemies[l][n].movement[enemies[l][n].stage][2];
      var endY = enemies[l][n].movement[enemies[l][n].stage][3];
      var xSpeed = enemies[l][n].movement[enemies[l][n].stage][4];
      var ySpeed = enemies[l][n].movement[enemies[l][n].stage][5];
      var stages = enemies[l][n].movement.length;
      var changedStage = false;
  
      // x
      if (startX < endX) {
        if (enemies[l][n].x < endX) {
          enemies[l][n].x += xSpeed;
        }
        if (enemies[l][n].x >= endX) {
          enemies[l][n].x = endX;
          enemies[l][n].stage++;
          changedStage = true;
          if (enemies[l][n].stage >= stages) enemies[l][n].stage = 0;
        }
      } else if (startX > endX) {
        if (enemies[l][n].x > endX) {
          enemies[l][n].x -= xSpeed;
        }
        if (enemies[l][n].x <= endX) {
          enemies[l][n].x = endX;
          enemies[l][n].stage++;
          changedStage = true;
          if (enemies[l][n].stage >= stages) enemies[l][n].stage = 0;
        }
      }
  
      // y
      if (startY < endY) {
        if (enemies[l][n].y < endY) {
          enemies[l][n].y += ySpeed;
        }
        if (enemies[l][n].y >= endY) {
          enemies[l][n].y = endY;
          if (!changedStage) {
            enemies[l][n].stage++;
            if (enemies[l][n].stage >= stages) enemies[l][n].stage = 0;
          }
        }
      } else if (startY > endY) {
        if (enemies[l][n].y > endY) {
          enemies[l][n].y -= ySpeed;
        }
        if (enemies[l][n].y <= endY) {
          enemies[l][n].y = endY;
          if (!changedStage) {
            enemies[l][n].stage++;
            if (enemies[l][n].stage >= stages) enemies[l][n].stage = 0;
          }
        }
      }
      enemies[l][n].simpleX = enemies[l][n].x / 40;
      enemies[l][n].simpleY = enemies[l][n].y / 40;
    }
  }
  