const { json2xml } = require('xml-js');
const json2html = require('json-to-html');

module.exports = {

  contentNegotiate: (req, res, results) => {
    if (req.headers.accept === 'application/json') {
      return res.status(200).json({
        success: true,
        data: results,
      });
    }

    if (req.headers.accept === 'application/xml') {
      const json = JSON.stringify(results);
      const xmlData = json2xml(json, { compact: true, spaces: 4 });

      res.set('Content-Type', 'application/xml');
      res.status(200);
      return res.send(xmlData);
    }

    if (req.headers.accept === 'application/text') {
      let formattedString = '';

      for (const obj of results) {
        for (const [key, value] of Object.entries(obj)) {
          formattedString += `${key}: ${value}\n`;
        }

        formattedString += '\n\n\n';
      }

      res.set('Content-Type', 'application/text');
      res.status(200);
      return res.send(formattedString);
    }

    if (req.headers.accept === 'application/html') {
      const htmlData = json2html(results);

      res.set('Content-Type', 'application/html');
      res.status(200);
      return res.send(htmlData);
    }
  },

};
