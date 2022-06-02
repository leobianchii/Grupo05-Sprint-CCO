let proximaAtualizacao;

window.onload = obterDadosGrafico(1);

window.onload = atualizarTemperatura(1);

window.onload = obterEstufa();

function obterEstufa(){
    var idUsuario = sessionStorage.ID_USUARIO;

    console.log(idUsuario);

    fetch(`/estufas/estufa/${idUsuario}`, {
        cache: 'no-store'
    }).then(function(response){
        if (response.ok) {
            response.json().then(function(resposta){
                //console.log(`Dados recebidos da estufa: ${JSON.stringify(resposta)}`);
                //console.log(`Qtd de dados recebido: ${resposta.length}`);
               
                renderizarEstufas(resposta);
            })
        }else{
            console.error('Nenhuma quantidade de estufa encontrada');
        }
    }).catch(function(error){
        console.error(`Erro na obtenção das qtd de estufas: ${error.message}`);
    });
}

function renderizarEstufas(estufas){
    console.log(`entrei: ${estufas[0].qtd_estufas}`);

    for(i=1; i<=estufas[0].qtd_estufas; i++){
        div_estufas.innerHTML += `
        <div onclick="obterDadosGrafico(${i})" class="sensorContainer${i}">
            <span style="position: fixed; color: rgb(255, 112, 112);">${i}°</span>
            <span class="graus" style="font-weight: 600;"> <span id="span_temperatura_${i}">0°C</span><img id="img_temp${i}" src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg" alt="" style="width: 35px; height: 35px;  margin: 0px 10px -10px;"></span>
            <span class="graus2" style="font-weight: 600;"><span id="span_umidade_${i}">0%</span><img id="img_umi${i}" src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg" alt="" style="width: 35px; height: 35px;  margin: 0px 10px -8px;"></span>
            <span style="position: fixed; color: rgb(255, 112, 112);margin-top: 10%; margin-left: 4%;">Qtd de alertas: <span id="qtd_alerta_${i}">0</span></span>
        </div>`;
    }
}

function obterDadosGrafico(idAquario) {

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    console.log(idAquario);


    fetch(`/medidas/ultimas/${idAquario}`, {
            cache: 'no-store'
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();

                    plotarGrafico(resposta, idAquario);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

        
        
        fetch(`/medidas/ultimas-hora/${idAquario}`, {
            cache: 'no-store'
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();
    
                    plotarGrafico2(resposta, idAquario);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API Na ultima hora');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, idAquario) {
    console.log('iniciando plotagem do gráfico...');

    var dados = {
        labels: [],
        datasets: [{
                label: 'Temperatura Maxima',
                borderColor: '#32B9CD',
                backgroundColor: '#FF0000',
                data: []
            },
            {
                label: 'Temperatura Minima',
                borderColor: '#FFF',
                backgroundColor: '#00FFFF',
                data: []
            }
        ]
    };

    var dados2 = {
        labels: [],
        datasets: [{
                label: 'Umidade Maxima',
                borderColor: '#32B9CD',
                backgroundColor: '#FF0000',
                data: []
            },
            {
                label: 'Umidade Minima',
                borderColor: '#FFF',
                backgroundColor: '#00FFFF',
                data: []
            }
        ]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.labels.push(registro.momento_grafico);
        dados2.labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.max_temp);
        dados.datasets[1].data.push(registro.min_temp);
        dados2.datasets[0].data.push(registro.max_umi);
        dados2.datasets[1].data.push(registro.min_umi);
    }

    console.log(JSON.stringify(dados));

    var ctx = canvas5.getContext('2d');
    window.grafico_linhaTemp = new Chart(ctx, {
        type: 'bar',
        data: dados,
        options: {
            responsive: true,
            hoverMode: 'index',
            title: {
                display: false,
                text: 'Dados capturados'
            },
            scales: {
                yAxes: [{
                    type: 'bar',
                    display: true,
                    position: 'left',
                }, {
                    type: 'bar',
                    display: true,
                    position: 'right',

                }],
            }
        }
    });

    var ctx2 = canvas7.getContext('2d');
    window.grafico_linhaUmi = new Chart(ctx2, {
        type: 'bar',
        data: dados2,
        options: {
            responsive: true,
            hoverMode: 'index',
            title: {
                display: false,
                text: 'Dados capturados'
            },
            scales: {
                yAxes: [{
                    type: 'bar',
                    display: true,
                    position: 'left',
                }, {
                    type: 'bar',
                    display: true,
                    position: 'right',

                }],
            }
        }
    });
}


function plotarGrafico2(resposta, idAquario) {
    console.log('iniciando plotagem do gráfico...');

    var dados = {
        labels: [],
        datasets: [
            {
                yAxisID: 'y-temperatura',
                label: 'Historico de temperaturas',
                borderColor: '#32B9CD',
                backgroundColor: '#32b9cd8f',
                fill: true,
                data: []
            }
        ]
    };

    var dados2 = {
        labels: [],
        datasets: [
            {
                yAxisID: 'y-temperatura',
                label: 'Historico de umidade',
                borderColor: '#32B9CD',
                backgroundColor: '#32b9cd8f',
                fill: true,
                data: []
            }
        ]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.labels.push(registro.momento_grafico);
        dados2.labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.temperatura);
        dados2.datasets[0].data.push(registro.umidade)
    }

    console.log(JSON.stringify(dados));

    var ctx = canvas6.getContext('2d');
    window.grafico_linhaTemperatura = new Chart(ctx, {
        type: 'line',
        data: dados,
        options: {
            responsive: true,
            animation: { duration: 500 },
            hoverMode: 'index',
            stacked: false,
            title: {
                display: false,
                text: 'Dados capturados'
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    id: 'y-temperatura',
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        min: 0
                    }
                }]
            }
        }
    });

    var ctx2 = canvas8.getContext('2d');
    window.grafico_linhaUmidade = new Chart(ctx2, {
        type: 'line',
        data: dados2,
        options: {
            responsive: true,
            animation: { duration: 500 },
            hoverMode: 'index',
            stacked: false,
            title: {
                display: false,
                text: 'Dados capturados'
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    id: 'y-temperatura',
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        min: 0
                    }
                }]
            }
        }
    });
    setTimeout(() => atualizarGrafico2(idAquario, dados, dados2), 2000);
}

