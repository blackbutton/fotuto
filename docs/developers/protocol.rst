=========================
Protocolo de Comunicacion
=========================

Caracteristicas de la red
=========================
La red de dispositivos tiene una arquitectura en forma de estrella, donde un 
nodo es el master y el resto son esclavos. Cada nodo tendra una direccion unica.

La red debe garantizar la comunicacion entre el nodo master y los esclavos, 
salvo que superen las distancias maximas permitidas por los modulos de 
comunicacion. Si un nodo esclavo no tiene comunicacion directa con el 
master, pero si con otros nodos esclavos y alguno de estos tiene comunicacion 
con el master, entonces los nodos actuaran como repetidores para hacer llegar 
los mensajes entre el master y el nodo sin comunicacion con el master. 

El nodo master cada un tiempo configurable envia mensajes de solicitud a cada
nodo esclavo. Estos mensajes tendran un numero de identificacion para determinar
cual mensaje de respuesta corresponde a la solicitud. Si en un tiempo 
determinado, no se recibe respuesta se reenvia el mensaje de solicitud, si se 
han enviado 3 mensajes sin recibir respuesta se debe generar una alarma para que
el operador chequee el problema de incomunicacion.

Los nodos esclavos son pasivos, solo envian informacion al master (mensajes de 
respuesta) cuando reciben un mensaje de solicitud.

Como los valores de las variables pueden cambiar varias veces entre una 
solicitud de lectura y otra, esto puede ser un requerimiento de interes en el 
sistema. En este caso el mensaje de respuesta de lectura debera contener todos 
los cambios de las variables desde el ultimo mensaje de respuesta de lectura
enviado.

Este protocolo debe poderse implementar sobre cualquier otro protocolo como 
802.15.4, ZegBee, TCP/IP, etc.

Tipos de Mensajes
=================

+----+---------------+---------+---------+-------------------+-------------------------------------------------------+   
| #  |    CODIGO     | FUENTE  | DESTINO |      TIPO         | DESCRIPCION                                           |
+====+===============+=========+=========+===================+=======================================================+
|  1 | READ_REQUEST  | MASTER  | ESCLAVO | Solicitud de      |                                                       |
|    |               |         |         | lectura de        |                                                       | 
|    |               |         |         | variables         |                                                       |
+----+---------------+---------+---------+-------------------+-------------------------------------------------------+
|  2 | READ_RESPONSE | ESCLAVO | MASTER  | Respuesta de      | Contiene los valores de las variables desde la ultima |
|    |               |         |         | lectura de todas  | lectura. Este mensaje es enviado cuando un esclavo    |
|    |               |         |         | las variables     | recibe un mensaje READ_REQUEST y contiene el mismo    | 
|    |               |         |         |                   | identificador del mensaje de solicitud.               |
+----+---------------+---------+---------+-------------------+-------------------------------------------------------+
|  3 | WRITE_REQUEST | MASTER  | ESCLAVO | Solicitud de      | En este mensaje se envia una lista tuplas, cada tupla |
|    |               |         |         | escritura de una  | esta compuesta por el identificador de la variable y  | 
|    |               |         |         | o mas variables   | el valor a escribir                                   |
+----+---------------+---------+---------+-------------------+-------------------------------------------------------+
|  4 | WRITE_ACK     | ESCLAVO | MASTER  | Confirmacion de   | Cuando un esclavo recibe un WRITE_REQUEST, setea las  |  
|    |               |         |         | escritura de      | correspondientes variables y responde con este        |  
|    |               |         |         | variables         | mensaje con el mismo identificador de la solicitud    |
+----+---------------+---------+---------+-------------------+-------------------------------------------------------+
|  5 | ERROR         | ESCLAVO | MASTER  | Respuesta de      | Si hubo algun error leyendo o escribiendo alguna      |
|    |               |         |         | error             | variable este seria el mensaje de respuesta con un    | 
|    |               |         |         |                   | codigo de error                                       |
+----+---------------+---------+---------+-------------------+-------------------------------------------------------+

Estructura de los mensajes
==========================
Los mensajes de este protocolo son enviados mediante el protocolo tansporte 
segun la via de comunicacion usada por los dispositivos.

A continuacion se describe la estructura de los mensajes, los ejemplos
que aparecen son de tramas del protocolo IEEE 802.15.4 modo API escaped.

Todos los mensajes tienen el siguiente formato:

