import './style.css';
import { splitImage } from './lib/splitImage';

const MARGIN_SIZE = 20;
const WIDTH = 640;
const HEIGHT = 480;
const IMAGE_PATH = `https://picsum.photos/${WIDTH}/${HEIGHT}`;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div id="app">
<img src="https://picsum.photos/640/480" />
<div id="result"></div>
</div>
`;

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

splitImage(IMAGE_PATH, MARGIN_SIZE);
