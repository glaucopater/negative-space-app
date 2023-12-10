import './style.css';

import packageJson from '../package.json';
import { splitImage } from './lib/splitImage';

const searchParams = new URLSearchParams(document.location.search);

const getParam = (key: string, defaultValue: any, minValue = -Infinity) => {
  const value = Number(searchParams.get(key));
  return value > minValue ? value : defaultValue;
};

const WIDTH = getParam('width', 640, 100);
const HEIGHT = getParam('height', 480, 100);
const MARGIN_SIZE = getParam('margin', 20, 0);
const IMAGE_PATH = searchParams.get('src') || `https://picsum.photos/${WIDTH}/${HEIGHT}`;
const BG_COLOR = searchParams.get('bgcolor')
  ? decodeURIComponent(searchParams.get('bgcolor') as string)
  : '#111';

const appDiv = document.querySelector<HTMLDivElement>('#app');
if (appDiv) {
  appDiv.innerHTML = `
    <div id="app">
      <h2><a href="/">${packageJson.description}</a></h2>
      <p class="helpBtn">Help ℹ️</p>
      <div class="container">
      <img src="${IMAGE_PATH}" width="${WIDTH}" height="${HEIGHT}" />
      <div id="result"></div>
      </div>
    </div>
    <div id="helpModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>How to use query string parameters:</h2>
        <ul>
          <li><strong>width</strong>: Sets the width of the image. Minimum value is 100.</li>
          <li><strong>height</strong>: Sets the height of the image. Minimum value is 100.</li>
          <li><strong>margin</strong>: Sets the margin size. Minimum value is 0.</li>
          <li><strong>src</strong>: Sets the image source URL.</li>
          <li><strong>bgcolor</strong>: Sets the background color. Hex format is allowed replacing # with %23</li>
        </ul>
        <p>Example: <a href='/?width=800&height=600&margin=10&bgcolor=%23FFFFFF'>/?width=800&height=600&margin=10&bgcolor=%23FFFFFF</>
        </p>
      </div>
    </div>
  `;
}

// Open the modal
document.querySelector('.helpBtn')?.addEventListener('click', () => {
  const helpModal = document.querySelector('#helpModal');
  if (helpModal) {
    (helpModal as HTMLElement).style.display = 'block';
  }
});

// Close the modal
document.querySelector('.close')?.addEventListener('click', () => {
  const helpModal = document.querySelector('#helpModal');
  if (helpModal) {
    (helpModal as HTMLElement).style.display = 'none';
  }
});

splitImage(IMAGE_PATH, MARGIN_SIZE, BG_COLOR);
