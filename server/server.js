const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('./DB/DB');

const db = require('./api/db/db');
const bitbucket = require('./api/bitbucket/bitbucket');
const jira = require('./api/jira/jira');
const mail = require('./api/mail/mail');
const github = require('./api/github/github');



// middleware
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('work')
})


app.use('/api/bitbucket/', bitbucket);
app.use('/api/jira', jira);
app.use('/api/mail', mail);
app.use('/api/github', github)

app.use('/api/db', db);

app.listen(5000, () => console.log('server running...port: 5000'))