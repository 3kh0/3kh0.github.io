FullScreenMario.FullScreenMario.settings.touch = {
    "enabled": false,
    "styles": {
        "Button": {
            "elementInner": {
                "style": {
                    "padding": ".385cm",
                    "width": "1.4cm",
                    "height": "1.4cm",
                    "border": "4px solid rgb(238, 238, 238)",
                    "borderRadius": "100%",
                    "background": "rgb(175, 175, 175)",
                    "textAlign": "center",
                    "cursor": "pointer"
                }
            }
        },
        "Joystick": {
            "elementInner": {
                "style": {
                    "width": "3.5cm",
                    "height": "3.5cm"
                }
            },
            "circle": {
                "style": {
                    "top": "21%",
                    "right": "21%",
                    "bottom": "21%",
                    "left": "21%",
                    "boxShadow": "0 0 1px 4px rgb(238, 238, 238)",
                    "background": "rgb(175, 175, 175)",
                    "borderRadius": "100%",
                    "cursor": "pointer"
                }
            },
            "tick": {
                "style": {
                    "width": ".28cm",
                    "height": "4px",
                    "background": "rgb(238, 238, 238)"
                }
            },
            "dragLine": {
                "style": {
                    "width": ".49cm",
                    "height": "4px",
                    "background": "rgb(210, 210, 210)",
                    "transition": "117ms opacity"
                }
            },
            "dragShadow": {
                "style": {
                    "background": "rgba(231, 231, 231, .84)",
                    "boxShadow": "0 0 7px 3px rgba(175, 175, 175, .7)",
                    "transition": "117ms all"
                }
            }
        }
    },
    "controls": [
        {
            "name": "Joystick",
            "control": "Joystick",
            "position": {
                "vertical": "bottom",
                "horizontal": "left",
                "offset": {
                    "left": "0",
                    "top": "-3.5cm"
                }
            },
            "directions": [
                {
                    "name": "Up",
                    "degrees": 0,
                    "neighbors": ["UpLeft", "UpRight"]
                },
                {
                    "name": "UpRight",
                    "degrees": 45,
                    "neighbors": ["Up", "Right"],
                    "pipes": {
                        "activated": {
                            "onkeydown": ["right"]
                        },
                        "deactivated": {
                            "onkeyup": ["right"]
                        }
                    }
                },
                {
                    "name": "Right",
                    "degrees": 90,
                    "neighbors": ["UpRight", "DownRight"],
                    "pipes": {
                        "activated": {
                            "onkeydown": ["right"]
                        },
                        "deactivated": {
                            "onkeyup": ["right"]
                        }
                    }
                },
                {
                    "name": "DownRight",
                    "degrees": 135,
                    "neighbors": ["Right", "Down"],
                    "pipes": {
                        "activated": {
                            "onkeydown": ["down", "right"]
                        },
                        "deactivated": {
                            "onkeyup": ["down", "right"]
                        }
                    }
                },
                {
                    "name": "Down",
                    "degrees": 180,
                    "neighbors": ["DownRight", "DownLeft"],
                    "pipes": {
                        "activated": {
                            "onkeydown": ["down"]
                        },
                        "deactivated": {
                            "onkeyup": ["down"]
                        }
                    }
                },
                {
                    "name": "DownLeft",
                    "degrees": 225,
                    "neighbors": ["Down", "left"],
                    "pipes": {
                        "activated": {
                            "onkeydown": ["down", "left"]
                        },
                        "deactivated": {
                            "onkeyup": ["down", "left"]
                        }
                    }
                },
                {
                    "name": "Left",
                    "degrees": 270,
                    "neighbors": ["DownLeft", "UpLeft"],
                    "pipes": {
                        "activated": {
                            "onkeydown": ["left"]
                        },
                        "deactivated": {
                            "onkeyup": ["left"]
                        }
                    }
                },
                {
                    "name": "UpLeft",
                    "degrees": 315,
                    "neighbors": ["Left", "Up"],
                    "pipes": {
                        "activated": {
                            "onkeydown": ["left"]
                        },
                        "deactivated": {
                            "onkeyup": ["left"]
                        }
                    }
                }
            ]
        },
        {
            "name": "A",
            "control": "Button",
            "label": "A",
            "position": {
                "vertical": "bottom",
                "horizontal": "right",
                "offset": {
                    "left": "-1.56cm",
                    "top": "-2.8cm"
                }
            },
            "pipes": {
                "activated": {
                    "onkeydown": ["up"]
                },
                "deactivated": {
                    "onkeyup": ["up"]
                }
            }
        },
        {
            "name": "B",
            "control": "Button",
            "label": "B",
            "position": {
                "vertical": "bottom",
                "horizontal": "right",
                "offset": {
                    "left": "-2.8cm",
                    "top": "-1.56cm"
                }
            },
            "pipes": {
                "activated": {
                    "onkeydown": ["sprint"]
                },
                "deactivated": {
                    "onkeyup": ["sprint"]
                }
            }
        },
        {
            "name": "Start",
            "control": "Button",
            "label": "Start",
            "styles": {
                "elementInner": {
                    "style": {
                        "width": "7em",
                        "height": "auto",
                        "padding": ".21cm",
                        "borderRadius": "7px",
                        "fontSize": "77%"
                    }
                }
            },
            "position": {
                "vertical": "bottom",
                "horizontal": "center",
                "offset": {
                    "top": "-1.12cm"
                }
            },
            "pipes": {
                "activated": {
                    "onmousedown": ["rightclick"]
                }
            }
        }
    ]
};
