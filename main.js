/**
 * 
 * Proyecto de Jquery,Javascript
 * Autor:David López Tapias
 * GitHub:Davidlt4
 * 
*/

$(document).ready(function(){

    //Apartado 6

    //Realizamos la petición ajax
    function cargarJson(){
        $.ajax({
            url:"listado.json",
            type:"GET",
            dataType:"json",
            //si falla mandamos un alert avisando de que no se ha podido completar la peticion y realizamos peticiones
            // a esta misma función hasta que sea exitosa
            error: function(){
                alert('No se ha podido cargar el archivo json');
                setTimeout(cargarJson,5000);
            },
            // si es exitosa, cargamos las vistas de productos y testimonios
            success: function(){
                productos();
                tablaRand();
            }
        });
    }

    //Llamada a la función anterior
    cargarJson();

    //Recogemos los campos del formulario
    let nombre=$('#nombre');
    let tel=$('#telefono');
    let dni=$('#dni');
    let texto=$('#texto');
    let fecha=$('#fecha');
    let enviar=$('#enviar');

    //Guardamos los campos en un array
    let campos=[nombre,tel,dni,texto,fecha,enviar];


    //Guardamos el año actual en una variable para poder validar que el año que se ha pasado es este año y no uno anterior
    const anioActual = new Date().getFullYear();

    function validarFecha(fecha){
        
        /* Comprobar los días del mes */
        const day = parseInt(fecha.split('-')[2])
        const month = parseInt(fecha.split('-')[1])
        const year = parseInt(fecha.split('-')[0])

        const monthDays = new Date(year,month,0).getDate()
        if (day > monthDays) {
            return false;
        }
        
        /* Comprobar que el año no sea superior al actual*/
        if (year > anioActual) {
            return false;
        }

        return true;

    }

    //funcion que deshabilita en función de los campos completos
    function deshabilitar(completos){
        for(completos;completos <= campos.length;completos++){
            if(campos[completos]!=null){
                campos[completos].attr('disabled',true)
            }
        }
    }


    //Para ver que el campo nombre está completo:
    nombre.keyup(function(){

        //comprobamos si el campo introducido es válido si no lo es deshabilitamos hasta este input
        if((/^[a-zA-Z ]{3,50}$/).test(nombre.val())){
            tel.attr('disabled',false);
        }else{
            deshabilitar(1);
        }

    });

    //Para ver que el campo telefono está completo:
    tel.keyup(function(){

        //comprobamos si el campo introducido es válido si no lo es deshabilitamos hasta este input
        if( (/^[0-9]{9}$/).test(tel.val())){
            dni.attr('disabled',false);
        }else{
            deshabilitar(2);
        }
    });

    //Para ver que el campo dni  está completo:
    dni.keyup(function(){
        //comprobamos si el campo introducido es válido si no lo es deshabilitamos hasta este input
        if((/^[0-9]{8}[a-zA-Z]{1}$/).test(dni.val())){
            texto.attr('disabled',false);
        }else{
            deshabilitar(3);
        }
    });

    texto.keyup(function(){
        //comprobamos si el campo introducido es válido si no lo es deshabilitamos hasta este input
        if( (/^[a-zA-Z]{1,100}$/).test(texto.val())){
            fecha.attr('disabled',false);
        }else{
            deshabilitar(4);
        }

    });

    fecha.focusout(function(){
        //comprobamos si el campo introducido es válido si no lo es deshabilitamos hasta este input
        if(validarFecha(fecha.val())){
           enviar.attr('disabled',false);
        }else{
            deshabilitar(5);
        }

    });


    //--------------------------------------------------

    //Apartado 2(leemos productos desde un archivo json) y 3(testimonios)

    function productos(){

        $.getJSON("listado.json", function(listado){

            let productos=listado.productos;
    
            //creamos las secciones con DOM
    
            //Para productos
            let apartadoProductos=document.getElementById("apartadoProductos");
    
            let leyendaProductos=document.createElement("legend");
            leyendaProductos.innerHTML="<h2>Productos</h2>";
            apartadoProductos.appendChild(leyendaProductos);
    
            //--------------------------------------------------
    
            //rellenamos las secciones
    
            //Seccion de productos:
            for(let i=0;i<productos.length;i++){
    
                //Creamos el titulo
                let titulo=document.createElement("h3");
                titulo.textContent=productos[i].titulo;
    
                //Creamos el texto
                let texto=document.createElement("p");
                texto.textContent=productos[i].texto;
    
                //El link con su href
                let link=document.createElement("a");
                link.href=productos[i].link;
                link.textContent=productos[i].link;
    
                //Creamos la imagen adaptando las propiedades de tamaño
                let img=document.createElement("img");
                img.src=productos[i].img;
                img.width=100;
                img.height=100;
    
                //Anexamos estos elementos al apartado correspondiente
                apartadoProductos.appendChild(titulo);
                apartadoProductos.appendChild(texto);
                apartadoProductos.appendChild(link);
                apartadoProductos.appendChild(img);
    
                //---------------Tabla---------------
    
                //Tbody de la tabla para añadir los campos
                let tbody=document.getElementById("testTabla");
    
                //creamos los elementos a añadir a la tabla

                //Creamos un td para el título y le incluimos el título que leemos del json
                let tr=document.createElement("tr");
                let tdTitulo=document.createElement("td");
                tdTitulo.textContent=productos[i].titulo;
    
                //Creamos un td para el texto y le incluimos el texto que leemos del json
                let tdTexto=document.createElement("td");
                tdTexto.textContent=productos[i].texto;
                
                //Creamos un td para el link y le incluimos el link que leemos del json
                //Añadiendo el correspondiente href

                let tdLink=document.createElement("td");
                let url=document.createElement("a");
                url.href=productos[i].link;
                url.textContent=productos[i].link;
                tdLink.appendChild(url);


                //Creamos un td para el imagen y le incluimos el imagen que leemos del json
                //Añadiendo las correspondientes medidas de la imagen

                let tdImg=document.createElement("td");
                let imagen=document.createElement("img");
                imagen.src=productos[i].img;
                imagen.width=100;
                imagen.height=100;
                tdImg.appendChild(imagen);


                //Añadimos todos los tds creados anteriormente a un tr y lo añadimos al tbody de la tabla

                tr.appendChild(tdTitulo);
                tr.appendChild(tdTexto);
                tr.appendChild(tdLink);
                tr.appendChild(tdImg);
    
                tbody.appendChild(tr);
    
                //-------------------------------------
    
            }
    
    
        });
    }

    //Apartado 4

    //Array auxiliar para ir guardando los testimonios que ya han salido
    //En un ciclo completo de while para que así no se repitan los testimonios aleatorios
    let visto=[];

    //Función auxiliar para comprobar si un testimonio está en el array visto
    function esta(elemento){
        let esta=false;
        for(let j=0;j<visto.length;j++){
            if(visto[j]==elemento){
                esta=true;
            }
        }
        return esta;
    }

    //Creamos el div que contendra los testimonios aleatorios y que
    //añadiremos a la vista testTab cuando este completo
    let div=document.createElement("div");
    let testTbody=document.getElementById("testTab");


    //Función para crear la vista de los testimonios aleatorios
    function tablaRand(){

        $.ajax({

            //Recogemos los testimonios a través de una petición ajax
            url:"listado.json",
            type:"GET",
            dataType:"json",
            error: $('#testimoniosAjax').html('No se ha podido leer el archivo Json'),
            success: function(json){

                //Contador auxiliar para controlar que solo seleccionamos 3 testimonios
                let cont=0;

                //Mientras no se hayan seleccionado 3 testimonios
                while(cont<3){
                    
                    //Cogemos un testimonio aleatorio del array y lo guardamos en una variable auxiliar
                    let rand=json.testimonios[Math.floor((Math.random() * (json.testimonios.length - 0) + 0))];
                    
                    //Si este testimonio no está en vistos
                    if(!esta(rand)){
                        
                        //Lo añadimos a vistos y aumentamos en 1 el contador puesto que ya tenemos 1 testimonio más
                        cont++;
                        visto.push(rand);

                        //-------------Añadimos todos los campos en formato tabla y para el div-------------------
                        
                        //Nombre para testimonios 

                        let trtest=document.createElement("tr");
    
                        let nombre=document.createElement("h3");
                        nombre.textContent=rand.nombre;
    
                        let tdNombre=document.createElement("td");
                        tdNombre.textContent=rand.nombre;
    
                        //Texto para testimonios
            
                        let texto=document.createElement("p");
                        texto.textContent=rand.texto;
    
                        let tdTexto=document.createElement("td");
                        tdTexto.textContent=rand.texto;
    
                        //Fecha para testimonios
            
                        let fecha=document.createElement("p");
                        fecha.textContent=rand.fecha;
    
                        let tdFecha=document.createElement("td");
                        tdFecha.textContent=rand.fecha;

                        //----------------------------------------------------------------------------

                        //Añadimos los campos generados para el div al div
                        
                        div.appendChild(nombre);
                        div.appendChild(texto);
                        div.appendChild(fecha);


                        //Y los de la tabla los añadimos a la tabla
    
                        trtest.appendChild(tdNombre);
                        trtest.appendChild(tdTexto);
                        trtest.appendChild(tdFecha);
                        
                        //Los datos de la tabla la añadimos directamente a la tabla
                        //Que está oculta por defecto
                        testTbody.appendChild(trtest);
                        
                        //Y rellenamos el contenido de la vistatestimoniosAjax con el div generado
                        $('#testimoniosAjax').html(div);
                 
                    }
                }
            }
        });
        //Vaciamos el array de visto
        visto=[];
    }

    //Apartado 5

    //Añadimos al botón la función de cambiar vista
    $('#cambiarVista').click(function(){

        //Si se esta mostrando el maquetado por defecto(en mi caso un fieldset)
        if(!$('#apartadoProductos').is(':hidden')){
            //ocultamos esta vista y mostramos las tablas tanto para productos como para testimonios
            $('#apartadoProductos').hide("slow");
            $('#testimoniosAjax').hide("slow");
            $('#vistaTablaProductos').show("slow"); 
            $('#tablaTestimonio').show("slow");
        
        }else{
            //Si esta vista está oculta, se muestra dicha vista y se ocultan las tablas
            $('#apartadoProductos').show("slow");
            $('#testimoniosAjax').show("slow");
            $('#vistaTablaProductos').hide("slow"); 
            $('#tablaTestimonio').hide("slow");
        }
    });


    //Apartado 7

    //Añadimos la función de animación de scroll hasta arriba de la página al botón arriba
    $("#arriba").click(function(){
        $("html").animate({scrollTop:0},800);
    });

    //Función limpiar para el Apartado 8 y Apartado 9

    //Esta función limpia los campos que se estén mostrando
    //Y los oculta o muestra lentamente en función de esto 
    //para así dar el efecto de cargarse(Apartado 8)
    function limpiar(){
        
        if(!$('#testimoniosAjax').is(':hidden')){
            $('#testimoniosAjax').hide("slow");
        }else{
            $('#tablaTestimonio').hide("slow");
        }

        //Vacía los elementos para volver a cargarlos
        //con el intertevalo(Apartado 9)
        $('#testimoniosAjax div').empty();
        $('#tablaTestimonio tbody').empty();

        if(!$('#testimoniosAjax').is(':hidden')){
            $('#testimoniosAjax').show("slow");
        }else{
            $('#tablaTestimonio').show("slow");
        }
    }

    //Apartado 8
    
    //Para las vista del fieldset
    $(window).scroll(function () {


        //Recogemos los fieldset de productos y testimonios
        let $productos = $("#apartadoProductos");
        let $testimonios = $("#testimoniosAjax");

        //Añadimos la función de mostrar dicha vista cuando el scroll este encima de dicho elemento
        if ($productos.offset().top - $(window).scrollTop() < $(window).height()) {
            //Y solo lo mostramos si es esta vista la que se está mostrando
            if($('#vistaTablaProductos').is(':hidden')){
                $('#apartadoProductos').show("slow");
            }
        }
        
        //Añadimos la función de mostrar dicha vista cuando el scroll este encima de dicho elemento
        if ($testimonios.offset().top - $(window).scrollTop() < $(window).height()) {
            //Y solo lo mostramos si es esta vista la que se está mostrando
            if($('#tablaTestimonio').is(':hidden')){
                $('#testimoniosAjax').show("slow");
            }
        }
    });

    //------------------------------------------------

    //Para las vistas de las tablas

    $(window).scroll(function () {

        //Recogemos las tablas de productos y testimonios
        let $productos = $("#vistaTablaProductos");
        let $testimonios = $("#tablaTestimonio");

        //Añadimos la función de mostrar dicha vista cuando el scroll este encima de dicho elemento
        if ($productos.offset().top - $(window).scrollTop() < $(window).height()) {
            //Y solo lo mostramos si es esta vista la que se está mostrando
            if($("#apartadoProductos").is(':hidden')){
                $('#vistaTablaProductos').show("slow");
            }
        }
        //Añadimos la función de mostrar dicha vista cuando el scroll este encima de dicho elemento
        if ($testimonios.offset().top - $(window).scrollTop() < $(window).height()) {
            //Y solo lo mostramos si es esta vista la que se está mostrando
            if($("#testimoniosAjax").is(':hidden')){
                $('#tablaTestimonio').show("slow");
            }
        }

    });

    //-------------------------------------

    //Apartado 9
    
    //Llamamos a la función limpiar que vacía todo el contenido de las vistas
    //Y a las que la genera para que así de el efecto de animación y se refresque el contenido
    //cada 10 segundos como se pide

    setInterval(limpiar,10000);
    setInterval(tablaRand,10000);
    

});



