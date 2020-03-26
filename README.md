# CTC

**Simulador de un Control de Tráfico Centralizado**

Esta aplicación simula el tablero mímico de una central de Control de Tráfico Centralizado (CTC) con el objetivo de mostrar los efectos de los enclavamientos entre las varias señales y desvíos.

- [CTC](#ctc)
  - [Uso](#uso)
    - [Comandos](#comandos)
    - [Ver configuración](#ver-configuración)
  - [Configuración](#configuración)
    - [Sectores](#sectores)
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

## Uso

Desde la barra de navegación se puede seleccionar el _sector_ con que se desea interactuar. Hay varios sectores que representan ejemplos básicos de tipos de enclavamientos y un único sector con cierto viso de realidad, que es la estación Constitución del subte C de Buenos Aires. La opción de Administrar Sectores no está activa al momento.

Un segundo item de la barra de menú permite:

- activar o no el _teletipo_, pero dado que el envío de mensajes no está implementado, indicará que no hay mensajes.
- habilitar o no los enclavamientos. Esto permite ver la diferencia en el funcionamiento con y sin enclavamientos.
- mostrar las coordenadas de cada celda cuando no tienen nombre propio.
- mostrar los datos de configuración de las celdas y señales al hacer click sobre ellas.

Al seleccionar cualquier sector se mostrará el mímico correspondiente en el panel central.

### Comandos

Algunos de los elementos son activos, o sea que pueden responder a comandos del operador, a saber, los cambios y las señales. Al hacer click en cualquiera de ellas aparece un cuadro emergente (_pop-up_) mostrando las opciones.

Si se pulsa cualquiera de los botones para cambiar la posición del cambio, se mostrará el efecto de inmediato y, si están activos, se propagarán los enclavamientos que tenga configurado, cambiarán las luces de los semáforos y otros cambios vinculados.

Tanto celdas como las señales dentro de las celdas se pueden poner en manual, lo que se indica con candado abierto o cerrado. Las señales que estén sujetas a enclavamientos sólo pueden manipularse si previamente se ponen en manual, las que no, pueden manipularse libremente.

La celda o señal cambiará de color de fondo para indicar el estado manual.

Al estar en manual los cambios se pueden mover a mano y las luces de las señales cambiarse, pero no modifican el estado de las demás ni responden al enclavamiento propagado desde otras celdas. Al salir de manual, se propagan los enclavamientos pendientes.

### Ver configuración

Cuando está activa la opción de `Mostrar Config.` en el menú de opciones, al hacer click sobre cualquier elemento del mímico se podrá ver la configuración de cualquier elemento.  Esto se aplica tanto a elementos activos, como cambios y señales, como a los pasivos.

En este caso, el *pop-up* mostrará de uno a cuatro botones.  

* Si el elemento fuera activo, el primero que aparecerá será el marcado `Cmd.` por *Comandos* que permitirá dar los comandos de siempre.  
* Un botón `Celda` mostrará la configuración de la celda. 
* Si es una señal, un botón `Señal` mostrará los datos de esa señal.  
* Si la celda o la señal tuvieran enclavamientos, un botón marcado `Encl.` permitirá verlos.  

Estos cuadros mostrarán la configuración activa en ese instante, no la configuración inicial. No sólo mostrará los cambios resultantes de los comandos sino también algunas propiedades de uso interno, que no se usan en los archivos de configuración.  Estas se enumeran en los siguientes párrafos, pero no deben incluirse en los archivos de configuración.

## Configuración 

La configuración de los diversos sectores, sus celdas y señales está dada en los [varios archivos](https://github.com/Satyam/reactc2/tree/master/src/Store/data) de configuración. Estos archivos están compilados en la aplicación por lo que no pueden ser modificados por el usuario. Cada vez que se reinicie la aplicación, volverá a estos mismos valores iniciales.

Los archivos de configuración contienen listas de propiedades para los distintos elementos. Tanto los elementos dentro de estas listas como las propiedades dentro de cada elemento pueden darse en cualquier orden.

### Sectores

Los varios sectores están descriptos en el archivo [sectores.js](https://github.com/Satyam/reactc2/blob/07ff4aea832109d27d280801b2c76bfe26fbd079/src/Store/data/sectores.js#L6). Este exporta una lista (`Array`) de definición de sectores en lo que en JavaScript se denomina _objeto literal_ (Object Literal). Los sectores pueden declararse en cualquier orden.

El archivo de definición de sectores comienza con una serie de [declaraciones de constantes](https://github.com/Satyam/reactc2/blob/07ff4aea832109d27d280801b2c76bfe26fbd079/src/Store/data/sectores.js#L1-L4) que se exportan. Como es habitual en JavaScript y otros lenguajes, las constantes suelen escribirse todas en mayúsculas, con guiones bajos para separar las palabras. La finalidad de estas constantes es, principalmente, reducir errores tipográficos y usualmente también reducir el tamaño del código. Dondequiera que se use la constante `CONSTITUCION` podría también escribirse `'constitucion'`, que es el valor que representa. La diferencia está en que un error tipográfico podría resultar en escribir, por ejemplo, `'constutucion'`, que pasaría totalmente inadvertido en cualquier chequeo de sintaxis pues un _string_ es libre de contener lo que se quiera. Esto no ocurre si se escribe `CONSTUTUCION` dado que esa constante no existe.

La definición de cada sector debe indicar:

- `idSector`: El identificador único del sector. Este se usará internamente, el usuario no debería verlo nunca. Debe ser diferente para cada sector. Conviene que sea breve y que se limite a letras y números sin acentos o signos extraños. Este identificador formará parte del URL de las varias páginas, y es más elegante si es legible. Dado que la propiedad `idSector` se usará frecuentemente en todas las definiciones de otros elementos, se han definido las constantes mencionadas previamente.
- `descrCorta`: Un texto breve que describa el sector. Este será el que el usuario vea y debe ser legible. Se usará, por ejemplo, en el menú y en la solapa del navegador. En los menúes, el listado de sectores estará ordenado alfabéticamente por esta propiedad.
- `descr`: El nombre completo del sector. Se mostrará al dejar reposar el cursor sobre el ítem de menú.
- `alto`: El número de celdas que ocupa este sector en altura.
- `ancho`: El número de celdas que ocupa este sector a lo ancho.

El mímico que muestra el sector se ajustará el tamaño de las celdas para que todas ellas sean visibles en la pantalla basándose en el `alto` y `ancho` declarados en el encabezado.

#### Celdas

Las celdas se declaran en el archivo [celdas.js](https://github.com/Satyam/reactc2/blob/07ff4aea832109d27d280801b2c76bfe26fbd079/src/Store/data/celdas.js#L26). Todas las celdas de todos los sectores están contenidas en este archivo.

No es necesario declarar las celdas vacías. Un sector declarado de 4 \* 3 celdas, no necesita 12 declaraciones. Las que no contengan ningún tramo de riel pueden omitirse.

Cada celda debe tener al menos las siguiente propiedades:

- `idSector`: el identificador del sector a que pertenece esta celda. Se utilizan las constantes importadas del archivo `sectores.js`.
- `x` e `y`: las coordenadas de la celda dentro del sector contando desde cero siendo la celda `x:0, y:0` la ubicada arriba a la izquierda.
- `tipo`: indica el tipo de celda. El resto de las propiedades de la celda depende del tipo, según se verá a continuación.
- `descr`: _(opcional)_ El mímico mostrará este texto en el ángulo inferior izquierdo de cada celda en la grilla. Si no estuviera presente y la opción correspondiente del menú habilitada, mostrará las coordenadas.
- `idCelda`: (**no configurable**) el identificador interno usado dentro de la aplicación para ubicar el elemento.  No debe incluirse en el archivo de configuración pero aparecerá en el *pop-up* que muestra la configuración. 

La mayoría de las celdas pueden tener otras propiedades opcionales, que se describirán más adelante.

Por ejemplo, el tipo más simple de celda es el que contiene una simple línea:

```js
celdas: [
  ...,
  {
    idSector: 'constitucion',
    x: 5,
    y: 0,
    tipo: 'linea',
    descr: 'XVI-b',
    puntas: ['N', 'S'],
  },
  ...
]
```

Para conveniencia del programador, varios de los literales como `linea`, `N` y demás que se verán más adelante, se han definido como [constantes literales](https://github.com/Satyam/reactc2/blob/07ff4aea832109d27d280801b2c76bfe26fbd079/src/Store/data/constantes.js), de tal manera que en lugar de escribir `tipo: 'linea'` se puede escribir `tipo: LINEA` y `puntas: ['N', 'S']` como `puntas: [N, S]`. Nótese que en Javascript, las mayúsculas y minúsculas son diferentes y la convención habitual en programación es que las constantes llevan nombres en mayúscula. En conjunto con las constantes para los identificadores de los sectores, la definición previa quedaría así:

```js
celdas: [
  ...,
  {
    idSector: CONSTITUCION
    x: 5,
    y: 0,
    tipo: LINEA,
    descr: 'XVI-b',
    puntas: [N, S],
  },
  ...
]
```

Esta definición nos dice que dentro de la lista de `celdas` la que se encuentra en la coordenada `5,0` del sector `CONSTITUCION` contiene un tramo de vía simple, una simple `LINEA`, cuyos extremos apunta al norte (`N`) y al sur (`S`). La leyenda `'XVI-b'` se mostrará en una esquina de la celda y, si no se proveyera, simplemente se mostrará la coordenada. No se usan constantes para el nombre de la celda pues puede o no repetirse y no hay forma de validarlo, por lo que no se justifica.

Todas las celdas son más o menos cuadradas (según la pantalla lo permita). Todos los segmentos de vías que contienen irradian del centro de ese cuadrado hacia una de 8 posibles direcciones, las cuatro esquinas y los puntos intermedios de los lados. Estos extremos se los llama por su coordenada geográfica. Aún así, todas las líneas pasan por el centro del cuadrado. Es obvio que una línea de norte a sur como la del ejemplo cruzará por el centro del cuadrado, pero también lo hará una que vaya de norte a este. En lugar de hacer un simple trazo en diagonal uniendo estos lados, la celda se graficará con dos segmentos, uno desde el arriba (_norte_) hasta el centro y otro del centro a la derecha (_este_).

    NW  N  NE
      \ | /
    W - . - E
      / | \
    SW  S  SE

Los tipos de celdas son:

##### tipo: LINEA

Contiene una vía con una única entrada y una única salida, sin cambios o desvíos. Requiere la propiedad `puntas` indicando los puntos geográficos que une. El orden de las puntas es indistinto.

Ej.:

```js
  {
    idSector: CONSTITUCION,
    x: 5,
    y: 0,
    tipo: LINEA,
    descr: 'XVI-b',
    puntas: [N, S]
  }
```

##### tipo: CAMBIO

Contiene una vía con una entrada, la `punta` y dos `ramas`, una `normal` y otra `desviado`. Si bien la salida `normal` suele ser la opuesta a la `punta` esto no es obligatorio.

La propiedad opcional `posicionInicial` indica la posición del cambio y su valor debe corresponder a alguna de las ramas. Por defecto, es `NORMAL`.

Ej:

```js
  {
    idSector: CONSTITUCION,
    x: 8,
    y: 3,
    tipo: CAMBIO,
    posicionInicial: NORMAL,
    punta: SE,
    ramas: {
      normal: NW,
      desviado: W,
    }
  }
```

Adicionalmente, al mostrar la configuración en el *pop-up* se podrán ver las siguientes propiedades, que no se deben indicar en el archivo de configuración.

* `posicion`: La posición actual del cambio, ya sea `"normal"` o `"desviado"`.  En el *pop-up* nunca se mostrarán las constantes `NORMAL` o `DESVIADO` sino sus valores reales.
* `manual`: Si el cambio estuviera en modo manual aparecerá `"manual": true`.  En caso contrario podrá simplemente no aparecer o lo hará como `"manual": false`.
  
##### tipo: PARAGOLPE

Contiene un tramo de vía sin salida. Requiere indicar la única salida mediante la propiedad `punta`.

Ej:

```js
  {
    idSector: CONSTITUCION,
    x: 0,
    y: 4,
    tipo: PARAGOLPE,
    punta: E,
  }
```

##### tipo: CRUCE

Identifica un cruce de vías que no se conectan entre sí. Pueden cruzarse a un mismo nivel o no. Contiene las propiedades `linea1` y `linea2` que contienen, a si vez, las `puntas` que unecomo una celda de tipo `LINEA`. Opcionalmente pueden llevar la propiedad `nivel` (por el momento no se usa). Este valor es relativo, la línea con un nivel mayor cruza por encima de la de nivel menor. Si los valores coinciden es que se cruzan a un mismo nivel. Si falta el nivel se lo supone cero.

Ej:

```js
  {
    idSector: CONSTITUCION,
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
    idSector: CONSTITUCION,
    x: 2,
    y: 4,
    tipo: TRIPLE,
    posicionInicial: CENTRO,
    punta: W,
    ramas: {
      centro: E,
      izq: NE,
      der: SE,
    },
  },
```

La configuración admite la propiedad opcional `posicionInicial` que debe corresponderse al nombre de algúna de las ramas, o sea, `IZQ`, `CENTRO` o `DER`.

Adicionalmente, al mostrar la configuración en el *pop-up* se podrán ver las siguientes propiedades, que no se deben indicar en el archivo de configuración.

* `posicion`: La posición actual del cambio, ya sea `"izq"`, `"centro"` o `"der"`.
* `manual`: Si el cambio estuviera en modo manual aparecerá `"manual": true`.  En caso contrario podrá simplemente no aparecer o lo hará como `"manual": false`.
  

#### Señales

Las señales son parte opcional de las celdas y se declaran en un archivo [senales.js](https://github.com/Satyam/reactc2/blob/07ff4aea832109d27d280801b2c76bfe26fbd079/src/Store/data/senales.js#L27).

Cada celda puede tener tantas señales como segmentos de vía, esto es 8. Ninguna celda tiene 8 segmentos, sólo las celdas de tipo `CRUCE` y `TRIPLE` tienen 4 segmentos, las demás no llegan a eso por lo que no tiene sentido que hubiera más señales que segmentos aunque nada impide poner una señal en medio del campo, donde nadie pueda verla.

Las señales siempre son _entrantes_ esto es, son visibles a los trenes que circulan en sentido entrante a la celda o sea, se dirigen a su centro. Una señal _saliente_ de una celda es _entrante_ en la contigua por lo tanto ha de definirse en esta última.

Cada señal puede estar compuesta de hasta 3 luces, `izq`, `centro` y `der`. La del centro se muestra ligeramente elevada respecto de las otras dos, como en el vértice de un triángulo. En el mímico, no se muestra un foco para cada color de los cuales sólo uno está encendido a un tiempo sino que se muestra un único círculo que cambia de color.

Las señales se identifican, además de los ya habituales `idSector`, `x` e `y`, por la orientación `dir` del segmento en que se encuentran.

También se ha de indicar el estado de cada una de las luces,`izq`, `centro` y `der` que podrán estar en `VERDE`, `AMARILLO` o `ROJO`. Sólo es necesario enumerar las luces que existen, las que no se mencionan no aparecerán.

Ej.:

```js
  {
    idSector: CONSTITUCION,
    x: 4,
    y: 4,
    dir: W,
    centro: VERDE,
    der: ROJO,
  },
```

En este ejemplo, en la celda `4,4` del sector `CONSTITUCION` habrá una señal en el lado izquierdo (`W`), apuntando hacia el centro. Esta celda se corresponde a un [CAMBIO](https://github.com/Satyam/reactc2/blob/07ff4aea832109d27d280801b2c76bfe26fbd079/src/Store/data/celdas.js#L155-L166) donde la punta que permite dar paso a cualquiera de los dos ramales, está hacia el lado izquierdo (`W`) al igual que lo está la única señal. Esta está compuesta de dos luces, la `centro` y la `der`, inicialmente en VERDE y ROJO dado que la `posicionInicial` de ese cambio es `NORMAL`. Los enclavamientos cambiarán estos colores según corresponda.

Adicionalmente, se puede agregar la propiedad `soloManual: true`, (una propiedad que no existe es equivalente a tener valor `false`). Esta propiedad indica que la señal no es dependiente, por enclavamiento, de ningún otro elemento del sector y que, por ende, puede moverse libremente. Las señales que no tienen esta propiedad o, lo que es lo mismo, tienen `soloManual: false`, no pueden manipularse libremente sin antes ponerlas en modo manual, lo que las excluye de los enclavamientos.

En el *pop-up* de una celda aparecerán también las siguientes propiedades:

* `idSenal`: el identificador interno para ubicar fácilmente esta señal en memoria de la aplicación.
* `manual`: al igual que en el caso de un `CAMBIO` o `TRIPLE`, si la señal estuviera en modo manual, aparecerá esta propiedad con valor `true`.

Podrían definirse otras dos señales para este mismo cambio, una en cada una de las ramas, a saber `E` y `SE`. En realidad, podrían definirse hasta 8 señales por celda, pero las que no estuvieran contiguas a un tramo de vía, no tienen sentido.

El estado inicial de una señal está dado por el archivo de configuración. Posteriormente, este dependerá de los enclavamientos definidos más adelante o podrá ser puesta en manual y manejada por el operador. Cuando una señal depende de dos o más enclavamientos, siempre mostrará el estado más restrictivo. Por ejemplo, una señal podrá depender de que un cambio esté en la posición normal y que ciertos segmentos de vía estén libres. En este caso, la señal sólo se pondrá en verde si ambos enclavamientos coinciden en que deba estar en verde. Siempre que haya varias opciones para una señal, se aplicará el estado más restrictivo.

### Enclavamientos

Llamamos enclavamientos a los automatismos que relacionan las acciones de los diversos elementos del tablero, por ejemplo, cambios que actúan en consonancia o que afectan señales.

Los enclavamientos están definidos en el archivo [enclavamientos.js](https://github.com/Satyam/reactc2/blob/07ff4aea832109d27d280801b2c76bfe26fbd079/src/Store/data/enclavamientos.js#L31)

Todos los enclavamientos tienen al menos dos partes, el elemento que es **afectado** por el enclavamiento y el o los elementos que lo afectan, contenidos en la lista de `dependencias`, que denominaremos **origen**.

Las propiedades comunes a todos los enclavamientos son:

- `idSector`: el sector del elemento **afectado** por este enclavamiento.
- `x` e `y`: para identificar las coordenadas de la celda **afectada** dentro de ese sector.
- `tipo`: identifica al tipo de celda, ya sea `CAMBIO` o `SENAL`. Es importante destacar que las celdas de tipo `TRIPLE` a los efectos de los enclavamientos son un tipo más de cambio.
- `dir`: (_opcional_) Si el **afectado** fuera de tipo `SENAL`, se deberá indicar cuál de las 8 posibles señales dentro de esta celda es la afectada.
- `dependencias`: Una lista de los elementos **origen** de los que este **afectado** depende.

Todas las dependencias tienen, al menos, las siguientes propiedades, que permiten identificar al **origen**:

- `x` e `y`, dado que los elementos pueden interactuar entre celdas, es necesario indicar las coordenadas del **origen**.
- `tipo`: el tipo del elemento **origen** del enclavamiento. Puede ser `CAMBIO` (que abarca a `TRIPLE`) o `SENAL`
- `dir`: si el elemento fuera de `SENAL` deberá indicarse de cuál de las 8 posibles señales dentro de la celda.

Llamará la atención la falta de la propiedad `idSector` en las dependencias pero, por el momento, no está previsto que los diferentes sectores interactúen unos con otros.

Cada elemento **afectado** puede tener una o más dependencias.

En el *pop-up* de configuración, sólo aparecerá la solapa de `Encl.` si el elemento seleccionado tuviera alguna. Las propiedades de las tablas de enclavamientos no son afectadas por la aplicación, dado que sus efectos se producen sobre otros elementos, en ningún caso afectan al enclavamiento en sí. Por ello, en el *pop-up* nunca cambian.

La combinación de los tipos de los elementos dependientes y sus dependencias nos dan 4 combinaciones

#### CAMBIO dependiendo de CAMBIO

En este caso, el estado de un cambio (el **afectado**) depende de otro cambio (el **origen**). Por ejemplo:

```js
  {
    idSector: CONSTITUCION,
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

Esto nos indica que dentro del sector `CONSTITUCION` el `CAMBIO` en la celda `[4,4]` depende de el `CAMBIO` en la celda `[5,5]` tal que cuando la posición de este sea `NORMAL` el **afectado** también estará en `NORMAL` y viceversa cuando esté en `DESVIADO`.

La sintaxis de JavaScript permitiría usar las constantes `NORMAL` y `DESVIADO` del lado izquierdo del `:` pero sólo si estuvieran encerradas en corchetes, a saber: `[NORMAL]` y `[DESVIADO]`, lo cual es un tanto confuso. Dado que hay otros mecanismos para validar los nombres de las propiedades, se ha preferido usar el nombre directamente y no la constante entre corchetes. Tal mecanismo no existe para el lado derecho, por lo que allí si se usan las constantes.

Si ambos o alguno de los dos elementos fuera de tipo `TRIPLE` se usarán las constantes `IZQ`, `CENTRO` o `DER` en lugar de `NORMAL` y `DESVIADO`.

#### CAMBIO dependiendo de SENAL

En este caso, el estado de un cambio dependería de una señal. Este caso no se ha estimado como realista por lo que el programa no la contempla .

#### SENAL dependiendo de CAMBIO

Define un enclavamiento por el cual una señal, la **afectada** responde al estado de un CAMBIO o TRIPLE, el **origen**. El cambio puede o no estar en la misma celda que la señal.

Ej.:

```js
  {
    idSector: CONSTITUCION,
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

Aquí la **afectada** es la `SENAL` en la ubicación `[4,4]`, dirección `W`, del sector `CONSTITUCION`, que depende del `CAMBIO` en la misma celda `[4,4]` e indica que si el **origen** está en posición `normal`, la luz derecha `der`, que apunta al desvío, ha de estar en `ROJO`. En este caso, la luz `centro` ha de estar en `VERDE` pero esta (`VERDE`) es la opción por defecto, por lo que no es necesario mencionarla.

A la inversa, si el cambio está en `desviado` la luz `centro` ha de estar en `ROJO` y la `der` en `AMARILLO`, para indicar la obligada reducción de velocidad al pasar por el desvío.

Si el **origen** fuera un `TRIPLE` en lugar de usar `normal` y `desviado` se debería usar `izq`, `centro` y `der`.

Esta señal tiene sólo dos luces `centro` y `der` por lo que no es necesario indicar qué pasaría con la `izq` que no existe, como que tampoco es necesario indicar las luces que han de estar en `VERDE`. Podrían hacerse ambas cosas, pero serían ignoradas.

#### SENAL dependiendo de SENAL

En este caso, tanto **afectada** como **origen** son ambas señales.

```js
  {
    idSector: SENALES_ENCADENADAS,
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

El ejemplo nos dice que la `SENAL` del lado oeste (`W`) de la celda en `[0,0]` del sector `SENALES_ENCADENADAS` depende de la señal del lado `W` de la celda en `[3,0]`. Como una señal puede tener hasta 3 luces, debe indicarse la interacción entre las varias luces. Nótese que las luces relacionadas no tiene que corresponderse en posición. En este caso, ambas son luces del `CENTRO` pero esto es casualidad. La configuarción nos dice que `cuando` la luz `CENTRO` del **origen** esté en `ROJO` la `luzAfectada`, que también es la del `CENTRO`, ha de estar en `AMARILLO`.

Podrían agregarse más líneas de configuración para los varios posibles colores de `luzOrigen` pero resulta que como el estado de `luzAfectada` para los otros casos, sería `VERDE` que es el valor por defecto, es innecesario, pero bién podría hacerse si se quisiera:

```js
  {
    idSector: SENALES_ENCADENADAS,
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
