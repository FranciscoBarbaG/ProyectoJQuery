const INTIT = 'setTitulo', INCOTIT = 'setColorTitulo';
const INCONT = 'setContenido', INCOCONT = 'setColorContenido';
const INTAM = 'setTamaño', INALI = 'setAlineacion';
const INBORDER = 'setBorder', INCOBORD = 'setColorBorder', INTABORD = 'setTamañoBorder';
const INFILA = 'setFila', INCOLUM = 'setColumna';
const TAMANYO = {
    'H1': 'h1',
    'H2': 'h2',
    'H3': 'h3',
};
const ALINE = {
    'Justificada': 'justify',
    'Centrada': 'center',
    'Izquierda': 'left',
    'Derecha': 'right',
};
const BORDER = {
    'Sin marco': '',
    'Solido': 'solid',
    'Punteado': 'dotted',
    'Doble': 'double',
}

$(function(){
    bienvenida();
});

/**
 * Muestra la bienvenida a el Proyecto de DIW de Francisco Barba García.
 */
function bienvenida() {
    setTimeout(function(){
        $('<div>')
        .attr('id', 'inicio')
        .addClass('bienvenida')
        .append($('<h1>').html('Proyecto JQuery DIW'))
        .append($('<h2>').html('por: Francisco Barba García'))
        .appendTo('body')
        .parpadea();

        $('<nav>')
        .append(
            $('<img>')
            .attr({
                id: 'desplegable',
                src: 'src/cerrado.jpg',
                alt: 'Imagen no encontrada'
            })
            .css({
                top: 0,
                position: 'relative',
                display: 'none',
                width: '50px',
                height: '50px',
            })
            .on('click', desplegable)
            .fadeIn(6000, () => {
                $('#inicio').remove();
            })
        )
        .append(
            $('<ul>')
            .css({
                top: '50px',
                display: 'none',
            })
            .attr('id', 'nav')
            .append(
                $('<p>')
                .css('margin', '5px')
                .html('Añadir: ')
            )
            .append(
                $('<li>')
                .append(
                    $('<a>')
                    .html('· Articulo')
                    .on('click', setArticulo)
                )
            )
            .append(
                $('<li>')
                .append(
                    $('<a>')
                    .html('· Imagen')
                    .on('click', setImagen)
                )
            )
            .append(
                $('<li>')
                .append(
                    $('<a>')
                    .html('· Boton con alert')
                    .on('click', setAlert)
                )
            )
            .append(
                $('<li>')
                .append(
                    $('<a>')
                    .html('· Tabla')
                    .on('click', setTabla)
                )
            )
            .append(
                $('<li>')
                .append(
                    $('<a>')
                    .html('Terminar')
                    .on('click', (e) => {
                        if ($('.principal').children().length > 0) {
                            $('nav').css('visibility','hidden');
                            $('table *').off();
                            $( ".draggable" ).draggable( "destroy" );
                            $('.diseño').remove();
                            $('.pre-form').remove();
                        } else {
                            alert('Para terminar e ir a la vista final debes introducir al menos un elemento.');
                        }
                    })
                )
            )
        )
        .draggable()
        .appendTo('body');

        $('<div>').addClass('principal').appendTo('body');
    }, 2000);
}

/**
 * Se encarga de cambiar entre vista preliminar y vista diseño.
 */
function desplegable() {
    if ($(this).attr("src")=="src/abierto.png") {
        $(this).attr("src", "src/cerrado.jpg");
        $('#nav').css("display", "none");
        $( ".draggable" ).draggable( "disable" );
        $('.diseño').css('display', 'none');
        $('.pre-form').css("display", "none");
    } else {
        $(this).attr("src", "src/abierto.png");
        $('#nav').css("display", "block");
        $( ".draggable" ).draggable( "enable" );
        $('.diseño').css('display', 'block');
        $('.pre-form').css("display", "block");
    }
}

