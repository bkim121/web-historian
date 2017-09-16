// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
const path = require('path');
const helpers = require('../helpers/archive-helpers');


const CronJob = require('cron').CronJob;



var job = new CronJob({
  cronTime: '10 * * * * *',
  onTick: function() {
    let newUrls = [];
    
    helpers.readListOfUrls(array => array.forEach(el => {
      helpers.isUrlArchived(el, (archived) => {
        if (!archived) {
          // newUrls.push(el);
          helpers.downloadUrls([el]);
        }
      });
    }));
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();