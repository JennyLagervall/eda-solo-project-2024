const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// POST for a new log
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  // the log will need stuff on the req.body to include the grant_id
  // const {details, log_type, expenditure_amount, grant_id} = req.body;
  const newLogQuery = `
  INSERT INTO "log" 
    ("details", "log_type", "expenditure_amount", "grant_id", "user_id" )
    VALUES ($1, $2, $3, $4, $5);
  `;
  pool
    .query(newLogQuery, [
      req.body.details,
      req.body.log_type,
      req.body.expenditure_amount,
      req.user.id,
      req.body.grant_id,
    ])
    .then((results) => {
      console.log('log created');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error in POST creating new log', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let logId = req.params.id;
  console.log('Delete request for log id', logId);
  let sqlQuery = 'DELETE FROM "log" WHERE id=$1;';
  pool
    .query(sqlQuery, [logId])
    .then((result) => {
      console.log('log deleted');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query in log delete ${sqlQuery}`, error);
      res.sendStatus(500); // Good server always responds
    });
});

module.exports = router;
