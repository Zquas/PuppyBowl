/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/ajaxHelpers.js":
/*!*******************************!*\
  !*** ./client/ajaxHelpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAllPlayers": () => (/* binding */ fetchAllPlayers),
/* harmony export */   "fetchSinglePlayer": () => (/* binding */ fetchSinglePlayer),
/* harmony export */   "addNewPlayer": () => (/* binding */ addNewPlayer),
/* harmony export */   "removePlayer": () => (/* binding */ removePlayer)
/* harmony export */ });
// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2209-UNF-HY-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;


const fetchAllPlayers = async () => {
    try {
      const response = await fetch(`${APIURL}players`, { method: 'GET'});
      const result = await response.json();
      if (result.error) {
          throw result.error;
      }
      return result.data.players;
    } catch (error) {
      console.error('Uh oh, trouble fetching players!', error);
    }
  };

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(
          `${APIURL}/players/${playerId}`
        );
        const result = await response.json();
        console.log(result);
        if (result.error) {
            throw result.error;
        }
        return await result.data.player;
    } catch (error) {
        console.error('Uh oh, trouble fetching playerId!', error);
      }
};

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(
          `${APIURL}/players/`,
          {
            method: 'POST',
            body: JSON.stringify(playerObj),
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        const result = await response.json();
        console.log(result);
        return result;
      } catch (err) {
        console.error(err);
      }
};

const removePlayer = async (playerId) => {
    fetch(`${APIURL}/players/${playerId}`, {
    method: 'DELETE',
  });
  try {
    const response = await fetch(
      `${APIURL}/players/1`,
      {
        method: 'DELETE',
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};


/***/ }),

/***/ "./client/renderHelpers.js":
/*!*********************************!*\
  !*** ./client/renderHelpers.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAllPlayers": () => (/* binding */ renderAllPlayers),
/* harmony export */   "renderSinglePlayer": () => (/* binding */ renderSinglePlayer),
/* harmony export */   "renderNewPlayerForm": () => (/* binding */ renderNewPlayerForm)
/* harmony export */ });
/* harmony import */ var _ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers */ "./client/ajaxHelpers.js");


const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

const renderAllPlayers = (playerList) => {
  // First check if we have any data before trying to render it!
  if (!playerList || !playerList.length) {
    playerContainer.innerHTML = '<h3>No players to display!</h3>';
    return;
  }

  // Loop through the list of players, and construct some HTML to display each one
  let playerContainerHTML = '';
  for (let i = 0; i < playerList.length; i++) {
    const pup = playerList[i];
    let pupHTML = `
      <div class="single-player-card">
        <div class="header-info">
          <p class="pup-title">${pup.name}</p>
          <p class="pup-number">#${pup.id}</p>
        </div>
        <img src="${pup.imageUrl}" alt="photo of ${pup.name} the puppy">
        <button class="detail-button" data-id=${pup.id}>See details</button>
        <button class="remove-button" data-id=${pup.id}>Remove Pup</button>
        </div>
    `;
    playerContainerHTML += pupHTML;
  }

  // After looping, fill the `playerContainer` div with the HTML we constructed above
  playerContainer.innerHTML = playerContainerHTML;

  // Now that the HTML for all players has been added to the DOM,
  // we want to grab those "See details" buttons on each player
  // and attach a click handler to each one
  let detailButtons = [...document.getElementsByClassName('detail-button')];
  for (let i = 0; i < detailButtons.length; i++) {
    const button = detailButtons[i];
    button.addEventListener('click', async () => {
      const getSinglePlayer = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchSinglePlayer)(button.dataset.id);
      renderSinglePlayer(getSinglePlayer);
    });
  }
  let removeButtons = [...document.getElementsByClassName('remove-button')];
  for (let i = 0; i < removeButtons.length; i++) {
    const button = removeButtons[i];
    button.addEventListener('click', async () => {
      const dataID = button.dataset.id
    await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.removePlayer)(dataID);
    const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)();
    renderAllPlayers(players);
    });
  }
};