===== ======== ===
Campo Longitud Descripcion
===== ======== ===
ID    2 Bytes  Identificador unico del mensaje
Tipo  1 Byte   # segun tipo de mensaje (Ver tabla de Tipos Mensajes) 
Datos Variable (Opcional) su contenido depende del tipo de mensaje
===== ======== ===

READ_REQUEST
------------

===== ======== ===
Campo Longitud Valor
===== ======== ===
Tipo  1 Byte   1
Datos 0        No contiene datos
===== ======== ===

Ejemplo: Trama de solicitud de lectura al nodo esclavo con direccion ``0013A20040E55017``::

  7E 00 10 10 01 00 7D 33 A2 00 40 E5 50 17 FF FE 00 00 01 01 AE

====== === ==== ==== == == == == == == == == == == === === == === == ==== ===
.      Longitud Tipo      Direccion 64b destino    Dir 16b        Mensaje
------ -------- ---- -- -------------------------- ------- -- --- ------- ---
Inicio 1   2    Tx   ID 1  2  2  3  4  5  6  7  8  1    2  BC Opc ID Tipo SUM
====== === ==== ==== == == == == == == == == == == === === == === == ==== ===
7E     00  10   10   01 00 7D 33 A2 00 40 E5 50 17 FF  FE  00 00  01 01   AE
====== === ==== ==== == == == == == == == == == == === === == === == ==== ===

.. note:: TODO: Falta:
    
   * Definir cual el byte que aparece entre el **ID** y la 
     **Dirccion 64b destino**
   * La direccion 64b empieza con ``00 13`` pero el XCTU la genero con ``00 7D 33``
     , determinar que sucede aqui, parece ser que al caracter 13 le hace un escape, pues esta en modo api scape
   * Determinar si es posible usar los campos del protocolo 802.15.4 
     *Frame Type* como tipo de mensaje y el *Frame ID* como ID del mensaje (de 
     ser posible se eliminarian estos campos de la estructura del mensaje)
   * Implementar un campo (ej: historial) en los datos del mensaje que sea 0 si
     solo se quieren los valores instantaneos y sin los cambios en el tiempo 
     desde la ultima lectura

READ_RESPONSE
-------------
En este mensaje se envian al master los valores historicos de los cambios en las
variables desde la ultima respuesta de lectura. El area de *Datos* del mensaje
esta compuesto por una lista de variables, cada item tendra el identificador
de la variable (*Var ID*), la cantidad de valores (*Cantidad*) y a continuacion
la lista de valores, cada valor esta compuesto por longitud (es el tamanno que 
ocupa el valor), el momento en que fue guardado el valor (*Tiempo*) y el valor 
de la variable (que puede ser analgoico o digital) 

.. note:: TODO: Pensar si es conveniente :

   * Mandar las variables digitales primero
     y cambiar el formato, elimiando el campo longitud, poniendo todos los valores
     booleanos en 1 byte y a continuacion en el mismo orden de los bits los
     registros de tiempo
   * Si hay un solo valor de la variable se podria omitir el campo datetime?
   * Mandar todo mensaje en formato JSON serializado
   * El campo datetime mandarlo como la cantidad de segundos transcurridos desde una fecha reciente y
     significativa ejemplo: 1ro de Enero de 2000 y asi ahorrar bytes?

