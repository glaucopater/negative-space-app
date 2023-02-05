import './style.css';
import { splitImage } from './lib/splitImage';

const searchParams = new URLSearchParams(document.location.search);

// bare minimun of 100px x 100px
const WIDTH =
  searchParams.has('width') && Number(searchParams.get('width')) > 100
    ? searchParams.get('width')
    : 640;
const HEIGHT =
  searchParams.has('height') && Number(searchParams.get('height')) > 100
    ? Number(searchParams.get('height'))
    : 480;
const MARGIN_SIZE =
  searchParams.has('margin') && Number(searchParams.get('margin')) > 0
    ? Number(searchParams.get('margin'))
    : 20;
const IMAGE_PATH =
  searchParams.has('src') && searchParams.get('src')
    ? searchParams.get('src')!
    : `https://picsum.photos/${WIDTH}/${HEIGHT}`;
const BG_COLOR =
  searchParams.has('bgcolor') && searchParams.get('bgcolor')
    ? String(searchParams.get('bgcolor'))!
    : '#111';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div id="app">
<img src="${IMAGE_PATH}" width="640" height="480" />
<div id="result"></div>
</div>
`;

splitImage(IMAGE_PATH, MARGIN_SIZE, BG_COLOR);
