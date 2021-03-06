var defaults = require("../core/init.js").defaults;
var force = require("../core/init.js").force_layout;
var switchToFullScreen = require("./fullscreen").switchToFullScreen;

/*
if(localStorage.getItem("directed") == 1) {
  document.querySelector("#directed").checked = true;
  document.querySelector("#undirected").checked = false;
} 
else {
  document.querySelector("#directed").checked = false;
  document.querySelector("#undirected").checked = true;
}
*/

// directed.onclick = function() {
//   localStorage.setItem("directed", Number(1));
//   window.location.reload();
// };

// undirected.onclick = function() {
//   localStorage.setItem("directed", Number(0));
//   window.location.reload();
// };

// function setDirectionUnchecked() {
//   document.querySelector("#directed").checked = false;
//   document.querySelector("#undirected").checked = false;
// }

function startStopForce() {
  //start force directed layout
  if(!document.querySelector("#forceLayoutSwitch").checked) {
    // document.querySelector("#updateAllNodesButton").style.visibility="hidden";
    // document.querySelector("#chosenHideNodeButton").style.visibility="hidden";
    // document.querySelector("#chosenUpdateNodeButton").style.visibility="hidden";
    force.fdLoop();
  }
  //stop force directed layout
  else {
    // document.querySelector("#updateAllNodesButton").style.visibility="visible";
    // document.querySelector("#chosenHideNodeButton").style.visibility="visible";
    // document.querySelector("#chosenUpdateNodeButton").style.visibility="visible";
    force.fdStop();
  }
}

function startStopHistory() {
  if(!document.querySelector("#historySwitch").checked) {
    console.log("History OFF...");
    // force.fdLoop();
  }
  else {
    console.log("History ON...");
    // force.fdStop();
  }
}

// document.querySelector("#node_size_input").addEventListener('input', function(event) {
//   var new_node_size = document.querySelector("#node_size_input").value;
//   defaults.node_size = new_node_size;
//   document.querySelector("#node_size").innerHTML = new_node_size;
// });



// document.querySelector("#force_speed").addEventListener('input', function(event) {
//   var speed = +document.querySelector("#force_speed").value;
//   force.speed = speed;
//   document.querySelector("#force_speed_display").innerHTML = speed;
// });



/**
 * A vew standard view functions
 */

var globals = require("../core/init.js").globals;


window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
    globals.camera.aspect = window.innerWidth / window.innerHeight;
    globals.camera.updateProjectionMatrix();
    globals.renderer.setSize( window.innerWidth, window.innerHeight );
}

/**
 * @todo when re-writing all this in ES6 / Typescript, replace with import
 */
const IMG_PREFIX = document.location.hostname === 'localhost' ? '../../img/' : '/GraphiniusVis/img/';

/**
 * BG control event listeners
 */
let style = {
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${IMG_PREFIX}tron_grid.jpg)`,
  backgroundSize: "cover",
  backgroundPosition: "50% 50%",
  backgroundAttachment: "fixed"
};

let bgOnOffButton = document.querySelector("#bg-on-off-button");
bgOnOffButton.addEventListener('click', (e) => {
  e.target.classList.toggle('on');
  let on = e.target.classList.contains('on');
  e.target.innerHTML = on ? "ON" : "OFF";
  let bgc = document.querySelector("#bg-cover");
  if (on) {
    Object.assign(bgc.style, style);
  } else {
    bgc.style.background = "#111";
  }
});

document.querySelector("#bg-brightness").addEventListener('input', (e) => {
  let brightness = 1 - e.target.value/100;
  style.backgroundImage = `linear-gradient(rgba(0, 0, 0, ${brightness}), rgba(0, 0, 0, ${brightness})), url(${IMG_PREFIX}tron_grid.jpg)`
  let cover = document.querySelector("#bg-cover");
  Object.assign(cover.style, style);
});

document.querySelector("#bg-blur").addEventListener('input', (e) => {
  let blur = e.target.value/5;
  document.querySelector("#bg-cover").style.filter = `blur(${blur}px)`;
  document.querySelector("#bg-cover").style.webkitFilter = `blur(${blur}px)`;
});


module.exports = {
  startStopForce: startStopForce,
  startStopHistory: startStopHistory,
  // setDirectionUnchecked: setDirectionUnchecked
};