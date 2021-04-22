const _ = require('lodash');
const cheerio = require('cheerio');
const through = require('through2');
const Svgo = require('svgo');

const load = (file) =>
  cheerio.load(String(file), { xmlMode: true });

const removeUnwantedAttr = ($) => function(idx, $el) {
  $(this).removeAttr('fill');
  $(this).removeAttr('class');
};

const removeUnnecessaryAttrs = ($) => {
  const $svg = $('svg');

  $svg.children('title').remove();
  $svg.children('defs').remove();
  $svg.children('style').remove();
  $svg.removeAttr('xmlns');

  $svg.children().each(removeUnwantedAttr($));

  return $;
};

const normalize = (file) => {
  const $ = removeUnnecessaryAttrs(load(file));
  return $.html()
    .replace(new RegExp('fill-rule', 'g'), 'fillRule')
    .replace(new RegExp('xlink:href', 'g'), 'xlinkHref');
};

exports.minify = () => through((file, enc, cb) =>
  new Svgo().optimize(String(file), ({ data }) => cb(null, data)));

exports.parse = () => through((file, enc, cb) =>
  cb(null, new Buffer(normalize(file), 'utf-8')));

exports.load = load;