function obterAlertas(idAquario) {
    
    fetch(`/medidas/alerta/${idAquario}`, {
        cache: 'no-store'
    }).then(function(resposta){
        if (resposta.ok) {
            resposta.json().then(function(novaResposta){
               
                var qtdAlerta = novaResposta[0].alerta;

                qtd_alerta_1.innerHTML = `${qtdAlerta}`;
            })
        }
    })

}

// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
var alerta_span1 = [];
var alerta_span2 = [];
var alerta_span3 = [];
function atualizarTemperatura(idAquario){

    fetch(`/medidas/tempo-real/${idAquario}`,{
        cache: 'no-store'
    }).then(
        function (response) {
            if (response.ok) {
                response.json().then(function(novaResposta){
                    var span1 = document.getElementById("span_temperatura_1");
                    var span2 = document.getElementById("span_temperatura_2");
                    var span3 = document.getElementById("span_temperatura_3");
                    var span4 = document.getElementById("span_temperatura_4");
                    var span5 = document.getElementById("span_umidade_1");
                    var span6 = document.getElementById("span_umidade_2");
                    var span7 = document.getElementById("span_umidade_3");
                    var span8 = document.getElementById("span_umidade_4");
                    var temp = Number(novaResposta[0].temperatura);
                    var umi = Number(novaResposta[0].umidade);

                    if (span1 != null && span5 != null) {
                        if (temp >= 27 || temp <= 13) {
                            span1.style.color = 'red';
                            img_temp1.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';
                        }else if(temp >= 23 || temp <= 16){
                            span1.style.color = '#FF7F00';
                            img_temp1.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';
                        }else{
                            span1.style.color = '#ff7070';
                            img_temp1.src = 'https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg';
                        }

                        span1.innerHTML = `${Math.trunc(temp)}°C`;
                        if (umi >= 80 || umi <= 40) {
                            span5.style.color = 'red';
                            img_umi1.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';
                        }else if (umi >= 75 || umi <= 55) {
                            span5.style.color = '#FF7F00';
                            img_umi1.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';
                        }else{
                            span5.style.color = '#ff7070';
                            img_umi1.src = 'https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg';
                        }

                        span5.innerHTML = `${Math.trunc(umi)}%`;    
                    }
                    
                    if (span2 != null && span6 != null) {
                        let cal = Math.floor(Math.random() * 7);
                        temp2 = temp - cal;

                        if (temp2 >= 27 || temp2 <= 13) {
                            span2.style.color = 'red';
                            img_temp2.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';

                            alerta_span1.push(1);
                        }else if(temp2 >= 23 || temp2 <= 16){
                            span2.style.color = '#FF7F00';
                            img_temp2.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';

                            alerta_span1.push(1);
                        }else{
                            span2.style.color = '#ff7070';
                            img_temp2.src = 'https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg';
                        }
                        span2.innerHTML = `${Math.trunc(temp2)}°C`;
                        
                        umi2 = umi - cal;

                        if (umi2 >= 80 || umi2 <= 40) {
                            span6.style.color = 'red';
                            img_umi2.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';

                            alerta_span1.push(1);
                        }else if (umi2 >= 75 || umi2 <= 55) {
                            span6.style.color = '#FF7F00';
                            img_umi2.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';

                            alerta_span1.push(1);
                        }else{
                            span6.style.color = '#ff7070';
                            img_umi2.src = 'https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg';
                        }

                        span6.innerHTML = `${Math.trunc(umi2)}%`;
  
                        qtd_alerta_2.innerHTML = `${alerta_span1.length}`; 
                    }
                    
                    if (span3 != null && span7 != null) {
                        let cal =  Math.floor(Math.random() * 4);
                        temp3 = temp + cal;

                        if (temp3 >= 27 || temp3 <= 13) {
                            span3.style.color = 'red';
                            img_temp3.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';

                            alerta_span2.push(1);
                        }else if(temp3 >= 23 || temp3 <= 16){
                            span3.style.color = '#FF7F00';
                            img_temp3.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';

                            alerta_span2.push(1);
                        }else{
                            span3.style.color = '#ff7070';
                            img_temp3.src = 'https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg';
                        }

                        span3.innerHTML = `${Math.trunc(temp3)}°C`;

                        umi3 = umi - cal;

                        if (umi3 >= 80 || umi3 <= 40) {
                            span7.style.color = 'red';
                            img_umi3.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';

                            alerta_span2.push(1);
                        }else if (umi3 >= 75 || umi3 <= 55) {
                            span7.style.color = '#FF7F00';
                            img_umi3.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';

                            alerta_span2.push(1);
                        }else{
                            span7.style.color = '#ff7070';
                            img_umi3.src = 'https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg';
                        }

                        span7.innerHTML = `${Math.trunc(umi3)}%`;
                        qtd_alerta_3.innerHTML = `${alerta_span2.length}`;
                    }

                    if (span4 != null && span8 != null) {
                        let cal = Math.floor(Math.random() * 6);
                        temp4 = temp + cal;

                        if (temp4 >= 27 || temp4 <= 13) {
                            span4.style.color = 'red';
                            img_temp4.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';

                            alerta_span3.push(1);
                        }else if(temp4 >= 23 || temp4 <= 16){
                            span4.style.color = '#FF7F00';
                            img_temp4.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';

                            alerta_span3.push(1);
                        }else{
                            span4.style.color = '#ff7070';
                            img_temp4.src = 'https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg';
                        }
                        span4.innerHTML = `${Math.trunc(temp4)}°C`;

                        umi4 = umi - cal;

                        if (umi4 >= 80 || umi4 <= 40) {
                            span8.style.color = 'red';
                            img_umi4.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';

                            alerta_span3.push(1);
                        }else if (umi4 >= 75 || umi4 <= 55) {
                            span8.style.color = '#FF7F00';
                            img_umi4.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';

                            alerta_span3.push(1);
                        }else{
                            span8.style.color = '#ff7070';
                            img_umi4.src = 'https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg';
                        }

                        span8.innerHTML = `${Math.trunc(umi4)}%`;

                        qtd_alerta_4.innerHTML = `${alerta_span3.length}`;   
                    }
                })

                setTimeout(() => atualizarTemperatura(idAquario), 2000);
                setTimeout(() => obterAlertas(idAquario), 2000);
            }
        }
    ).catch(function (error){
        console.log("Erro ao atualizar o gráfico");
    });
}

function atualizarGrafico2(idAquario, dados, dados2) {

    fetch(`/medidas/tempo-real/${idAquario}`, {
            cache: 'no-store'
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (novoRegistro) {

                    console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                    console.log(`Dados atuais do gráfico: ${dados}`);
                    

                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dados2.labels.shift();
                    dados2.labels.push(novoRegistro[0].momento_grafico);

                    dados.datasets[0].data.shift(); // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                    dados2.datasets[0].data.shift();
                    dados2.datasets[0].data.push(novoRegistro[0].umidade);

                    window.grafico_linhaTemperatura.update();
                    window.grafico_linhaUmidade.update();

                    // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                    proximaAtualizacao = setTimeout(() => atualizarGrafico2(idAquario, dados, dados2), 2000);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico2(idAquario, dados, dados2), 2000);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}