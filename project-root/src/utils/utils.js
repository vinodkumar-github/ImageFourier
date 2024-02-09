//project-root/src/utils/utils.js
import { defaultFlexContainerStyling, defaultBlockContainerStyling, inputLabelStyling, previewCanvasStyling, imagelabelStyling } from './styles.js';

function createElement(tag, id, style = {}) {
    const element = document.createElement(tag);
    element.id = id;
    Object.assign(element.style, style);
    return element;
}

function addHoverEffect(element, colorOnHover, colorOnLeave) {
    element.addEventListener(
        'mouseenter',
        () => (element.style.backgroundColor = colorOnHover),
    );
    element.addEventListener(
        'mouseleave',
        () => (element.style.backgroundColor = colorOnLeave),
    );
}

export function createImageInput(idName) {
    const imageInput = createElement('input', idName);
    imageInput.type = 'file';
    imageInput.accept = 'image/*';
    return imageInput;
}

export function createFlexContainer(idName) {
    return createElement('div', `${idName}flexContainer`, defaultFlexContainerStyling);
}

export function createBlockContainer(idName) {
    return createElement('div', `${idName}blockContainer`, defaultBlockContainerStyling);
}

export function createInputLabel(idName) {
    const inputElementLabel = createElement('label', `${idName}Label`, inputLabelStyling);
    const inputElement = document.getElementById(idName);
    inputElementLabel.htmlFor = `${idName}`;
    inputElement.style.display = 'none';
    inputElementLabel.innerText = 'Upload Image';
    addHoverEffect(inputElementLabel, '#085dcf', '#0d6efd');
    return inputElementLabel;
}
export function createImageElement(idName) {
    const imageElement = createElement('img', `${idName}Label`, imagelableStyling);

    imageElement.style.display = 'none';


    return imageElement;

}

export function clearChildren(elementID) {
    const Element = document.getElementById(`${elementID}`);
    while (Element.firstChild) {
        Element.removeChild(Element.firstChild);
    }
}

export function createCanvasElement(idName, width = null, height = null) {
    if (!(width || height)) {
        const flexContainerName = `${idName}FlexContainer`;
        const canvasFlexContainer = createFlexContainer(flexContainerName);
        const blockContainerName = `${idName}BlockContainer`;
        const canvasBlockContainer = createBlockContainer(blockContainerName);
        const mainContainer = document.getElementById('appContainer');
        mainContainer.appendChild(canvasFlexContainer);
        canvasFlexContainer.appendChild(canvasBlockContainer);
        const canvas = document.createElement('canvas');
        canvas.id = idName
        canvasBlockContainer.appendChild(canvas);
        canvas.width = 600;
        canvas.height = 600;
    }
    if (width && height) {
        const canvas =
            'transferToImageBitmap' in window
                ? new OffscreenCanvas(width, height)
                : document.createElement('canvas');

        if (!('transferToImageBitmap' in window) && canvas) {
            canvas.width = width;
            canvas.height = height;
        }

        return canvas;
    }

}

export function setupCanvas(mode, canvasId) {
    if (mode === 'preview') {
        const previewCanvas = document.getElementById(canvasId);
        const previewCtx = previewCanvas.getContext('2d');
        previewCanvas.classList.add('preview-canvas');
        previewCanvas.classList = previewCanvasStyling;
        previewCtx.fillStyle = 'black';
        previewCtx.fillRect(0, 0, previewCanvas.width, previewCanvas.height); // Use canvas dimensions
    }
    if (mode === 'display') {
        const displayCanvas = document.getElementById(`${canvasId}`);
        const displayCtx = displayCanvas.getContext('2d');
        const canvasBlockContainer = displayCanvas.parentElement;
    }
}
