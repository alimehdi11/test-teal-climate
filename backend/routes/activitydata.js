const express = require("express");
const router = express.Router();
const pool = require("../db");


router.get('/activitydata', (req, res) => {
    // const id = req.session.userid;
    const id = 19;
    
    if (!id) {
      return res.redirect('/log_in');
    }
  
    pool.connect()
      .then(client => {
        return Promise.all([
          client.query('SELECT * FROM activitydata'),
          client.query('SELECT * FROM companies WHERE userid = $1', [id]),
          client.query('SELECT * FROM companiesdata WHERE ids = $1', [id])
        ])
        .then(([activityResult, companiesResult, companiesDataResult]) => {
          const datas = activityResult.rows;
          const companies = companiesResult.rows;
          const companiesdatas = companiesDataResult.rows;
          console.log('sss',companies)
  
          res.status(200).json({ datas, companiesdatas, companies });
          // res.render('activatedata', { datas, companiesdatas, companies });
        })
        .catch(error => {
          console.error('activatedata Error:', error);
          res.status(500).send('Error fetching data');
        })
        .finally(() => {
          client.release(); // Release the connection back to the pool in all cases
        });
      })
      .catch(error => {
        console.error('activatedata Error:', error);
        res.status(500).send('Error connecting to the database');
      });
});