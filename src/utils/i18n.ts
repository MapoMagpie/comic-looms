import { KeyboardInBigImageModeId, KeyboardInFullViewGridId, KeyboardInMainId } from '../ui/event';


const getI18nIndex = (lang: string) => {
  if (lang.startsWith('zh')) return 1;
  if (lang.startsWith('ko')) return 2;
  if (lang.startsWith('es')) return 3;
  return 0; // en
};

const lang = navigator.language;
const i18nIndex = getI18nIndex(lang);

export class I18nValue extends Array<string> {
  constructor(langs: Langs) {
    super(...langs);
  }
  get() {
    return this[i18nIndex];
  }
}
type Langs = [string, string, string, string];

const i18nData = {
  // page-helper
  imageScale: [
    'SCALE',
    '缩放',
    '배율',
    'Escala'
  ],
  config: [
    'CONF',
    '配置',
    '설정',
    'Ajustes'
  ],
  chapters: [
    'CHAPTERS',
    '章节',
    '챕터',
    'Capítulos'
  ],
  filter: [
    'FILTER',
    '过滤',
    'FILTER',
    'FILTER'
  ],
  autoPagePlay: [
    'PLAY',
    '播放',
    '재생',
    'Reproducir'
  ],
  autoPagePause: [
    'PAUSE',
    '暂停',
    '일시 중지',
    'Pausar'
  ],
  collapse: [
    'FOLD',
    '收起',
    '접기',
    'Plegar'
  ],
  // config panel number option
  colCount: [
    'Columns',
    '每行数量',
    '열 수',
    'Columnas'
  ],
  colCountTooltip: [
    'The number of images per row in the thumbnail list. If the layout is Flow Vision, the final number of images per row will be influenced by the specific aspect ratio of the images.',
    '缩略图列表的每行图片数量。如果布局为自适应视图，最终每行图片数量受图片的具体宽高比影响。',
    '썸네일 목록에서 한 줄에 표시되는 이미지의 개수입니다. 레이아웃이 반응형인 경우, 최종 한 줄에 표시되는 이미지의 개수는 이미지의 구체적인 가로세로 비율에 영향을 받습니다.',
    'El número de imágenes por fila en la lista de miniaturas. Si el diseño es adaptable, el número final de imágenes por fila estará influenciado por la proporción de aspecto específica de las imágenes.'
  ],
  rowHeight: [
    'Row Height',
    '每行高度',
    '행 높이',
    'Altura de fila'
  ],
  rowHeightTooltip: [
    'This option is only effective when the layout of the thumbnail list is Flow Vision. The reference height per row, along with the number of images per row, jointly influences the final display effect.',
    '此项仅在缩略图列表的布局为自适应视图时有效。每行的参考高度，和每行数量共同影响最终的展示效果。',
    '이 옵션은 썸네일 목록의 레이아웃이 반응형일 때만 유효합니다. 각 행의 기준 높이는 행당 이미지 개수와 함께 최종 표시 결과에 영향을 미칩니다.',
    'Esta opción solo es efectiva cuando el diseño de la lista de miniaturas es adaptable. La altura de referencia por fila, junto con el número de imágenes por fila, influye en el efecto final de la visualización.'
  ],
  threads: [
    'Preload Threads',
    '最大同时加载',
    '동시 로드 수',
    'Hilos de pre-carga'
  ],
  threadsTooltip: [
    'Max Preload Threads',
    '大图浏览时，每次滚动到下一张时，预加载的图片数量，大于1时体现为越看加载的图片越多，将提升浏览体验。',
    '큰 이미지 모드에서 다음 이미지로 이동할 때 미리 로드할 이미지 수입니다.<br>이 값이 1보다 클 경우, 동시에 로드되는 이미지가 더 많아져서 사용 경험이 향상됩니다.',
    'Hilos máximos de pre-carga'
  ],
  downloadThreads: [
    'Download Threads',
    '最大同时下载',
    '최대 동시 다운로드',
    'Hilos de descarga'
  ],
  downloadThreadsTooltip: [
    'Max Download Threads, suggest: <5',
    '下载模式下，同时加载的图片数量，建议小于等于5',
    '다운로드 모드에서 동시에 다운로드할 이미지 수입니다. 5 이하로 설정하는 것이 좋습니다.',
    'Hilos máximos de descarga, sugerido: <5'
  ],
  paginationIMGCount: [
    'Images Per Page',
    '每页图片数量',
    '페이지당 이미지 수',
    'Imágenes por página'
  ],
  paginationIMGCountTooltip: [
    'In Pagination Read mode, the number of images displayed on each page',
    '当阅读模式为翻页模式时，每页展示的图片数量',
    '페이지 넘김 모드에서 각 페이지에 표시될 이미지 수입니다.',
    'En el modo de lectura por paginación, el número de imágenes mostradas en cada página'
  ],
  timeout: [
    'Timeout(second)',
    '超时时间(秒)',
    '이미지 로딩 시도 시간 (초)',
    'Tiempo de espera (segundos)'
  ],
  preventScrollPageTime: [
    'Min Paging Time',
    '最小翻页时间',
    '최소 페이지 넘김 시간',
    'Tiempo mínimo de paginación'
  ],
  preventScrollPageTimeTooltip: [
    'In Pagination read mode, prevent immediate page flipping when scrolling to the bottom/top to improve the reading experience.<br>Set to 0 to disable this feature,<br>If set to less than 0, page-flipping via scrolling is always disabled, except for the spacebar.<br>measured in milliseconds.',
    '当阅读模式为翻页模式时，滚动浏览时，阻止滚动到底部时立即翻页，提升阅读体验。<br>设置为0时则禁用此功能，单位为毫秒。<br>设置小于0时则永远禁止通过滚动的方式翻页。空格键除外。',
    '페이지 넘김 모드에서 아래/위로 스크롤 시 너무 빨리 페이지가 넘어가는 것을 방지하여 읽기 경험을 개선합니다.<br>0으로 설정하면 이 기능이 비활성화됩니다.<br>0보다 작은 값으로 설정하면 단축키를 제외하고 스크롤을 통한 페이지 넘김이 항상 비활성화됩니다. (밀리초 단위)',
    'En el modo de lectura por paginación, evita el cambio inmediato de página al desplazarse hacia el fondo o la parte superior para mejorar la experiencia de lectura.<br>Establezca en 0 para desactivar esta función,<br>Si se establece en menos de 0, el cambio de página mediante desplazamiento siempre está desactivado, excepto para la barra espaciadora.<br>Medido en milisegundos.'
  ],
  autoPageSpeed: [
    'Auto Paging Speed',
    '自动翻页速度',
    '자동 페이지 넘김 속도',
    'Velocidad de paginación automática'
  ],
  autoPageSpeedTooltip: [
    'In Pagination read mode, Auto Page Speed means how many seconds it takes to flip the page automatically.<br>In Continuous read mode, Auto Page Speed means the scrolling speed.',
    '当阅读模式为翻页模式时，自动翻页速度表示为多少秒后翻页。<br>当阅读模式为连续模式时，自动翻页速度表示为滚动速度。',
    '페이지 넘김 모드에서 자동 페이지 넘김 속도는 몇 초 후에 자동으로 페이지가 넘어갈지를 의미합니다.<br>연속 읽기 모드에서 자동 페이지 넘김 속도는 자동 스크롤 속도를 의미합니다.',
    'En el modo de lectura por paginación, la velocidad de página automática indica cuántos segundos toma cambiar la página automáticamente.<br>En el modo de lectura continua, la velocidad de página automática indica la velocidad de desplazamiento.'
  ],
  scrollingDelta: [
    'Scrolling Delta',
    '滚动距离',
    'Scrolling Delta',
    'Scrolling Delta'
  ],
  scrollingDeltaTooltip: [
    'During non-native scrolling (custom keyboard scrolling, horizontal scrolling), the distance of each scroll.',
    '非浏览器原生的滚动时（按键滚动、横向滚动），每次滚动的距离。',
    '비기본 스크롤(사용자 정의 키보드 스크롤, 가로 스크롤) 중 각 스크롤의 거리입니다.',
    'Durante el desplazamiento no nativo (desplazamiento con teclado personalizado, desplazamiento horizontal), la distancia de cada desplazamiento.'
  ],
  scrollingSpeed: [
    'Scrolling Speed',
    '滚动速度',
    '스크롤 속도',
    'Velocidad de desplazamiento'
  ],
  scrollingSpeedTooltip: [
    'During non-native scrolling (custom keyboard scrolling, horizontal scrolling), the speed of scrolling.',
    '非浏览器原生的滚动时（按键滚动、横向滚动），滚动的速度。',
    '비기본 스크롤(사용자 정의 키보드 스크롤, 가로 스크롤) 중 스크롤 속도입니다.',
    'Durante el desplazamiento no nativo (desplazamiento con teclado personalizado, desplazamiento horizontal), la velocidad de desplazamiento.'
  ],
  // config panel boolean option
  fetchOriginal: [
    'Raw Image',
    '最佳质量',
    '원본 이미지',
    'Imagen sin procesar'
  ],
  fetchOriginalTooltip: [
    'enable will download the original source, cost more traffic and quotas',
    '启用后，将加载未经过压缩的原档文件，下载打包后的体积也与画廊所标体积一致。<br>注意：这将消耗更多的流量与配额，请酌情启用。',
    '활성화하면 원본 파일이 다운로드됩니다. 더 많은 트래픽과 할당량이 소비됩니다.',
    'Activar descargará la fuente original, lo que consumirá más tráfico y cuotas'
  ],
  autoLoad: [
    'Auto Load',
    '自动加载',
    '자동 로드',
    'Carga automática'
  ],
  autoLoadTooltip: [
    'Automatically start loading images after entering this script\'s view',
    '进入本脚本的浏览模式后，即使不浏览也会一张接一张的加载图片。直至所有图片加载完毕。',
    '보기 모드에 진입하면, 사용자가 탐색 중이 아닐 때도 이미지가 하나씩 자동으로 로드됩니다. 모든 이미지가 로드될 때까지 계속됩니다.',
    'Comience a cargar imágenes automáticamente después de ingresar a la vista de este script.'
  ],
  reversePages: [
    'Reverse Pages',
    '反向翻页',
    '페이지 순서 뒤집기',
    'Revertir páginas'
  ],
  reversePagesTooltip: [
    'Clicking on the side navigation, if enable then reverse paging, which is a reading style similar to Japanese manga where pages are read from right to left.',
    '点击侧边导航时，是否反向翻页，反向翻页类似日本漫画那样的从右到左的阅读方式。',
    '측면 내비게이션을 클릭했을 때 이미지들을 거꾸로 배치할 지 선택합니다. 일본 만화처럼 오른쪽에서 왼쪽으로 읽는 스타일의 이미지에 적용하면 좋습니다.',
    'Hacer clic en la navegación lateral, si está habilitado, revertirá la paginación, que es un estilo de lectura similar al manga japonés, donde las páginas se leen de derecha a izquierda.'
  ],
  autoPlay: [
    'Auto Page',
    '自动翻页',
    '자동 페이지 넘김',
    'Paginación automática'
  ],
  autoPlayTooltip: [
    'Auto Page when entering the big image readmode.',
    '当阅读大图时，开启自动播放模式。',
    '이미지 크게 보기 모드에 들어가면 바로 자동 페이지 넘김을 활성화합니다.',
    'Paginación automática al entrar en el modo de lectura de imagen grande.'
  ],
  autoLoadInBackground: [
    'Keep Loading',
    '后台加载',
    '백그라운드 로딩',
    'Sigue cargando'
  ],
  autoLoadInBackgroundTooltip: [
    'Keep Auto-Loading after the tab loses focus',
    '当标签页失去焦点后保持自动加载。',
    '사용자가 다른 창을 볼 때도 자동 로딩을 계속합니다.',
    'Mantener la carga automática después de que la pestaña pierda el enfoque'
  ],
  autoOpen: [
    'Auto Open',
    '自动展开',
    '자동 이미지 열기',
    'Abrir automáticamente'
  ],
  autoOpenTooltip: [
    'Automatically open after the gallery page is loaded',
    '进入画廊页面后，自动展开阅读视图。',
    '갤러리 페이지가 로드된 후 첫 페이지를 자동으로 엽니다.',
    'Abrir automáticamente después de que la página de la galería se cargue'
  ],
  autoCollapsePanel: [
    'Auto Fold Control Panel',
    '自动收起控制面板',
    '설정 창 자동으로 닫기',
    'Plegar automáticamente el panel de control'
  ],
  autoCollapsePanelTooltip: [
    'When the mouse is moved out of the control panel, the control panel will automatically fold. If disabled, the display of the control panel can only be toggled through the button on the control bar.',
    '当鼠标移出控制面板时，自动收起控制面板。禁用此选项后，只能通过控制栏上的按钮切换控制面板的显示。',
    '마우스가 설정 창이나 컨트롤 바를 벗어나면 설정 창이 자동으로 닫힙니다. 비활성화된 경우, 컨트롤 바의 버튼을 통해서만 창을 여닫을 수 있습니다.',
    'Cuando el mouse se mueve fuera del panel de control, este se plegará automáticamente. Si está desactivado, la visualización del panel de control solo se puede alternar mediante el botón en la barra de control.'
  ],
  magnifier: [
    'Magnifier',
    '放大镜',
    '돋보기',
    'Lupa'
  ],
  magnifierTooltip: [
    'In the pagination reading mode, you can temporarily zoom in on an image by dragging it with the mouse click, and the image will follow the movement of the cursor.',
    '在翻页阅读模式下，你可以通过鼠标左键拖动图片临时放大图片以及图片跟随指针移动。',
    'Pagination 읽기 모드에서 마우스 클릭으로 이미지를 드래그하면 일시적으로 이미지를 확대할 수 있으며, 이미지가 마우스 커서의 움직임을 따라 이동합니다.',
    'En el modo de lectura por paginación, puedes hacer un zoom temporal en una imagen arrastrándola con el clic del mouse, y la imagen seguirá el movimiento del cursor.'
  ],
  autoEnterBig: [
    'Auto Big',
    '自动大图',
    '이미지 바로 보기',
    'Auto Grande'
  ],
  dragImageOut: [
    'Drag Image Out',
    '拖拽图片到外部',
    '이미지를 밖으로 드래그',
    'Arrastrar imagen hacia afuera',
  ],
  dragImageOutTooltip: [
    `Enabling this option will restore the browser's default dragging behavior for images (saving the image to the directory where it was dragged), 
but will disable the magnifier and the ability to drag and move images.`,
    `启用此项将恢复浏览器默认对图片的拖拽行为(保存图片到所拖拽到的目录)，但会禁用放大镜功能以及拖拽移动图片位置的功能。`,
    `이 옵션을 활성화하면 이미지에 대한 브라우저의 기본 드래그 동작(이미지를 드래그한 디렉토리에 이미지 저장)이 복원됩니다. 
하지만 돋보기와 이미지 드래그 및 이동 기능은 비활성화됩니다.`,
    `Habilitar esta opción restaurará el comportamiento de arrastre predeterminado del navegador para imágenes (guardando la imagen en el directorio donde fue arrastrada). 
pero desactivará la lupa y la capacidad de arrastrar y mover imágenes.`,
  ],
  autoEnterBigTooltip: [
    "Directly enter the Big image view when the script's entry is clicked or auto-opened",
    '点击脚本入口或自动打开脚本后直接进入大图阅读视图。',
    '이미지 뷰어가 열리면 즉시 큰 이미지 보기 모드로 전환됩니다.',
    'Entrar directamente en la vista de imagen grande cuando se haga clic en la entrada del script o se abra automáticamente'
  ],
  hdThumbnails: [
    "HD Thumbnails",
    "高清缩略图",
    "HD 썸네일",
    "Miniaturas HD",
  ],
  hdThumbnailsTooltip: [
    "When the large image is loaded, whether to resample a clearer image from the large image as a thumbnail, will affect performance.",
    "当图片加载完毕后，是否从源图重新采样更加清晰的图片作为缩略图，此项会影响性能。",
    "큰 이미지가 로드될 때 큰 이미지에서 보다 선명한 이미지를 썸네일로 리샘플링할지 여부가 성능에 영향을 미칩니다.",
    "Cuando se carga la imagen grande, el hecho de volver a muestrear una imagen más clara de la imagen grande como miniatura afectará el rendimiento.",
  ],
  pixivJustCurrPage: [
    'Pixiv Only Load Current Page',
    'Pixiv 仅加载当前作品页',
    'Pixiv 현재 페이지만 로드',
    'Pixiv: Cargar solo la página actual'
  ],
  pixivJustCurrPageTooltip: [
    "In Pixiv, if the current page is on a artwork page, only load the images from current page. Disable this option or the current page is on the artist's homepage, all images by that author will be loaded. <br>" +
    'Note: You can continue loading all the remaining images by the author by scrolling on the page or pressing "Try Fetch Next Page" key after disabling this option.',
    '在Pixiv中，如果当前页是作品页则只加载当前页中的图片，如果该选项禁用或者当前页是作者主页，则加载该作者所有的作品。<br>' +
    '注：你可以禁用该选项后，然后通过页面滚动或按下Shift+n来继续加载该作者所有的图片。',
    'Pixiv에서 현재 페이지가 작품 페이지일 경우, 해당 페이지의 이미지들만 로드합니다. 이 옵션을 비활성화하거나 현재 페이지가 작가의 홈 페이지일 경우, 해당 작가의 모든 이미지를 로드합니다. <br>' +
    '참고: 이 옵션을 비활성화한 후, 페이지를 스크롤하거나 "다음 페이지 로딩 재시도" 키를 눌러 작가의 나머지 이미지를 계속 로드할 수 있습니다.',
    'En Pixiv, si la página actual está en una página de una obra, solo se cargarán las imágenes de la página actual. Desactive esta opción si la página actual está en la página de inicio del artista; en ese caso, se cargarán todas las imágenes de ese autor. <br>' +
    'Nota: Puedes continuar cargando todas las imágenes restantes del autor desplazándote por la página o presionando la tecla "Intentar cargar la siguiente página" después de desactivar esta opción.'
  ],
  pixivRecordReading: [
    'Pixiv Record Reading',
    'Pixiv 记录阅读位置',
    'Pixiv 기록읽기',
    'Pixiv Lectura de registros'
  ],
  pixivRecordReadingTooltip: [
    'Reading position recorded. A new chapter continuing from this position will be provided next time.',
    '记录阅读位置，再次阅读时，将出现一个新的章节表示从该位置继续阅读。',
    '읽기 위치가 기록되었습니다. 이 위치에서 이어지는 새로운 장은 다음에 제공될 예정입니다.',
    'Posición de lectura registrada. La próxima vez se publicará un nuevo capítulo a partir de esta posición.'
  ],
  pixivAscendWorks: [
    'Pixiv Ascending Works',
    'Pixiv 升序排列作品',
    'Pixiv 오름차순 작품',
    'Obras Ascendentes Pixiv'
  ],
  pixivAscendWorksTooltip: [
    'Sort the artist\'s works in ascending order, from oldest to newest. (need refresh)',
    '将画师的作品以升序方式排序，从旧到新。(需要刷新)',
    '아티스트의 작품을 오름차순으로 정렬합니다. 오래된 것부터 최신 순으로. (need refresh)',
    'Ordena las obras del artista en orden ascendente, de las más antiguas a las más recientes. (need refresh)'
  ],
  pixivImageServer: [
    'Pixiv Img Server',
    'Pixiv 图片服务器',
    'Pixiv 이미지 서버',
    'Pixiv Img Server',
  ],
  pixivImageServerTooltip: [
    'Replace Pixiv’s default image server i.pximg.net with the proxy server you specify, such as i.pixiv.re, to achieve better loading speeds',
    '将Pixiv默认的图片服务器 i.pximg.net 替换为你所指定的代理服务器，如： i.pixiv.re，以获得更佳的加载速度。',
    'Pixiv의 기본 이미지 서버 i.pximg.net을(를) 지정한 프록시 서버(예: i.pixiv.re)로 교체하여 더 빠른 로딩 속도를 얻으세요.',
    'Reemplaza el servidor de imágenes predeterminado de Pixiv, i.pximg.net, por el servidor proxy que especifiques, como i.pixiv.re, para obtener una velocidad de carga mejor.',
  ],
  pixivUgoiraMode: [
    "Pixiv Ugoira Mode",
    "Pixiv 动图模式",
    "Pixiv 우고이라 모드",
    "Pixiv Ugoira Modo",
  ],
  pixivUgoiraModeTooltip: [
    "Processing Ugoira Files<br> Ugoira Mode: This mode offers the fastest processing speed and the lowest memory usage, allowing for quick playback. The Ugoira file is downloaded as a sequence of individual image frames. A one-click script is included to convert this image sequence into a GIF.<br> GIF/MP4 Mode: This mode uses ffmpeg.wasm to encode the Ugoira into a common video or GIF format. The conversion is done directly in your browser, but it is slower and has a higher memory footprint.",
    "如何处理Pixiv的Ugoira<br>  模式Ugoira: 处理速度快且占用低，可快速开始播放，但下载后将保存每一帧图片到文件夹，同时提供一个一键转换脚本，将图片序列转换为GIF。<br>  模式GIF和MP4：将使用ffmpeg.wasm直接将ugoira转换为可直接播放的格式，但转换速度慢占用高。",
    "Ugoira 처리 방법<br> Ugoira 모드: 이 방식은 처리 속도가 가장 빠르고 메모리 사용량이 최소화되어 즉시 재생할 수 있습니다. Ugoira 파일을 개별 이미지 프레임의 묶음으로 다운로드합니다. 해당 이미지들을 GIF로 한 번에 변환해 주는 스크립트가 함께 제공됩니다.<br> GIF/MP4 모드: ffmpeg.wasm으로 Ugoira를 GIF나 MP4 같은 일반 동영상 형식으로 변환합니다. 브라우저에서 직접 변환하지만, 속도가 느리고 시스템 자원을 많이 사용합니다.",
    "Procesamiento de archivos Ugoira<br> Modo Ugoira: Este modo ofrece la velocidad de procesamiento más rápida y el uso de memoria más bajo, lo que permite una reproducción rápida. El archivo Ugoira se descarga como una secuencia de fotogramas de imagen individuales. Se incluye un script de un solo clic para convertir esta secuencia de imágenes en un GIF.<br> Modo GIF/MP4: Este modo utiliza ffmpeg.wasm para codificar el Ugoira en un formato de video o GIF común. La conversión se realiza directamente en su navegador, pero es más lenta y tiene una mayor huella de memoria.",
  ],
  // config panel select option
  readMode: [
    'Read Mode',
    '阅读模式',
    '읽기 모드',
    'Modo de lectura'
  ],
  gridMode: [
    'Thumbnail Mode',
    '缩略图模式',
    'Thumbnail Mode',
    'Thumbnail Mode'
  ],
  readModeTooltip: [
    'Switch to the next picture when scrolling, otherwise read continuously',
    '滚动时切换到下一张图片，否则连续阅读',
    '스크롤 시 다음 이미지로 전환하거나, 이미지들을 연속으로 배치합니다.',
    'Cambiar a la siguiente imagen al desplazarse, de lo contrario, leer de manera continua'
  ],
  stickyMouse: [
    'Sticky Mouse',
    '黏糊糊鼠标',
    '마우스 고정',
    'Mouse adhesivo'
  ],
  stickyMouseTooltip: [
    'In pagination reading mode, scroll a single image automatically by moving the mouse.',
    '非连续阅读模式下，通过鼠标移动来自动滚动单张图片。',
    '페이지 읽기 모드에서 마우스 커서를 움직여 하나의 이미지를 자동으로 스크롤합니다.',
    'En el modo de lectura por paginación, desplaza una sola imagen automáticamente moviendo el mouse.'
  ],
  minifyPageHelper: [
    'Minify Control Bar',
    '最小化控制栏',
    '컨트롤 바 최소화',
    'Minimizar barra de control'
  ],
  minifyPageHelperTooltip: [
    'Minify Control Bar',
    '最小化控制栏',
    '언제 컨트롤 바를 최소화할지 선택합니다.',
    'Minimizar barra de control'
  ],
  hitomiFormat: [
    'Hitomi Image Format',
    'Hitomi 图片格式',
    'Hitomi 이미지 형식',
    'Formato de imagen de Hitomi'
  ],
  hitomiFormatTooltip: [
    'In Hitomi, Fetch images by the format.<br>if Auto then try Avif > Jxl > Webp, Requires Refresh',
    '在Hitomi中的源图格式。<br>如果是Auto，则优先获取Avif > Jxl > Webp，修改后需要刷新生效。',
    'Hitomi에서 이미지를 어떤 종류의 파일로 가져올 지 선택합니다.<br>Auto 설정 시 Avif > Jxl > Webp 순으로 시도하며, 변경 후 새로고침이 필요합니다.',
    'En Hitomi, obtener imágenes por formato.<br>Si está en automático, intentará Avif > Jxl > Webp. Requiere actualización.'
  ],
  ehentaiTitlePrefer: [
    'Title Language Prefer',
    '标题语言偏好',
    '제목 언어 선호',
    'Idioma del título preferido'
  ],
  ehentaiTitlePreferTooltip: [
    'Many galleries have both an English/Romanized title and a title in Japanese script. <br>Which one do you want to use as the archive filename?',
    '许多图库都同时拥有英文/罗马音标题和日文标题，<br>您希望下载时哪个作为文件名？',
    '많은 갤러리가 영어/로마자 제목과 일본어 제목을 모두 가지고 있습니다. <br>어떤 것을 아카이브 파일 이름으로 사용할지 선택할 수 있습니다.',
    'Muchas galerías tienen tanto un título en inglés/romanizado como un título en script japonés.<br>¿Cuál quieres usar como nombre de archivo?'
  ],
  reverseMultipleImagesPost: [
    'Descending Images In Post',
    '反转推文图片顺序',
    '포스트 이미지 내림차순 정렬',
    'Imágenes descendentes en la publicación'
  ],
  reverseMultipleImagesPostTooltip: [
    'Reverse order for post with multiple images attatched',
    '反转推文图片顺序',
    '여러 이미지가 첨부된 포스트 내 이미지들의 순서를 역순으로 정렬합니다.',
    'Orden inverso para publicaciones con múltiples imágenes adjuntas'
  ],
  excludeVideo: [
    'Exclude Videos',
    '排除视频',
    '비디오 제외',
    'Excluir videos'
  ],
  excludeVideoTooltip: [
    'Exclude videos, now only applies to x.com and kemono.su.',
    '排除视频，现在仅作用于x.com和kemono.su',
    '비디오 제외, 현재 x.com과 kemono.su에만 적용됩니다.',
    'Excluir videos, ahora solo se aplica a x.com y kemono.su.'
  ],
  filenameOrder: [
    'Filename Order',
    '文件名排序',
    '파일명 순서',
    'Orden de nombres de archivo'
  ],
  filenameOrderTooltip: [
    `Filename Sorting Rules for Downloaded Files:
<br>  Auto: Detect whether the original filenames are consistent with the reading order under natural sorting (Windows). If consistent, keep the original filenames; otherwise, prepend a number to the original filenames to ensure the correct order.
<br>  Numbers: Ignore the original filenames and rename the files directly according to the reading order.
<br>  Original: Keep only the original filenames without ensuring the reading order, which may result in overwriting files with the same name.
<br>  Alphabetically: Detect whether the original filenames are consistent with the reading order under alphabetical sorting (Linux). If consistent, keep the original filenames; otherwise, prepend a number to the original filenames to ensure the correct order. `,
    `下载文件内的文件名排序规则：
<br>  Auto: 检测原文件名在自然排序(Windows)下是否与阅读顺序一致，如果一致保留原文件名，否则将在原文件名前添加序号以保证顺序。
<br>  Numbers: 忽略原文件名，直接以阅读顺序为文件命名。
<br>  Original: 只保留原文件名，不能保证阅读顺序以及同名文件覆盖。
<br>  Alphabetically: 检测原文件名在字母排序下(Linux)是否与阅读顺序一致，如果一致保留原文件名，否则将在原文件名前添加序号以保证顺序。`,
    `다운로드 파일의 파일명 정렬 규칙:
<br>  Auto: 원본 파일명이 기본 정렬(Windows)에서 읽기 순서와 일치하는지 감지합니다. 일치하는 경우 원본 파일명을 유지하고, 그렇지 않으면 순서를 보장하기 위해 파일명 앞에 번호를 추가합니다.
<br>  Numbers: 원본 파일명을 무시하고 읽기 순서에 따라 파일명을 직접 지정합니다.
<br>  Original: 원본 파일명만 유지하며, 읽기 순서가 보장되지 않으며 동일한 이름의 파일이 덮어쓰일 수 있습니다.
<br>  Alphabetically: 원본 파일명이 알파벳 정렬(Linux)에서 읽기 순서와 일치하는지 감지합니다. 일치하는 경우 원본 파일명을 유지하고, 그렇지 않으면 순서를 보장하기 위해 파일명 앞에 번호를 추가합니다. `,
    `Reglas de ordenamiento de nombres de archivos para archivos descargados:
<br>  Auto: Detecta si los nombres de archivo originales son consistentes con el orden de lectura bajo el ordenamiento natural (Windows). Si son consistentes, conserva los nombres de archivo originales; de lo contrario, antepone un número a los nombres originales para garantizar el orden correcto.
<br>  Numbers: Ignora los nombres de archivo originales y renombra los archivos directamente según el orden de lectura.
<br>  Original: Conserva únicamente los nombres de archivo originales sin garantizar el orden de lectura, lo que puede resultar en sobrescribir archivos con el mismo nombre.
<br>  Alphabetically: Detecta si los nombres de archivo originales son consistentes con el orden de lectura bajo el orden alfabético (Linux). Si son consistentes, conserva los nombres de archivo originales; de lo contrario, antepone un número a los nombres originales para garantizar el orden correcto. `,
  ],

  dragToMove: [
    'Drag to Move the control bar',
    '拖动移动',
    '드래그해서 컨트롤 바 이동',
    'Arrastra para mover la barra de control'
  ],
  resetDownloaded: [
    'Reset Downloaded Images',
    '重置已下载的图片',
    '다운로드한 이미지 초기화',
    'Restablecer imágenes descargadas'
  ],
  resetDownloadedConfirm: [
    'You will reset Downloaded Images!',
    '已下载的图片将会被重置为未下载！',
    '이미지들은 다운로드하지 않은 상태로 초기화됩니다!',
    '¡Vas a restablecer las imágenes descargadas!'
  ],
  resetFailed: [
    'Reset Failed Images',
    '重置下载错误的图片',
    '로딩 실패한 이미지 초기화',
    'Restablecer imágenes fallidas'
  ],
  showHelp: [
    'Help',
    '帮助',
    '도움말',
    'Ayuda'
  ],
  showKeyboard: [
    'Keyboard',
    '快捷键',
    '단축키',
    'Teclado'
  ],
  showSiteProfiles: [
    'Site Profiles',
    '站点配置',
    '사이트 설정',
    'Perfiles del sitio'
  ],
  showStyleCustom: [
    'Style',
    '样式',
    '스타일',
    'Estilo'
  ],
  showActionCustom: [
    'Image Actions',
    '图片操作',
    '이미지 작업',
    'Acciones de imagen',
  ],
  example: [
    'Example',
    '示例',
    '예시',
    'Ejemplo',
  ],
  description: [
    'Description',
    '描述',
    '설명',
    'Descripción',
  ],
  function: [
    'Function',
    '函数',
    '함수',
    'Función',
  ],
  parameters: [
    'Parameters',
    '参数',
    '매개변수',
    'Parámetros',
  ],
  body: [
    'Body',
    '体',
    '본문',
    'Cuerpo',
  ],
  icon: [
    'ICON',
    '图标',
    '아이콘',
    'ICONO',
  ],
  optional: [
    'Optional',
    '可选',
    '선택적',
    'Opcional',
  ],
  regexp: [
    'Regexp',
    '正则',
    '정규식',
    'Regexp',
  ],
  workon: [
    'Work On Sites',
    '生效站点',
    '사이트에서 작동',
    'Funciona en sitios',
  ],
  global: [
    'Global',
    '全局',
    '글로벌',
    'Global',
  ],
  controlBarStyleTooltip: [
    'Click on an item to modify its display text, such as emoji or personalized text. Changes will take effect after restarting.',
    '点击某项后修改其显示文本，比如emoji或个性文字，也许svg，重启后生效。',
    '아이템을 클릭하여 이모티콘이나 텍스트 등을 수정할 수 있습니다. 변경 사항은 재시작 후 적용됩니다.',
    'Haga clic en un elemento para modificar el texto que se muestra, como emoji o texto personalizado. Los cambios entrarán en vigor después de reiniciar.'
  ],
  resetConfig: [
    "Reset Config",
    "重置配置",
    "구성 재설정",
    "Restablecer configuración",
  ],
  letUsStar: [
    "Let's Star",
    '点星',
    '별 눌러줘',
    'Presiona la estrella'
  ],

  // download panel
  download: [
    'DL',
    '下载',
    '다운로드',
    'Descargar'
  ],
  forceDownload: [
    'Take Loaded',
    '获取已下载的',
    '다운로드된 이미지 가져오기',
    'Tomar cargado'
  ],
  downloadStart: [
    'Start Download',
    '开始下载',
    '다운로드 시작',
    'Comenzar descarga'
  ],
  downloading: [
    'Downloading...',
    '下载中...',
    '다운로드 중...',
    'Descargando...'
  ],
  downloadFailed: [
    'Failed(Retry)',
    '下载失败(重试)',
    '실패(재시도)',
    'Fallido(Reintentar)'
  ],
  downloaded: [
    'Downloaded',
    '下载完成',
    '다운로드 완료',
    'Descargado'
  ],
  packaging: [
    'Packaging...',
    '打包中...',
    '압축 중...',
    'Empaquetando...'
  ],
  status: [
    'Status',
    '状态',
    '상태',
    'Estado'
  ],
  selectChapters: [
    'Chapters',
    '章节',
    '챕터',
    'capítulos'
  ],
  cherryPick: [
    'Cherry Pick',
    '范围选择',
    '범위 선택',
    'Seleccionar individualmente'
  ],

  enable: [
    'Enable',
    '启用',
    '활성화',
    'Habilitar'
  ],
  enableTooltips: [
    'Enable the script on this site.',
    '在此站点上启用本脚本的功能。',
    '선택된 사이트에서만 스크립트를 활성화합니다.',
    'Habilitar el script en este sitio.'
  ],
  enableAutoOpen: [
    'Auto Open',
    '自动打开',
    '자동 크게 보기',
    'Apertura automática'
  ],
  enableAutoOpenTooltips: [
    'Automatically open the interface of this script when entering the corresponding page.',
    '当进入对应的生效页面后，自动打开本脚本界面。',
    '해당 페이지에 들어갈 때 이 스크립트의 인터페이스를 자동으로 엽니다.',
    'Abrir automáticamente la interfaz de este script al ingresar a la página correspondiente.'
  ],
  enableFlowVision: [
    'Flow Vision',
    '自适应视图',
    'Flow Vision',
    'Flow Vision'
  ],
  enableFlowVisionTooltips: [
    `Enable a new thumbnail list layout where the images in each row have uniform height, but the number of images per row is automatically adjusted. 
    <br>The overall appearance is more compact and comfortable, suitable for illustration-based websites with irregular image aspect ratios.
    <br>Note: Since some websites cannot retrieve image aspect ratio information, the effect may be impacted.`,
    `启用一种新的缩略图列表布局，使每行的图片高度一致，但自动分配每行的图片数量。
    <br>整体看起来更紧凑舒适，适合图片宽高比不规则的插画类站点。
    <br>注意：由于一些站点无法提取得知图片的宽高比，因此效果可能会受到影响。`,
    `새로운 썸네일 리스트 레이아웃을 활성화하여 각각의 행에 있는 이미지들이 동일한 높이를 가지도록 합니다. 대신 행당 이미지의 수는 자동으로 조정됩니다. 
    <br>전체적인 외관은 더 간결하고 편안하며, 불규칙한 이미지 비율을 가진 일러스트 기반 웹사이트에 적합합니다. 
    <br>참고: 일부 웹사이트는 이미지 비율 정보를 가져올 수 없으므로, 이로 인해 효과에 영향을 받을 수 있습니다.`,
    `Activar un nuevo diseño de lista de miniaturas donde las imágenes en cada fila tienen altura uniforme, pero el número de imágenes por fila se ajusta automáticamente. 
    <br>La apariencia general es más compacta y cómoda, adecuada para sitios web basados en ilustraciones con relaciones de aspecto de imagen irregulares.
    <br>Nota: Dado que algunos sitios web no pueden recuperar la información de la relación de aspecto de las imágenes, el efecto puede verse afectado.`
  ],
  addRegexp: [
    'Add Work URL Regexp',
    '添加生效地址规则',
    'URL 정규식 추가',
    'Agregar expresión regular de URL'
  ],
  failFetchReason1: [
    'Refused to connect {{domain}}(origin image url), Please check the domain blacklist: Tampermonkey > Comic Looms > Settings > XHR Security > User domain blacklist',
    '被拒绝连接{{domain}}(大图地址)，请检查域名黑名单: Tampermonkey(篡改猴) > 漫画织机 > 设置 > XHR Security >  User domain blacklist',
    'Refused to connect {{domain}}(origin image url), Please check the domain blacklist: Tampermonkey > Comic Looms > Settings > XHR Security > User domain blacklist',
    'Refused to connect {{domain}}(origin image url), Please check the domain blacklist: Tampermonkey > Comic Looms > Settings > XHR Security > User domain blacklist',
  ],

  latestArtWorks: [
    "The Latest Artworks",
    "最新作品",
    "최신 예술 작품",
    "Las últimas obras de arte",
  ],

  afterLastReading: [
    "After  Last Reading",
    "上次阅读之后",
    "마지막으로 읽은 후",
    "Después de la última lectura",
  ],
  beforeLastReading: [
    "Before Last Reading",
    "上次阅读之前",
    "마지막으로 읽기 전에",
    "Antes de la última lectura",
  ],
  allArtWorks: [
    "All Artworks",
    "全部作品",
    "모든 작품",
    "Todas las obras de arte",
  ],
  currentArtWorks: [
    "Artwork On The Current Page",
    "当前页的作品",
    "현재 페이지의 아트워크",
    "Obra de arte en la página actual",
  ],

  help: [
    `
<h2>[How to Use? Where is the Entry?]</h2>
<p>The script typically activates on gallery homepages or artist homepages. For example, on E-Hentai, it activates on the gallery detail page, or on Twitter, it activates on the user&#39;s homepage or tweets.</p>
<p>When active, a <strong>&lt;🎑&gt;</strong> icon will appear at the bottom left of the page. Click it to enter the script&#39;s reading interface.</p>
<h2 style="color:red;">[Some existing issues and their solutions.]</h2>
<ul>
<li>When using Firefox to browse Twitter|X, after navigating to some pages, you need to refresh the page for this script to work on that page.</li>
<li>When using Firefox to browse Twitter|X, the download function of this script may not work.</li>
</ul>
<h4>Solution:</h4>
<p>These issues are caused by Twitter|X&#39;s Content Security Policy (CSP), which disables URL mutation detection and the Zip creation functionality.</p>
<p>You can modify Twitter|X&#39;s response header <strong>Content-Security-Policy</strong> to <strong>Content-Security-Policy: object-src '*'</strong> using other extensions.</p>
<p>For example, in the extension <strong>Header Editor</strong>, click the Add button:</p>
<ul>
<li>Name: csp-remove(any name)</li>
<li>Rule type: Modify response header</li>
<li>Match type: domain</li>
<li>Match rules: x.com</li>
<li>Execute type: normal</li>
<li>Header name: content-security-policy</li>
<li>Header value: object-src '*'</li>
</ul>
<h2>[Can the Script&#39;s Entry Point or Control Bar be Relocated?]</h2>
<p>Yes! At the bottom of the configuration panel, there&#39;s a <strong>Drag to Move</strong> option. Drag the icon to reposition the control bar anywhere on the page.</p>
<h2>[Can the Script Auto-Open When Navigating to the Corresponding Page?]</h2>
<p>Yes! There is an <strong>Auto Open</strong> option in the configuration panel. Enable it to activate this feature.</p>
<h2>[How to Zoom Images?]</h2>
<p>There are several ways to zoom images in big image reading mode:</p>
<ul>
<li>Right-click + mouse wheel</li>
<li>Keyboard shortcuts</li>
<li>Zoom controls on the control bar: click the -/+ buttons, scroll the mouse wheel over the numbers, or drag the numbers left or right.</li>
</ul>
<h2>[How to maintain spacing between large images?]</h2>
<p>In CONF > Style, modify or add: .ehvp-root { --ehvp-big-images-gap: 2px; }</p>
<h2>[How to Open Images from a Specific Page?]</h2>
<p>In the thumbnail list interface, simply type the desired page number on your keyboard (without any prompt) and press Enter or your custom shortcuts.</p>
<h2>[About the Thumbnail List]</h2>
<p>The thumbnail list interface is the script&#39;s most important feature, allowing you to quickly get an overview of the entire gallery.</p>
<p>Thumbnails are also lazy-loaded, typically loading about 20 images, which is comparable to or even fewer requests than normal browsing.</p>
<p>Pagination is also lazy-loaded, meaning not all gallery pages load at once. Only when you scroll near the bottom does the next page load.</p>
<p>Don&#39;t worry about generating a lot of requests by quickly scrolling through the thumbnail list; the script is designed to handle this efficiently.</p>
<h2>[About Auto-Loading and Pre-Loading]</h2>
<p>By default, the script automatically and slowly loads large images one by one.</p>
<p>You can still click any thumbnail to start loading and reading from that point, at which time auto-loading will stop and pre-load 3 images from the reading position.</p>
<p>Just like the thumbnail list, you don&#39;t need to worry about generating a lot of loading requests by fast scrolling.</p>
<h2>[About Downloading]</h2>
<p>Downloading is integrated with large image loading. When you finish browsing a gallery and want to save and download the images, you can click <strong>Start Download</strong> in the download panel. don&#39;t worry about re-downloading already loaded images.</p>
<p>You can also directly click <strong>Start Download</strong> in the download panel without reading.</p>
<p>Alternatively, click the <strong>Take Loaded</strong> button in the download panel if some images consistently fail to load. This will save the images that have already been loaded.</p>
<p>The download panel&#39;s status indicators provide a clear view of image loading progress.</p>
<p><strong>Note:</strong> When the download file size exceeds 1.2GB, split compression will be automatically enabled. If you encounter errors while extracting the files, please update your extraction software or use 7-Zip.</p>
<h2>[Can I Select the Download Range?]</h2>
<p>Yes, the download panel has an option to select the download range(Cherry Pick), which applies to downloading, auto-loading, and pre-loading.</p>
<p>Even if an image is excluded from the download range, you can still click its thumbnail to view it, which will load the corresponding large image.</p>
<h2>[How to Select Images on Some Illustration Sites?]</h2>
<p>In the thumbnail list, you can use some hotkeys to select images:</p>
<ul>
<li><strong>Ctrl + Left Click:</strong> Selects the image. The first selection will exclude all other images.</li>
<li><strong>Ctrl + Shift + Left Click:</strong> Selects the range of images between this image and the last selected image.</li>
<li><strong>Alt + Left Click:</strong> Excludes the image. The first exclusion will select all other images.</li>
<li><strong>Alt + Shift + Left Click:</strong> Excludes the range of images between this image and the last excluded image.</li>
</ul>
<p>In addition, there are several other methods:</p>
<ul>
<li>Middle-click on a thumbnail to open the original image url, then right-click to save the image.</li>
<li>Set the download range to 1 in the download panel. This excludes all images except the first one. Then, click on thumbnails of interest in the list, which will load the corresponding large images. After selecting, clear the download range and click <strong>Take Loaded</strong> to package and download your selected images.</li>
<li>Turn off auto-loading and set pre-loading to 1 in the configuration panel, then proceed as described above.</li>
</ul>
<h2>[Can I Operate the Script via Keyboard?]</h2>
<p>Yes! There&#39;s a <strong>Keyboard</strong> button at the bottom of the configuration panel. Click it to view or configure keyboard operations.</p>
<p>You can even configure it for one-handed full keyboard operation, freeing up your other hand!</p>
<h2>[How to Feed the Author]</h2>
<p>Give me a star on <a target="_blank" href="https://github.com/MapoMagpie/comic-looms">Github</a> or a good review on <a target="_blank" href="https://greasyfork.org/scripts/397848-comic-looms">Greasyfork</a>.</p>
<p>Please do not review on Greasyfork, as its notification system cannot track subsequent feedback. Many people leave an issue and never back.
Report issues here: <a target="_blank" href="https://github.com/MapoMagpie/comic-looms/issues">issue</a></p>
<h2>[How to Reopen the Guide?]</h2>
<p>Click the <strong>Help</strong> button at the bottom of the configuration panel.</p>
`,
    `
<h2>[如何使用？入口在哪里？]</h2>
<p>脚本一般生效于画廊详情页或画家的主页或作品页。比如在E-Hentai上，生效于画廊详情页，或者在Twitter上，生效于推主的主页或推文。</p>
<p>生效时，在页面的左下方会有一个<strong>&lt;🎑&gt;</strong>图标，点击后即可进入脚本的阅读界面。</p>
<h2 style="color:red;">[一些现存的问题，以及解决方式。]</h2>
<ul>
<li>使用Firefox浏览Twitter|X时，跳转到其他页面后，需要刷新才可以使此脚本在该页面生效。</li>
<li>使用Firefox浏览Twitter|X时，此脚本的下载功能可能无法使用。</li>
</ul>
<h4>解决方式:</h4>
<p>这些问题是由于Twitter|X的内容安全策略(CSP)导致，它使URL的变动检测和创建Zip功能失效。</p>
<p>可以通过其他拓展修改Twitter|X的响应头<strong>Content-Security-Policy</strong>为<strong>Content-Security-Policy: object-src '*'</strong></p>
<p>例如在拓展<strong>Header Editor</strong>中，点击添加按钮:</p>
<ul>
<li>Name: csp-remove(随意)</li>
<li>Rule type: Modify response header</li>
<li>Match type: domain</li>
<li>Match rules: x.com</li>
<li>Execute type: normal</li>
<li>Header name: content-security-policy</li>
<li>Header value: object-src '*'</li>
</ul>
<h2>[脚本的入口或控制栏可以更改位置吗？]</h2>
<p>可以！在配置面板的下方，有一个<strong>拖拽移动</strong>的选项，对着图标进行拖动，你可以将控制栏移动到页面上的任意位置。</p>
<h2>[进入对应的页面的，可以自动打开脚本吗？]</h2>
<p>可以！在配置面板中，有一个<strong>自动打开</strong>的选项，启用即可。</p>
<h2>[如何缩放图片？]</h2>
<p>有几种方式可以在大图阅读模式中缩放图片：</p>
<ul>
<li>鼠标右键+滚轮</li>
<li>键盘快捷键</li>
<li>控制栏上的缩放控制，点击-/+按钮，或者在数字上滚动滚轮，或者左右拖动数字。</li>
</ul>
<h2>[如何让大图之间保持间隔？]</h2>
<p>在CONF > Style中，修改或添加 .ehvp-root { --ehvp-big-images-gap: 2px; }</p>
<h2>[如何打开指定页数的图片？]</h2>
<p>在缩略图列表界面中，直接在键盘上输入数字(没有提示)，然后按下回车或自定义的快捷键。</p>
<h2>[关于缩略图列表。]</h2>
<p>缩略图列表是脚本最重要的特性，可以让你快速地了解整个画廊的情况。</p>
<p>并且缩略图也是延迟加载的，通常会加载20张左右，与正常浏览所发出的请求相当，甚至更低。</p>
<p>并且分页也是延迟加载的，并不会一次性加载画廊的所有分页，只有滚动到接近底部时，才会加载下一页。</p>
<p>不用担心因为在缩略图列表中快速滚动而导致发出大量的请求，脚本充分考虑到了这一点。</p>
<h2>[关于自动加载和预加载。]</h2>
<p>默认配置下，脚本会自动且缓慢地一张接一张地加载大图。</p>
<p>你仍然可以点击任意位置的缩略图，并从该处开始加载并阅读，此时会自动加载会停止并从阅读的位置预加载3张图片。</p>
<p>同缩略图列表一样，无需担心因为快速滚动而导致发出大量的加载请求。</p>
<h2>[关于下载。]</h2>
<p>下载与大图加载是一体的，当你浏览完画廊时，突然想起来要保存下载，此时你可以在下载面板中点击<strong>开始下载</strong>，不必担心会重复下载已经加载过的图片。</p>
<p>当然你也可以不浏览，直接在下载面板中点击<strong>开始下载</strong>。</p>
<p>或者点击下载面板中的<strong>获取已下载的</strong>按钮，当一些图片总是加载失败的时候，你可以使用此功能来保存已经加载过的图片。</p>
<p>通过下载面板中的状态可以直观地看到图片加载的情况。</p>
<p><strong>注意：</strong>当下载文件大小超过1.2G后，会自动启用分卷压缩。当使用解压软件解压出错时，请更新解压软件或使用7-Zip。</p>
<h2>[可以选择下载范围吗？]</h2>
<p>可以，在下载面板中有选择下载范围的功能，该功能对下载、自动加载、预加载都生效。</p>
<p>另外，如果一张图片被排除在下载范围之外，你仍然可以点击该图片的缩略图进行浏览，这会加载对应的大图。</p>
<h2>[如何在一些插画网站上挑选图片？]</h2>
<p>在缩略图列表中使用一些快捷键可以进行图片的挑选。</p>
<ul>
<li><strong>Ctrl+鼠标左键：</strong> 选中该图片，当第一次选中时，其他的图片都会被排除。</li>
<li><strong>Ctrl+Shift+鼠标左键：</strong> 选中该图片与上一张选中的图片之间的范围。</li>
<li><strong>Alt+鼠标左键：</strong> 排除该图片，当第一次排除时，其他的图片都会被选中。</li>
<li><strong>Alt+Shift+鼠标左键：</strong> 排除该图片与上一张排除的图片之间的范围。</li>
</ul>
<p>除此之外还有几种方式：</p>
<ul>
<li>在缩略图上按下鼠标中键，即可打开图片的原始地址，之后你可以右键保存图片。</li>
<li>在下载面板中设置下载范围为1，这样会排除第一张图片以外的所有图片，之后在缩略图列表上点击你感兴趣的图片，对应的大图会被加载，最终挑选完毕后，删除掉下载范围并点击<strong>获取已下载的</strong>，这样你挑选的图片会被打包下载。</li>
<li>在配置面板中关闭自动加载，并设置预加载数量为1，之后与上面的方法类似。</li>
</ul>
<h2>[可以通过键盘来操作吗？]</h2>
<p>可以！在配置面板的下方，有一个<strong>快捷键</strong>按钮，点击后可以查看键盘操作，或进行配置。</p>
<p>甚至可以配置为单手全键盘操作，解放另一只手！</p>
<h2>[如何Feed作者。]</h2>
<p>给我<a target="_blank" href="https://github.com/MapoMagpie/comic-looms">Github</a>星星，或者<a target="_blank" href="https://greasyfork.org/scripts/397848-comic-looms">Greasyfork</a>上好评。</p>
<p>请勿在Greasyfork上反馈问题，因为该站点的通知系统无法跟踪后续的反馈。很多人只是留下一个问题，再也没有回来过。
请在此反馈问题: <a target="_blank" href="https://github.com/MapoMagpie/comic-looms/issues">issue</a></p>
<h2>[如何再次打开指南？]</h2>
<p>在配置面板的下方，点击<strong>帮助</strong>按钮。</p>
`,
    `
<h2>[사용 방법? 스크립트는 어떻게 실행되나요?]</h2>
<p>이 스크립트는 주로 갤러리 홈페이지나 아티스트 홈페이지에서 활성화됩니다. 예를 들어, E-Hentai에서는 갤러리 상세 페이지에서, Twitter에서는 사용자의 홈 또는 트윗에서, arca.live에서는 작성된 글에서 활성화됩니다.</p>
<p>스크립트가 활성화되면 페이지의 왼쪽 하단에 <strong>&lt;🎑&gt;</strong> 아이콘이 나타납니다. 이 아이콘을 클릭하면 스크립트의 읽기 화면으로 진입할 수 있습니다.</p>

<h2>[스크립트의 진입점 또는 컨트롤 바를 이동할 수 있나요?]</h2>
<p>네! 설정 패널 하단에 <strong>드래그해서 컨트롤 바 이동</strong> 옵션이 있습니다. 이 아이콘을 드래그하여 페이지 내 원하는 위치로 컨트롤 바를 이동할 수 있습니다.</p>

<h2>[해당 페이지로 이동할 때 스크립트가 자동으로 열리게 할 수 있나요?]</h2>
<p>네! 설정 패널에서 <strong>자동으로 이미지 열기</strong> 옵션을 활성화하면 이 기능이 켜집니다.</p>

<h2>[이미지를 확대하려면 어떻게 해야 하나요?]</h2>
<p>큰 이미지 보기 모드에서 이미지를 확대하는 방법은 여러 가지가 있습니다:</p>
<ul>
<li>오른쪽 클릭 + 마우스 휠</li>
<li>키보드 단축키</li>
<li>컨트롤 바의 확대/축소 컨트롤: -/+ 버튼을 클릭하거나, 숫자 위에서 마우스 휠을 스크롤하거나, 숫자를 좌우로 드래그하세요.</li>
</ul>

<h2>[큰 이미지 간의 간격을 유지하려면 어떻게 해야 하나요?]</h2>
<p>CONF > Style에서 다음을 수정하거나 추가하세요: .ehvp-root { --ehvp-big-images-gap: 2px; }</p>

<h2>[특정 페이지의 이미지를 열려면 어떻게 해야 하나요?]</h2>
<p>썸네일 리스트 화면에서 원하는 페이지 번호를 키보드로 입력하고 Enter 키나 사용자 지정 단축키를 누르세요.</p>

<h2>[썸네일 리스트에 대하여]</h2>
<p>썸네일 리스트 화면은 스크립트의 가장 중요한 기능으로, 전체 갤러리를 빠르게 둘러볼 수 있게 해줍니다.</p>
<p>썸네일은 지연 로딩되며, 일반적으로 약 20개의 이미지를 로드합니다. 이는 일반적인 브라우징보다 요청 수가 적거나 비슷한 정도입니다.</p>
<p>페이징 또한 지연 로딩됩니다. 즉, 모든 갤러리의 페이지가 한 번에 로드되지 않습니다. 하단 근처로 스크롤할 때만 다음 페이지가 로드됩니다.</p>
<p>썸네일 리스트를 빠르게 스크롤해도 괜찮습니다. 이 스크립트는 그런 경우에도 많은 요청이 발생하지 않도록 효율적으로 설계되어 있습니다.</p>

<h2>[자동 로딩 및 사전 로딩에 대하여]</h2>
<p>기본적으로 스크립트는 큰 이미지를 하나씩 자동으로 천천히 로드합니다.</p>
<p>원하는 썸네일을 클릭하여 그 지점에서 로딩 및 읽기를 시작할 수 있으며, 이때 자동 로딩이 중지되고 읽기 위치에서 3개의 이미지를 사전 로딩합니다.</p>
<p>썸네일 리스트와 마찬가지로 빠르게 스크롤해도 많은 로딩 요청이 발생하지 않도록 설계되어 있으니 걱정하지 않으셔도 됩니다.</p>

<h2>[다운로드에 대하여]</h2>
<p>다운로드는 큰 이미지 로딩과 통합되어 있습니다. 갤러리를 모두 본 후 이미지를 저장하고 다운로드하려면 다운로드 패널에서 <strong>다운로드 시작</strong>을 클릭하세요. 이미 로드된 이미지를 다시 다운로드하는 것에 대해서는 걱정 안 하셔도 됩니다.</p>
<p>이미지를 보지 않고 바로 다운로드 패널에서 <strong>다운로드 시작</strong>을 클릭할 수도 있습니다.</p>
<p>또한 일부 이미지가 로드되지 않을 때는 다운로드 패널에서 <strong>이미 다운로드한 이미지 가져오기</strong> 버튼을 클릭하여 이미 로드된 이미지를 저장할 수 있습니다.</p>
<p>다운로드 패널의 상태 표시기를 통해 이미지 로딩 진행 상황을 명확히 볼 수 있습니다.</p>
<p><strong>참고:</strong> 다운로드 파일 크기가 1.2GB를 초과할 경우, 분할 압축이 자동으로 활성화됩니다. 파일을 추출하는 동안 오류가 발생하면 추출 소프트웨어를 업데이트하거나 7-Zip을 사용하세요.</p>

<h2>[다운로드 범위를 선택할 수 있나요?]</h2>
<p>네, 다운로드 패널에는 다운로드 범위를 선택할 수 있는 옵션(Cherry Pick)이 있으며, 이는 다운로드, 자동 로딩 및 사전 로딩에 적용됩니다.</p>
<p>다운로드 범위에서 제외된 이미지라도 썸네일을 클릭하여 해당 큰 이미지를 로드할 수 있습니다.</p>

<h2>[일러스트 사이트에서 이미지를 선택하려면 어떻게 해야 하나요?]</h2>
<p>썸네일 리스트에서 다음 핫키를 사용하여 이미지를 선택할 수 있습니다:</p>
<ul>
<li><strong>Ctrl + 왼쪽 클릭:</strong> 이미지를 선택합니다. 첫 번째 선택은 다른 모든 이미지를 제외합니다.</li>
<li><strong>Ctrl + Shift + 왼쪽 클릭:</strong> 이 이미지와 마지막으로 선택된 이미지 사이의 이미지를 선택합니다.</li>
<li><strong>Alt + 왼쪽 클릭:</strong> 이미지를 제외합니다. 첫 번째 제외는 다른 모든 이미지를 선택합니다.</li>
<li><strong>Alt + Shift + 왼쪽 클릭:</strong> 이 이미지와 마지막으로 제외된 이미지 사이의 이미지를 제외합니다.</li>
</ul>
<p>추가적으로 몇 가지 방법이 더 있습니다:</p>
<ul>
<li>썸네일에서 중간 클릭으로 원본 이미지 URL을 열고, 그 후 오른쪽 클릭하여 이미지를 저장합니다.</li>
<li>다운로드 패널에서 다운로드 범위를 1로 설정하세요. 이는 첫 번째 이미지 이외의 모든 이미지를 제외합니다. 그런 다음 목록에서 관심 있는 썸네일을 클릭하여 해당 큰 이미지를 로드합니다. 선택한 후, 다운로드 범위를 해제하고 <strong>이미 다운로드한 이미지 가져오기</strong>를 클릭하여 선택한 이미지를 패키징하고 다운로드합니다.</li>
<li>자동 로딩을 끄고 설정 패널에서 사전 로딩을 1로 설정한 다음, 위의 방법대로 진행합니다.</li>
</ul>

<h2>[키보드로 스크립트를 조작할 수 있나요?]</h2>
<p>네! 설정 패널 하단에 <strong>단축키</strong> 버튼이 있습니다. 이 버튼을 클릭하여 키보드 조작을 확인하거나 설정할 수 있습니다.</p>
<p>한 손으로 모든 키보드 조작을 할 수 있도록 설정할 수도 있어, 다른 손을 자유롭게 쓸 수 있습니다!</p>

<h2>[특정 사이트에서 자동 열기를 비활성화하려면 어떻게 해야 하나요?]</h2>
<p>설정 패널 하단에 있는 <strong>사이트 설정</strong> 버튼을 클릭하여 특정 사이트에서 자동 열기를 제외할 수 있습니다. 예를 들어, Twitter나 Booru 타입의 사이트를 제외할 수 있습니다.</p>

<h2>[특정 사이트에서 이 스크립트를 비활성화하려면 어떻게 해야 하나요?]</h2>
<p>설정 패널 하단의 <strong>사이트 설정</strong> 버튼을 클릭하여 특정 사이트를 제외할 수 있습니다. 제외된 사이트에서는 더 이상 스크립트가 활성화되지 않습니다.</p>
<p>사이트를 다시 활성화하려면 제외되지 않은 사이트에서 설정해야 합니다.</p>

<h2>[개발자에게 도움을 주고 싶다면?]</h2>
<p><a target="_blank" href="https://github.com/MapoMagpie/comic-looms">Github</a>에 별을 주시거나, <a target="_blank" href="https://greasyfork.org/scripts/397848-comic-looms">Greasyfork</a>에서 좋은 리뷰를 남겨주세요.</p>
<p>단, Greasyfork에 버그 제보 내용의 리뷰를 남기지 마세요. 해당 플랫폼의 알림 시스템이 후속 피드백을 추적할 수 없습니다. 많은 사람들이 문제를 제기하고 다시 돌아오지 않습니다.<br> 문제는 여기에 보고해 주세요: <a target="_blank" href="https://github.com/MapoMagpie/comic-looms/issues">이슈</a></p>

<h2>[가이드를 다시 열려면?]</h2>
<p>설정 패널 하단에 있는 <strong>도움말</strong> 버튼을 클릭하세요.</p>

<h2>[해결되지 않은 문제들]</h2>
<ul>
<li>Firefox를 사용하여 Twitter의 홈페이지를 새 탭에서 연 후 사용자의 홈페이지로 이동하면 스크립트가 활성화되지 않으며 페이지 새로고침이 필요합니다.</li>
<li>Chrome과 Firefox의 프레임내에서 사이트를 여는 것을 방지하는 확장 프로그램을 사용하는 경우, E-Hentai에서 갤러리 내 이미지를 열 수 없게 되며 설정 메뉴 또한 표시되지 않습니다. 이 문제를 해결하려면 확장 프로그램을 비활성화하거나 예외 항목을 추가하세요.</li>
</ul>

<h2>[작동 원리]</h2>
<p>이 스크립트는 단순한 jQuery(구형 스크립트)에서부터 최첨단 Vue.js 프레임워크에 이르기까지 매우 다양한 웹 기술에서 작동합니다. 이 스크립트는 해당 기술들을 해킹하지 않고도 상호작용할 수 있도록 최적화되어 있습니다.</p>
<p>설정 패널의 자동 저장 및 사이트별 설정 기능은 스크립트의 본체 코드에 저장되지 않으며, 스크립트에서 수집하는 정보는 로컬 컴퓨터에만 저장됩니다.</p>
<p>또한 이 스크립트는 많은 이미지를 처리할 수 있도록 효율적으로 설계되었습니다. 이미지 로딩 시점에서는 브라우저에 의존하며, 이미지 관련 데이터는 사용자 시스템의 메모리로 직접 로드됩니다. 이는 데이터 전송량과 서버 요청 수를 줄이면서도 빠르고 유연한 이미징을 가능하게 합니다.</p>

<h2>[스크립트가 작동하지 않는 이유는 무엇인가요?]</h2>
<p>이 스크립트는 웹페이지의 HTML 구조와 상호작용하기 때문에 페이지가 변경될 경우(예: 개발자가 업데이트를 하거나 광고를 삽입할 때) 예상대로 작동하지 않을 수 있습니다. 이 경우, 브라우저 콘솔을 열어 오류 메시지를 확인하세요. 오류 메시지가 표시되면 GitHub 이슈 섹션에 보고해 주세요.</p>

<h2>[기타 정보]</h2>
<p>설정 패널에서 다양한 설정 옵션을 사용할 수 있으며, 각 설정은 사용자 환경을 최적화하는 데 도움이 됩니다. 스크립트가 의도대로 작동하지 않는 경우 GitHub 이슈에서 해결 방법을 찾아보세요.</p>
`,
    `
<h2>¿Cómo se usa? ¿Dónde está la entrada</h2>
<p>El script generalmente se activa en las páginas principales de galerías o en las páginas principales de artistas. Por ejemplo, en E-Hentai, se activa en la página de detalles de la galería, o en Twitter, se activa en la página principal del usuario o en los tweets.p>
<p>Cuando esté activo, aparecerá un ícono de <strong>&lt;🎑&gt;</strong> en la parte inferior izquierda de la página.</p>
<h2 style="color:red;">[Algunos problemas no resueltos]</h2>
<ul>
<li>Al usar Firefox para abrir la página principal de Twitter en una nueva pestaña y luego navegar a la página principal del usuario, el script no se activa y requiere actualizar la página.</li>
<li>En Firefox, la función de descarga no funciona en el dominio twitter.com. Firefox no redirige twitter.com a x.com cuando se abre en una nueva pestaña. Debes usar x.com en lugar de twitter.com.</li>
</ul>
<h2>[¿Se puede reubicar el punto de entrada o la barra de control del script?]</h2>
<p>¡Sí! En la parte inferior del panel de configuración, hay una opción de <strong>Arrastrar para mover</strong>. Arrastra el ícono para reposicionar la barra de control en cualquier parte de la página.</p>
<h2>[¿Puede el script abrirse automáticamente al navegar a la página correspondiente?]</h2>
<p>¡Sí! Hay una opción de <strong>Apertura Automática</strong> en el panel de configuración. Actívala para habilitar esta función.</p>
<h2>[¿Cómo hacer zoom en las imágenes?]</h2>
<p>Hay varias formas de hacer zoom en las imágenes en el modo de lectura de imágenes grandes:</p>
<ul>
<li>Clic derecho + rueda del ratón</li>
<li>Atajos de teclado</li>
<li>Controles de zoom en la barra de control: haz clic en los botones -/+, desplaza la rueda del ratón sobre los números o arrastra los números hacia la izquierda o derecha.</li>
</ul>
<h2>[¿Cómo mantener el espacio entre imágenes grandes?]</h2>
<p>En CONF > Style, modifique o añada: .ehvp-root { --ehvp-big-images-gap: 2px; }</p>
<h2>[¿Cómo abrir imágenes de una página específica?]</h2>
<p>En la interfaz de lista de miniaturas, simplemente escribe el número de página deseado en tu teclado (sin necesidad de un aviso) y presiona Enter o utiliza tus atajos personalizados.</p>
<h2>[Acerca de la Lista de Miniaturas]</h2>
<p>La interfaz de lista de miniaturas es la característica más importante del script, ya que te permite obtener rápidamente una vista general de toda la galería.</p>
<p>Las miniaturas se cargan de forma diferida, normalmente cargando alrededor de 20 imágenes, lo que es comparable o incluso implica menos solicitudes que la navegación normal.</p>
<p>La paginación también se carga de manera diferida, lo que significa que no todas las páginas de la galería se cargan a la vez. Solo cuando te acercas al final de la página, se carga la siguiente.</p>
<p>No te preocupes por generar muchas solicitudes al desplazarte rápidamente por la lista de miniaturas; el script está diseñado para manejar esto de manera eficiente.</p>
<h2>[Acerca de la Carga Automática y la Carga Anticipada]</h2>
<p>Por defecto, el script carga automáticamente y de manera gradual las imágenes grandes una por una.</p>
<p>Aún puedes hacer clic en cualquier miniatura para comenzar a cargar y leer desde ese punto, momento en el cual la carga automática se detendrá y se pre-cargarán 3 imágenes desde la posición de lectura.</p>
<p>Al igual que con la lista de miniaturas, no necesitas preocuparte por generar muchas solicitudes de carga al desplazarte rápidamente.</p>
<h2>[Acerca de la Descarga]</h2>
<p>La descarga está integrada con la carga de imágenes grandes. Cuando termines de navegar por una galería y quieras guardar y descargar las imágenes, puedes hacer clic en <strong>Iniciar Descarga</strong> en el panel de descargas. No te preocupes por volver a descargar las imágenes ya cargadas.</p>
<p>También puedes hacer clic directamente en <strong>Iniciar Descarga</strong> en el panel de descargas sin necesidad de leer.</p>
<p>Alternativamente, haz clic en el botón <strong>Tomar Cargadas</strong> en el panel de descargas si algunas imágenes no se cargan consistentemente. Esto guardará las imágenes que ya se han cargado.</p>
<p>Los indicadores de estado del panel de descargas proporcionan una visión clara del progreso de la carga de imágenes.</p>
<p><strong>Nota:</strong> Cuando el tamaño del archivo de descarga supere los 1.2 GB, se habilitará automáticamente la compresión dividida. Si encuentras errores al extraer los archivos, por favor actualiza tu software de extracción o usa 7-Zip.</p>
<h2>[¿Puedo seleccionar el rango de descarga?]</h2>
<p>Sí, el panel de descargas tiene una opción para seleccionar el rango de descarga (Cherry Pick), que se aplica a la descarga, carga automática y carga anticipada.</p>
<p>Incluso si una imagen está excluida del rango de descarga, aún puedes hacer clic en su miniatura para verla, lo que cargará la imagen grande correspondiente.</p>
<h2>[¿Cómo seleccionar imágenes en algunos sitios de ilustración?]</h2>
<p>En la lista de miniaturas, puedes usar algunas teclas de acceso rápido para seleccionar imágenes:</p>
<ul>
<li><strong>Ctrl + Clic Izquierdo:</strong> Selecciona la imagen. La primera selección excluirá todas las demás imágenes.</li>
<li><strong>Ctrl + Shift + Clic Izquierdo:</strong> Selecciona el rango de imágenes entre esta imagen y la última imagen seleccionada.</li>
<li><strong>Alt + Clic Izquierdo:</strong> Excluye la imagen. La primera exclusión seleccionará todas las demás imágenes.</li>
<li><strong>Alt + Shift + Clic Izquierdo:</strong> Excluye el rango de imágenes entre esta imagen y la última imagen excluida.</li>
</ul>
<p>Además, hay otros métodos:</p>
<ul>
<li>Haz clic en el botón del medio en una miniatura para abrir la URL de la imagen original, luego haz clic derecho para guardar la imagen.</li>
<li>Establece el rango de descarga en 1 en el panel de descargas. Esto excluirá todas las imágenes excepto la primera. Luego, haz clic en las miniaturas de interés en la lista, lo que cargará las imágenes grandes correspondientes. Después de seleccionar, borra el rango de descarga y haz clic en <strong>Tomar Cargadas</strong> para empaquetar y descargar tus imágenes seleccionadas.</li>
<li>Desactiva la carga automática y establece la carga anticipada en 1 en el panel de configuración, luego procede como se describe anteriormente.</li>
</ul>
<h2>[¿Puedo operar el script mediante el teclado?]</h2>
<p>¡Sí! Hay un botón del <strong>Teclado</strong> en la parte inferior del panel de configuración. Haz clic en él para ver o configurar las operaciones del teclado.</p>
<p>¡Incluso puedes configurarlo para operar con una sola mano, liberando así tu otra mano!</p>
<h2>[¿Cómo apoyar al autor?]</h2>
<p>Déjame una estrella en <a target='_blank' href='https://github.com/MapoMagpie/comic-looms'>Github</a> o una buena reseña en <a target='_blank' href='https://greasyfork.org/scripts/397848-comic-looms'>Greasyfork</a>.</p>
<p>Por favor, no dejes reseñas en Greasyfork, ya que su sistema de notificaciones no puede rastrear comentarios posteriores. Muchas personas dejan un problema y nunca vuelven.
Reporta problemas aquí: <a target='_blank' href='https://github.com/MapoMagpie/comic-looms/issues'>issue</a></p>
<h2>[¿Cómo reabrir la guía?]</h2>
<p>Haz clic en el botón de <strong>Ayuda</strong> en la parte inferior del panel de configuración.</p>
`,
  ],
} satisfies Record<string, Langs>;
type I18nKeys = keyof (typeof i18nData);