const renderSinglePlayer = (playerObj) => {
  
  if (!playerObj || !playerObj.id) {
    playerContainer.innerHTML = "<h3>Couldn't find data for this player!</h3>";
    return;
  }

  let pupHTML = `
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : 'Unassigned'}</p>
      <p>Breed: ${playerObj.breed}</p>
      <img src="${playerObj.imageUrl}" alt="photo of ${
    playerObj.name
  } the puppy">
      <button id="see-all">Back to all players</button>
    </div>
  `;
  playerContainer.innerHTML = pupHTML;
  let returnButton = document.getElementById('see-all');
  returnButton.addEventListener('click', async () => {
    const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)();
    renderAllPlayers(players);
  });
};

const renderNewPlayerForm = () => {
  let formHTML = `
    <form>
      <label for="name">Name:</label>
      <input type="text" name="name" />
      <label for="breed">Breed:</label>
      <input type="text" name="breed" />
      <button type="submit">Submit</button>
    </form>
  `;
  newPlayerFormContainer.innerHTML = formHTML;

  let form = document.querySelector('#new-player-form > form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let playerData = {
      name: form.elements.name.value,
      breed: form.elements.breed.value
    }
    await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.addNewPlayer)(playerData);
    console.log("player created");
    const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)();
    renderAllPlayers(players);
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers */ "./client/ajaxHelpers.js");
/* harmony import */ var _renderHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderHelpers */ "./client/renderHelpers.js");



const init = async () => {
  const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)()
  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderAllPlayers)(players)

  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderNewPlayerForm)()
}

