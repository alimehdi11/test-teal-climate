const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get('/Profiles', (req, res) => {
    const id = 19;
  
    if (!id) {
      // Instead of redirecting, send a JSON response indicating the need to log in
      return res.status(401).json({ error: 'User not logged in' });
    }
  
    let client; // Declare the client variable outside the promise chain
  
    pool.connect()
      .then(connectedClient => {
        client = connectedClient; // Assign the connected client to the variable
  
        return Promise.all([
          client.query('SELECT * FROM Countries'),
          client.query('SELECT * FROM companies WHERE userid = $1', [id])
        ]);
      })
      .then(([countriesResult, companiesResult]) => {
        // Send the data as JSON instead of rendering a server-side template
        res.json({
          countries: countriesResult.rows,
          companies: companiesResult.rows
        });
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching data' });
      })
      .finally(() => {
        if (client) {
          client.release(); // Release the connection back to the pool in all cases
        }
      });
});