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
    let campos=[nombre,tel,dni,texto,fecha,enviar];


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


    //Apartado 2(leemos productos desde un archivo json) y 3(testimonios)

    $.getJSON("listado.json", function(listado){

        let productos=listado.productos;
        let testimonios=listado.testimonios;

        //creamos las secciones con DOM

        //Para productos
        let apartadoProductos=document.createElement("fieldset");

        let leyendaProductos=document.createElement("legend");
        leyendaProductos.innerHTML="<h2>Productos</h2>";
        apartadoProductos.appendChild(leyendaProductos);

        //--------------------------------------------------

        //Para testimonios
        let apartadoTestimonios=document.createElement("fieldset");
        let leyendaTestimonios=document.createElement("legend");
        leyendaTestimonios.innerHTML="<h2>Testimonios</h2>";
        apartadoTestimonios.appendChild(leyendaTestimonios);

        //--------------------------------------------------
        
        //salto de linea
        let salto=document.createElement("br");

        //rellenamos las secciones


        //Seccion de productos:
        for(let i=0;i<productos.length;i++){

            //Creamos el titulo
            let titulo=document.createElement("h2");
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

        }

        //añadimos la sección al html junto a un salto de línea
        document.body.appendChild(apartadoProductos);
        document.body.appendChild(salto);

        //Sección Testimonios
        for(let j=0;j<testimonios.length;j++){

            let nombre=document.createElement("h2");
            nombre.textContent=testimonios[j].nombre;

            let texto=document.createElement("p");
            texto.textContent=testimonios[j].texto;

            let fecha=document.createElement("p");
            fecha.textContent=testimonios[j].fecha;

            apartadoTestimonios.appendChild(nombre);
            apartadoTestimonios.appendChild(texto);
            apartadoTestimonios.appendChild(fecha);

        }

        document.body.appendChild(apartadoTestimonios);

    });
    


});