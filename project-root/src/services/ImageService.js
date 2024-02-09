import * as utilities from '../utils/utils.js'

export function resizePreviewImage(
    imageData,
    maxWidth,
    maxHeight = null,
    useBicubic = true,
) {
    if (!maxHeight) {
        maxHeight = maxWidth * (imageData.height / imageData.width);
    }

    const scaleRatio = Math.min(
        maxWidth / imageData.width,
        maxHeight / imageData.height,
    );
    const newWidth = Math.round(imageData.width * scaleRatio);
    const newHeight = Math.round(imageData.height * scaleRatio);

    const xOffset = (maxWidth - newWidth) / 2;
    const yOffset = (maxHeight - newHeight) / 2;

    const canvas = utilities.createCanvasElement(`tempcanvas`, maxWidth, maxHeight);
    const ctx = canvas.getContext('2d');

    if ('transferToImageBitmap' in window && useBicubic) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
    } else if (useBicubic) {
        console.warn(
            'Bicubic interpolation not fully supported with standard canvas.',
        );
    }

    ctx.drawImage(
        imageData,
        0,
        0,
        imageData.width,
        imageData.height,
        xOffset,
        yOffset,
        newWidth,
        newHeight,
    );
    return canvas;
}