const express = require("express");
const router = express.Router();
const pool = require("../db");



router.get('/', (req, res) => {
    const id = '19';

    if (!id) {
        return res.redirect('/log_in');
    }

    let client; // Declare the client variable outside the promise chain

    pool.connect()
        .then(connectedClient => {
        client = connectedClient; // Assign the connected client to the variable

        return client.query('SELECT * FROM companiesdata WHERE ids = $1', [id])
            .then(companiesDataResult => {
            return client.query('SELECT * FROM companies WHERE userid = $1', [id])
                .then(companies => {
                return {
                    companiesdatas: companiesDataResult.rows,
                    companies: companies.rows
                };
                })
                .catch(error => {
                throw new Error('Error fetching data from companies: ' + error);
                });
            })
            .catch(error => {
            throw new Error('Error fetching data from companiesdata: ' + error);
            });
        })
        .then(data => {
        // res.render('dashboard', data);
        res.status(200).json({ data});

        })
        .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Error connecting to the database: ' + error);
        })
        .finally(() => {
        if (client) {
            client.release(); // Release the connection back to the pool in all cases
        }
    });
});

  