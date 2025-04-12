
function importarEventos() {
  var planilha = SpreadsheetApp.openById("idagenda");
  var calendarios = [
    {email: 'seuemail@gmail.com', nome: 'Nome e Sobrenome'},
    {email: 'seuemail@gmail.com', nome: 'Nome e Sobrenome'}
  ];
   var eventosMisturados = [];
  
  planilha.getActiveSheet().getRange("A1:H1").setValues([["Usuário", "Título", "Data Inicio", "Hora Inicio", "Data Fim", "Hora Fim", "Duração", "Descrição"]]);

  for (var c = 0; c < calendarios.length; c++) {
    var eventos = CalendarApp.getCalendarById(calendarios[c].email).getEvents(new Date('2023-07-01'), new Date('2024-12-31'));
    
    for (var i = 0; i < eventos.length; i++) {
      var evento = eventos[i];
      var dataInicio = new Date(evento.getStartTime());
      var horaInicio = formatDate(dataInicio, true); 
      var dataFim = new Date(evento.getEndTime());
      var horaFim = formatDate(dataFim, true); 
      
      var duracao = calcularDuracao(dataInicio, dataFim);

      var eventoObjeto = {
        usuario: calendarios[c].nome,
        titulo: evento.getTitle(),
        dataInicio: formatDate(dataInicio, false),
        horaInicio: horaInicio,
        dataFim: formatDate(dataFim, false),
        horaFim: horaFim,
        duracao: duracao,
        descricao: evento.getDescription(),
        timestamp: dataInicio.getTime()
      };
      
      eventosMisturados.push(eventoObjeto);
    }
  }

  
  eventosMisturados.sort(function(a, b) {
    return a.timestamp - b.timestamp;
  });

  var dadosFormatados = eventosMisturados.map(function(evento) {
    return [evento.usuario, evento.titulo, evento.dataInicio, evento.horaInicio, evento.dataFim, evento.horaFim, evento.duracao, evento.descricao];
  });

  planilha.getActiveSheet().getRange(2, 1, dadosFormatados.length, dadosFormatados[0].length).setValues(dadosFormatados);
}

function formatDate(date, showTime) {
  if (showTime) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
  } else {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
  }
}

function calcularDuracao(startTime, endTime) {
  var duration = Math.abs(endTime.getTime() - startTime.getTime());
  var hours = Math.floor(duration / (1000 * 60 * 60));
  var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

  return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
}