//Valores globales del cuatri
var inicio_cuatri = new Date("09/02/2019");
var fin_cuatri = new Date("12/06/2019");
var hoy = new Date();

//Unidades totales
var unidades_seguridad = 6;
var unidades_integradora = 2;
var unidades_topicos = 3;
var unidades_auditoria = 3;
var unidades_estadistica = 3;
var unidades_negociacion = 2;
var unidades_ingles = 2;
var unidades_totales = unidades_seguridad 
    + unidades_integradora 
    + unidades_topicos 
    + unidades_auditoria 
    + unidades_estadistica 
    + unidades_negociacion 
    + unidades_ingles;

//Unidades completadas
var completadas_seguridad = 2;
var completadas_integradora = 0;
var completadas_topicos = 1;
var completadas_auditoria = 1;
var completadas_estadistica = 1;
var completadas_negociacion = 0;
var completadas_ingles = 0;
var completadas_totales = completadas_seguridad 
    + completadas_integradora 
    + completadas_topicos 
    + completadas_auditoria 
    + completadas_estadistica 
    + completadas_negociacion 
    + completadas_ingles;

function getDiferenciaDias(fechaInicio, fechaFin) {
    var minutos = 1000 * 60;
    var horas = minutos * 60;
    var dias = horas * 24;
    var diferencia = Math.round((fechaFin - fechaInicio) / dias);
    return diferencia;
}

function getPorcentaje(valor1, valor2) {
    var total = valor1 / valor2 * 100;
    var porcentaje = total.toFixed(1);
    if (porcentaje > 100)
        porcentaje = 100;
    return porcentaje;
}

function setProgressPorcentaje(id, porc) {
    $(id).animate({
        width: porc
    }, 1500);

    $(id).html(porc);
}

function setProgressEquivalent(id, valor1, valor2) {
    var porc = getPorcentaje(valor1, valor2)  + '%';

    $(id).animate({
        width: porc
    }, 1500);

    $(id).html(valor1 + ' de ' + valor2);
}

function getTotalCuatri(tipo) {
    var total_cuatri = 0;
    var total_cursado = 0;
    var porcentaje = 0;
    var parrafo = "";

    if (tipo === "1") 
    {
        total_cuatri = getDiferenciaDias(inicio_cuatri, fin_cuatri);
        total_cursado = getDiferenciaDias(inicio_cuatri, hoy);
        parrafo = total_cursado + ' días cursados de ' + total_cuatri + ' días totales';
    } 
    else 
    {
        total_cuatri = unidades_totales;
        total_cursado = completadas_totales;
        parrafo = total_cursado + ' unidades completadas de ' + total_cuatri + ' unidades totales';
    }

    porcentaje = getPorcentaje(total_cursado, total_cuatri)  + '%';

    //Para evitar que se pasen los valores
    if (total_cursado > total_cuatri)
        total_cursado = total_cuatri;

    setProgressPorcentaje("#progress-total", porcentaje);
    $('#parrafo-total').text(parrafo); 
}

function getTotalUnidades() {
    setProgressEquivalent("#progress-seguridad", completadas_seguridad, unidades_seguridad);
    setProgressEquivalent("#progress-integradora", completadas_integradora, unidades_integradora);
    setProgressEquivalent("#progress-topicos", completadas_topicos, unidades_topicos);
    setProgressEquivalent("#progress-auditoria", completadas_auditoria, unidades_auditoria);
    setProgressEquivalent("#progress-estadistica", completadas_estadistica, unidades_estadistica);
    setProgressEquivalent("#progress-negociacion", completadas_negociacion, unidades_negociacion);
    setProgressEquivalent("#progress-ingles", completadas_ingles, unidades_ingles);
}

$( document ).ready(function() {
    getTotalCuatri("1");
    getTotalUnidades();
	$('[data-toggle="tooltip"]').tooltip()
});