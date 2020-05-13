# CTC

**Simulador de un Control de Tráfico Centralizado**

Esta aplicación simula el tablero mímico de una central de Control de Tráfico Centralizado (CTC) con el objetivo de mostrar los efectos de los enclavamientos entre las varias señales y desvíos.

Está disponible en [https://satyam.github.io/reactc2/](https://satyam.github.io/reactc2/) y es instalable localmente.

- [CTC](#ctc)
  - [Glosario](#glosario)
  - [Uso](#uso)
    - [Comandos](#comandos)
      - [Celda](#celda)
      - [Semáforo](#semáforo)
      - [Despachador](#despachador)
      - [Ver configuración](#ver-configuración)
    - [Movimiento de trenes](#movimiento-de-trenes)
    - [Bloques](#bloques)
    - [Teletipo](#teletipo)
  - [Configuración](#configuración)
    - [Sectores](#sectores)
      - [Sector](#sector)
      - [Celdas](#celdas)
        - [tipo: LINEA](#tipo-linea)
        - [tipo: CAMBIO](#tipo-cambio)
        - [tipo: PARAGOLPE](#tipo-paragolpe)
        - [tipo: CRUCE](#tipo-cruce)
      - [Semáforos](#semáforos)
    - [Automatismos](#automatismos)
      - [CAMBIO dependiendo de CAMBIO](#cambio-dependiendo-de-cambio)
      - [CAMBIO dependiendo de SEMAFORO](#cambio-dependiendo-de-semaforo)
      - [SEMAFORO dependiendo de CAMBIO](#semaforo-dependiendo-de-cambio)
      - [SEMAFORO dependiendo de SEMAFORO](#semaforo-dependiendo-de-semaforo)
      - [SEMAFORO dependiendo de BLOQUE](#semaforo-dependiendo-de-bloque)
      - [SEMAFORO dependiendo de nada](#semaforo-dependiendo-de-nada)
      - [BLOQUE dependiendo de BLOQUE y CAMBIO](#bloque-dependiendo-de-bloque-y-cambio)
    - [Enclavamientos](#enclavamientos)
      - [Cambio enclavado a bloque](#cambio-enclavado-a-bloque)
      - [Cambio enclavado a semáforo](#cambio-enclavado-a-semáforo)
    - [Empalmes](#empalmes)

## Glosario

- Mímico: Un tablero o pantalla que representa esquemáticamente la topología de una red ferroviaria y sus elementos.
- Sector: Un mímico puede representar una red muy compleja y extensa. Para su mejor manejo, esta se subdivide en sectores.
- Celda: Un mímico es una cuadrícula dividida en varias celdas, cada una de las cuales podrá contener uno o varios tramos de vía de diversos tipos y otros elementos.
- Semáforo: Un poste u otro tipo de soporte conteniendo una o más señales, habitualmente una central acompañada opcionalmente de otra señal a uno u otro lado, o a ambos lados.
- Aspecto: El estado de cada señal, puede ser una luz de color como en las señales viales, un brazo o cualquier otro tipo de indicación visual.
- Bloque: Un conjunto de celdas donde la ocupación de una cualquiera de sus celdas por un tren implica la ocupación de todas las celdas de ese bloque.
- Automatismo: Respuestas pre-programadas de un elemento. Por ejemplo, la señal que controla el acceso a una celda o a un bloque se pondrá en ALTO cuando la celda o bloque esté ocupada por un tren. Dos cambios enfrentados en vías paralelas se moverán a un mismo tiemo para estar ya sea ambos paralelos uno al otro, independizando la circulación por cada vía o conectados conectando ambas vías.
- Enclavamiento: Precondición que el operador deberá satisfacer antes de hacer otra operación. Por ejemplo, antes de hacer un cambio debe asegurarse que no pueda entrar un tren a ese cambio mientras está en movimiento. Para ello, debe poner los semáforos que controlan el acceso en ALTO. Sólo entonces estará el cambio libre para ser manipulado. Una vez efectuado el cambio, los semáforos se deberán liberar.

## Uso

La barra de navegación, siempre fija al borde superior de la pantalla, se dispone de los siguientes comandos.

- `CTC` El título de la aplicación permite volver a la página inicial desde cualquier punto de la aplicación.
- `| 0 | ½ | 1 | 2 | 5 |` Un juego de botones que permite regular la velocidad de simulación. El `0` detiene la simulación.
- Un menú desplegable listando los `Sectores` disponibles, que mostrará la descripción breve del sector activo cuando se selecciona.
- Un menú desplegable con opciones que permite:
  - activar o no el _teletipo_, para visualizar mensajes operativos.
  - habilitar o no los automatizaciones. Esto permite ver la diferencia en el funcionamiento con y sin las mismas.
  - mostrar las coordenadas de cada celda cuando no tienen nombre propio.
  - mostrar los datos de configuración de las celdas y señales al hacer click sobre ellas.
- Finalmente, sobre el margen derecho se dispone de un enlace a GitHub, donde se encuentra el código fuente de este programa.

Al seleccionar cualquier sector se mostrará el mímico correspondiente en el panel central.

En dispositivos con pantalla pequeña donde no cabe el menú completo, aparecerá solamente el título `CTC`, el control de velocidad de simulación y un botón con tres barras horizontales (comunmente llamada _la hamburguesa_) que permite deplegar el menú completo.

El [_teletipo_](#teletipo) si estuviera activo, se muestra sobre el margen inferior de la pantalla.

El centro de la pantalla está ocupada por el _mímico_ del sector. Este está compuesto de un número de celdas cuadradas conteniendo los elementos gráficos que representan al sector.

Estas celdas pueden contener:

- En el ángulo inferior izquierdo el nombre asignado a ese tramo de vía o, si no lo hubiera y la opción de _mostrar coordenadas_ estuviera activa (que es lo habitual), la coordenada en formato `[fila, columna]` de la celda.
- Las vías representadas por trazos que pueden ser de varios tipos:
  - Negro: indica un tramo de vía disponible para circular por él.
  - Gris: en el caso de un cambio, indican las otras posiciones posibles del cambio, que no están activas.
  - Amarillo: indica un tramo que está siendo ocupado por un tren, o que este tramo pertenece a un bloque ocupado por un tren.
  - Gris a rayas: no es un tramo real sino que indica que la vía continúa en una celda disjunta. En este caso, la celda no tendrá otros elementos y en su lugar una leyenda indicará el nombre o las coordenadas de la celda donde continúa.
- Semáforos, indicando el aspecto de hasta tres señales en el mismo poste.
- Despachador: Un círculo amarillo en el centro de la celda y unas flechas azules sobre algunos o todos los tramos activos indican que se pueden despachar trenes desde esa celda pulsando la flecha en la dirección en que se desea que salga. Si la celda, o el bloque a que pertenece, está ocupada, las flechas no aparecerán.
- Tren: Un círculo amarillo conteniendo un ícon de un tren indica que un tren se encuentra en esa celda.

Las celdas tienen 8 extremos, las cuatro esquinas y los cuatro puntos intermedios de los lados. Estos se identifican por las abreviaturas habituales de los puntos cardinales.

Las vías de celdas contiguas suelen conectar una con otra. Si la vía en un extremo de la celda no tiene ninguna celda contigua con que conectar, un tren circulando en esa dirección desaparecerá habiendo presumiblemente pasado a la autoridad de otro centro de control de tráfico.

Las celdas pueden ser de varios tipos, a saber:

- `LINEA`: conecta dos extremos cualquiera de la celda.
- `CAMBIO`: cuenta con un extremo fijo hacia un extremo de la celda, la _punta_ y dos o más ramas conectando con los otros extremos. Sólo una de las ramas está activae en cualquier momento.
- `PARAGOLPE`: se reconoce por un círculo negro en el centro de la celda y un único tramo del centro a alguno de los extremos de la celda. Adicionalmente, una barra al otro lado del círculo respecto del tramo de vía hará de _tope_. Si estuviera presente indicará que cuando un tren llega a este paragolpe será inmediatamente despachado de vuelta en el sentido opuesto. Si no apareciera, el tren desaparecerá del mímico.
- `CRUCE`: indica un cruce de vías que unen, por pares, distintos puntos de la celda. Estas vías pueden o no estar al mismo nivel. Si estuvieran al mismo nivel, la ocupación de una implica la ocupación de la otra.
- `EMPALME`: Esta celda se reconoce por un tramo de vía gris a rayas y el texto `Continúa en ...` indicando que la via continúa en la celda que se indica, físicamente adyancente a esta, pero que por razones de espacio, en el mímico se ha dibujado en otro lugar. Este tipo de celda no se corresponde a ningún elemento tangible en el sector que representa.

### Comandos

El mímico responde a dos tipos de interacciones, el clic (breve) y el _pulsar y sostener_. Estas interacciones pueden hacerse fácilmente en dispositivos con ratón como en pantallas táctiles. La operación más habitual está disponible con el clic mientras que el _pulsar y sostener_ permite acceder a más funciones, incluída la predeterminada para el clic (lo que antes de la pantalla táctil se hacia mediante el botón derecho del ratón).

Si se dispone de ratón, dejando estar el cursor sobre un ítem cualquiera usualmente mostrará información sobre el ítem en cuestión. Esta interacción no es posible en pantallas táctiles.

Algunos de los elementos del mímico son activos, o sea que pueden responder a comandos del operador, a saber:

#### Celda

Si la celda es un cambio, un clic permitirá pasar por las varias posiciones posibles del cambio.

Si el cambio tuviera un enclavamiento, y las condiciones para cambiar no se cumplen, aparecerá un cuadro emergente con una lista de elementos que lo condicionan. Lo habitual es que esta lista indique semáforos que deben ponerse manualmente en _ALTO_ (rojo) para impedir la entrada de vehículos al bloque donde se encuentra el cambio mientras el mecanismo está en movimiento.

La lista de condiciones para poder hacer el cambio se actualizará en la medida que los semáforos se ponen en _ALTO_, hasta desaparecer. En ese momento, el cuadro emergente desaparece y se puede volver a hacer clic una o más veces para concretar el cambio deseado. Si el cuadro emergente impidiera ver el semáforo que se ha de cambiar, es posible cerrarlo. El ocultamiento del cuadro emergente no elimina la razón del enclavamiento. Si se hace clic sobre el cambio, el cuadro volverá a emerger.

Si la celda es un paragolpe, un clic hará que los trenes _reboten_ (indicado por la barra de tope) o desaparezcan cuando lleguen a él.

El resto de las celdas no tienen acciones asignadas al clic.

Un _pulsar y sostener_ en una celda conteniendo un cambio hará aparecer un cuadro emergente que permitirá pasar por las varias posiciones posibles del cambio y también ponerlo en modo manual (indicado por el candado abierto y en rojo), que permite manipularlo independiente de enclavamientos y automatismos, usualmente para casos de reparaciones o mantenimiento. El color de fondo de la celda cambiará a un tono rojizo indicando que está en modo manual.

En todas las celdas, si la opción de `Mostrar Configuración` está activa, un _pulsar y sostener_ hará aparecer un cuadro emergente según se indica en [Ver configuración](#ver-configuración), más adelante.

#### Semáforo

Al hacer clic en un semáforo este pasará al estado _bloqueado_. Las múltiples señales del mismo semáforo se pondrán en _ALTO_ y el ícono parpadeará para indicar esta situación excepcional. Esto permite manipular libremente los cambios a los que este semáforo permite el acceso, según lo indiquen las tablas de enclavamiento. Al hacer clic nuevamente, el semáforo volverá a operar normlamente y su aspecto dependerá de las nuevas condiciones en ese momento, que pueden ser o no las originales.

Un _pulsar y sostener_ hará aparecer un cuadro emergente que permitirá manipular directamente las señales del semáforo. Si el semáforo está configurado para operar sólo en modo manual, los botones apareceran habilitados, en caso contrario, deben ponerse en modo manual. Para ello hay que presionar el ícono del candado. En modo manual el semáforo no genera ni responde a los automatismos o enclavamientos. El ícono que representa el semáforo dentro de la celda se pondrá en un tono rojizo.

En todos los semáforos, si la opción de `Mostrar Configuración` está activa, un _pulsar y sostener_ hará aparecer un cuadro emergente según se indica en [Ver configuración](#ver-configuración), más adelante.

#### Despachador

Al hacer clic en la flecha azul para despachar trenes, se despachará el tipo de tren estándar. El tren aparecerá de inmediato en la celda en cuestión y se moverá a la velocidad máxima configurada para este tipo de tren y según la velocidad de simulación. La flecha desaparecerá en el mismo momento al estár la celda ocupada, para volver a aparecer apenas hubiera salido de la celda o del bloque a que esta pertenece.

Un _pulsar y sostener_ una flecha, aparecerá un cuadro emergente con los tipos de trenes disponibles. Haciendo clic sobre cualquiera de la lista lo despachará de inmediato.

#### Ver configuración

Cuando está activa la opción de `Mostrar Config.` en el menú de opciones, al _pulsar y sostener_ sobre cualquier elemento del mímico se podrá ver la configuración del mismo. Esto se aplica tanto a elementos activos, como cambios y semáforos, como a los pasivos.

En este caso, el cuadro emergente mostrará una o más solapas que permitirán ver distinta información.

- Si el elemento fuera activo, la primera que aparecerá será la marcado `Cmd.` por _Comandos_ que permitirá dar los comandos de siempre.
- Una solapa `Celda` mostrará la configuración de la celda.
- Si es un semáforo, la solapa `Semáforo` mostrará los datos del mismo.
- Si la celda o el semáforo tuvieran automatismos, la solapa marcada `Autom.` permitirá verlos.
- Si la celda es un cambio y tuviera enclavamientos, la solapa `Encl` mostrará las condiciones que permiten manipularlo.
- Si la celda pertenece a un bloque, la solapa `Bloq` mostrará las celdas que forman parte del mismo bloque.

Estos cuadros mostrarán la configuración activa en ese instante, no la configuración inicial. No sólo mostrará los cambios resultantes de los comandos sino también algunas propiedades de uso interno, que no se usan en los archivos de configuración. Estas se enumeran en los siguientes párrafos, pero no deben incluirse en los archivos de configuración.

### Movimiento de trenes

Como se ha indicado [previamente](#despachador), algunas celdas mostrarán un círculo amarillo en su centro. Esto indica que esa celda puede despachar trenes. Una o más flechas azules acompañan este círculo indicando en qué sentido saldrá el tren. Al pulsar una cualquiera de esas flechas, se creará automáticamente un tren estándar que ocupará la celda en que se ha creado y que comenzará a moverse en el sentido que se ha indicado. Un _pulsar y sostener_ permitirá elegitr el típo de tren que se despacha.

Las celdas que tienen un tren mostrarán sus vías en color amarillo y un círculo amarillo con un tren en su centro. El ícono del tren aparecerà negro si va a su velocidad normal, naranja y negro por mitades si va a velocidad reducida (por una señal en _PRECAUCIÓN_ previa) o en rojo si estuviera detenido.

Si se deja el cursor sobre el ícono del tren, aparecerá el identificador del tren (puede ser necesario poner la simulación en pausa para que darle tiempo a que aparezca).

Los trenes desaparecen cuando llegan a un tramo de vía que no tiene una celda contigua, presumiblemente porque habría de continuar en un sector contiguo. Si hay una celda contigua pero no hay un tramo de vía que empalme con aquella por la que circula, o existe pero no está activa (cambio mal pasado), se generará un error y la simulación quedará en pausa para poder analizar el problema.

Si un tren llega a un paragolpe que está en modo de _rebote_, el tren volverá a salir en el sentido opuesto al que entró. Si no estuviera en modo _rebote_ el tren desaparecerá, como en el caso de tramos que no van a ninguna celda.

Si un tren llega a una celda de empalme, continuará su recorrido en la celda a la que empalma, como si fuera contigua.

El programa genera varios errores que mostrará en un cuadro emergente sobre la celda en que se ha detectado. En ese momento la simulación se detendrá para poder ver qué ha ocurrido. Al cerrar el cuadro emergente todos los trenes en circulación en ese momento desaparecerán. La simulación permanecerá en pausa.

Los errores pueden ser:

- Colisión: un tren ha entrado en una celda actualmente ocupada por otro tren.
- Invasión de bloque: un tren ha entrado en un bloque en el que alguna de sus celdas está ocupada por otro tren.
- Cambio mal puesto: el cambio en un desvío no está pasado hacia el tramo de vía por la que llega.

### Bloques

Las celdas podrán pertenecer a bloques. Un bloque abarcará varias celdas. Cada celda podrá pertenecer a sólo un bloque. Los bloques se identifican por nombres que han de ser únicos para cada sector. Si un tren se encuentra en un bloque, todo el bloque se marcará como ocupado. Visualmente, todas las vías del bloque se vuelven amarillas, aunque el ícono del tren se marcará en la celda en la que efectivamente se encuentra.

Un tren no puede entrar a un bloque que esté ocupado por otro tren. Si lo hiciera, generará un error, similar a una colisión con otro tren.
Se pueden definir enclavamientos entre señales y bloques, tal que impidan el acceso a un bloque ocupado.

### Teletipo

Con el panel de Teletipo activo, se podrán ver mensajes operativos, partidas de trenes, detenciones, llegada de trenes o colisiones. Los mensajes se encuentran ordenados con el más reciente arriba. Por defecto sólo se mostrarán las alertas graves, para no ocupar tanto lugar en la pantalla. Un botón marcado `Ver Info` permitirá visualizar también los mensajes puramente informativos. Los mensajes se podrán borrar individualmente, mediante el botón con el símbolo del basurero al final de cada fila, o en su totalidad, con el mismo símbolo en la barra de encabezados.

## Configuración

La configuración de los diversos sectores, sus celdas y señales está dada en los [varios archivos](https://github.com/Satyam/reactc2/tree/master/src/Store/data) de configuración. Estos archivos están compilados en la aplicación por lo que no pueden ser modificados por el usuario. Cada vez que se reinicie la aplicación, esta volverá a estos mismos valores iniciales.

Los archivos de configuración contienen listas de propiedades para los distintos elementos. Tanto los elementos dentro de estas listas como las propiedades dentro de cada elemento pueden darse en cualquier orden.

Si se habilita la opcion de `Mostrar Config.`, se pueden ver los detalles de la configuración de cada elemento al _pulsar y sostener_ sobre él.

### Sectores

Cada sector está descripto en un una carpeta separada que contiene varios archivos. Una carpeta [`_template`](https://github.com/Satyam/reactc2/tree/master/src/Store/data/_template) contiene el esqueleto básico, vacío, de los archivos necesarios para un sector. Estos archivos se copian en una nueva carpeta para cada sector que se quiera agregar. Conviene que el nombre de cada carpeta sea breve y se limite a letras y números sin acentos o signos extraños. Este identificador formará parte del URL de las varias páginas y es más elegante si es legible.

#### Sector

Cada sector está descripto en el archivo [sector.js](https://github.com/Satyam/reactc2/blob/master/src/Store/data/constitucion/sector.js). Este exporta lo que en JavaScript se denomina _objeto literal_ (Object Literal) con una serie de propiedades, a saber:

- `descrCorta`: Un texto breve que describa el sector. Este será el que el usuario vea y debe ser legible. Se usará, por ejemplo, en el menú y en la solapa del navegador. En los menúes, el listado de sectores estará ordenado alfabéticamente por esta propiedad.
- `descr`: La descripción completa del sector. Se mostrará al dejar reposar el cursor sobre el ítem de menú.

Internamente, el programa genera una propiedad `idSector` que es el identificador único del sector y que corresponde al nombre de la carpeta donde se encuentran estas definiciones. Este identificador se usará internamente y se mostrará si el operador activa la opcion `Mostrar Config.`.

#### Celdas

Las celdas del sector se declaran en el archivo [celdas.js](https://github.com/Satyam/reactc2/blob/8ecaad57df8deeeecdcd034701055d3b3f23bc8f/src/Store/data/constitucion/celdas.js#L21).

El archivo de definición de celdas comienza importando una serie de [constantes](https://github.com/Satyam/reactc2/blob/8ecaad57df8deeeecdcd034701055d3b3f23bc8f/src/Store/data/constitucion/celdas.js#L2-L18). Como es habitual en JavaScript y otros lenguajes, las constantes suelen escribirse todas en mayúsculas, con guiones bajos para separar las palabras. La finalidad de estas constantes es, principalmente, reducir errores tipográficos y usualmente también reducir el tamaño del código. Dondequiera que se use la constante `LINEA` podría también escribirse `'linea'`, que es el valor que representa. La diferencia está en que un error tipográfico podría resultar en escribir, por ejemplo, `'linae'`, que pasaría totalmente inadvertido en cualquier chequeo de sintaxis pues un _string_ es libre de contener lo que se quiera. Esto no ocurre si se escribe `LINAE` dado que esa constante no existe.

No es necesario declarar las celdas vacías. Un sector declarado de 4 \* 3 celdas, no necesita 12 declaraciones. Las que no contengan ningún tramo de riel pueden omitirse.

Todas las celdas son más o menos cuadradas (según la pantalla lo permita). Todos los segmentos de vías que contienen irradian del centro de ese cuadrado hacia una de 8 posibles direcciones, las cuatro esquinas y los puntos intermedios de los lados. Estos extremos se los llama por el punto cardinal al que apunta. Aún así, todas las líneas pasan por el centro del cuadrado. Es obvio que una línea de norte a sur como la del ejemplo cruzará por el centro del cuadrado, pero también lo hará una que vaya de norte a este. En lugar de hacer un simple trazo en diagonal uniendo estos lados, la celda se graficará con dos segmentos, uno desde arriba (_norte_) hasta el centro y otro del centro a la derecha (_este_).

    NW  N  NE
      \ | /
    W - . - E
      / | \
    SW  S  SE

Todas las celdas comparten las siguiente propiedades:

- `x` e `y`: las coordenadas de la celda dentro del sector contando desde cero siendo la celda `x:0, y:0` la ubicada arriba a la izquierda. En la práctica, admite valores negativos, pero siempre enteros.
- `tipo`: indica el tipo de celda. El resto de las propiedades de la celda depende del tipo, según se verá a continuación.
- `nombre`: _(opcional)_ El mímico mostrará este texto en el ángulo inferior izquierdo de cada celda en la grilla. Si no estuviera presente y la opción correspondiente del menú habilitada, mostrará las coordenadas.
- `despachador`: _(opcional)_ Esta celda podrá despachar trenes. Contendrá una lista de direcciones hacia las cuales esta celda podrá despachar trenes. Se corresponderán a las direcciones a que apuntan los tramos de vía de esa celda (según se verá más adelante), pero pueden omitirse algunos. Esta propiedad hará aparecer el círculo amarillo en el centro de la celda, y las flechas azules en las direcciones que se indiquen.
- `bloque`: _(opcional)_ el nombre de un bloque al que esta celda pertenece. Varias celdas pueden formar un bloque, usualmente delimitado por señales que controlan el acceso al mismo. Si un tren se encuentra en un bloque, todas las celdas de ese bloque se encuentran ocupadas.

Adicionalmente, el programa generará estas propiedades, que se podrán ver en el cuadro emergente de configuración.

- `idSector`: el identificador del sector a que pertenece esta celda. Este se generará a partir del nombre de la carpeta.
- `idCelda`: el identificador interno usado dentro de la aplicación para ubicar el elemento. Se forma a partir `idSector` seguido de las coordenadas de la celda.
- `idBloque`: si la celda perteneciera a un bloque, el identificador interno de ese bloque. Se forma a partir de `idSector` seguido de el nombre de ese bloque.
- `idTren`: si hubiera un tren ocupando ese tramo de vía, aparecer su identifcador mientras transita por ella.

La mayoría de las celdas pueden tener otras propiedades opcionales, que se describirán más adelante.

Por ejemplo, el tipo más simple de celda es el que contiene una simple línea:

```js
celdas: [
  ...,
  {
    x: 5,
    y: 0,
    tipo: 'linea',
    nombre: 'XVI-b',
    puntas: ['N', 'S'],
    despachador: ['N'],
    bloque: 'centro'
  },
  ...
]
```

Para conveniencia del programador, varios de los literales como `linea`, `N` y demás que se verán más adelante, se han definido como [constantes literales](https://github.com/Satyam/reactc2/blob/8ecaad57df8deeeecdcd034701055d3b3f23bc8f/src/Store/data/constantes.js#L1), de tal manera que en lugar de escribir `tipo: 'linea'` se puede escribir `tipo: LINEA` y `puntas: ['N', 'S']` como `puntas: [N, S]`. Nótese que en Javascript, las mayúsculas y minúsculas son diferentes y la convención habitual en programación es que las constantes llevan nombres en mayúscula. En conjunto con las constantes para los identificadores de los sectores, la definición previa quedaría así:

```js
celdas: [
  ...,
  {
    x: 5,
    y: 0,
    tipo: LINEA,
    nombre: 'XVI-b',
    puntas: [N, S],
    despachador: ['N'],
    bloque: 'centro'
  },
  ...
]
```

Esta definición nos dice que dentro de la lista de `celdas` la que se encuentra en la coordenada `5,0` contiene un tramo de vía simple, una simple `LINEA`, cuyos extremos apuntan al norte (`N`) y al sur (`S`). La leyenda `'XVI-b'` se mostrará en una esquina de la celda y, si no se proveyera, simplemente se mostrará la coordenada. No se usan constantes para el nombre de la celda pues raramente se repite y no hay forma de validarlo, por lo que no se justifica.

Esta celda, además, podrá despachar trenes pero sólo en dirección norte por lo que aparecerá sólo una flecha azul hacia arriba. La celda pertenece también al bloque denominado `'centro'`. Este nombre no se mostrará al usuario por lo que puede ser cualquier valor que sea de utilidad al programador. Estas últimas dos propiedades son opcionales y pueden omitirse si no son necesarias.

Adicionalmente, si suponemos que esta configuración está en una carpeta llamada `'muestra'`, se generarán las siguientes propiedades de uso interno, que el usuario podrá ver si `Mostrar Config.` está activo:

```js
{
  // ...
  idSector: 'muestra',
  idCelda: 'muestra_5_0',
  idBloque: 'muestra__centro',
  // ...
}
```

Los tipos de celdas son:

##### tipo: LINEA

Contiene una vía con una única entrada y una única salida, sin cambios o desvíos.

Requiere la propiedad `puntas` indicando los puntos cardinales que une. El orden en que se enumeren las puntas es indistinto.

La propiedad `longitud`, si la hubiera, indicará el largo del tramo que esta celda representa. Los trenes habitualmente circulan a una unidad por segundo. Con una `longitud` de 4, el tren tardará 4 segundos en pasar por este tramo. El resto de los tipos de vía del mímico tienen una unidad fija de 1. La `LINEA` es el único que puede tener una longitud distinta de 1.

Ej.:

```js
  {
    x: 5,
    y: 0,
    tipo: LINEA,
    nombre: 'XVI-b',
    puntas: [N, S],
    longitud: 4
  }
```

##### tipo: CAMBIO

Contiene una vía con una entrada, la `punta` y dos o tres `ramas`. El orden en que se enumera las ramas es indistinto aunque se recomienda, para un cambio de dos ramas, listar primero la posición normal y luego la desviada. En el caso de un triple, se recomienda listar las ramas centro, izquierda y derecha en ese orden.

La propiedad opcional `posicion` indica la posición del cambio, y hace referencia al índice de la rama dentro de la lista de ramas. Si no se indica se presupone `0`. Por ello es conveniente listar las ramas en el orden indicado. Se disponen de las constantes `NORMAL`, `DESVIADO` y `ALTERNATIVA` con valores 0, 1 y 2 respectivamente para hacerlo más explícito.

Ej:

```js
  {
    x: 8,
    y: 3,
    tipo: CAMBIO,
    punta: SE,
    ramas: [NW, W],
  },
```

Adicionalmente, al mostrar la configuración en el cuadro emergente se podrán ver los valores actuales de las siguientes propiedades, que pueden cambiar por los comandos del operador.

- `posicion`: El índice dentro del listado de la rama activa.
- `manual`: Si el cambio estuviera en modo manual aparecerá `manual: true`. En caso contrario podrá simplemente no aparecerá o lo hará como `manual: false`.

##### tipo: PARAGOLPE

Contiene un tramo de vía sin continuación.

Requiere indicar la única salida mediante la propiedad `punta`.

La propiedad `rebota`, si la hubiera, admite un booleano que si fuera `true` indica que los trenes al llegar a este paragolpe vuelven inmediatamente en el sentido inverso. Si esta propiedad no estuviera o fuera `false` el tren desaparece al llegar a este paragolpe.

Ej:

```js
  {
    x: 0,
    y: 4,
    tipo: PARAGOLPE,
    punta: E,
    rebota: true,
  }
```

##### tipo: CRUCE

Identifica un cruce de vías que no se conectan entre sí. Pueden cruzarse a un mismo nivel o no. Contiene las propiedades `linea1` y `linea2` que contienen, a si vez, las `puntas` que une, como si fueran dos celdas de tipo `LINEA` superpuestas. Opcionalmente pueden llevar la propiedad `nivel` (por el momento no se usa). Este valor es relativo, la línea con un nivel mayor cruza por encima de la de nivel menor. Si los valores coinciden es que se cruzan a un mismo nivel. Si falta el nivel se lo supone cero.

Ej:

```js
  {
    x: 3,
    y: 4,
    tipo: CRUCE,
    linea1: {
      nivel: 1,
      puntas: [SW, NE],
    },
    l2: {
      puntas: [W, E],
    },
  },
```

En este ejemplo, la linea `linea1` cruza por encima de la `linea2` dado que la primera tiene `nivel` en 1 y la otra no indica nivel, por lo que se lo supone cero. Los números, al igual que los valores booleanos y las constantes, no van entrecomillados.

#### Semáforos

Los semáforos son parte opcional de las celdas y se declaran en un archivo [semaforos.js](https://github.com/Satyam/reactc2/blob/3d7d49d3cd8640f27e7d4bb7ff5cf619c3fdaaae/src/Store/data/constitucion/semaforos.js#L20).

Cada celda puede tener tantos semáforos como segmentos de vía, esto es 8. Ninguna celda tiene 8 segmentos, a lo sumo 4 segmentos, las demás no llegan a eso por lo que no tiene sentido que hubiera más semáforos que segmentos aunque nada impide poner una señal en medio del campo, donde nadie pueda verla.

Los semáforos siempre son _entrantes_ esto es, son visibles a los trenes que circulan en sentido entrante a la celda o sea, se dirigen a su centro. Un semáforo _saliente_ de una celda es _entrante_ en la contigua por lo tanto ha de definirse en esta última.

Cada semáforo (o sea un poste) puede estar compuesto de hasta 3 señales, `izq`, `centro` y `der`. La del centro se muestra ligeramente elevada respecto de las otras dos, como en el vértice de un triángulo. En el mímico, el aspecto de cada señal se muestra con los colores habituales en las señales viales. A diferencia de estas, en el mímico no se muestra un foco para cada color sino un único círculo que cambia de color.

Los semáforos se identifican, además de los mismos `x` e `y` de la celda, por la orientación `dir` del segmento en que se encuentran.

También se ha de indicar el aspecto de cada una de las señales ,`izq`, `centro` y `der` que podrán estar en `LIBRE`, `PRECAUCION` o `ALTO`. Sólo es necesario enumerar las señales que existen, las que no se mencionan no aparecerán.

Ej.:

```js
  {
    x: 4,
    y: 4,
    dir: W,
    centro: LIBRE,
    der: ALTO,
  },
```

En este ejemplo, en la celda `4,4` habrá un semáforo en el lado izquierdo (`W`) de la celda, apuntando hacia el centro. Esta celda se corresponde a un [CAMBIO](https://github.com/Satyam/reactc2/blob/3d7d49d3cd8640f27e7d4bb7ff5cf619c3fdaaae/src/Store/data/constitucion/celdas.js#L124-L130) donde la punta que permite dar paso a cualquiera de los dos ramales, está hacia el lado izquierdo (`W`) al igual que lo está el único semáforo. Este está compuesto de dos señales, la `centro` y la `der`, inicialmente en LIBRE y ALTO dado que la `posicion` de ese cambio es `NORMAL`. Los enclavamientos cambiarán estos colores según corresponda.

Adicionalmente, se puede agregar la propiedad `soloManual: true`, (una propiedad que si no se indica es equivalente a tener valor `false`). Esta propiedad indica que la señal no es dependiente, por automatismo o enclavamiento, de ningún otro elemento del sector y que, por ende, puede moverse libremente. Los semáforos que no tienen esta propiedad o, lo que es lo mismo, tienen `soloManual: false`, no pueden manipularse libremente sin antes ponerlas en modo manual, lo que las excluye de los automatismos o enclavamientos.

En el cuadro emergente de una celda aparecerán también las siguientes propiedades:

- `idSenal`: el identificador interno para ubicar fácilmente esta señal en memoria de la aplicación. Resulta del `idCelda` de la celda en que se encuentra, seguido de la dirección, p. ej: `muestra_5_5_W`.
- `modo`: Indicará el modo de operación del semáforo, podrá ser 0, 1 ó 2 que se corresponden con las constantes.`AUTOMATICO`, `MANIOBRA` o `BLOQUEADO`

Podrían definirse otros dos semáforos para este mismo cambio, uno en cada una de las ramas, a saber `E` y `SE`. En realidad, podrían definirse hasta 8 semáforos por celda, pero las que no estuvieran contiguas a un tramo de vía, no tienen sentido.

El estado inicial de un semáforo está dado por el archivo de configuración. Posteriormente, este dependerá de los automatismos definidos más adelante o podrá ser puesta en manual o `MANIOBRA` y manejada por el operador. Cuando una señal de un semáforo es el objetivo de dos o más automatismos, siempre mostrará el aspecto más restrictivo. Por ejemplo, una señal podrá depender de que un cambio esté en la posición normal y que ciertos segmentos de vía estén libres. En este caso, la señal sólo se pondrá en `LIBRE` (verde) si ambos enclavamientos coinciden en que deba estar en verde. Siempre que haya varias opciones para una señal, se aplicará el estado más restrictivo.

### Automatismos

Los automatismos relacionan las acciones de los diversos elementos del tablero, por ejemplo, cambios que actúan en consonancia o que afectan señales.

Los automatismos están definidos en el archivo [automatizaciones.js](https://github.com/Satyam/reactc2/blob/3d7d49d3cd8640f27e7d4bb7ff5cf619c3fdaaae/src/Store/data/constitucion/automatizaciones.js#L25)

Todos los automatismos tienen al menos dos partes, el elemento que es **afectado** por el automatismo y el o los elementos que lo afectan, contenidos en la lista de `dependencias`, que denominaremos **origen**.

Las propiedades comunes a todos los automatismos son:

- `x` e `y`: para identificar las coordenadas de la celda **afectada**.
- `tipo`: identifica al tipo de celda, ya sea `CAMBIO` o `SEMAFORO`. Es importante destacar que las celdas de tipo `TRIPLE` a los efectos de los enclavamientos son un tipo más de cambio.
- `dir`: (_opcional_) Si el **afectado** fuera de tipo `SEMAFORO`, se deberá indicar cuál de los 8 posibles semáforos dentro de esta celda es el afectado.
- `deps`: (abreviado de _dependencias_) Una lista de los elementos **origen** de los que este **afectado** depende.

Todas las dependencias tienen, al menos, las siguientes propiedades, que permiten identificar al **origen**:

- `x` e `y`, dado que los elementos pueden interactuar entre celdas, es necesario indicar las coordenadas del **origen**.
- `tipo`: el tipo del elemento **origen** del enclavamiento. Puede ser `CAMBIO` o `SEMAFORO`
- `dir`: si el elemento fuera un `SEMAFORO` deberá indicarse de cuál de los 8 posibles semáforos dentro de la celda.

Cada elemento **afectado** puede tener una o más dependencias.

En el cuadro emergente de configuración, sólo aparecerá la solapa de `Autom.` si el elemento seleccionado tuviera alguna. Las propiedades de las tablas de automatizaciones no son afectadas por la aplicación, dado que sus efectos se producen sobre otros elementos, en ningún caso afectan a la configuración en sí. Por ello, en el cuadro emergente nunca cambian.

La combinación de los tipos de los elementos dependientes y sus dependencias nos dan múltiples combinaciones:

#### CAMBIO dependiendo de CAMBIO

En este caso, el estado de un cambio (el **afectado**) depende de otro cambio (el **origen**). Por ejemplo:

```js
  {
    x: 4,
    y: 4,
    tipo: CAMBIO,

    deps: [
      {
        x: 5,
        y: 5,
        tipo: CAMBIO,
        alts: [
          { cuando: NORMAL, posicion: NORMAL },
          { cuando: DESVIADO, posicion: DESVIADO },
        ],
      },
      //... otras dependencias
    ]
  }
```

Esto nos indica que el `CAMBIO` en la celda `[4,4]` depende, entre otros, del `CAMBIO` en la celda `[5,5]` y ofrece las siguientes alternativas `alts`: cuando la posición de **origen** ([5,5]) sea `NORMAL` el **afectado** ([4,4]) también estará en `NORMAL` y viceversa cuando esté en `DESVIADO`.

Si ambos o alguno de los dos elementos fuera de tipo `TRIPLE` se dispondrá, además de las constantes `NORMAL` y `DESVIADO` la constante `ALTERNATIVA` usada para describir la tercera rama de la lista de ramas, habitualmente la derecha.

#### CAMBIO dependiendo de SEMAFORO

En este caso, el estado de un cambio dependería de una señal. Este caso no se ha estimado como realista por lo que el programa no la contempla .

#### SEMAFORO dependiendo de CAMBIO

Define un automatismo por el cual un semáforo, el **afectado** responde al estado de un CAMBIO, el **origen**. El cambio puede o no estar en la misma celda que el semáforo.

Ej.:

```js
 {
    x: 4,
    y: 4,
    dir: W,
    tipo: SEMAFORO,

    deps: [
      {
        x: 4,
        y: 4,
        tipo: CAMBIO,
        alts: [
          {
            cuando: NORMAL,
            der: ALTO,
          },
          {
            cuando: DESVIADO,
            centro: ALTO,
            der: PRECAUCION,
          },
        ],
      },
      // ... otras dependencias
    ]
  }
```

Aquí el **afectado** es el `SEMAFORO` en la celda `[4,4]`, dirección `W`, que depende del `CAMBIO` en la misma celda `[4,4]` y ofrece las alternativas `alts:` tal que si el **origen** está en posición `NORMAL`, la señal derecha `der`, que apunta al desvío, ha de estar en `ALTO`. En este caso, la señal `centro` ha de estar en `LIBRE` pero esta (`LIBRE`) es la opción por defecto, por lo que no es necesario mencionarla.

A la inversa, si el cambio está en `desviado` la señal `centro` ha de estar en `ALTO` y la `der` en `PRECAUCION`, para indicar la obligada reducción de velocidad al pasar por el desvío. En este caso hemos hecho explícito el aspecto de la señal `centro` pues al no ser `LIBRE`, no puede omitirse.

Si el **origen** fuera un `CAMBIO` de tres posiciones, podríamos usar las habituales `NORMAL` y `DESVIADO`, el estado `ALTERNATIVA`.

Este semáforo tiene sólo dos señales `centro` y `der` por lo que no es necesario indicar qué pasaría con la `izq` que no existe, como que tampoco es necesario indicar las luces que han de estar en `LIBRE`. Podrían hacerse ambas cosas, pero serían ignoradas.

#### SEMAFORO dependiendo de SEMAFORO

En este caso, tanto el **afectada** como el **origen** son ambos semáforos.

```js
  {
    x: 0,
    y: 0,
    dir: W,
    tipo: SEMAFORO,
    deps: [
      {
        x: 3,
        y: 0,
        dir: W,
        tipo: SEMAFORO,
        senales: [
          {
            cuando: ALTO,
            senalAfectada: CENTRO,
            aspecto: PRECAUCION,
          },
        ],
      },
    ],
  },
```

El ejemplo nos dice que el `SEMAFORO` del lado oeste (`W`) de la celda en `[0,0]` depende del semáforo del lado `W` de la celda en `[3,0]`. Como un semáforo puede tener hasta 3 señales, el programa toma la señal con el aspecto más permisivo, o sea, que si alguna de sus posiblemente múltiples señales está en `LIBRE` considera que todo el semáforo está en `LIBRE` pues eso quiere decir que hay una vía libre y poco le importa a la señal afectada, cuál de las posibles vías es la que está libre.
La configuarción nos dice que `cuando` la señal más permisiva del **origen** esté en `ALTO` la `senalAfectada`, que es la del `CENTRO`, ha de estar en `PRECAUCION`.

Podrían agregarse más líneas de configuración para los varios posibles aspectors pero resulta que como el estado de `senalAfectada` para los otros casos, sería `LIBRE` que es el valor por defecto, es innecesario, pero bién podría hacerse si se quisiera:

```js
  {
    x: 0,
    y: 0,
    dir: W,
    tipo: SEMAFORO,
    deps: [
      {
        x: 3,
        y: 0,
        dir: W,
        tipo: SEMAFORO,
        senales: [
          {
            cuando: ALTO,
            senalAfectada: CENTRO,
            aspecto: PRECAUCION,
          },
          {
            cuando: PRECAUCION,
            senalAfectada: CENTRO,
            aspecto: LIBRE, // <== si nos se dice nada, estaría en LIBRE de todas formas, por ello es innecesario
          },
          {
            cuando: LIBRE,
            senalAfectada: CENTRO,
            aspecto: LIBRE, // <== si nos se dice nada, estaría en LIBRE de todas formas, por ello es innecesario
          },
        ],
      },
    ],
  },
```

#### SEMAFORO dependiendo de BLOQUE

Los bloques son la unidad de ocupación de la vía. Varias celdas pueden pertenecer a un bloque. El acceso a ese bloque está controlado por semáforos. La relación entre los semáforos y los bloques está indicada en este tipo de automatismo.

```js
  {
    x: 2,
    y: 0,
    dir: E,
    tipo: SEMAFORO,
    deps: [
      {
        tipo: BLOQUE,
        bloque: 'dos',
        senalAfectada: CENTRO,
      },
      // .... otras dependencies
    ]
  }
```

Este ejemplo nos dice que el semáforo en [2,0], lado este, depende del bloque `'dos'` tal que si este estuviera ocupado, la señal del `CENTRO` se pondrá en alto. En este caso, no se necesita indicar el aspecto de la señal, siempre pasará a _alto_ cuando esté ocupado. Al desocuparse el bloque, el color de la señal sera el más restrictivo que le corresponda según lo indiquen otras dependencias, que podrían indicarse a continuación o, si no las hubiera, la señal volverá a `LIBRE`.

#### SEMAFORO dependiendo de nada

Si una señal ha de volver a un estado fijo cuando no haya otros automatismos más restrictivos, se usa el de tipo `FIJO`.

```js
  {
    x: 2,
    y: 1,
    dir: E,
    tipo: SEMAFORO,
    deps: [
      {
        tipo: FIJO,
        senalAfectada: DER,
        aspecto: ALTO,
      },
      {
        tipo: FIJO,
        senalAfectada: CENTRO,
        aspecto: ALTO,
      },
      // ....
    ]
  }
```

Este ejemplo nos dice que tanto la señal derecha como la del centro del semáforo en [2,1], lado este, han de permanecer en `ALTO`. Dado que no hay estado más restrictivo que el `ALTO`, estas señales quedarán permanentemente en este estado, salvo que se cambie manualmente. Si, en lugar de `ALTO` se hubiera indicado `PRECAUCION`, la señal podría pasar a `ALTO` si alguna otra dependencia le forzara, y volvería a `PRECAUCION` al cesar la influencia de esa dependencia. Es innecesario indicar `LIBRE` como estado fijo, dado que este es el estado predeterminado.

#### BLOQUE dependiendo de BLOQUE y CAMBIO

Dos bloques pueden estar temporalmente vinculados al hacerse un cambio que los conecta. El caso típico son las playas de maniobras o, por ejemplo, dos vías paralelas, una en cada sentido, donde habitualmente los trenes circulando por una vía no afectan a los de la vecina. Sin embargo, por razones de servicio, avería o reparaciones, los trenes de una de las vías han de ser derivados a la vía contigua, mediante un cambio. En este caso, la ocupación de un bloque a un lado de ese cambio temporalmente afecta al bloque al otro lado de ese cambio.

```js
{
  tipo: BLOQUE,
  bloque: 'Norte',
  dependencias: [
    {
      tipo: BLOQUE,
      bloque: 'Sur',
      x: 0,
      y: 0,
      posicion: DESVIADO,
    },
    {
      tipo: BLOQUE,
      bloque: 'Sur',
      x: 1,
      y: 0,
      posicion: DESVIADO,
    },
  ]
}
```

Este ejemplo nos dice que el bloque llamado `'Norte'` puede estar temporalmente vinculado con el bloque llamado `'Sur'` cuando el cambio en `[0,0]` está en `DESVIADO` o cuando el cambio en `[1,0]` está en `DESVIADO`. Si ninguna de estas conexiones estuviera activa, o sea, si los cambios estuvieran ambos en `NORMAL` los bloques funcionarían independientemente.

### Enclavamientos

Los enclavamientos son precondiciones que el operador del sector debe cumplir antes de manipular un elemento. El programa contempla enclavamientos sólo para los cambios. Sólo si todas las condiciones especificadas en el enclavamiento se cumplen el elemento, en este caso un cambio, puede ser manipulado.

Los enclavamientos están definidos en el archivo opcional [enclavamientos.js](https://github.com/Satyam/reactc2/blob/3d7d49d3cd8640f27e7d4bb7ff5cf619c3fdaaae/src/Store/data/dosVias/enclavamientos.js#L37)

La estructura del archivo es similar a la de los automatismos. Hay un elemento **afectado** que depende de uno o más elementos **origen**. En este caso el único tipo de elemento **afectado** que se contempla es la celda de tipo `CAMBIO`.

#### Cambio enclavado a bloque

Un cambio podrá estar enclavado a un bloque tal que sólo pueda ser manipulado cuando el bloque está desocupado. Obviamente, un cambio no se puede manipular habiendo un tren circulando en el bloque en que se encuentra.

```js
  {
    tipo: CAMBIO,
    x: 1,
    y: 0,
    deps: [
      {
        tipo: BLOQUE,
        bloque: 'centro',
      },
      // ...
    ],
  }
```

En este caso, se indica que el `CAMBIO` en la celda en `[1,0]` estará bloqueado si el bloque llamado `'centro'` está ocupado.

#### Cambio enclavado a semáforo

No sólo se debe bloquear un cambio cuando haya un tren circulando en el mismo bloque sino que se debe impedir que entre un tren a ese bloque. Para ello se deben indicar los semáforos que le darían acceso, y que deben ser puestas en `ALTO` para restringir el acceso mientras se hace el cambio.

```js
  {
    tipo: CAMBIO,
    x: 1,
    y: 0,
    deps: [
      {
        tipo: BLOQUE,
        bloque: 'centro',
      },
      // la siguiente es nueva:
      {
        tipo: SEMAFORO,
        x: 1,
        y: 0,
        dir: W,
        aspecto: ALTO,
      },
      // ...
    ]
  }
```

En este caso vemos la dependencia que sigue a la descripta previamente. Además de quedar bloqueado si el bloque `'centro'` está ocupado, también permanecerá bloqueado hasta que el semáforo en el lado izquierdo `W` de la celda `[1,0]` esté en `ALTO`.

### Empalmes

Por una cuestión de diagramación de un sector, puede ser necesario separar varios tramos de vías en segmentos para distribuirlos dentro del espacio disponible. Para indicar la relación entre segmentos disjuntos de vía, existen los empalmes. Estos se definen en un archivo de configuarción separado de [empalmes.js](https://github.com/Satyam/reactc2/blob/3d7d49d3cd8640f27e7d4bb7ff5cf619c3fdaaae/src/Store/data/empalmes/empalmes.js#L5).

```js
export const empalmes = [
  [
    {
      x: 2,
      y: 0,
      dir: E,
    },
    {
      x: 3,
      y: 2,
      dir: W,
    },
  ],
  // ... Otros empalmes
];
```

Este archivo describe un único empalme en todo el sector, que une el lado `E` (derecho) de la celda en `[2,0]` con el lado izquierdo de la celda en `[3,2]`.

El programa generará una falsa celda contigua a cada una de las celdas empalmadas, marcando la falsa vía con línea punteada y una leyenda que indique dónde continúa.

Es importante notar que a diferencia de otros archivos de configuración que contienen una lista `[...]` de varios elementos `{...}` este archivo contiene una lista de listas, cada una de las cuales es un empalme y que a su vez contiene estrictamente dos elementos, aquellos que están conectados entre sí.
