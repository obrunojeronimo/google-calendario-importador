# google-calendario-importador

# Importador de Eventos da Google Agenda para Planilhas Google

Este projeto utiliza Google Apps Script para automatizar a importação de eventos da Google Agenda para uma planilha do Google Sheets.

## Funcionalidades

- Conecta a múltiplas agendas do Google Calendar.
- Extrai eventos entre datas definidas.
- Converte os eventos em uma tabela organizada no Google Sheets.
- Ordena eventos por data/hora de início.
- Calcula automaticamente a duração de cada evento.

## Como usar

1. Acesse o [Google Apps Script](https://script.google.com/).
2. Crie um novo projeto e cole o conteúdo de `script_importarEventosGoogleAgenda.js`.
3. Substitua `"idagenda"` pelo ID da sua planilha.
4. Adicione os e-mails das agendas no array `calendarios`.
5. Autorize as permissões necessárias.
6. Execute a função `importarEventos()`.

## Exemplo de estrutura na planilha

| Usuário          | Título        | Data Início | Hora Início | Data Fim   | Hora Fim | Duração | Descrição |
|------------------|---------------|--------------|--------------|-------------|-----------|----------|-------------|
| Nome e Sobrenome | Reunião X | 01/08/2023  | 09:00         | 01/08/2023 | 10:00     | 01:00     | Discussão sobre projeto |

## Código principal

O script principal é composto por três funções:

- `importarEventos()`: Busca os eventos e organiza na planilha.
- `formatDate(date, showTime)`: Formata data e hora.
- `calcularDuracao(startTime, endTime)`: Calcula a duração entre dois horários.

## Observações

- Os dados são importados de forma estática. Para atualizações automáticas, você pode agendar a execução com o `gatilho de tempo` do Apps Script.
- Certifique-se de ter permissões para acessar as agendas listadas.

## Licença

Este projeto está sob a licença MIT.
