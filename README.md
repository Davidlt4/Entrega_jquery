# Entrega_jquery
Proyecto realizado por David López Tapias para el módulo entorno cliente de 2º DAW
Donde se realizan los siguiente ejercicios de Jquery:

1.- Formulario de registro con al menos los siguientes campos: nombre, teléfono, dni, texto y
fecha. La validación del formulario se realizará mediante jQuery y no permitirá rellenar el
siguiente campo hasta que no se valide el anterior.

2.- Un apartado de servicios/productos. Para ello deberás crear un archivo JSON que represente
un listado de servicios o productos ofertados por la empresa, donde cada uno de ellos tendrá,
al menos, un título, texto, link (a la web de la empresa con ese contenido) e imagen.

3.- Un apartado de testimonios. Es un listado de testimonios, donde cada uno tendrá, al menos,
nombre, texto y fecha.

4.- En la carga inicial de la página se obtendrá el archivo JSON mediante AJAX y se maquetará
dinámicamente. En cada momento solo se mostrarán 3 testimonios aleatorios, aun habiendo
más en el archivo JSON.

5.- Debe proporcionarse al usuario la posibilidad de cambiar la forma en que se visualizan estos
apartados, pudiendo mostrarlos mediante la vista estándar que maquetes o bien una tabla.

6.- En caso de producirse un error en la carga del archivo JSON, no deben crearse las secciones
que dependen de él. Ahora bien, se deberá intentar obtener el contenido (cada 5 segundos)
hasta que la carga sea correcta y se creen por tanto las secciones.

7.- En cada momento debe mostrarse un botón o similar que permita subir al inicio de la web,
realizando una animación en el scroll.

8.- Del mismo modo, tanto los servicios/productos como los testimonios, realizan un efecto al
cargarse, si son visibles, o bien cuando el scroll llega al punto en que se encuentran en la web.
En caso de cambiar su vista (a tabla), deberá realizarse el cambio encadenando un efecto de
desaparición con uno de aparición.

9.- Dado que los testimonios pueden ser más de 3, cada 10 segundos se cambian los 3 que se
muestran y se cargan 3 nuevos (de un modo aleatorio). Al igual que en el cambio de vista, deberá
realizarse un efecto para desaparecer/aparecer.
