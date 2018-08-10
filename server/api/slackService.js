const { WebClient } = require('@slack/client');

const getChannels = (token) => {
  const web = new WebClient(token);
  
  return web.channels.list()
  .then(data => {
    return data.channels.map(channel => {
      return {
        id: channel.id,
        name: channel.name,
      }
    });
  })
  .catch(err => {
    return err;
  });
};

const getUsers = (token) => {
  const web = new WebClient(token);
  
  return web.users.list()
  .then(data => {
    return data.members.map(user => {
      return {
        id: user.id,
        name: user.profile.display_name || user.profile.real_name,
      }
    })
  })
  .catch(err => {
    return err;
  });
}

const getMessages = (token, channel) => {
  const web = new WebClient(token);

  return web.channels.history({ channel })
  .then(data => {
    const messages = data.messages.filter(message => {
      return !message.parent_user_id
    })
    const replies = data.messages.filter(message => {
      return message.parent_user_id
    })

    return {
      messages,
      replies
    }
  })
  .catch(err => {
    return err;
  });
}

module.exports = {
  getChannels,
  getUsers,
  getMessages
}
