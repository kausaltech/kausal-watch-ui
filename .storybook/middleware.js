const express = require('express');
const fs = require('fs');
const YAML = require('yaml');

/* Serve all locale JSON file requests from YAML source files */
const expressMiddleWare = router => {
  router.get('/locales/:lang([a-z]{2})/:ns([0-9a-z_-]+).json', function (req, res) {
    const { lang, ns } = req.params;
    let contents;
    try {
      contents = fs.readFileSync(`./locales/${lang}/${ns}.yaml`, 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        res.sendStatus(404)
      }
      return;
    }
    const data = YAML.parse(contents);
    res.json(data);
  });
}

module.exports = expressMiddleWare
