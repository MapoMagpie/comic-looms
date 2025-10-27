# Comic Looms | [中文](./README_CN.md) | [한글](./README_KO.md) | [Español](./README_ES.md)

**Este Userscript permite una navegación rápida y conveniente por galerías o páginas principales de artistas en [ciertos sitios](#soporte-multi-sitio), con soporte para descargas por lotes, enfocándose en la experiencia de navegación y en una carga baja para el sitio.**

## Index

- [Características](#características)
- [Instalación](#instalación)
- [Soporte multi-sitio](#soporte-multi-sitio)
- [Funcionamiento](#funcionamiento)
- [Comentarios](#comentarios)

Vista previa (si no puedes ver la imagen, haz clic [aqui](./preview.md)):
![Preview](./eh-view-enhance-showcase4.avif 'Preview')

## <a name="características">Características</a>

- **`Navegación fluida`**
  - El script carga automáticamente todas las imágenes en la galería y las presenta en una cuadrícula como miniaturas, permitiendo una navegación rápida por toda la galería mientras mantiene una carga baja en el sitio.
- **`Visualización de Imágenes Grandes`**
  - Puedes hacer clic en cualquier miniatura para comenzar a navegar desde ese punto, con varios modos de visualización disponibles: Paginación, Continua, Ampliación, etc.
- **`Descarga de Galerías`**
  - Guarda todas las imágenes originales e información de la galería para una gestión fácil posterior. Soporta descargas segmentadas para evitar los límites de blobs del navegador.
- **`Operación con Teclado`**
  - Puedes hacer clic en el `teclado` en el panel de CONFIG para conocer y configurar las operaciones de teclado relevantes.
- **`Adaptación Móvil`**
  - Requiere un navegador que soporte extensiones de gestor de scripts, como Firefox Android, Kiwi Browser.

## <a name="instalación">Instalación</a>

1. **`Requisitos Previos`**: Navegador moderno (Firefox\Chrome\Edge...)
1. **`Requisitos Previos`**: Extensión instalada [`Violentmonkey`](https://violentmonkey.github.io/) | [`TamperMonkey`](https://www.tampermonkey.net/)
1. **`Requisitos Previos`**: Haz clic aquí para verificar si puedes acceder a [jsdelivr.net](https://cdn.jsdelivr.net) para asegurar que el script funcione correctamente.
1. **`Enlace de Instalación 1`**: [GreasyFork](https://greasyfork.org/scripts/397848-comic-looms)
1. **`Enlace de Instalación 2`**: Instalación directa [aquí](https://github.com/MapoMagpie/comic-looms/releases/latest/download/comic-looms.user.js)

## <a name="soporte-multi-sitio">Soporte multi-sitio</a>

<details>
  <summary>Actualmente soporta</summary>

- [e-hentai.org](https://e-hentai.org) | [exhentai.org](https://exhentai.org) | [onion](http://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion)
- [Twitter|X: User's Media, Lists, For you, Following](https://x.com/NASA/media)
- [Instagram User POSTS](https://www.instagram.com/nasa)
- [ArtStation User Portfolio](https://www.artstation.com)
- [pixiv.net: Artists' illust and manga, Your Homepage](https://pixiv.net)
- [18comic.vip](https://18comic.vip) | [18comic.org](https://18comic.org) (supports multi-chapter selection, note: no thumbnails)
- [nhentai.net](https://nhentai.net)
- [hitomi.la](https://hitomi.la)
- [rule34.xxx](https://rule34.xxx)
- [imhentai.xxx](https://imhentai.xxx)
- [danbooru.donmai.us](https://danbooru.donmai.us)
- [gelbooru.com](https://gelbooru.com)
- [yande.re](https://yande.re)
- [konachan.com](https://konachan.com)
- [Steam: Screenshots](https://steamcommunity.com/id/some/screenshots)
- [wnacg.com](https://www.wnacg.com)
- [hentainexus.com](https://hentainexus.com)
- [niyaniya.moe(koharu.to)](https://niyaniya.moe)
- [manhuagui.com](https://www.manhuagui.com/comic/7580)
- [mangacopy.com](https://www.mangacopy.com) | [copymanga.tv](https://www.copymanga.tv)
- [e621.net](https://e621.net)
- [arca.live](https://arca.live)
- [akuma.moe](https://akuma.moe)
- [colamanga.com](https://www.colamanga.com)
- [yabai.si](https://yabai.si)
- [hanime1.me](https://hanime1.me/comics)
- [mycomic.com](https://mycomic.com)
- [kemono.su](https://kemono.su)
- [hentaizap.com](https://hentaizap.com)
- [miniserve -p 41021](https://github.com/svenstaro/miniserve)
- [mangapark.net](https://mangapark.net)
- [hentai3.com](https://3hentai.net)
- [asmhentai.com](https://asmhentai.com)
- [eahentai.com](https://eahentai.com)
- [bato.to v3x](https://bato.to/v3x)

</details>

## <a name="funcionamiento">Funcionamiento</a>

1. En la página de la galería o del autor, haz clic en `<🎑>` en la parte inferior izquierda para comenzar a navegar. Puedes arrastrar este elemento a cualquier posición en el panel de CONFIG.
1. Después de un momento, las miniaturas se mostrarán en una cuadrícula en la página. Haz clic en cualquier miniatura para ingresar al modo de visualización de imágenes grandes.
1. Más información se puede encontrar en `CONFIG` -> `Help` o [aquí](./HELP_ES.md).

## <a name="comentarios">Comentarios</a>

Si quieres añadir soporte para ciertos sitios, por favor consulta [esta guía](./CONTRIBUTING_ES.md).

Si encuentras algún problema, por favor repórtalo aquí y asegúrate de describir tu entorno: https://github.com/MapoMagpie/comic-looms/issues

Si te gusta este script, por favor dale una `estrella`.
