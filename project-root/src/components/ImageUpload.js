//project-root/src/components/ImageUpload.js
import * as utilities from '../utils/utils.js'
import * as imgTools from '../services/ImageService.js'
const DATA = {}

const IMAGE_FILE_BACKUP = new Image()
export function initImageInputLayout(idName) {
    const imageInput = utilities.createImageInput(idName);
    const mainContainer = document.getElementById('appContainer');
    const inputFlexContainer = utilities.createFlexContainer(idName);
    const inputBlockContainer = utilities.createBlockContainer(idName);


    mainContainer.appendChild(inputFlexContainer);
    inputFlexContainer.appendChild(inputBlockContainer);
    inputBlockContainer.appendChild(imageInput);
    const imageInputLabel = utilities.createInputLabel(idName);
    inputBlockContainer.appendChild(imageInputLabel);
}

export function initPreviewLayout() {
    utilities.clearChildren('appContainer');
    utilities.createCanvasElement("previewCanvas");
    utilities.setupCanvas("previewCanvas");
}

function handleImageLoad(image) {
    initPreviewLayout(); // Setup canvas and clear the app container 

    // Access the canvas to draw
    const previewCanvas = document.getElementById('previewCanvas');
    const previewCtx = previewCanvas.getContext('2d');
    if (image instanceof HTMLCanvasElement || HTMLImageElement) {
        previewCtx.drawImage(image, 0, 0, previewCanvas.width, previewCanvas.height);
    }
    else if (image instanceof ImageData) {
        previewCtx.putImageData(image, 0, 0, previewCanvas.width, previewCanvas.height);
    }
}



export function processImageInput(event) {
    const inputElement = event.target; // The input element that triggered the change
    const mainContainer = document.getElementById('appContainer'); // As
    const file = inputElement.files[0];

    if (file.type === 'image/tiff') {
        handleUnsupportedImageType();
    }
    const masterImageElement = document.createElement('img');
    masterImageElement.id = `masterImageElement`;
    masterImageElement.style.display = 'none';
    mainContainer.appendChild(masterImageElement);
    const previewImage = new Image();
    DATA.imageFile = new Image();
    DATA.imageFile.src = URL.createObjectURL(file);
    DATA.imageFile.onload = function () {
        IMAGE_FILE_BACKUP.src = URL.createObjectURL(file);
    };
    IMAGE_FILE_BACKUP.onload = function () {
        previewImage.src = URL.createObjectURL(file);
    };
    previewImage.onload = function () {
        const resizedPreviewImage = imgTools.resizePreviewImage(previewImage, 600)
        handleImageLoad(resizedPreviewImage); // Pass the loaded image 
    };

}
