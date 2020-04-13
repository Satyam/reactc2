# CTC

**Simulador de un Control de Tráfico Centralizado**

Esta aplicación simula el tablero mímico de una central de Control de Tráfico Centralizado (CTC) con el objetivo de mostrar los efectos de los enclavamientos entre las varias señales y desvíos.

Está disponible en [https://satyam.github.io/reactc2/](https://satyam.github.io/reactc2/) y es instalable localmente.

- [CTC](#ctc)
  - [Uso](#uso)
    - [Comandos](#comandos)
      - [Ver configuración](#ver-configuración)
    - [Despachar trenes](#despachar-trenes)
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
        - [tipo: TRIPLE](#tipo-triple)
      - [Señales](#señales)
    - [Enclavamientos](#enclavamientos)
      - [CAMBIO dependiendo de CAMBIO](#cambio-dependiendo-de-cambio)
      - [CAMBIO dependiendo de SENAL](#cambio-dependiendo-de-senal)
      - [SENAL dependiendo de CAMBIO](#senal-dependiendo-de-cambio)
      - [SENAL dependiendo de SENAL](#senal-dependiendo-de-senal)
      - [SENAL dependiendo de BLOQUE](#senal-dependiendo-de-bloque)

## Uso

Desde la barra de navegación se puede seleccionar el _sector_ con que se desea interactuar. Hay varios sectores que representan ejemplos básicos de tipos de enclavamientos y un único sector con cierto viso de realidad, que es la estación Constitución del subte C de Buenos Aires.

Un segundo item de la barra de menú permite:

- activar o no el _teletipo_, para visualizar mensajes operativos.
- habilitar o no los enclavamientos. Esto permite ver la diferencia en el funcionamiento con y sin enclavamientos.
- mostrar las coordenadas de cada celda cuando no tienen nombre propio.
- mostrar los datos de configuración de las celdas y señales al hacer click sobre ellas.

Al seleccionar cualquier sector se mostrará el mímico correspondiente en el panel central.

Un grupo de botones permite ajustar la velocidad de simulación, desde 0 (pausado) a 5 ciclos por segundo.

Finalmente, se dispone de un enlace a GitHub, donde se encuentra el código fuente de este programa.

### Comandos

Algunos de los elementos del mímico son activos, o sea que pueden responder a comandos del operador, a saber, los cambios y las señales. Al hacer click en cualquiera de ellas aparece un cuadro emergente (_pop-up_) mostrando las opciones.

Si se pulsa cualquiera de los botones para cambiar la posición del cambio, se mostrará el efecto de inmediato y, si estuvieran activos, se propagarán los enclavamientos que tenga configurado, cambiarán las luces de los semáforos y otros cambios vinculados.

Tanto celdas como las señales dentro de las celdas se pueden poner en manual, lo que se indica con candado abierto o cerrado, según estén libres o no de responder a los enclavamientos. Las señales que estén sujetas a enclavamientos sólo pueden manipularse si previamente se ponen en manual, las que no, pueden manipularse libremente.

La celda o señal cambiará de color de fondo para indicar el estado manual.

Al estar en manual los cambios se pueden mover a mano y las luces de las señales cambiarse, pero no modifican el estado de las demás ni responden al enclavamiento propagado desde otras celdas. Al salir de manual, se propagan los enclavamientos pendientes.

#### Ver configuración

Cuando está activa la opción de `Mostrar Config.` en el menú de opciones, al hacer click sobre cualquier elemento del mímico se podrá ver la configuración de cualquier elemento. Esto se aplica tanto a elementos activos, como cambios y señales, como a los pasivos.

En este caso, el _pop-up_ mostrará de uno a cuatro botones.

- Si el elemento fuera activo, el primero que aparecerá será el marcado `Cmd.` por _Comandos_ que permitirá dar los comandos de siempre.
- Un botón `Celda` mostrará la configuración de la celda.
- Si es una señal, un botón `Señal` mostrará los datos de esa señal.
- Si la celda o la señal tuvieran enclavamientos, un botón marcado `Encl.` permitirá verlos.

Estos cuadros mostrarán la configuración activa en ese instante, no la configuración inicial. No sólo mostrará los cambios resultantes de los comandos sino también algunas propiedades de uso interno, que no se usan en los archivos de configuración. Estas se enumeran en los siguientes párrafos, pero no deben incluirse en los archivos de configuración.

### Despachar trenes

Algunas celdas mostrarán un círculo amarillo en su centro. Esto indica que esa celda puede despachar trenes. Una o más flechas azules acompañan este círculo indicando en qué sentido saldrá el tren. Al pulsar una cualquiera de esas flechas, se creará automáticamente un tren que ocupara la celda en que se ha creado y que comenzará a moverse en el sentido que se ha indicado.

Las celdas que tienen un tren mostrarán sus vías en color amarillo y un círculo amarillo con un tren en su centro. Si se deja el cursor sobre el ícono del tren, aparecerá el identificador del tren (puede ser necesario poner la simulación en pausa para que darle tiempo a que aparezca).

Por el momento, todos los trenes tienen la misma velocidad máxima y, teniendo la vía libre, circulan a esa velocidad. Si se encuentran una señal en amarillo, reducirán su velocidad a la mitad. Su ícono pasará a un color gris. Si el tren se encuentra una señal en rojo, su ícono aparecerá rojo.

Los trenes desaparecen cuando llegan a un tramo de vía que no tiene una celda contigua, presumiblemente porque habría de continuar en un sector contiguo, o porque se ha encontrado con un paragolpe. Normalmente, un tren que llega a un paragolpe se detiene allí para luego, si corresponde, salir en el sentido inverso. En este caso se ha decidido hacerlo desvanecer pues el objetivo de la simulación es visualizar el efecto de los enclavamientos y no el tráfico de trenes, por lo que una vez que un tren ha hecho su recorrido, simplemente desaparece.

El programa genera varios errores que mostrará en un _pop-up_ sobre la celda en que se ha detectado. En ese momento la simulación se detendrá para poder ver qué ha ocurrido. Al cerrar el _pop-up_ todos los trenes en circulación en ese momento desaparecerán.

Los errores pueden ser:

- Colisión: un tren ha entrado en una celda actualmente ocupada por otro tren.
- Cambio mal puesto: el cambio en un desvío no está pasado hacia el tramo de vía por la que llega.

### Bloques

Las celdas podrán pertenecer a bloques. Un bloque abarcará varias celdas. Cada celda podrá pertenecer a sólo un bloque. Los bloques se identifican por nombres que han de ser únicos para cada sector. Si un tren se encuentra en un bloque, todo el bloque se marcará como ocupado. Visualmente, todas las vías del bloque se vuelven amarillas, aunque el ícono del tren se marcará en la celda en la que efectivamente se encuentra. El nombre del bloque se mostrará en el ángulo inferior derecho de las celdas que abarca.

Un tren no puede entrar a un bloque que esté ocupado por otro tren. Si lo hiciera, generará un error, similar a una colisión con otro tren.
Se pueden definir enclavamientos entre señales y bloques, tal que impidan el acceso a un bloque ocupado.

### Teletipo

Con el panel de Teletipo abierto, se podrán ver mensajes operativos, partidas de trenes, detenciones, llegada de trenes o colisiones. Los mensajes se encuentran ordenados con el más reciente arriba. Por defecto sólo se mostrarán las alertas, para no ocupar tanto lugar en la pantalla. Un botón marcado `Ver Info` permitirá visualizar también los mensajes puramente informativos. Los mensajes se podrán borrar individualmente, mediante el botón con el símbolo del basurero, o la totalidad, con el mismo símbolo en la barra de encabezados.

## Configuración

La configuración de los diversos sectores, sus celdas y señales está dada en los [varios archivos](https://github.com/Satyam/reactc2/tree/master/src/Store/data) de configuración. Estos archivos están compilados en la aplicación por lo que no pueden ser modificados por el usuario. Cada vez que se reinicie la aplicación, esta volverá a estos mismos valores iniciales.

Los archivos de configuración contienen listas de propiedades para los distintos elementos. Tanto los elementos dentro de estas listas como las propiedades dentro de cada elemento pueden darse en cualquier orden.

Si se habilita la opcion de `Mostrar Config.`, se pueden ver los detalles de la configuración de cada elemento la hacer click sobre él.

### Sectores

Cada sector está descripto en un una carpeta separada que contiene varios archivos. Una carpeta [`_template`](https://github.com/Satyam/reactc2/tree/master/src/Store/data/_template) contiene el esqueleto básico, vacío, de los archivos necesarios para un sector. Estos archivos se copian en una nueva carpeta para cada sector que se quiera agregar. Conviene que el nombre de cada carpeta sea breve y se limite a letras y números sin acentos o signos extraños. Este identificador formará parte del URL de las varias páginas, y es más elegante si es legible.

#### Sector

Cada sector está descripto en el archivo [sector.js](https://github.com/Satyam/reactc2/blob/master/src/Store/data/constitucion/sector.js). Este exporta lo que en JavaScript se denomina _objeto literal_ (Object Literal) con una serie de propiedades, a saber:

- `descrCorta`: Un texto breve que describa el sector. Este será el que el usuario vea y debe ser legible. Se usará, por ejemplo, en el menú y en la solapa del navegador. En los menúes, el listado de sectores estará ordenado alfabéticamente por esta propiedad.
- `descr`: El nombre completo del sector. Se mostrará al dejar reposar el cursor sobre el ítem de menú.
- `alto`: El número de celdas que ocupa este sector en altura.
- `ancho`: El número de celdas que ocupa este sector a lo ancho.

Internamente, el programa genera una propiedad `idSector` que es el identificador único del sector y que corresponde al nombre de la carpeta donde se encuentran estas definiciones. Este identificador se usará internamente y se mostrará si el operador activa la opcion `Mostrar Config.`.

El mímico que muestra el sector se ajustará el tamaño de las celdas para que todas ellas sean visibles en la pantalla basándose en el `alto` y `ancho` declarados en el encabezado.

#### Celdas

Las celdas del sector se declaran en el archivo [celdas.js](https://github.com/Satyam/reactc2/blob/8ecaad57df8deeeecdcd034701055d3b3f23bc8f/src/Store/data/constitucion/celdas.js#L21).

El archivo de definición de celdas comienza importando una serie de [constantes](https://github.com/Satyam/reactc2/blob/8ecaad57df8deeeecdcd034701055d3b3f23bc8f/src/Store/data/constitucion/celdas.js#L2-L18). Como es habitual en JavaScript y otros lenguajes, las constantes suelen escribirse todas en mayúsculas, con guiones bajos para separar las palabras. La finalidad de estas constantes es, principalmente, reducir errores tipográficos y usualmente también reducir el tamaño del código. Dondequiera que se use la constante `LINEA` podría también escribirse `'linea'`, que es el valor que representa. La diferencia está en que un error tipográfico podría resultar en escribir, por ejemplo, `'linae'`, que pasaría totalmente inadvertido en cualquier chequeo de sintaxis pues un _string_ es libre de contener lo que se quiera. Esto no ocurre si se escribe `LINAE` dado que esa constante no existe.

No es necesario declarar las celdas vacías. Un sector declarado de 4 \* 3 celdas, no necesita 12 declaraciones. Las que no contengan ningún tramo de riel pueden omitirse.

Todas las celdas comparten las siguiente propiedades:

- `x` e `y`: las coordenadas de la celda dentro del sector contando desde cero siendo la celda `x:0, y:0` la ubicada arriba a la izquierda.
- `tipo`: indica el tipo de celda. El resto de las propiedades de la celda depende del tipo, según se verá a continuación.
- `descr`: _(opcional)_ El mímico mostrará este texto en el ángulo inferior izquierdo de cada celda en la grilla. Si no estuviera presente y la opción correspondiente del menú habilitada, mostrará las coordenadas.
- `despachador`: _(opcional)_ Esta celda podrá despachar trenes. Contendrá una lista de direcciones hacia las cuales esta celda podrá despachar trenes. Se corresponderán a las direcciones a que apuntan los tramos de vía de esa celda (según se verá más adelante), pero pueden omitirse algunos. Esta propiedad hará aparecer el círculo amarillo en el centro de la celda, y las flechas azules en las direcciones que se indiquen.
- `longitud`: _(opcional)_ la longitud de la celda en unidades arbitrarias.
- `bloque`: _(opcional)_ el nombre de un bloque al que esta celda pertenece. Varias celdas pueden formar un bloque, usualmente delimitado por señales que controlan el acceso al mismo. Si un tren se encuentra en un bloque, todas las celdas de ese bloque se encuentran ocupadas.

Adicionalmente, el programa generará estas propiedades, que se podrán ver en el _pop-up_ de configuración.

- `idSector`: el identificador del sector a que pertenece esta celda. Este se generará a partir del nombre de la carpeta.
- `idCelda`: el identificador interno usado dentro de la aplicación para ubicar el elemento. Se forma a partir del nombre de la carpeta seguido de las coordenadas de la celda.

La mayoría de las celdas pueden tener otras propiedades opcionales, que se describirán más adelante.

Por ejemplo, el tipo más simple de celda es el que contiene una simple línea:

```js
celdas: [
  ...,
  {
    x: 5,
    y: 0,
    tipo: 'linea',
    descr: 'XVI-b',
    puntas: ['N', 'S'],
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
    descr: 'XVI-b',
    puntas: [N, S],
  },
  ...
]
```

Esta definición nos dice que dentro de la lista de `celdas` la que se encuentra en la coordenada `5,0` contiene un tramo de vía simple, una simple `LINEA`, cuyos extremos apunta al norte (`N`) y al sur (`S`). La leyenda `'XVI-b'` se mostrará en una esquina de la celda y, si no se proveyera, simplemente se mostrará la coordenada. No se usan constantes para el nombre de la celda pues raramente se repite y no hay forma de validarlo, por lo que no se justifica.

Todas las celdas son más o menos cuadradas (según la pantalla lo permita). Todos los segmentos de vías que contienen irradian del centro de ese cuadrado hacia una de 8 posibles direcciones, las cuatro esquinas y los puntos intermedios de los lados. Estos extremos se los llama por su coordenada geográfica. Aún así, todas las líneas pasan por el centro del cuadrado. Es obvio que una línea de norte a sur como la del ejemplo cruzará por el centro del cuadrado, pero también lo hará una que vaya de norte a este. En lugar de hacer un simple trazo en diagonal uniendo estos lados, la celda se graficará con dos segmentos, uno desde el arriba (_norte_) hasta el centro y otro del centro a la derecha (_este_).

    NW  N  NE
      \ | /
    W - . - E
      / | \
    SW  S  SE

Esta, como cualquier otra celda podría despachar trenes, en cuyo caso su definición podría ser:

```js
  {
    x: 5,
    y: 0,
    tipo: LINEA,
    descr: 'XVI-b',
    puntas: [N, S],
    despachador: [S]
  },
```

En este caso, esta celda sólo puede despachar trenes en dirección sur, por lo que la flecha azul sólo aparecerá en el segmento de vía que apunta hacia abajo, pero bien podría configurarse para despachar trenes en ambos sentidos.

Los tipos de celdas son:

##### tipo: LINEA

Contiene una vía con una única entrada y una única salida, sin cambios o desvíos. Requiere la propiedad `puntas` indicando los puntos geográficos que une. El orden de las puntas es indistinto.

Ej.:

```js
  {
    x: 5,
    y: 0,
    tipo: LINEA,
    descr: 'XVI-b',
    puntas: [N, S]
  }
```

##### tipo: CAMBIO

Contiene una vía con una entrada, la `punta` y dos `ramas`, una `normal` y otra `desviado`. Si bien la salida `normal` suele ser la opuesta a la `punta` esto no es obligatorio.

La propiedad opcional `posicion` indica la posición del cambio, `NORMAL` o `DESVIADO`, y su valor debe corresponder a alguna de las ramas. Por defecto, es `NORMAL`.

Ej:

```js
  {
    x: 8,
    y: 3,
    tipo: CAMBIO,
    posicion: NORMAL,
    punta: SE,
    ramas: {
      normal: NW,
      desviado: W,
    }
  }
```

Adicionalmente, al mostrar la configuración en el _pop-up_ se podrán ver los valores actuales de las siguientes propiedades, que pueden cambiar por los comandos del operador.

- `posicion`: La posición actual del cambio, ya sea `"normal"` o `"desviado"`. En el _pop-up_ nunca se mostrarán las constantes `NORMAL` o `DESVIADO` sino sus valores reales.
- `manual`: Si el cambio estuviera en modo manual aparecerá `"manual": true`. En caso contrario podrá simplemente no aparecer o lo hará como `"manual": false`.

##### tipo: PARAGOLPE

Contiene un tramo de vía sin salida. Requiere indicar la única salida mediante la propiedad `punta`.

Ej:

```js
  {
    x: 0,
    y: 4,
    tipo: PARAGOLPE,
    punta: E,
  }
```

##### tipo: CRUCE

Identifica un cruce de vías que no se conectan entre sí. Pueden cruzarse a un mismo nivel o no. Contiene las propiedades `linea1` y `linea2` que contienen, a si vez, las `puntas` que une como una celda de tipo `LINEA`. Opcionalmente pueden llevar la propiedad `nivel` (por el momento no se usa). Este valor es relativo, la línea con un nivel mayor cruza por encima de la de nivel menor. Si los valores coinciden es que se cruzan a un mismo nivel. Si falta el nivel se lo supone cero.

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

##### tipo: TRIPLE

Identifica un cambio de 3 salidas. Al igual que el cambio corriente, al extremo común se le llama `punta` y los otros serán `izq`, `centro` y `der`. En realidad la denominación de `izq` y `der` es arbitraria y podrían estar cruzadas.

```js
  {
    x: 2,
    y: 4,
    tipo: TRIPLE,
    posicion: CENTRO,
    punta: W,
    ramas: {
      centro: E,
      izq: NE,
      der: SE,
    },
  },
```

La configuración admite la propiedad opcional `posicion` que debe corresponderse al nombre de algúna de las ramas, o sea, `IZQ`, `CENTRO` o `DER`.

Adicionalmente, al mostrar la configuración en el _pop-up_ se podrán ver las siguientes propiedades, que no se deben indicar en el archivo de configuración.

- `posicion`: La posición actual del cambio, ya sea `"izq"`, `"centro"` o `"der"`.
- `manual`: Si el cambio estuviera en modo manual aparecerá `"manual": true`. En caso contrario podrá simplemente no aparecer o lo hará como `"manual": false`.

#### Señales

Las señales son parte opcional de las celdas y se declaran en un archivo [senales.js](https://github.com/Satyam/reactc2/blob/8ecaad57df8deeeecdcd034701055d3b3f23bc8f/src/Store/data/constitucion/senales.js#L20).

Cada celda puede tener tantas señales como segmentos de vía, esto es 8. Ninguna celda tiene 8 segmentos, sólo las celdas de tipo `CRUCE` y `TRIPLE` tienen 4 segmentos, las demás no llegan a eso por lo que no tiene sentido que hubiera más señales que segmentos aunque nada impide poner una señal en medio del campo, donde nadie pueda verla.

Las señales siempre son _entrantes_ esto es, son visibles a los trenes que circulan en sentido entrante a la celda o sea, se dirigen a su centro. Una señal _saliente_ de una celda es _entrante_ en la contigua por lo tanto ha de definirse en esta última.

Cada señal puede estar compuesta de hasta 3 luces, `izq`, `centro` y `der`. La del centro se muestra ligeramente elevada respecto de las otras dos, como en el vértice de un triángulo. En el mímico, no se muestra un foco para cada color de los cuales sólo uno está encendido a un tiempo sino que se muestra un único círculo que cambia de color.

Las señales se identifican, además de los mismos `x` e `y` de la celda, por la orientación `dir` del segmento en que se encuentran.

También se ha de indicar el estado de cada una de las luces,`izq`, `centro` y `der` que podrán estar en `VERDE`, `AMARILLO` o `ROJO`. Sólo es necesario enumerar las luces que existen, las que no se mencionan no aparecerán.

Ej.:

```js
  {
    x: 4,
    y: 4,
    dir: W,
    centro: VERDE,
    der: ROJO,
  },
```

En este ejemplo, en la celda `4,4` habrá una señal en el lado izquierdo (`W`), apuntando hacia el centro. Esta celda se corresponde a un [CAMBIO](https://github.com/Satyam/reactc2/blob/8ecaad57df8deeeecdcd034701055d3b3f23bc8f/src/Store/data/constitucion/celdas.js#L134-L144) donde la punta que permite dar paso a cualquiera de los dos ramales, está hacia el lado izquierdo (`W`) al igual que lo está la única señal. Esta está compuesta de dos luces, la `centro` y la `der`, inicialmente en VERDE y ROJO dado que la `posicion` de ese cambio es `NORMAL`. Los enclavamientos cambiarán estos colores según corresponda.

Adicionalmente, se puede agregar la propiedad `soloManual: true`, (una propiedad que si no se indica es equivalente a tener valor `false`). Esta propiedad indica que la señal no es dependiente, por enclavamiento, de ningún otro elemento del sector y que, por ende, puede moverse libremente. Las señales que no tienen esta propiedad o, lo que es lo mismo, tienen `soloManual: false`, no pueden manipularse libremente sin antes ponerlas en modo manual, lo que las excluye de los enclavamientos.

En el _pop-up_ de una celda aparecerán también las siguientes propiedades:

- `idSenal`: el identificador interno para ubicar fácilmente esta señal en memoria de la aplicación.
- `manual`: al igual que en el caso de un `CAMBIO` o `TRIPLE`, si la señal estuviera en modo manual, aparecerá esta propiedad con valor `true`.

Podrían definirse otras dos señales para este mismo cambio, una en cada una de las ramas, a saber `E` y `SE`. En realidad, podrían definirse hasta 8 señales por celda, pero las que no estuvieran contiguas a un tramo de vía, no tienen sentido.

El estado inicial de una señal está dado por el archivo de configuración. Posteriormente, este dependerá de los enclavamientos definidos más adelante o podrá ser puesta en manual y manejada por el operador. Cuando una señal depende de dos o más enclavamientos, siempre mostrará el estado más restrictivo. Por ejemplo, una señal podrá depender de que un cambio esté en la posición normal y que ciertos segmentos de vía estén libres. En este caso, la señal sólo se pondrá en verde si ambos enclavamientos coinciden en que deba estar en verde. Siempre que haya varias opciones para una señal, se aplicará el estado más restrictivo.

### Enclavamientos

Llamamos enclavamientos a los automatismos que relacionan las acciones de los diversos elementos del tablero, por ejemplo, cambios que actúan en consonancia o que afectan señales.

Los enclavamientos están definidos en el archivo [enclavamientos.js](https://github.com/Satyam/reactc2/blob/8ecaad57df8deeeecdcd034701055d3b3f23bc8f/src/Store/data/constitucion/enclavamientos.js#L24)

Todos los enclavamientos tienen al menos dos partes, el elemento que es **afectado** por el enclavamiento y el o los elementos que lo afectan, contenidos en la lista de `dependencias`, que denominaremos **origen**.

Las propiedades comunes a todos los enclavamientos son:

- `x` e `y`: para identificar las coordenadas de la celda **afectada**.
- `tipo`: identifica al tipo de celda, ya sea `CAMBIO` o `SENAL`. Es importante destacar que las celdas de tipo `TRIPLE` a los efectos de los enclavamientos son un tipo más de cambio.
- `dir`: (_opcional_) Si el **afectado** fuera de tipo `SENAL`, se deberá indicar cuál de las 8 posibles señales dentro de esta celda es la afectada.
- `dependencias`: Una lista de los elementos **origen** de los que este **afectado** depende.

Todas las dependencias tienen, al menos, las siguientes propiedades, que permiten identificar al **origen**:

- `x` e `y`, dado que los elementos pueden interactuar entre celdas, es necesario indicar las coordenadas del **origen**.
- `tipo`: el tipo del elemento **origen** del enclavamiento. Puede ser `CAMBIO` (que abarca a `TRIPLE`) o `SENAL`
- `dir`: si el elemento fuera de `SENAL` deberá indicarse de cuál de las 8 posibles señales dentro de la celda.

Cada elemento **afectado** puede tener una o más dependencias.

En el _pop-up_ de configuración, sólo aparecerá la solapa de `Encl.` si el elemento seleccionado tuviera alguna. Las propiedades de las tablas de enclavamientos no son afectadas por la aplicación, dado que sus efectos se producen sobre otros elementos, en ningún caso afectan al enclavamiento en sí. Por ello, en el _pop-up_ nunca cambian.

La combinación de los tipos de los elementos dependientes y sus dependencias nos dan 4 combinaciones

#### CAMBIO dependiendo de CAMBIO

En este caso, el estado de un cambio (el **afectado**) depende de otro cambio (el **origen**). Por ejemplo:

```js
  {
    x: 4,
    y: 4,
    tipo: CAMBIO,
    dependencias: [
      {
        x: 5,
        y: 5,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
    ]
  }
```

Esto nos indica que el `CAMBIO` en la celda `[4,4]` depende de el `CAMBIO` en la celda `[5,5]` tal que cuando la posición de este sea `NORMAL` el **afectado** también estará en `NORMAL` y viceversa cuando esté en `DESVIADO`.

La sintaxis de JavaScript permitiría usar las constantes `NORMAL` y `DESVIADO` del lado izquierdo del `:` pero sólo si estuvieran encerradas en corchetes, a saber: `[NORMAL]` y `[DESVIADO]`, lo cual es un tanto confuso. Dado que hay otros mecanismos para validar los nombres de las propiedades, se ha preferido usar el nombre directamente y no la constante entre corchetes. Tal mecanismo no existe para el lado derecho, por lo que allí si se usan las constantes.

Si ambos o alguno de los dos elementos fuera de tipo `TRIPLE` se usarán las constantes `IZQ`, `CENTRO` o `DER` en lugar de `NORMAL` y `DESVIADO`.

#### CAMBIO dependiendo de SENAL

En este caso, el estado de un cambio dependería de una señal. Este caso no se ha estimado como realista por lo que el programa no la contempla .

#### SENAL dependiendo de CAMBIO

Define un enclavamiento por el cual una señal, la **afectada** responde al estado de un CAMBIO o TRIPLE, el **origen**. El cambio puede o no estar en la misma celda que la señal.

Ej.:

```js
  {
    x: 4,
    y: 4,
    dir: W,
    tipo: SENAL,
    dependencias: [
      {
        x: 4,
        y: 4,
        tipo: CAMBIO,
        normal: {
          der: ROJO,
        },
        desviado: {
          centro: ROJO,
          der: AMARILLO,
        },
      },
    ]
  }
```

Aquí la **afectada** es la `SENAL` en la ubicación `[4,4]`, dirección `W`, que depende del `CAMBIO` en la misma celda `[4,4]` e indica que si el **origen** está en posición `normal`, la luz derecha `der`, que apunta al desvío, ha de estar en `ROJO`. En este caso, la luz `centro` ha de estar en `VERDE` pero esta (`VERDE`) es la opción por defecto, por lo que no es necesario mencionarla.

A la inversa, si el cambio está en `desviado` la luz `centro` ha de estar en `ROJO` y la `der` en `AMARILLO`, para indicar la obligada reducción de velocidad al pasar por el desvío.

Si el **origen** fuera un `TRIPLE` en lugar de usar `normal` y `desviado` se debería usar `izq`, `centro` y `der`.

Esta señal tiene sólo dos luces `centro` y `der` por lo que no es necesario indicar qué pasaría con la `izq` que no existe, como que tampoco es necesario indicar las luces que han de estar en `VERDE`. Podrían hacerse ambas cosas, pero serían ignoradas.

#### SENAL dependiendo de SENAL

En este caso, tanto **afectada** como **origen** son ambas señales.

```js
  {
    x: 0,
    y: 0,
    dir: W,
    tipo: SENAL,
    dependencias: [
      {
        x: 3,
        y: 0,
        dir: W,
        tipo: SENAL,
        luces: [
          {
            cuando: ROJO,
            luzOrigen: CENTRO,
            luzAfectada: CENTRO,
            estado: AMARILLO,
          },
        ],
      },
    ],
  },
```

El ejemplo nos dice que la `SENAL` del lado oeste (`W`) de la celda en `[0,0]` depende de la señal del lado `W` de la celda en `[3,0]`. Como una señal puede tener hasta 3 luces, debe indicarse la interacción entre las varias luces. Nótese que las luces relacionadas no tiene que corresponderse en posición. En este caso, ambas son luces del `CENTRO` pero esto es casualidad. La configuarción nos dice que `cuando` la luz `CENTRO` del **origen** esté en `ROJO` la `luzAfectada`, que también es la del `CENTRO`, ha de estar en `AMARILLO`.

Podrían agregarse más líneas de configuración para los varios posibles colores de `luzOrigen` pero resulta que como el estado de `luzAfectada` para los otros casos, sería `VERDE` que es el valor por defecto, es innecesario, pero bién podría hacerse si se quisiera:

```js
  {
    x: 0,
    y: 0,
    dir: W,
    tipo: SENAL,
    dependencias: [
      {
        x: 3,
        y: 0,
        dir: W,
        tipo: SENAL,
        luces: [
          {
            cuando: ROJO,
            luzOrigen: CENTRO,
            luzAfectada: CENTRO,
            estado: AMARILLO,
          },
          {
            cuando: AMARILLO,
            luzOrigen: CENTRO,
            luzAfectada: CENTRO,
            estado: VERDE,
          },
          {
            cuando: VERDE,
            luzOrigen: CENTRO,
            luzAfectada: CENTRO,
            estado: VERDE,
          },
        ],
      },
    ],
  },
```

Igualmente, podrían sumarse entradas para las otras luces de `luzOrigen` (`izq` y `der`) si existieran o tuvieran alguna relación con las luces de esta señal.

#### SENAL dependiendo de BLOQUE

Los bloques son la unidad de ocupación de la vía. Varias celdas pueden pertenecer a un bloque. El acceso a ese bloque está controlado por señales. La relación entre las señales y los bloques está indicada en este tipo de enclavamiento.

```js
{
  x: 2,
  y: 0,
  dir: W,
  tipo: SENAL,
  dependencias: [
    {
      tipo: BLOQUE,
      bloque: 'dos',
      luzAfectada: CENTRO,
    },
  ]
}
```

Este ejemplo nos dice que la señal en [2,0], lado oeste, depende del bloque `'dos'` tal que si este estuviera ocupado, la luz `CENTRO` se pondrá en rojo. En este caso, no se necesita indicar el color de la señal, siempre pasará a rojo cuando esté ocupado. Al desocuparse el bloque, el color de la señal sera el más restrictivo que le corresponda según lo indiquen otras dependencias. En este caso, al no tener otras dependencias, la señal volverá a verde.
