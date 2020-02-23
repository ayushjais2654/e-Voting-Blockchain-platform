import React from 'react';
import Particles from "react-particles-js";
import './App.css'

const divStyle={
    "margin":"0",
    "padding":"0",
    "fontFamily":"sans-serif",
    "background":"gray",
    "height":"100%",
    "width":"100%",
    "position":"fixed",
    "zIndex":"-1",
    "top":"0",
    "left":"0"
};

const particleOpt2={
    "particles": {
        "number": {
            "value": 40,
            "density": {
                "enable": true,
                "value_area": 600
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 1,
                "color": "#ffffff"
            },
            "polygon": {
                "nb_sides": 6
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },

        "opacity": {
            "value": 0.4,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 4,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 100,
            "color": "#ffffff",
            "opacity": 0.5,
            "width": 1,
            "condensed_mode": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 600
            }
        },
        "move": {
            "enable": true,
            "speed": 5,
            "direction": "bottom",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": [
                    "grab",
                    "bubble"
                ]
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 0.2
                }
            },
            "bubble": {
                "distance": 600,
                "size": 12,
                "duration": 1,
                "opacity": 0.8,
                "speed": 2
            },
            "repulse": {
                "distance": 400,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 20
            },
            "remove": {
                "particles_nb": 10
            }
        }
    },
    "retina_detect": true
};

class Background extends React.Component{

    render() {
            return (
                <div style={divStyle}>
                    <Particles params={particleOpt2} />
                </div>
            );
    }
}

export default Background;