const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET for just grant list
router.get('/', rejectUnauthenticated, (req, res) => {
  const query = `
   SELECT * FROM "grant"
      ORDER BY "grant_name" ASC;
  `;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500);
    });
});

// GET for grant details AND its associated logs
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const grantId = req.params.id;
  const query = `
    SELECT 
  "grant"."id" AS "grant_orig_id",
  "grant"."grant_name",
  "grant"."funding_src",
  "grant"."grant_abbreviation",
  "grant"."grant_lead",
  "grant"."grant_type",
  "grant"."description",
  "grant"."last_edit_date",
  "grant"."last_edit_by",
  "grant"."award_sum",
  "grant"."start_date",
  "grant"."end_date",
  "grant"."q1_report_date",
  "grant"."q2_report_date",
  "grant"."q3_report_date",
  "grant"."q4_report_date",
  "grant"."audit_date",
  "grant"."notes",
  "user"."id" AS "user_orig_id",
  "user"."first_name",
  "user"."last_name",
  "user"."role",
  "log"."id" AS "log_orig_id",
  "log"."submit_date",
  "log"."details",
  "log"."log_type",
  "log"."expenditure_amount"
FROM "grant"
LEFT JOIN "user_grant" ON "user_grant"."grant_id" = "grant"."id" 
LEFT JOIN "user" ON "user"."id" = "user_grant"."user_id"
LEFT JOIN "log" ON "log"."grant_id" = "grant"."id"
WHERE "grant"."id" = $1;
  `;
  pool
    .query(query, [grantId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error GETing grants', err);
      res.sendStatus(500);
    });
});

// POST for a new Grant
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const newGrantQuery = `
    INSERT INTO "grant" 
    ("grant_name", "funding_src", "grant_abbreviation", "grant_lead", "grant_type" "description", "last_edit_by", "award_sum", "start_date", "end_date", "q1_report_date", "q2_report_date", "q3_report_date", "q4_report_date", "audit_date", "notes")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING "id";
  `;
  const newGrantValues = [
    req.body.grant_name,
    req.body.funding_src,
    req.body.grant_abbreviation,
    req.body.grant_lead,
    req.body.grant_type,
    req.body.description,
    req.body.last_edit_by,
    req.body.award_sum,
    req.body.start_date,
    req.body.end_date,
    req.body.q1_report_date,
    req.body.q2_report_date,
    req.body.q3_report_date,
    req.body.q4_report_date,
    req.body.audit_date,
    req.body.notes,
  ];
  pool
    .query(newGrantQuery, newGrantValues)
    .then((result) => {
      console.log('New grant Id:', result.rows[0].id);
      const newGrantId = result.rows[0].id;
      //1. build the user_grant relationship
      const newUserGrantQuery = `
      INSERT INTO "user_grant" ("grant_id", "user_id") VALUES ($1, $2);`;
      pool
        .query(newUserGrantQuery, [newGrantId, req.user.id])
        .then((result) => {
          console.log('relationship built...');
        })
        .catch((error) => {
          console.log('error in the relationship in user_grant table...', error);
          res.sendStatus(500);
        });
      //2. adding logs"
      const newLogQuery = `
    INSERT INTO "log" 
    ("details", "log_type", "expenditure_amount", grant_id, user_id)
    VALUES ($1, $2, $3, $4, $5);`;
      pool
        .query(newLogQuery, ['new grant created', 'informational', null, newGrantId, req.user.id])
        .then((results) => {
          console.log('log created');
        })
        .catch((error) => {
          console.log('error in creating log', error);
          res.sendStatus(500);
        });

      console.log('ALL GOOD!!');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error POSTing grant', err);
      res.sendStatus(500);
    });
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  let grantId = req.params.id;
  console.log('PUT request for entire grant by id', grantId);
  let sqlQuery = ` 
  UPDATE "grant" 
  SET 
  "grant_name"=$1,
	"funding_src"=$2,
	"grant_abbreviation"=$3,
	"grant_lead"=$4,
	"grant_type"=$5,
	"description"=$6,
	"last_edit_by"=$7,
	"award_sum"=$8,
	"start_date"=$9,
	"end_date"=$10,
	"q1_report_date"=$11,
	"q2_report_date"=$12,
	"q3_report_date"=$13,
	"q4_report_date"=$14,
	"audit_date"=$15,
	"notes"=$16
 WHERE 
 "id"=$17;
 `;

  const newGrantValues = [
    req.body.grant_name,
    req.body.funding_src,
    req.body.grant_abbreviation,
    req.body.grant_lead,
    req.body.grant_type,
    req.body.description,
    req.body.last_edit_by,
    req.body.award_sum,
    req.body.start_date,
    req.body.end_date,
    req.body.q1_report_date,
    req.body.q2_report_date,
    req.body.q3_report_date,
    req.body.q4_report_date,
    req.body.audit_date,
    req.body.notes,
    grantId,
  ];
  pool
    .query(sqlQuery, newGrantValues)
    .then((result) => {
      console.log('Grant has been updated');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query when updating grant ${sqlQuery}`, error);
      res.sendStatus(500); // Good server always responds
    });
});

// update archive status on grant
router.put('/archive/:id', rejectUnauthenticated, (req, res) => {
  let grantId = req.params.id;
  console.log('put request for grant id', grantId);
  let sqlQuery = `UPDATE "grant" SET "archived" = NOT archived WHERE "id"= $1;`;
  pool
    .query(sqlQuery, [grantId])
    .then((result) => {
      console.log('grant archive status has been changed');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query and changing archive status ${sqlQuery}`, error);
      res.sendStatus(500); // Good server always responds
    });
});

module.exports = router;
