var express = require('express');
var util =  require('util');
var bodyParser = require('body-parser');
var cors = require('cors');
const Pool = require('pg').Pool;

const app = express();
const port = 3200;

const pool = new Pool({
    user: 'wwbkefxvobxkcw',
    host: 'ec2-54-83-9-169.compute-1.amazonaws.com',
    database: 'dcef00minldto',
    password: '7229f2645ed89d3c054f4138e36bb381a98a4e3c4273a0d399e7a99ab12b86a7',
    port: 5432,
    ssl: true
  })

// DB Connect
const connString = 'postgres://wwbkefxvobxkcw:7229f2645ed89d3c054f4138e36bb381a98a4e3c4273a0d399e7a99ab12b86a7@ec2-54-83-9-169.compute-1.amazonaws.com:5432/dcef00minldto';

var whitelist = ['http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({extended: true})
)


app.get('/coffee-lovers', cors(corsOptions), (request, response) => {

    let arrQuery = ['SELECT * FROM coffee_lovers'];


    if (request.query.name || request.query.coffee || request.query.attribute1 || request.query.attribute2) {
      arrQuery.push('WHERE');

      if (request.query.name) {
        arrQuery.push("Name like '%" + request.query.name + "%'");
        arrQuery.push('AND');
      }

      if (request.query.coffee) {
        arrQuery.push("Coffee = '" + request.query.coffee + "'");
        arrQuery.push('AND');
      }

      if (request.query.attribute1) {
        arrQuery.push("Attribute1 = '" + request.query.attribute1 + "'");
        arrQuery.push('AND');
      }

      if (request.query.attribute2) {
        arrQuery.push("Attribute2 = '" + request.query.attribute2 + "'");
        arrQuery.push('AND');
      }
      
      arrQuery.pop();
    }
    
    arrQuery.push('ORDER BY ID ASC');

    let q = arrQuery.join(' ');
    console.log('test');

    pool.query(q, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
    
})



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})