init()

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdXBweWJvd2wtd29ya3Nob3AvLi9jbGllbnQvYWpheEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wLy4vY2xpZW50L3JlbmRlckhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wLy4vY2xpZW50L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELFdBQVc7OztBQUcvRDtBQUNQO0FBQ0Esc0NBQXNDLE9BQU8sV0FBVyxlQUFlO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLGFBQWEsT0FBTyxXQUFXLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQLGFBQWEsT0FBTyxXQUFXLFNBQVM7QUFDeEM7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLFNBQVMsT0FBTztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RStGOztBQUUvRjtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxTQUFTO0FBQzFDLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0Esb0JBQW9CLGFBQWEsa0JBQWtCLFNBQVM7QUFDNUQsZ0RBQWdELE9BQU87QUFDdkQsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwwQkFBMEI7QUFDM0M7QUFDQTtBQUNBLG9DQUFvQywrREFBaUI7QUFDckQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGlCQUFpQiwwQkFBMEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsVUFBVSwwREFBWTtBQUN0QiwwQkFBMEIsNkRBQWU7QUFDekM7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZUFBZTtBQUM5QyxpQ0FBaUMsYUFBYTtBQUM5QztBQUNBLGlCQUFpQixvREFBb0Q7QUFDckUsa0JBQWtCLGdCQUFnQjtBQUNsQyxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw2REFBZTtBQUN6QztBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsMERBQVk7QUFDdEI7QUFDQSwwQkFBMEIsNkRBQWU7QUFDekM7QUFDQSxHQUFHO0FBQ0gsRTs7Ozs7O1VDOUdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ04rQztBQUN3Qjs7QUFFdkU7QUFDQSx3QkFBd0IsNkRBQWU7QUFDdkMsRUFBRSxpRUFBZ0I7O0FBRWxCLEVBQUUsb0VBQW1CO0FBQ3JCOztBQUVBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFkZCB5b3VyIGNvaG9ydCBuYW1lIHRvIHRoZSBjb2hvcnROYW1lIHZhcmlhYmxlIGJlbG93LCByZXBsYWNpbmcgdGhlICdDT0hPUlQtTkFNRScgcGxhY2Vob2xkZXJcclxuY29uc3QgY29ob3J0TmFtZSA9ICcyMjA5LVVORi1IWS1XRUItUFQnO1xyXG4vLyBVc2UgdGhlIEFQSVVSTCB2YXJpYWJsZSBmb3IgZmV0Y2ggcmVxdWVzdHNcclxuY29uc3QgQVBJVVJMID0gYGh0dHBzOi8vZnNhLXB1cHB5LWJvd2wuaGVyb2t1YXBwLmNvbS9hcGkvJHtjb2hvcnROYW1lfS9gO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEFsbFBsYXllcnMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0FQSVVSTH1wbGF5ZXJzYCwgeyBtZXRob2Q6ICdHRVQnfSk7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgaWYgKHJlc3VsdC5lcnJvcikge1xyXG4gICAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXN1bHQuZGF0YS5wbGF5ZXJzO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignVWggb2gsIHRyb3VibGUgZmV0Y2hpbmcgcGxheWVycyEnLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaFNpbmdsZVBsYXllciA9IGFzeW5jIChwbGF5ZXJJZCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICAgICAgYCR7QVBJVVJMfS9wbGF5ZXJzLyR7cGxheWVySWR9YFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhd2FpdCByZXN1bHQuZGF0YS5wbGF5ZXI7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VoIG9oLCB0cm91YmxlIGZldGNoaW5nIHBsYXllcklkIScsIGVycm9yKTtcclxuICAgICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZE5ld1BsYXllciA9IGFzeW5jIChwbGF5ZXJPYmopID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgICAgICAgIGAke0FQSVVSTH0vcGxheWVycy9gLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGxheWVyT2JqKSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbW92ZVBsYXllciA9IGFzeW5jIChwbGF5ZXJJZCkgPT4ge1xyXG4gICAgZmV0Y2goYCR7QVBJVVJMfS9wbGF5ZXJzLyR7cGxheWVySWR9YCwge1xyXG4gICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICB9KTtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgICAgYCR7QVBJVVJMfS9wbGF5ZXJzLzFgLFxyXG4gICAgICB7XHJcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgfVxyXG59O1xyXG4iLCJpbXBvcnQgeyBhZGROZXdQbGF5ZXIsIHJlbW92ZVBsYXllciwgZmV0Y2hBbGxQbGF5ZXJzLCBmZXRjaFNpbmdsZVBsYXllciB9IGZyb20gJy4vYWpheEhlbHBlcnMnO1xyXG5cclxuY29uc3QgcGxheWVyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbC1wbGF5ZXJzLWNvbnRhaW5lcicpO1xyXG5jb25zdCBuZXdQbGF5ZXJGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1wbGF5ZXItZm9ybScpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlckFsbFBsYXllcnMgPSAocGxheWVyTGlzdCkgPT4ge1xyXG4gIC8vIEZpcnN0IGNoZWNrIGlmIHdlIGhhdmUgYW55IGRhdGEgYmVmb3JlIHRyeWluZyB0byByZW5kZXIgaXQhXHJcbiAgaWYgKCFwbGF5ZXJMaXN0IHx8ICFwbGF5ZXJMaXN0Lmxlbmd0aCkge1xyXG4gICAgcGxheWVyQ29udGFpbmVyLmlubmVySFRNTCA9ICc8aDM+Tm8gcGxheWVycyB0byBkaXNwbGF5ITwvaDM+JztcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIExvb3AgdGhyb3VnaCB0aGUgbGlzdCBvZiBwbGF5ZXJzLCBhbmQgY29uc3RydWN0IHNvbWUgSFRNTCB0byBkaXNwbGF5IGVhY2ggb25lXHJcbiAgbGV0IHBsYXllckNvbnRhaW5lckhUTUwgPSAnJztcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IHB1cCA9IHBsYXllckxpc3RbaV07XHJcbiAgICBsZXQgcHVwSFRNTCA9IGBcclxuICAgICAgPGRpdiBjbGFzcz1cInNpbmdsZS1wbGF5ZXItY2FyZFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItaW5mb1wiPlxyXG4gICAgICAgICAgPHAgY2xhc3M9XCJwdXAtdGl0bGVcIj4ke3B1cC5uYW1lfTwvcD5cclxuICAgICAgICAgIDxwIGNsYXNzPVwicHVwLW51bWJlclwiPiMke3B1cC5pZH08L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGltZyBzcmM9XCIke3B1cC5pbWFnZVVybH1cIiBhbHQ9XCJwaG90byBvZiAke3B1cC5uYW1lfSB0aGUgcHVwcHlcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGV0YWlsLWJ1dHRvblwiIGRhdGEtaWQ9JHtwdXAuaWR9PlNlZSBkZXRhaWxzPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlbW92ZS1idXR0b25cIiBkYXRhLWlkPSR7cHVwLmlkfT5SZW1vdmUgUHVwPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG4gICAgcGxheWVyQ29udGFpbmVySFRNTCArPSBwdXBIVE1MO1xyXG4gIH1cclxuXHJcbiAgLy8gQWZ0ZXIgbG9vcGluZywgZmlsbCB0aGUgYHBsYXllckNvbnRhaW5lcmAgZGl2IHdpdGggdGhlIEhUTUwgd2UgY29uc3RydWN0ZWQgYWJvdmVcclxuICBwbGF5ZXJDb250YWluZXIuaW5uZXJIVE1MID0gcGxheWVyQ29udGFpbmVySFRNTDtcclxuXHJcbiAgLy8gTm93IHRoYXQgdGhlIEhUTUwgZm9yIGFsbCBwbGF5ZXJzIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBET00sXHJcbiAgLy8gd2Ugd2FudCB0byBncmFiIHRob3NlIFwiU2VlIGRldGFpbHNcIiBidXR0b25zIG9uIGVhY2ggcGxheWVyXHJcbiAgLy8gYW5kIGF0dGFjaCBhIGNsaWNrIGhhbmRsZXIgdG8gZWFjaCBvbmVcclxuICBsZXQgZGV0YWlsQnV0dG9ucyA9IFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkZXRhaWwtYnV0dG9uJyldO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGV0YWlsQnV0dG9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgYnV0dG9uID0gZGV0YWlsQnV0dG9uc1tpXTtcclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc3QgZ2V0U2luZ2xlUGxheWVyID0gYXdhaXQgZmV0Y2hTaW5nbGVQbGF5ZXIoYnV0dG9uLmRhdGFzZXQuaWQpO1xyXG4gICAgICByZW5kZXJTaW5nbGVQbGF5ZXIoZ2V0U2luZ2xlUGxheWVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBsZXQgcmVtb3ZlQnV0dG9ucyA9IFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZW1vdmUtYnV0dG9uJyldO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmVtb3ZlQnV0dG9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgYnV0dG9uID0gcmVtb3ZlQnV0dG9uc1tpXTtcclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc3QgZGF0YUlEID0gYnV0dG9uLmRhdGFzZXQuaWRcclxuICAgIGF3YWl0IHJlbW92ZVBsYXllcihkYXRhSUQpO1xyXG4gICAgY29uc3QgcGxheWVycyA9IGF3YWl0IGZldGNoQWxsUGxheWVycygpO1xyXG4gICAgcmVuZGVyQWxsUGxheWVycyhwbGF5ZXJzKTtcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJTaW5nbGVQbGF5ZXIgPSAocGxheWVyT2JqKSA9PiB7XHJcbiAgXHJcbiAgaWYgKCFwbGF5ZXJPYmogfHwgIXBsYXllck9iai5pZCkge1xyXG4gICAgcGxheWVyQ29udGFpbmVyLmlubmVySFRNTCA9IFwiPGgzPkNvdWxkbid0IGZpbmQgZGF0YSBmb3IgdGhpcyBwbGF5ZXIhPC9oMz5cIjtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGxldCBwdXBIVE1MID0gYFxyXG4gICAgPGRpdiBjbGFzcz1cInNpbmdsZS1wbGF5ZXItdmlld1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWluZm9cIj5cclxuICAgICAgICA8cCBjbGFzcz1cInB1cC10aXRsZVwiPiR7cGxheWVyT2JqLm5hbWV9PC9wPlxyXG4gICAgICAgIDxwIGNsYXNzPVwicHVwLW51bWJlclwiPiMke3BsYXllck9iai5pZH08L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8cD5UZWFtOiAke3BsYXllck9iai50ZWFtID8gcGxheWVyT2JqLnRlYW0ubmFtZSA6ICdVbmFzc2lnbmVkJ308L3A+XHJcbiAgICAgIDxwPkJyZWVkOiAke3BsYXllck9iai5icmVlZH08L3A+XHJcbiAgICAgIDxpbWcgc3JjPVwiJHtwbGF5ZXJPYmouaW1hZ2VVcmx9XCIgYWx0PVwicGhvdG8gb2YgJHtcclxuICAgIHBsYXllck9iai5uYW1lXHJcbiAgfSB0aGUgcHVwcHlcIj5cclxuICAgICAgPGJ1dHRvbiBpZD1cInNlZS1hbGxcIj5CYWNrIHRvIGFsbCBwbGF5ZXJzPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICBgO1xyXG4gIHBsYXllckNvbnRhaW5lci5pbm5lckhUTUwgPSBwdXBIVE1MO1xyXG4gIGxldCByZXR1cm5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VlLWFsbCcpO1xyXG4gIHJldHVybkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHBsYXllcnMgPSBhd2FpdCBmZXRjaEFsbFBsYXllcnMoKTtcclxuICAgIHJlbmRlckFsbFBsYXllcnMocGxheWVycyk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyTmV3UGxheWVyRm9ybSA9ICgpID0+IHtcclxuICBsZXQgZm9ybUhUTUwgPSBgXHJcbiAgICA8Zm9ybT5cclxuICAgICAgPGxhYmVsIGZvcj1cIm5hbWVcIj5OYW1lOjwvbGFiZWw+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCIgLz5cclxuICAgICAgPGxhYmVsIGZvcj1cImJyZWVkXCI+QnJlZWQ6PC9sYWJlbD5cclxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImJyZWVkXCIgLz5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U3VibWl0PC9idXR0b24+XHJcbiAgICA8L2Zvcm0+XHJcbiAgYDtcclxuICBuZXdQbGF5ZXJGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9IGZvcm1IVE1MO1xyXG5cclxuICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctcGxheWVyLWZvcm0gPiBmb3JtJyk7XHJcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgbGV0IHBsYXllckRhdGEgPSB7XHJcbiAgICAgIG5hbWU6IGZvcm0uZWxlbWVudHMubmFtZS52YWx1ZSxcclxuICAgICAgYnJlZWQ6IGZvcm0uZWxlbWVudHMuYnJlZWQudmFsdWVcclxuICAgIH1cclxuICAgIGF3YWl0IGFkZE5ld1BsYXllcihwbGF5ZXJEYXRhKTtcclxuICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNyZWF0ZWRcIik7XHJcbiAgICBjb25zdCBwbGF5ZXJzID0gYXdhaXQgZmV0Y2hBbGxQbGF5ZXJzKCk7XHJcbiAgICByZW5kZXJBbGxQbGF5ZXJzKHBsYXllcnMpO1xyXG4gIH0pO1xyXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZmV0Y2hBbGxQbGF5ZXJzIH0gZnJvbSAnLi9hamF4SGVscGVycydcclxuaW1wb3J0IHsgcmVuZGVyQWxsUGxheWVycywgcmVuZGVyTmV3UGxheWVyRm9ybSB9IGZyb20gJy4vcmVuZGVySGVscGVycydcclxuXHJcbmNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVycyA9IGF3YWl0IGZldGNoQWxsUGxheWVycygpXHJcbiAgcmVuZGVyQWxsUGxheWVycyhwbGF5ZXJzKVxyXG5cclxuICByZW5kZXJOZXdQbGF5ZXJGb3JtKClcclxufVxyXG5cclxuaW5pdCgpXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=