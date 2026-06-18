const zoomIcon = `⇱⇲`;
const exitIcon = `<svg
  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
  <path d="M4 4V20C4 21.1 4.9 22 6 22H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M10 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  <path d="M16 8L20 12L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
const prevIcon = `<svg
  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
  <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  <path d="M11 6L5 12L11 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
const nextIcon = `<svg
  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  <path d="M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
const zoomInIcon = `<svg
  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
  <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
  <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>`;
const zoomOutIcon = `<svg
  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
  <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
  <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>`;
const prevChapterIcon = `<svg
  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
  <path d="M4 6C4 4.9 4.9 4 6 4H11V20H6C4.9 20 4 19.1 4 18V6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
  <path d="M11 4H18C19.1 4 20 4.9 20 6V18C20 19.1 19.1 20 18 20H11V4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
  <path d="M7.5 13V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  <path d="M5.5 11L7.5 9L9.5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
const nextChapterIcon = `<svg
  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
  <path d="M4 6C4 4.9 4.9 4 6 4H11V20H6C4.9 20 4 19.1 4 18V6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
  <path d="M11 4H18C19.1 4 20 4.9 20 6V18C20 19.1 19.1 20 18 20H11V4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
  <path d="M7.5 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  <path d="M5.5 11L7.5 13L9.5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
const rotateIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 20.5C6.80558 20.5 3 16.6944 3 12C3 7.30558 6.80558 3.5 11.5 3.5C16.1944 3.5 20 7.30558 20 12C20 13.5433 19.5887 14.9905 18.8698 16.238M22.5 15L18.8698 16.238M17.1747 12.3832L18.5289 16.3542L18.8698 16.238" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const switchReadModeIcon = `<svg width="24px" height="24px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
<path d="M30 10H40C41.8856 10 42.8284 10 43.4142 10.5858C44 11.1716 44 12.1144 44 14V34C44 35.8856 44 36.8284 43.4142 37.4142C42.8284 38 41.8856 38 40 38H30" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 10H8C6.11438 10 5.17157 10 4.58579 10.5858C4 11.1716 4 12.1144 4 14V34C4 35.8856 4 36.8284 4.58579 37.4142C5.17157 38 6.11438 38 8 38H18" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24 6V42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const playIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 6 L18 12 L8 18 Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const reverseIcon = `<svg width="24px" height="24px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)">
<path d="m6.5 6.5-4 4 4 4"/> <path d="m14.5 10.5h-12"/> <path d="m8.5.5 4 4-4 4"/> <path d="m12.5 4.5h-12"/> </g>
</svg>`;
const downloadIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<g id="Complete"> <g id="download"> <g>
<path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
<g>
<polyline data-name="Right" fill="none" id="Right-2" points="7.9 12.3 12 16.3 16.1 12.3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
<line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="2.7" y2="14.2"/>
</g> </g> </g>
</g>
</svg>`;
const resizeGridIcon = `<svg fill="currentColor" width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="resize"  enable-background="new 0 0 32 32" xml:space="preserve">
  <path d="M28 10V4h-6v2H10V4H4v6h2v12H4v6h6v-2h12v2h6v-6h-2V10H28zM24 6h2v2h-2V6zM6 6h2v2H6V6zM8 26H6v-2h2V26zM26 26h-2v-2h2V26zM24 22h-2v2H10v-2H8V10h2V8h12v2h2V22z"/>
  <polygon points="17,12 15,12 15,15 12,15 12,17 15,17 15,20 17,20 17,17 20,17 20,15 17,15 "/>
</svg>`;
const refetchNextIcon = `<svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M7.293 9.006l-.88.88A2.484 2.484 0 0 0 4 8a2.488 2.488 0 0 0-2.413 1.886l-.88-.88L0 9.712l1.147 1.146-.147.146v1H0v.999h1v.053c.051.326.143.643.273.946L0 15.294.707 16l1.1-1.099A2.873 2.873 0 0 0 4 16a2.875 2.875 0 0 0 2.193-1.099L7.293 16 8 15.294l-1.273-1.292A3.92 3.92 0 0 0 7 13.036v-.067h1v-.965H7v-1l-.147-.146L8 9.712l-.707-.706zM4 9.006a1.5 1.5 0 0 1 1.5 1.499h-3A1.498 1.498 0 0 1 4 9.006zm2 3.997A2.217 2.217 0 0 1 4 15a2.22 2.22 0 0 1-2-1.998v-1.499h4v1.499z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 2.41L5.78 2l9 6v.83L9 12.683v-1.2l4.6-3.063L6 3.35V7H5V2.41z"/></svg>`;
const openInNewTabIcon = `<svg height="24px" width="24px" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"  xml:space="preserve">
<g>
	<path class="st0" d="M96,0v416h416V0H96z M472,376H136V40h336V376z"/>
	<polygon class="st0" points="40,472 40,296 40,136 40,96 0,96 0,512 416,512 416,472 376,472 	"/>
	<polygon class="st0" points="232.812,312.829 350.671,194.969 350.671,279.766 390.671,279.766 390.671,126.688 237.594,126.688 
		237.594,166.688 322.39,166.688 204.531,284.547 	"/>
</g>
</svg>`;
const readIcon = `<svg width="24px" height="24px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M430.602 443.728H172.941v409.721h257.661l9.723 22.763h123.159l12.965-22.763h251.179V437.225z" fill="currentColor" /><path d="M563.484 888.712H440.325l-11.495-7.59-6.48-15.173H172.94l-12.5-12.5v-409.72l12.5-12.5H430.5l396.923-6.502 12.705 12.498V853.45l-12.5 12.5H583.714l-9.367 16.449-10.863 6.313z m-114.906-25h107.641l9.367-16.449 10.862-6.313h238.68V449.931l-384.525 6.298H185.44V840.95h245.162l11.495 7.59 6.481 15.172z" fill="currentColor" /><path d="M772.531 386.823s-221.458-42.273-266.298 50.402l-22.982 384.568h52.685l4.862-31.937h231.733V386.823z" fill="currentColor" /><path d="M535.936 831.793h-52.685l-9.982-10.597 22.981-384.568 0.98-3.759c11.444-23.653 33.769-41.182 66.351-52.099 24.92-8.351 56.024-12.892 92.449-13.499 61.296-1.015 116.074 9.29 118.376 9.729l8.125 9.822v403.034l-10 10H549.39l-3.568 23.441-9.886 8.496z m-42.07-20h33.477l3.568-23.441 9.886-8.495h221.734V395.259c-17.44-2.796-60.6-8.781-106.461-7.984-93.223 1.611-127.655 29.096-139.979 52.604l-22.225 371.914z" fill="currentColor" /><path d="M224.797 386.823H469.99v403.034H224.797z" fill="currentColor" /><path d="M469.99 799.856H224.797l-10-10V386.822l10-10H469.99l10 10v403.034l-10 10z m-235.193-20H459.99V396.822H234.797v383.034z" fill="currentColor" /><path d="M292.542 310.406s139.34 22.474 190.709 81.026c27.337 31.16 26.78 73.506 26.78 73.506v317.628c0 12.645-6.106 24.506-16.384 31.825l-10.396 7.403s0.118-26.71-27.886-44.677-162.823-66.744-162.823-66.744V310.406z" fill="currentColor" /><path d="M489.052 829.938l-15.801-8.189c-0.013-0.789-0.575-21.645-23.286-36.216-21.401-13.731-114.557-49.018-160.825-65.758l-6.598-9.403V310.406l11.593-9.872c5.834 0.94 143.502 23.743 196.634 84.304 29.188 33.269 29.287 77.311 29.262 80.148v317.579c0 15.851-7.694 30.793-20.583 39.971l-10.396 7.402z m-186.51-126.567c27.82 10.177 132.917 49.092 158.224 65.328 17.225 11.052 25.318 25.077 29.12 35.95a29.13 29.13 0 0 0 10.145-22.084l0.001-317.76c0.003-0.365 0.059-39.017-24.297-66.778-40.047-45.646-139.256-68.81-173.192-75.589v380.933zM610.066 444.946h123.76v27.902h-123.76zM610.066 510.959h123.76v27.902h-123.76zM665.936 689.082h62.532v27.902h-62.532zM633.087 194.47l16.4 11.448-80.858 115.834-16.4-11.448zM725.26 204.73l13.734 14.54L634.785 317.7l-13.733-14.539zM800.489 240.542l13.142 15.076-52.696 45.935-13.142-15.076zM468.638 187.397l27.52 56.292-17.968 8.784-27.52-56.292zM331.501 204.24l120.28 98.428-12.666 15.478-120.28-98.427zM243.412 238.813l42.402 17.49-7.626 18.488-42.402-17.49z" fill="currentColor" /></svg>`;
const optionsIcon = `<svg height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 52.93 52.93" xml:space="preserve">
<g>
	<circle style="fill:#010002;" cx="26.465" cy="25.59" r="4.462"/>
	<path style="fill:#010002;" d="M52.791,32.256c-0.187-1.034-1.345-2.119-2.327-2.492l-2.645-1.004 c-0.982-0.373-1.699-1.237-1.651-1.935c0.029-0.417,0.046-0.838,0.046-1.263c0-0.284-0.008-0.566-0.021-0.846 c-0.023-0.467,0.719-1.193,1.677-1.624l2.39-1.074c0.958-0.432,2.121-1.565,2.194-2.613c0.064-0.929-0.047-2.196-0.648-3.765 c-0.699-1.831-1.834-3.005-2.779-3.718c-0.839-0.633-2.423-0.595-3.381-0.163l-2.08,0.936c-0.958,0.431-2.274,0.119-3.025-0.616 c-0.177-0.174-0.356-0.343-0.54-0.509c-0.778-0.705-1.17-2-0.796-2.983l0.819-2.162c0.373-0.982,0.368-2.594-0.322-3.385 c-0.635-0.728-1.643-1.579-3.215-2.281c-1.764-0.788-3.346-0.811-4.483-0.639c-1.039,0.158-2.121,1.331-2.494,2.312l-0.946,2.491 c-0.373,0.982-0.798,1.775-0.949,1.771c-0.092-0.004-0.183-0.005-0.274-0.005c-0.622,0-1.238,0.03-1.846,0.09 c-1.016,0.1-2.176-0.507-2.607-1.465l-1.124-2.5c-0.431-0.959-1.538-2.21-2.589-2.227c-0.916-0.016-2.207,0.209-3.936,1.028 c-1.874,0.889-2.971,1.742-3.611,2.437c-0.712,0.771-0.554,2.416-0.122,3.374l1.481,3.296c0.431,0.958,0.256,2.266-0.324,2.979 c-0.579,0.714-1.786,1.033-2.768,0.661l-3.598-1.365c-0.982-0.373-2.65-0.476-3.406,0.256c-0.658,0.637-1.412,1.709-2.056,3.51 c-0.696,1.954-0.867,3.332-0.83,4.276c0.042,1.05,1.317,2.101,2.3,2.474l4.392,1.667c0.982,0.373,1.782,1.244,1.839,1.941 c0.055,0.699-0.635,1.61-1.593,2.042l-4.382,1.97c-0.958,0.431-2.211,1.539-2.227,2.589c-0.015,0.916,0.21,2.208,1.028,3.935 c0.89,1.874,1.742,2.971,2.437,3.611c0.773,0.713,2.417,0.554,3.375,0.123l4.698-2.112c0.958-0.432,2.076-0.412,2.525,0.013 s0.535,1.541,0.162,2.524L12.743,46.6c-0.373,0.982-0.476,2.65,0.256,3.404c0.638,0.659,1.709,1.414,3.51,2.057 c1.954,0.697,3.333,0.868,4.277,0.831c1.05-0.042,2.1-1.318,2.473-2.3l1.693-4.46c0.373-0.982,1.058-1.742,1.531-1.719 c0.284,0.014,0.57,0.021,0.857,0.021c0.134,0,0.266-0.001,0.398-0.005c0.219-0.007,0.747,0.762,1.178,1.721l1.963,4.364 c0.431,0.958,1.605,1.986,2.653,2.038c1.121,0.056,2.669-0.062,4.43-0.734c1.685-0.645,2.659-1.604,3.219-2.442 c0.584-0.873,0.388-2.517-0.044-3.475l-1.606-3.573c-0.431-0.958-0.169-2.191,0.527-2.824c0.693-0.633,2-0.9,2.981-0.526 l3.432,1.303c0.982,0.373,2.64,0.489,3.478-0.145c0.738-0.56,1.591-1.49,2.281-3.034C53.057,35.248,53.015,33.497,52.791,32.256z M26.465,39.79c-7.844,0-14.201-6.357-14.201-14.2s6.357-14.2,14.201-14.2c7.842,0,14.2,6.357,14.2,14.2 C40.666,33.433,34.307,39.79,26.465,39.79z"/>
</g>
</svg>`;
const imageIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z" fill="currentColor"/>
<path d="M4.80665 17.5211L9.1221 9.60947C9.50112 8.91461 10.4989 8.91461 10.8779 9.60947L14.0465 15.4186L15.1318 13.5194C15.5157 12.8476 16.4843 12.8476 16.8682 13.5194L19.1451 17.5039C19.526 18.1705 19.0446 19 18.2768 19H5.68454C4.92548 19 4.44317 18.1875 4.80665 17.5211Z" fill="currentColor"/>
<path d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z" fill="currentColor"/>
</svg>`;
const pauseAutoLoadIcon = `<svg fill="currentColor" width="24px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M0 26.016v-20q0-2.496 1.76-4.256t4.256-1.76h20q2.464 0 4.224 1.76t1.76 4.256v20q0 2.496-1.76 4.224t-4.224 1.76h-20q-2.496 0-4.256-1.76t-1.76-4.224zM4 26.016q0 0.832 0.576 1.408t1.44 0.576h20q0.8 0 1.408-0.576t0.576-1.408v-14.016h-24v14.016zM4 10.016h24v-4q0-0.832-0.576-1.408t-1.408-0.608h-20q-0.832 0-1.44 0.608t-0.576 1.408v4zM6.016 8v-1.984h1.984v1.984h-1.984zM10.016 8v-1.984h1.984v1.984h-1.984zM10.336 22.848l2.848-2.848-2.848-2.816 2.848-2.816 2.816 2.816 2.816-2.816 2.848 2.816-2.848 2.816 2.848 2.848-2.848 2.816-2.816-2.816-2.816 2.816zM14.016 8v-1.984h12v1.984h-12z"></path>
</svg>`;
const cherryPickIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 12.5L10.5 15L16 9M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const excludeIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const arrowRightIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 7L15 12L10 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
// 生成一个表示重新加载图片的svg，中间一个向下箭头，然后外面 包着一个圆形箭头
const reloadImageIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 18V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.93 4.93L7.76 7.76" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.24 16.24L19.07 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.93 19.07L7.76 16.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.24 7.76L19.07 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const icons = {
  zoomIcon,
  exitIcon,
  prevIcon,
  nextIcon,
  zoomInIcon,
  zoomOutIcon,
  prevChapterIcon,
  nextChapterIcon,
  rotateIcon,
  switchReadModeIcon,
  playIcon,
  reverseIcon,
  downloadIcon,
  resizeGridIcon,
  refetchNextIcon,
  openInNewTabIcon,
  readIcon,
  optionsIcon,
  imageIcon,
  pauseAutoLoadIcon,
  cherryPickIcon,
  excludeIcon,
  arrowRightIcon,
  reloadImageIcon,
}
export default icons;
