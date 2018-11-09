'use strict';

const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap


const $CONTROLLERNAME$ = require('$ROUTE2CTRL$');


router.get('/$TABLE_NAME$/', (req, res, next) => {
  $CONTROLLERNAME$.index(req, res, next);
});

router.get('/$TABLE_NAME$/new', (req, res, next) => {
  $CONTROLLERNAME$.new(req, res, next);
});

router.get('/$TABLE_NAME$/:id', (req, res, next) => {
  $CONTROLLERNAME$.show(req, res, next);
});

router.get('/$TABLE_NAME$/:id/edit', (req, res, next) => {
  $CONTROLLERNAME$.edit(req, res, next);
});


module.exports = router;
