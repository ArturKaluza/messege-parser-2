const model = { 
  author: 'arutr',
  desc: 'descryption from jira',
  id: 'task id from jira',
  // connected items
  commits: [], // array of commits id from GitHub
  messages: [], // array of message from slack
  email: 'email@emali.com'
}

'pobieranie wiadomości polegało by na mapowaniu tablic messages i puszczeniu requestów w Promise.All[]' 
'pobieranie commitów podobnie'

'tyle potrzebujemy w naszej bazie danych'