const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

const bitbucket = require('./api/bitbucket/bitbucket');
const jira = require('./api/jira/jira');


// middleware
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('work')
})


app.use('/api/bitbucket/', bitbucket);
app.use('/api/jira', jira);

app.listen(5000, () => console.log('server running...port: 5000'))