export async function splitImage(
  IMAGE_PATH: string,
  MARGIN_SIZE: number,
  BG_COLOR: string,
) {
  // Load the original image
  const originalImage = new Image();
  originalImage.src = IMAGE_PATH;
  await new Promise((resolve) => {
    originalImage.onload = resolve;
  });

  // Get the original image dimensions
  const { width: originalWidth, height: originalHeight } = originalImage;

  // Determine the size of each tile
  const tileWidth = originalWidth / 3;
  const tileHeight = originalHeight / 3;

  // Create the new image with negative space
  const newCanvas = document.createElement('canvas');

  newCanvas.width = originalWidth + MARGIN_SIZE * 2;
  newCanvas.height = originalHeight + MARGIN_SIZE * 2;
  const newCtx = newCanvas.getContext('2d');
  newCtx!.fillStyle = BG_COLOR;
  newCtx!.fillRect(0, 0, newCanvas.width, newCanvas.height);

  // Draw the tiles on the new image
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Create a canvas for the current tile
      const tileCanvas = document.createElement('canvas');
      tileCanvas.width = tileWidth;
      tileCanvas.height = tileHeight;
      const tileCtx = tileCanvas.getContext('2d');

      // Draw the current tile on the canvas

      tileCtx!.drawImage(
        originalImage,
        j * tileWidth,
        i * tileHeight,
        tileWidth,
        tileHeight,
        0,
        0,
        tileWidth,
        tileHeight,
      );

      tileCtx!.fillStyle = BG_COLOR;
      tileCtx!.fillRect(0, 0, tileWidth, MARGIN_SIZE);
      tileCtx!.fillRect(0, 0, MARGIN_SIZE, tileHeight);
      tileCtx!.fillRect(0, tileHeight - MARGIN_SIZE, tileWidth, MARGIN_SIZE);
      tileCtx!.fillRect(tileWidth - MARGIN_SIZE, 0, tileWidth, tileHeight);

      addCustomElementContainer(tileCanvas);
    }
  }
}

function addCustomElementContainer(newContent: HTMLCanvasElement) {
  const container = document.getElementById('result');
  if (container) container.appendChild(newContent);
}
