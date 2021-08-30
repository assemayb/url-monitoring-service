const express = require('express');
const app = express();
const axios = require("axios");
const { Datastore } = require('@google-cloud/datastore');
const URL_TO_CHECK = "http://yourwebsite.com/"

const mailgun = require("mailgun-js");
const DOMAIN = "sandboxXXX.mailgun.org";
const mg = mailgun({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

const datastore = new Datastore();

const insertVisit = (visit) => {
  return datastore.save({
    key: datastore.key('visit'),
    data: visit,
  });
};

const getVisits = () => {
  const query = datastore
    .createQuery('visit')
    .order('timestamp', { descending: true })
    .limit(100);

  return datastore.runQuery(query);
};

const reportError = (error) => {
  const data = {
    from: "Mailgun Sandbox <postmaster@sandboxXXX.mailgun.org>",
    to: "your_email@gmail.com",
    subject: `${URL_TO_CHECK} is down!`,
    text: `Please check what's wrong with your server \n${error}`
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
}

app.get('/', async (req, res, next) => {
  try {
    const [entities] = await getVisits();
    const visits = entities.map(
      (entity) => `Time: ${entity.timestamp}, Response Time: ${entity.responseDuration}ms, Successful: ${entity.successful}`
    );
    res
      .status(200)
      .set('Content-Type', 'text/plain')
      .send(`Last 100 checks:\n${visits.join('\n')}`)
      .end();
  } catch (error) {
    next(error);
  }
});

app.get('/test', async (req, response, next) => {
  axios.interceptors.request.use(function (config) {
    config.metadata = { startTime: new Date() }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    response.config.metadata.endTime = new Date()
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  let visit = {}
  axios.get(URL_TO_CHECK)
    .then((response) => {
      visit = {
        timestamp: new Date(),
        responseDuration: response.duration,
        successful: true
      };
    })
    .catch((error) => {
      visit = {
        timestamp: new Date(),
        successful: false
      };
      console.log(error);
      reportError(error);
    })
    .then(async function () {
      // always executed
      try {
        await insertVisit(visit);
      } catch (error) {
        next(error);
      }

      response.status(200).send(visit).end();
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;