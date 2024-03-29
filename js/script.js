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
var completadas_seguridad = 4;
var completadas_integradora = 1;
var completadas_topicos = 2;
var completadas_auditoria = 2;
var completadas_estadistica = 2;
var completadas_negociacion = 1;
var completadas_ingles = 1;
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
    var porc = getPorcentaje(valor1, valor2) + '%';

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

    if (tipo === "1") {
        total_cuatri = getDiferenciaDias(inicio_cuatri, fin_cuatri);
        total_cursado = getDiferenciaDias(inicio_cuatri, hoy);
        parrafo = total_cursado + ' días cursados de ' + total_cuatri + ' días totales';
    }
    else {
        total_cuatri = unidades_totales;
        total_cursado = completadas_totales;
        parrafo = total_cursado + ' unidades completadas de ' + total_cuatri + ' unidades totales';
    }

    porcentaje = getPorcentaje(total_cursado, total_cuatri) + '%';

    //Para evitar que se pasen los valores
    if (total_cursado > total_cuatri)
        total_cursado = total_cuatri;

    setProgressPorcentaje("#progress-total", porcentaje);
    $('#parrafo-total').text(parrafo);
    document.cookie = "tipo=" + tipo + "; max-age=604800;";
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

function darkMode(e) {
    e.preventDefault();
    if ($("body").hasClass("dark")) {
        setLightMode();
    }
    else {
        setDarkMode();
    }
}

function setDarkMode() {
    document.cookie = "mode=dark; max-age=604800;";
    $("body").addClass("dark");
    $("body").addClass("dark-body");
    $(".float").removeClass("moon").addClass("sun");
    $(".my-float").removeClass("fa-moon").addClass("fa-sun");
}

function setLightMode() {
    document.cookie = "mode=light; max-age=604800;";
    $("body").removeClass("dark");
    $("body").removeClass("dark-body");
    $(".float").removeClass("sun").addClass("moon");
    $(".my-float").removeClass("fa-sun").addClass("fa-moon");
}

function readCookie(name) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

function setPreferencias() {
    var modoPreferido = readCookie("mode");
    if (modoPreferido === "dark") {
        setDarkMode();
    }
    else if (modoPreferido === "light") {
        setLightMode();
    }

    var tipoPreferido = readCookie("tipo");
    if (tipoPreferido !== "" && tipoPreferido !== null) {
        getTotalCuatri(tipoPreferido);
    } else {
        getTotalCuatri("1");
    }
}

$(document).ready(function () {
    setPreferencias();
    getTotalUnidades();
    $('[data-toggle="tooltip"]').tooltip();
});