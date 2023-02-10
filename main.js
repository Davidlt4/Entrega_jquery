/**
 * 
 * Proyecto de Jquery,Javascript
 * Autor:David López Tapias
 * GitHub:Davidlt4
 * 
 */

$(document).ready(function(){

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

        if((/^[a-zA-Z ]{3,50}$/).test(nombre.val())){
            tel.attr('disabled',false);
        }else{
            deshabilitar(1);
        }

    });

    //Para ver que el campo telefono está completo:
    tel.keyup(function(){

        if( (/^[0-9]{9}$/).test(tel.val())){
            dni.attr('disabled',false);
        }else{
            deshabilitar(2);
        }
    });

    //Para ver que el campo dni  está completo:
    dni.keyup(function(){
        if((/^[0-9]{8}[a-zA-Z]{1}$/).test(dni.val())){
            texto.attr('disabled',false);
        }else{
            deshabilitar(3);
        }
    });

    texto.keyup(function(){

        if( (/^[a-zA-Z]{1,100}$/).test(texto.val())){
            fecha.attr('disabled',false);
        }else{
            deshabilitar(4);
        }

    });

    fecha.focusout(function(){

        if(validarFecha(fecha.val())){
           enviar.attr('disabled',false);
        }else{
            deshabilitar(5);
        }

    });


    //--------------------------------------------------

    //Apartado 2(leemos productos desde un archivo json) y 3(testimonios)

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
            let tr=document.createElement("tr");
            let tdTitulo=document.createElement("td");
            tdTitulo.textContent=productos[i].titulo;


            let tdTexto=document.createElement("td");
            tdTexto.textContent=productos[i].texto;

            let tdLink=document.createElement("td");
            let url=document.createElement("a");
            url.href=productos[i].link;
            url.textContent=productos[i].link;
            tdLink.appendChild(url);

            let tdImg=document.createElement("td");
            let imagen=document.createElement("img");
            imagen.src=productos[i].img;
            imagen.width=100;
            imagen.height=100;
            tdImg.appendChild(imagen);

            tr.appendChild(tdTitulo);
            tr.appendChild(tdTexto);
            tr.appendChild(tdLink);
            tr.appendChild(tdImg);

            tbody.appendChild(tr);

            //-------------------------------------

        }


    });

    //Apartado 4

    let visto=[];

    function esta(elemento){
        let esta=false;
        for(let j=0;j<visto.length;j++){
            if(visto[j]==elemento){
                esta=true;
            }
        }
        return esta;
    }

    let div=document.createElement("div");
    let testTbody=document.getElementById("testTab");


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

    function tablaRand(){


        $.ajax({

            url:"listado.json",
            type:"GET",
            dataType:"json",
            error: $('#testimoniosAjax').html('No se ha podido leer el archivo Json'),
            success: function(json){

                let cont=0;
                while(cont<3){
                    
                    let rand=json.testimonios[Math.floor((Math.random() * (json.testimonios.length - 0) + 0))];
        
                    if(!esta(rand)){
    
                        cont++;
                        visto.push(rand);
                        
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
                        
                        div.appendChild(nombre);
                        div.appendChild(texto);
                        div.appendChild(fecha);
    
                        //Para la tabla
    
                        trtest.appendChild(tdNombre);
                        trtest.appendChild(tdTexto);
                        trtest.appendChild(tdFecha);
            
                        testTbody.appendChild(trtest);
    
                        $('#testimoniosAjax').html(div);
                 
                    }
                }
            }
        });
        visto=[];
    }

    //Apartado 5
    
    $('#cambiarVista').click(function(){

        if(!$('#apartadoProductos').is(':hidden')){
            $('#apartadoProductos').hide("slow");
            $('#testimoniosAjax').hide("slow");
            $('#vistaTablaProductos').show("slow"); 
            $('#tablaTestimonio').show("slow"); 
        }else{
            $('#apartadoProductos').show("slow");
            $('#testimoniosAjax').show("slow");
            $('#vistaTablaProductos').hide("slow"); 
            $('#tablaTestimonio').hide("slow");
        }
    });


    //Apartado 7

    $("#arriba").click(function(){
        $("html").animate({scrollTop:0},800);
    });


    //Apartado 9

    tablaRand();
    setInterval(limpiar,10000);
    setInterval(tablaRand,10000);
    

});


