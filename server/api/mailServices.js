const imaps = require('imap-simple');

const setAcc = (email, password, host) => {
    return {
        imap: {
            user: email,
            password: password,
            host: host,
            port: 993,
            tls: true,
            authTimeout: 3000
        }
    };
}

const getAllThemes = (email, password, host) => {

    const config = setAcc(email, password, host);

    return imaps.connect(config).then(function (connection) {

        return connection.openBox('INBOX').then(function () {
            let delay = 24 * 3600 * 1000;
            let yesterday = new Date();
            yesterday.setTime(Date.now() - delay);
            yesterday = yesterday.toISOString();
            const searchCriteria = [
                'All', ['SINCE', yesterday]
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