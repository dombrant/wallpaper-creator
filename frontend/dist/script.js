import getDimensions from"./getDimensions.js";import getImage from"./getImage.js";import activateSpinner from"./activateSpinner.js";import sendRequest from"./sendRequest.js";import showWallpaper from"./showWallpaper.js";document.querySelector("button").addEventListener("click",async()=>{try{const{width:e,height:t}=getDimensions(),i=await getImage();activateSpinner();const s=await sendRequest(i,e,t);showWallpaper(s.file)}catch(e){return e}});