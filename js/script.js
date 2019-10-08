var inicio_cuatri = new Date("09/02/2019");
var fin_cuatri = new Date("12/06/2019");
var hoy = new Date();

var tiempo_cuatri = fin_cuatri.getTime() - inicio_cuatri.getTime();
var tiempo_cursado = hoy.getTime() - inicio_cuatri.getTime();

var dias_cuatri = (tiempo_cuatri / (1000 * 3600 * 24)).toFixed(0);
var dias_cursados = (tiempo_cursado / (1000 * 3600 * 24)).toFixed(0);

var total = (dias_cursados / dias_cuatri) * 100;
var porcentaje = total.toFixed(1);

//Para evitar que se pasen los valores
if (porcentaje > 100) {
    porcentaje = 100;
}
if (dias_cursados > dias_cuatri) {
    dias_cursados = dias_cuatri;
}

$(".progress-bar").animate({
    width: porcentaje + '%'
}, 1500);

$('.progress-bar').html(porcentaje + '%');
$('.parrafo').text(dias_cursados + ' días cursados de ' + dias_cuatri + ' días totales'); 