const kbInFullViewGridData: Record<KeyboardInFullViewGridId | KeyboardInBigImageModeId | KeyboardInMainId, Langs> = {
  'open-full-view-grid': [
    'Enter Read Mode',
    '进入阅读模式',
    '읽기 모드 시작',
    'Entrar en modo de lectura'
  ],
  'start-download': [
    'Start Download',
    '开始下载',
    '다운로드 시작',
    'Iniciar Descarga'
  ],
  'step-image-prev': [
    'Go Prev Image',
    '切换到上一张图片',
    '이전 이미지',
    'Ir a la imagen anterior'
  ],
  'step-image-next': [
    'Go Next Image',
    '切换到下一张图片',
    '다음 이미지',
    'Ir a la imagen siguiente'
  ],
  'exit-big-image-mode': [
    'Exit Big Image Mode',
    '退出大图模式',
    '이미지 크게 보기 종료',
    'Salir del modo de imagen grande'
  ],
  'step-to-first-image': [
    'Go First Image',
    '跳转到第一张图片',
    '첫 이미지로 이동',
    'Ir a la primera imagen'
  ],
  'step-to-last-image': [
    'Go Last Image',
    '跳转到最后一张图片',
    '마지막 이미지로 이동',
    'Ir a la última imagen'
  ],
  'scale-image-increase': [
    'Increase Image Scale',
    '放大图片',
    '이미지 확대',
    'Aumentar la escala de la imagen'
  ],
  'scale-image-decrease': [
    'Decrease Image Scale',
    '缩小图片',
    '이미지 축소',
    'Disminuir la escala de la imagen'
  ],
  'scroll-image-up': [
    'Scroll Image Up (Please Keep Default Keys)',
    '向上滚动图片 (请保留默认按键)',
    '이미지 위로 스크롤 (기본 키는 그대로 두십시오)',
    'Desplazar la imagen hacia arriba (Por favor, mantener las teclas predeterminadas)'
  ],
  'scroll-image-down': [
    'Scroll Image Down (Please Keep Default Keys)',
    '向下滚动图片 (请保留默认按键)',
    '이미지 아래로 스크롤 (기본 키는 그대로 두십시오)',
    'Desplazar la imagen hacia abajo (Por favor, mantener las teclas predeterminadas)'
  ],
  'toggle-auto-play': [
    'Toggle Auto Play',
    '切换自动播放',
    '자동 재생 시작/중지',
    'Alternar reproducción automática'
  ],
  'round-read-mode': [
    'Switch Reading mode (Loop)',
    '切换阅读模式(循环)',
    '읽기 모드 전환(루프)',
    'Cambiar modo de lectura (bucle)'
  ],
  'toggle-reverse-pages': [
    'Toggle Pages Reverse',
    '切换阅读方向',
    '페이지 반전 전환',
    'Alternar páginas hacia atrás'
  ],
  'rotate-image': [
    'Rotate Image',
    '旋转图片',
    '이미지 회전',
    'Girar imagen'
  ],
  'cherry-pick-current': [
    'Cherry Pick Current Images',
    '选择当前图片',
    '체리픽 현재 이미지',
    'Imágenes actuales de Cherry Pick'
  ],
  'exclude-current': [
    'Exclude current images',
    '排除当前图片',
    '현재 이미지 제외',
    'Excluir imágenes actuales'
  ],
  'open-big-image-mode': [
    'Enter Big Image Mode',
    '进入大图阅读模式',
    '이미지 크게 보기',
    'Entrar al modo de imagen grande'
  ],
  'pause-auto-load-temporarily': [
    'Pause Auto Load Temporarily',
    '临时停止自动加载',
    '자동 이미지 로딩 일시 중지',
    'Pausar carga automática temporalmente'
  ],
  'exit-full-view-grid': [
    'Exit Read Mode',
    '退出阅读模式',
    '읽기 모드 종료',
    'Salir del modo de lectura'
  ],
  'columns-increase': [
    'Increase Columns ',
    '增加每行数量',
    '열 수 늘리기',
    'Aumentar columnas'
  ],
  'columns-decrease': [
    'Decrease Columns ',
    '减少每行数量',
    '열 수 줄이기',
    'Disminuir columnas'
  ],
  'retry-fetch-next-page': [
    'Try Fetch Next Page',
    '重新加载下一分页',
    '다음 페이지 로딩 재시도',
    'Intentar cargar la siguiente página'
  ],
  'go-prev-chapter': [
    'Switch To Previous Chapter',
    '切换到上一章节',
    '이전 장으로 전환',
    'Cambiar al capítulo anterior',
  ],
  'go-next-chapter': [
    'Switch To Next Chapter',
    '切换到下一章节',
    '다음 장으로 전환',
    'cambiar al siguiente capítulo',
  ],
  'resize-flow-vision': [
    'Resize Thumbnail Grid Layout',
    'Resize Thumbnail Grid Layout',
    'Resize Thumbnail Grid Layout',
    'Resize Thumbnail Grid Layout'
  ],
};

// type KBInMainKeys = keyof (typeof kbInMainData);
// type KBInFullViewGridKeys = keyof (typeof kbInFullViewGridData);
// type KBInBigImageModeKeys = keyof (typeof kbInBigImageModeData);

function convert<T extends string>(data: Record<T, Langs>): Record<T, I18nValue> {
  const entries = Object.entries<Langs>(data);
  const ret = entries.reduce<Record<string, I18nValue>>((prev, [k, v]) => {
    prev[k] = new I18nValue(v);
    return prev;
  }, {});
  return ret as Record<T, I18nValue>;
}

export const i18n = {
  ...(convert<I18nKeys>(i18nData)),
  keyboard: convert<KeyboardInFullViewGridId | KeyboardInBigImageModeId | KeyboardInMainId>(kbInFullViewGridData),

};