/**
 * Muestra un formulario que pide el titulo del boton y
 * el contenido del alert, no pudiendo dejar vacio ninguno de los dos.
 */
function setAlert(){
    if (comprobarFormulario()) {
        $('<form>')
        .addClass('pre-form')
        .append(createInput(INTIT, 'text', 'Titulo del boton'))
        .append(createInput(INCONT, 'text', 'Contenido del alert'))
        .append(inputBotones(click))
        .appendTo('body')
        .centrar();
    }

    /**
     * Funcion que realiza la craeción del alert.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();
        var contenido = $('#'+INCONT).val();
        var titulo = $('#'+INTIT).val();
        if (titulo && contenido) {
            divDraggable()
            .append(
                $('<button>')
                .html(titulo)
                .data('data', contenido)
                .on('click', (e)=>{
                    alert($(e.target).data('data'));
                })
            )
            .append(botonEliminar())
            .appendTo('.principal');
            $(e.target).parents('form').remove();
        } else {
            alert('Rellene el campo de "Titulo" y "Contenido" o pulse "Cancelar" para salir.');
        }
    }
}

/**
 * Muestra un formulario que pide el tamaño del titulo, el titulo en sí y
 * el contenido del articulo, pudiendo dejar vacio uno de los dos.
 */
function setArticulo() {
    if (comprobarFormulario()) {
        $('<form>')
        .attr('class', 'pre-form')
        .append(createSelect(INTAM, TAMANYO, 'Tamaño del titulo'))
        .append(createSelect(INALI, ALINE, 'Alineación'))
        .append(createInput(INTIT, 'text', 'Titulo'))
        .append(createInput(INCOTIT, 'color', 'Color del titulo'))
        .append(createInput(INCONT, 'text', 'Contenido'))
        .append(createInput(INCOCONT, 'color', 'Color del contenido'))
        .append(createSelect(INBORDER, BORDER, 'Marco'))
        .append(createInput(INTABORD, 'number', 'Grosor del marco'))
        .append(createInput(INCOBORD, 'color', 'Color del marco'))
        .append(inputBotones(click))
        .appendTo('body')
        .centrar();
    }

    /**
     * Funcion que realiza la craeción del alert.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();

        var titulo = $('#'+INTIT).val();
        var contenido = $('#'+INCONT).val();

        if (titulo || contenido) {
            var $div = divDraggable().css({
                'max-width': '70%',
                'text-align': $('#'+INALI).val(),
                border: `${$('#'+INTABORD).val()}px ${$(`#${INBORDER} :selected`).val()} ${$(`#${INCOBORD}`).val()}`,
            });

            if (titulo) {
                $div.append(
                    $(`<${$(`#${INTAM} :selected`).val()}>`)
                    .css('color', $('#'+INCOTIT).val())
                    .append(titulo)
                );
            }

            if (contenido) {
                $div
                .append(
                    $('<p>')
                    .css({
                        'white-space': 'wrap',
                        color: $('#'+INCOCONT).val(),
                    })
                    .text(contenido)
                );
            }

            $div
            .append(botonEliminar())
            .appendTo('.principal');

            $(e.target).parents('form').remove();
        } else {
            alert('Rellene el campo de "Titulo" o el de "Contenido" o pulse "Cancelar" para salir.');
        }
    }
}

/**
 * Muestra un formulario que permite al usuario subir una imagen en su sistema de ficheros,
 * si la imagen es correcta la muestra.
 */
function setImagen() {
    var src;

    if (comprobarFormulario()) {
        $('<form>')
        .attr('class', "pre-form")
        .append(
            $('<p>')
            .append($('<label>').attr('for', 'setImagen').html('Imagen: '))
            .append(
                $('<input>')
                .attr({
                    id: 'setImagen',
                    type: 'file',
                    accept: 'image/x-png,image/gif,image/jpeg',
                })
                .on('change', (e) => {
                    if (e.target.files && e.target.files[0]) {
                        var reader = new FileReader();

                        reader.onload = function(e) {
                            $('#actual').attr('src', e.target.result);
                            src = e.target.result;
                        }

                        reader.readAsDataURL(e.target.files[0]);
                    }
                })
            )
        )
        .append(
            $('<p>').append(
                $('<img>')
                .attr({
                    id: 'actual',
                    class: 'img-insitu',
                    src: 'src/photos/eduardo.png',
                })
            )
        )
        .append(createInput(INCONT, 'text', 'Pie de foto'))
        .append(createInput(INCOCONT, 'color', 'Color del pie de foto'))
        .append(createSelect(INBORDER, BORDER, 'Marco'))
        .append(createInput(INTABORD, 'number', 'Grosor del marco'))
        .append(createInput(INCOBORD, 'color', 'Color del marco'))
        .append(inputBotones(click))
        .appendTo('body')
        .centrar();
    }

    /**
     * Funcion que realiza la craeción del alert.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();
        var $div = divDraggable().css({
            width: '250px',
            border: `${$('#'+INTABORD).val()}px ${$(`#${INBORDER} :selected`).val()} ${$(`#${INCOBORD}`).val()}`,
        });
        var $fig = $('<figure>');

        if (src) {
            $fig.append(
                $('<img>')
                .attr('src', src)
            )
        } else {
            $fig.append(
                $('<img>')
                .attr('src', 'src/photos/eduardo.png')
            )
        }

        if (contenido = $('#'+INCONT).val()) {
            $fig.append(
                $('<figcaption>')
                .css({
                    'white-space': 'wrap',
                    color: $('#'+INCOCONT).val(),
                })
                .html(contenido)
            )
        }

        $div
        .append($fig)
        .append(botonEliminar())
        .appendTo('.principal');
        $(e.target).parents('form').remove();
    }
}

/**
* Muestra un formulario que pide al usuario las dimensiones de la tabla,
* si son correctas, pinta una tabla vacia que se puede rellenar haciendo
* click en alguna de sus celdas.
* En caso de error se le pide al usuarios que vuelva a ingresas los parametros
* de la tabla o cancele la operación.
*/
function setTabla() {
    if (comprobarFormulario()) {
        $('<form>')
        .addClass('pre-form')
        .append(createInput(INFILA, 'number', 'Numero de filas'))
        .append(createInput(INCOLUM, 'number', 'Numero de columnas'))
        .append(createSelect(INBORDER, BORDER, 'Marco'))
        .append(createInput(INTABORD, 'number', 'Grosor del marco'))
        .append(createInput(INCOBORD, 'color', 'Color del marco'))
        .append(inputBotones(click))
        .appendTo('body')
        .centrar();
    }

    /**
     * Funcion que realiza la craeción del alert.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();
        var filas = $('#'+INFILA).val();
        var columnas = $('#'+INCOLUM).val();
        if (filas >=1 && columnas>=1 && filas <=20 && columnas<=20) {
            generarTabla(filas, columnas);
            $(e.target).parents('form').remove();
        } else {
            alert('Introduzca ambos numeros positivos y enteros mayores que 1 y menores que 20.')
        }
    }

    /**
    * Genera una tabla dadas las filas y las comumnas deseadas, añade
    * dicha tabla a .principal tras generarla.
    * @param  {int} filas    Numero de filas que tiene la tabla.
    * @param  {int} columnas Numero de columnas que tiene la tabla
    */
    function generarTabla(filas, columnas) {
        var $table = $('<table>');
        var $thead = $('<thead>');
        var $tbody = $('<tbody>');

        for (let i = 0; i < columnas; i++) {
            $thead.append(
                $('<th>')
                .css({
                    border: `${$('#'+INTABORD).val()}px ${$(`#${INBORDER} :selected`).val()} ${$(`#${INCOBORD}`).val()}`,
                })
                .on('click', setContenido)
            );
        }

        for (let i = 0; i < filas-1; i++) {
            var $tr = $('<tr>');
            for (let i = 0; i < columnas; i++) {
                $tr.append(
                    $('<td>')
                    .css({
                        border: `${$('#'+INTABORD).val()}px ${$(`#${INBORDER} :selected`).val()} ${$(`#${INCOBORD}`).val()}`,
                    })
                    .on('click', setContenido)
                );
            }
            $tbody.append($tr);
        }

        divDraggable()
        .append($table.append($thead).append($tbody))
        .append(botonEliminar())
        .appendTo('.principal');

        /**
        * Encargado de rellenar las celdas de la tabla cuando se hace
        * click en ellas.
        * @param {Event} e Evento que dispara este metodo.
        */
        function setContenido(e) {
            var str = prompt('Introduzca lo que desea guardar en la celda seleccionada.');
            $(e.target).html(str);
        }
    }
}

/**
* Boton predeterminado para cancelar un formulario.
* Deshabilita la accion por defecto del boton y elimina el formulario.
* @return {JQuery}       Input completo.
*/
function inputCancelar(value = 'Cancelar') {
    return $('<input>')
    .attr({
        type: 'submit',
        value: value,
    })
    .on('click', (e) => {
        e.preventDefault();
        $(e.target).parent().parent().remove();
    });
}

/**
* Boton predeterminado para cancelar o completar un formulario.
* Deshabilita la accion por defecto del boton y elimina o completa el formulario.
* @param  {callback} click Funcion que completa el formulario.
* @return {JQuery}         Todos los inputs.
*/
function inputBotones(click) {
    return $('<p>')
    .append(
        $('<input>')
        .attr({
            type: 'submit',
            value: 'Confirmar',
        })
        .on('click', (e) => {
            click(e);
        })
    )
    .append(inputCancelar());
}

/**
 * Boton que elimina el div padre del padre.
 * @return {JQuery}         Boton.
 */
function botonEliminar() {
    return $('<p>')
        .addClass('diseño')
        .append(inputCancelar('Eliminar'));
}

/**
 * Creador base de inputs.
 * @param  {string} id    ID que se le añadirá al input.
 * @param  {string} type  Tipo del input.
 * @param  {string} texto Contenido del label.
 * @return {JQuery}       Input completo.
 */
function createInput(id, type, texto) {
    return $('<p>')
        .append(
            $('<label>')
            .attr('for', id)
            .html(texto+': ')
        )
        .append(
            $('<input>')
            .attr({
                id: id,
                type: type,
            })
        );
}

/**
 * Craedor base de etiquetas select, con sus option incluidos.
 * @param  {string} id    id del select.
 * @param  {array} array Array de las opciones, la clave es lo que se muestra y el valor es el value.
 * @param  {string} texto Texto que se muestra en el label.
 * @return {JQuery}       Select con sus opciones.
 */
function createSelect(id, array, texto) {
    var $p = $('<p>')
    .append(
        $('<label>')
        .attr('for', id)
        .html(texto+': ')
    );

    var $select = $('<select>').attr('id', id);
    for (var key in array) {
        $select.append($('<option>').attr('value', array[key]).html(key));
    }

    return $p.append($select);
}

/**
 * Creacion de divs dragables con la clase draggable para
 * evitar repetir codigo.
 * @return {JQuery} Div draggable.
 */
function divDraggable() {
    return $('<div>').addClass('draggable').draggable();
}

/**
 * Comprueba si ya existe un formulario.
 * @return {Boolean} Si existe devuelve falso, si no true.
 */
function comprobarFormulario() {
    if ($('.pre-form').length > 0) {
        alert('Cierre el formulario anterior antes de abrir otro.');
        return false;
    }
    return true;
}

/**
 * Funcion que realiza la craeción del alert.
 * @param  {Event} e Evento que ha disparado esta accion.
 */
// function click(e) {
//
// }