+-------------------------------------+----------+-------+
| Campo                               | Longitud | Valor |
+=====================================+==========+=======+
| Tipo                                | 1 Byte   | 2     |
+-------+-------+---------------------+----------+-------+
| Datos | Var 1 | Var ID              | 1 Byte   |       |
|       |       +---------------------+----------+-------+
|       |       | Cantidad            | 1 Byte   | X     |
|       |       +----------+----------+----------+-------+
|       |       | Valor 1  | Longitud | 1 Byte   |       |
|       |       |          +----------+----------+-------+
|       |       |          | Tiempo   |          |       |
|       |       |          +----------+----------+-------+
|       |       |          | Valor    |          |       |
|       |       +----------+----------+----------+-------+
|       |       | Valor 2  | Longitud | 1 Byte   |       |
|       |       |          +----------+----------+-------+
|       |       |          | Tiempo   |          |       |
|       |       |          +----------+----------+-------+
|       |       |          | Valor    |          |       |
|       |       +----------+----------+----------+-------+
|       |       | ...                                    |
|       |       +----------+----------+----------+-------+
|       |       | Valor X  | Longitud | 1 Byte   |       |
|       |       |          +----------+----------+-------+
|       |       |          | Tiempo   |          |       |
|       |       |          +----------+----------+-------+
|       |       |          | Valor    |          |       |
|       +-------+----------+----------+----------+-------+
|       | Var 2 | Var ID              | 1 Byte   |       |
|       |       +---------------------+----------+-------+
|       |       | Cantidad            | 1 Byte   | Y     |
|       |       +----------+----------+----------+-------+
|       |       | Valor 1  | Longitud | 1 Byte   |       |
|       |       |          +----------+----------+-------+
|       |       |          | Tiempo   |          |       |
|       |       |          +----------+----------+-------+
|       |       |          | Valor    |          |       |
|       |       +----------+----------+----------+-------+
|       |       | Valor 2  | Longitud | 1 Byte   |       |
|       |       |          +----------+----------+-------+
|       |       |          | Tiempo   |          |       |
|       |       |          +----------+----------+-------+
|       |       |          | Valor    |          |       |
|       |       +----------+----------+----------+-------+
|       |       | ...                                    |
|       |       +----------+----------+----------+-------+
|       |       | Valor Y  | Longitud | 1 Byte   |       |
|       |       |          +----------+----------+-------+
|       |       |          | Tiempo   |          |       |
|       |       |          +----------+----------+-------+
|       |       |          | Valor    |          |       |
|       +-------+----------+----------+----------+-------+
|       | ...                                            |
|       +-------+----------+----------+----------+-------+
|       | Var N | Var ID              | 1 Byte   |       |
|       |       +---------------------+----------+-------+
|       |       | Cantidad            | 1 Byte   | Z     |
|       |       +----------+----------+----------+-------+
|       |       | Valor 1  | Longitud | 1 Byte   |       |
|       |       |          +----------+----------+-------+
|       |       |          | Tiempo   |          |       |
|       |       |          +----------+----------+-------+
|       |       |          | Valor    |          |       |
|       |       +----------+----------+----------+-------+
|       |       | Valor 2  | Longitud | 1 Byte   |       |
|       |       |          +----------+----------+-------+
|       |       |          | Tiempo   |          |       |
|       |       |          +----------+----------+-------+
|       |       |          | Valor    |          |       |
|       |       +----------+----------+----------+-------+
|       |       | ...                                    |
|       |       +----------+----------+----------+-------+
|       |       | Valor Z  | Longitud | 1 Byte   |       |
|       |       |          +----------+----------+-------+
|       |       |          | Tiempo   |          |       |
|       |       |          +----------+----------+-------+
|       |       |          | Valor    |          |       |
+-------+-------+----------+----------+----------+-------+


Ejemplo: Se envian 2 varibles, la primera con 3 valores y la
segunda con un valor::

  [
      {
          "var_id": 1,
          "values": [
              {"timestamp": 1465194379, "value": 10},
              {"timestamp": 1465194364. "value": 9},
              {"timestamp": 1465194354, "value": 8}
          ]
      },
      {
          "var_id": 2,
          "values": [
              {"timestamp": 1465194379, "value": 1}
          ]
      }
  ]

Contenido del mensaje (*Datos*)::

  01 03 05 57 55 17 8B 0A 05 57 55 17 7C 09 05 57 55 17 72 08 02 01 05 57 55 17 8B 01

Trama de respuesta de lectura al nodo master con direccion ``0013A20040E5503C``::

  7E 00 2B 10 01 00 7D 33 A2 00 40 E5 50 3C FF FE 00 00 02 01 03 05 57 55 17 8B 0A 05 57 55 17 7C 09 05 57 55 17 72 08 02 01 05 57 55 17 8B 01 42

=== ===== == == ========================== ===== == === == === ==== === =========== === === =========== === === =========== === === ==== === =========== === ===
.               Dest.                                   Mensaje
--- ----- -- -- -------------------------- ----- -- --- ---------------------------------------------------------------------------------------------------- ---
Ini Lon   Tx ID Dir 64b                    Dir   BC Opc ID Var Cant Lon Tiempo      Val Lon Tiempo      Val Lon Tiempo      Val Var Cant Lon Tiempo      Val SUM
=== ===== == == ========================== ===== == === == === ==== === =========== === === =========== === === =========== === === ==== === =========== === ===
7E  00 2B 10 01 00 7D 33 A2 00 40 E5 50 3C FF FE 00 00  02 01  03   05  57 55 17 8B 0A  05  57 55 17 7C 09  05  57 55 17 72 08  02  01   05  57 55 17 8B 01  42
=== ===== == == ========================== ===== == === == === ==== === =========== === === =========== === === =========== === === ==== === =========== === ===

WRITE_REQUEST
-------------

WRITE_ACK
---------

ERROR
-----
