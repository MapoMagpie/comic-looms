## [¿Cómo se usa? ¿Dónde está la entrada?]

El script generalmente se activa en las páginas principales de galerías o en las páginas principales de artistas. Por ejemplo, en E-Hentai, se activa en la página de detalles de la galería, o en Twitter, se activa en la página principal del usuario o en los tweets.

Cuando esté activo, aparecerá un ícono de **<🎑>** en la parte inferior izquierda de la página. Haz clic en él para entrar en la interfaz de lectura del script.

## [Algunos problemas no resueltos]

- Al usar Firefox para abrir la página principal de Twitter en una nueva pestaña y luego navegar a la página principal del usuario, el script no se activa y requiere actualizar la página.
- En Firefox, la función de descarga no funciona en el dominio `twitter.com`. Firefox no redirige `twitter.com` a `x.com` cuando se abre en una nueva pestaña. Debes usar `x.com` en lugar de `twitter.com`.

## [¿Se puede reubicar el punto de entrada o la barra de control del script?]

¡Sí! En la parte inferior del panel de configuración, hay una opción de **Arrastrar para mover**. Arrastra el ícono para reposicionar la barra de control en cualquier parte de la página.

## [¿Puede el script abrirse automáticamente al navegar a la página correspondiente?]

¡Sí! Hay una opción de **Apertura Automática** en el panel de configuración. Actívala para habilitar esta función.

## [¿Cómo hacer zoom en las imágenes?]

Hay varias formas de hacer zoom en las imágenes en el modo de lectura de imágenes grandes:

- Clic derecho + rueda del ratón
- Atajos de teclado
- Controles de zoom en la barra de control: haz clic en los botones -/+, desplaza la rueda del ratón sobre los números o arrastra los números hacia la izquierda o derecha.

## [¿Cómo mantener el espacio entre imágenes grandes?]
En CONF > Style, modifique o añada: .ehvp-root { --ehvp-big-images-gap: 2px; }

## [¿Cómo abrir imágenes de una página específica?]

En la interfaz de lista de miniaturas, simplemente escribe el número de página deseado en tu teclado (sin necesidad de un aviso) y presiona Enter o utiliza tus atajos personalizados.

## [Acerca de la Lista de Miniaturas]

La interfaz de lista de miniaturas es la característica más importante del script, ya que te permite obtener rápidamente una vista general de toda la galería.

Las miniaturas se cargan de forma diferida, normalmente cargando alrededor de 20 imágenes, lo que es comparable o incluso implica menos solicitudes que la navegación normal.

La paginación también se carga de manera diferida, lo que significa que no todas las páginas de la galería se cargan a la vez. Solo cuando te acercas al final de la página, se carga la siguiente.

No te preocupes por generar muchas solicitudes al desplazarte rápidamente por la lista de miniaturas; el script está diseñado para manejar esto de manera eficiente.

## [Acerca de la Carga Automática y la Carga Anticipada]

Por defecto, el script carga automáticamente y de manera gradual las imágenes grandes una por una.

Aún puedes hacer clic en cualquier miniatura para comenzar a cargar y leer desde ese punto, momento en el cual la carga automática se detendrá y se pre-cargarán 3 imágenes desde la posición de lectura.

Al igual que con la lista de miniaturas, no necesitas preocuparte por generar muchas solicitudes de carga al desplazarte rápidamente.

## [Acerca de la Descarga]

La descarga está integrada con la carga de imágenes grandes. Cuando termines de navegar por una galería y quieras guardar y descargar las imágenes, puedes hacer clic en **Iniciar Descarga** en el panel de descargas. No te preocupes por volver a descargar las imágenes ya cargadas.

También puedes hacer clic directamente en **Iniciar Descarga** en el panel de descargas sin necesidad de leer.

Alternativamente, haz clic en el botón **Tomar Cargadas** en el panel de descargas si algunas imágenes no se cargan consistentemente. Esto guardará las imágenes que ya se han cargado.

Los indicadores de estado del panel de descargas proporcionan una visión clara del progreso de la carga de imágenes.

**Nota:** Cuando el tamaño del archivo de descarga supere los 1.2 GB, se habilitará automáticamente la compresión dividida. Si encuentras errores al extraer los archivos, por favor actualiza tu software de extracción o usa 7-Zip.

## [¿Puedo seleccionar el rango de descarga?]

Sí, el panel de descargas tiene una opción para seleccionar el rango de descarga (Cherry Pick), que se aplica a la descarga, carga automática y carga anticipada.

Incluso si una imagen está excluida del rango de descarga, aún puedes hacer clic en su miniatura para verla, lo que cargará la imagen grande correspondiente.

## [¿Cómo seleccionar imágenes en algunos sitios de ilustración?]

En la lista de miniaturas, puedes usar algunas teclas de acceso rápido para seleccionar imágenes:

- **Ctrl + Clic Izquierdo:** Selecciona la imagen. La primera selección excluirá todas las demás imágenes.
- **Ctrl + Shift + Clic Izquierdo:** Selecciona el rango de imágenes entre esta imagen y la última imagen seleccionada.
- **Alt + Clic Izquierdo:** Excluye la imagen. La primera exclusión seleccionará todas las demás imágenes.
- **Alt + Shift + Clic Izquierdo:** Excluye el rango de imágenes entre esta imagen y la última imagen excluida.

Además, hay otros métodos:

- Haz clic en el botón del medio en una miniatura para abrir la URL de la imagen original, luego haz clic derecho para guardar la imagen.
- Establece el rango de descarga en 1 en el panel de descargas. Esto excluirá todas las imágenes excepto la primera. Luego, haz clic en las miniaturas de interés en la lista, lo que cargará las imágenes grandes correspondientes. Después de seleccionar, borra el rango de descarga y haz clic en **Tomar Cargadas** para empaquetar y descargar tus imágenes seleccionadas.
- Desactiva la carga automática y establece la carga anticipada en 1 en el panel de configuración, luego procede como se describe anteriormente.

## [¿Puedo operar el script mediante el teclado?]

¡Sí! Hay un botón del **Teclado** en la parte inferior del panel de configuración. Haz clic en él para ver o configurar las operaciones del teclado.

¡Incluso puedes configurarlo para operar con una sola mano, liberando así tu otra mano!

## [¿Cómo desactivar la apertura automática en ciertos sitios?]

Hay un botón de **Perfiles de Sitio** en la parte inferior del panel de configuración. Haz clic en él para excluir ciertos sitios de la apertura automática. Por ejemplo, sitios como Twitter o de tipo Booru.

## [¿Cómo apoyar al autor?]

Déjame una estrella en [Github](https://github.com/MapoMagpie/comic-looms) o una buena reseña en [Greasyfork](https://greasyfork.org/scripts/397848-comic-looms).

Por favor, no dejes reseñas en Greasyfork, ya que su sistema de notificaciones no puede rastrear comentarios posteriores. Muchas personas dejan un problema y nunca vuelven.
Reporta problemas aquí: [issue](https://github.com/MapoMagpie/comic-looms/issues)

## [¿Cómo reabrir la guía?]

Haz clic en el botón de **Ayuda** en la parte inferior del panel de configuración.
