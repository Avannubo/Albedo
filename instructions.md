## Instructions

Como hemos esclarecido en la reunión, se realizarán las siguientes actuaciones:
•	Se mantendrá el diseño actual de la web.

Correcto. Por eso es por lo que os pasamos una maqueta de nuestra web en un archivo zip. Lo podéis encontrar en 
https://www.albedo.biz/out/WEB-ADSL.zip.

En un servidor apache se debe extraer al directorio /var/www/html para ser funcional. Si se tiene que instalar en otro directorio, 
hay que tocar un par de ficheros. 

•	Se añadirá el carrito de compras teniendo en cuenta las relaciones pertinentes con los productos (stock, precio, plazo de entrega..)


# Productos
Un producto es un directorio dentro de la rama /products/"familia"/"subfamilia"/"subfamilia". Tanto los identificadores de familia como 
de subfamilia son números del 001 en adelante. La familia de productos es requerida, así como la primera subfamilia... las siguientes subfamilias son opcionales. Dentro de cada directorio de producto hay unos ficheros obligatorios:

- ALBEDOproducto: es vuit (0 bytes). Indica a index.php que estamos en un directorio de producto.
- ALBEDOcodigo: Contiene el código de producto (alfanumérico).
- ALBEDOprecio.txt: Precio en € sin IVA.
- ALBEDOcuerpo1.ht: descripción breve para todas las apariciones del producto, tanto como plana propia como por fichas en tiras de producto,
    por ejemplo. (sólo texto, html)
- ALBEDOcuerpo2.ht: descripción ampliada del producto. Puede tener texto e imágenes (html)
- ALBEDOtitulo: siempre se forma con "título del padre en la jerarquía". pero se puede editar y cambiar
- ALBEDOstock: NUEVO. Es el número de productes en stock
- ALBEDOstock_minimo: NUEVO. Es el número de productos donde se activa la alarma de rotura de stock. El sistema automático de detección de 
    rotura de stock lo implementará ALBEDO.
- ALBEDOplazo_entrega: NUEVO. Es el número de días laborables para poder servir el producto. 0 indica entrega inmediata disponible.
- imagen.jpg: una imagen del producto en un cierto nivel de detalle que se obra el prémer sobre el thumbnail
- imagen.small.jpg: una imagen tipo thumbnail del producto que puede ser o no una replica miniatura de imagen.jpg. En cualquier caso las 
    medidas son fijas y son de 120x110 pixeles
- index.php: es un enlace simbólico al fichero del mismo nombre del directorio anterior, y así sucesivamente hasta el directorio /


# Páginas
Todos los ficheros enmendados son los "registros" equivalentes de una entrada de una base de datos. Como veis se trata de una base de datos 
en ficheros planos, distribuida en un árbol de directorios.Se hará la página de "checkout" con 3 opciones: 
- "Transferencia bancaria" 
- "nuevo cliente" 
- "ya soy cliente"


# Checkout
No exactamente, pero muy parecido... la plana de checkout tendrá una primera zona donde el cliente podrá entrar los datos imprescindibles par 
seguir con la compra: nombre, apellidos, email, dirección para recibir el pedido. En esta zona hay un botón que diga: "ya soy cliente, iniciar 
sesión". Es decir, o bien entra los datos o bien hace login con lo que se le llenan los datos de manera automática. En la misma plana habrá una 
zona donde el cliente podrá escoger el método de pago. Las opciones serán:

por transferencia: la única activa por ahora. Si la marca (hoy por hoy no podrá hacer otra cosa) esta opción ya indica con texto que "Recibirá 
los datos de pago en su email" y así se hará cuando premio sobre un botón final que diga "Comprar ahora" con Visa o MasterCard con el banco 
que os diremos: por ahora sale como no válida

con PayPal: por ahora sale como no válida

con Bizum: por ahora sale como no válida

Transferencia: Aparecerá un formulario donde el cliente deberá introducir todos sus datos, una vez introducidos se le enviará automáticamente 

un mail al cliente con la información a donde tendrá que hacer la transferencia y también se realizará un comunicado a vosotros de la compra 
realizada. Una vez tengamos esto realizado se pondrá en producción y continuaremos con el desarrollo de la plataforma de pago.

En parte es lo que decimos en el anterior punto... lo que cambia es que todo se hace en la plana de checkout. Esto se porque, escojo el método que 
escoja los datos siempre sán de rellenar, sea cliente nuevo o bien antiguo con login. Pero fijaos que el procedimiento está muy bien lo mismo. Si 
queréis tener un ejemplo, entraste en la [tienda.bricogeek.com](https://tienda.bricogeek.com/resumen-pedido) y simule una compra... es muy bien como lo que pedimos.
Nuevo cliente: Aparecerá un formulario donde el cliente introducirá sus datos y se quedarán guardados en un archivo JSON donde se 
generará un ID por cliente.

Todo se hace en la plana de checkout. Lo que sí es correcto es que la manera interna acordada de gestionar el fichero de clientes 
es el archivo json. 


# /Admin
No lo hemos dicho hasta ahora, pero se crea, a partir de ahora un nuevo directorio en la raíz de la web, que se llamará /admin. 

bajo este directorio tenéis la libertad de poner todos los directorios y ficheros que creéis conveniente. El primer caso es el archivo de clientes. 

Por cierto, que se diga ALBEDOxxxx pues los ficheros con este prefijo están excluidos de ser entregados por el servidor.

Ya soy cliente: El usuario tendrá que hacer un login con el mail y la contraseña y automáticamente aparecerán sus datos.

Ídem anterior. Todo se hace en la plana de checkout. 

Se hará la integración de la plataforma de pago con la entidad bancaria.

ALBEDO decidirá en los próximos días la entidad bancaria y una vez escogida se os pasará la información que nos den para hacer la prueba 
con la pasarela virtual, tal y como ha dicho Marc.

Se realizará un panel de administración para facilitar la creación y edición de productos.


El panel permitirá navegar por el árbol de productos, escogiendo la familia y subfamilias para llegar a un producto. Si escogemos uno 
existente, lo podremos editar (para cambiar stock, o cualquier otra cosa). Si escogemos hacer uno nuevo, una vez escogida la rama, el panel nos 
creará un nuevo producto (un nuevo directorio numerado como el siguiente al último existente en aquella rama. Esto se debe a la estrategia de que, 
una vez creado un nodo del árbol éste no se modifica nunca (o es activo, o es obsoleto, pero no desaparece y siempre es visible en un navegador).

Nuevamente, el panel debería accederse desde "/admin/panel/xxxxxx" como le quisiera decir. Una vez creada y a través de las herramientas de apache 
haremos toda la zona "/admin" protegida con login y password de los trabajadores de ALBEDO que tengan que mantenerla.


# Finalmente, como hemos comentado, quedo a la espera del archivo zip con una versión reducida de la web en el estado actual, para poder tener el funcionamiento exacto de la estructura ???.

Tal y como he dicho al principio, por su tamaño lo hemos publicado en la web en el enlace incluido???.
