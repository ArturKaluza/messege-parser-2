const imaps = require('imap-simple');
 
const config = {
    imap: {
        user: 'krystianmateusiakalm@gmail.com',
        password: 'almpassword',
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        authTimeout: 3000
    }
};

const getAllThemes = () => {
  
  return imaps.connect(config).then(function (connection) {
  
    return connection.openBox('INBOX').then(function () {
      const searchCriteria = [
          'All'
      ];

      const fetchOptions = {
          bodies: ['HEADER', 'TEXT'],
          markSeen: false
      };

      return connection.search(searchCriteria, fetchOptions).then(function (results) {
          const data = results.map(function (res) {
              const thread = res.parts.filter(function (part) {
                  return part.which === 'HEADER';
              })[0].body.subject[0];
              const from = res.parts.filter(function (part) {
                  return part.which === 'HEADER';
              })[0].body.from[0]
              return { thread, from }
          });

          return data;
      });
    });
  });
}

module.exports = {
  getAllThemes
}