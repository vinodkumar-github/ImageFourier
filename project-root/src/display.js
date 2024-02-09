//project-root/src/display.js
import * as utilities from './utils/utils.js';
import * as imageLoad from './components/ImageUpload.js'

export function setupUI() {
    imageLoad.initImageInputLayout("imageInput");
    const imageInput = document.getElementById("imageInput");
    imageInput.addEventListener('change', imageLoad.processImageInput);
}

