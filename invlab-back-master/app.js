const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors')

// Configurations of MYSQL
const conn = mysql.createConnection({
    host: 'localhost', // host    
    user: 'root', // db user       
    password: '', // password
    database: 'eventbysonali', // database name
    port: 3306 // port

});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// create connection
conn.connect(function(er) {

    if (!er) { //check errors when the connect database.

        // route /item -- >  ( localhost:3000/item )
        app.route('/item')
            // GET Method -
            .get(function(req, res) {
                try {
                    // Query for get Item details
                    conn.query("SELECT * FROM item", function(error, result) {
                        res.send(result);
                    });
                } catch (er) {
                    res.send({ resCode: 404, errorCode: er.code, error: er.message });
                }
            })

        // Post Method
        .post(function(req, res) {
            try {
                // Query for insert data in item
                conn.query("insert into item() values ('" + req.body.code + "','" + req.body.itemCode + "','" + req.body.des + "','" + req.body.itemCat + "','" + req.body.price + "','" + req.body.path + "')", function(err, result) {
                    res.send({ status: 'OK', code: 200 });
                });
            } catch (er) {
                res.send({ resCode: 404, errorCode: er.code, error: er.message });
            }
        })

        // PUT Method
        .put(function(req, res) {
            try {
                // Query for Update data in item
                conn.query("update item set itemCode = '" + req.body.itemCode + "', des = '" + req.body.des + "' , itemCat = '" + req.body.itemCat + "' ,itemprice = '" + req.body.price + "',path = '" + req.body.path + "' where code = '" + req.body.code + "'", function(err, result) {
                    res.send({ status: 'OK', code: 200 });
                });
            } catch (er) {
                res.send({ resCode: 404, errorCode: er.code, error: er.message });
            }
        });

        app.route('/item/:id')
            // DELETE Method
            .get(function(req, res) {
                try {
                    // Query for get Item details
                    conn.query("SELECT * FROM item WHERE code = '" + req.params.id + "'", function(error, result) {
                        res.send(result);
                    });
                } catch (er) {
                    res.send({ resCode: 404, errorCode: er.code, error: er.message });
                }
            })


        .delete(function(req, res) {
            try {
                // Query for delete data in item
                conn.query("delete from item where code = '" + req.params.id + "'", function(err, result) {
                    res.send({ status: 'OK', code: 200 });
                });
            } catch (er) {
                res.send({ resCode: 404, errorCode: er.code, error: er.message });
            }
        });

        app.route('/item/cat/:id')
            .get(function(req, res) {
                try {
                    // Query for get Item details
                    conn.query("SELECT * FROM item WHERE itemCat = '" + req.params.id + "'", function(error, result) {
                        res.send(result);
                    });
                } catch (er) {
                    res.send({ resCode: 404, errorCode: er.code, error: er.message });
                }
            });

    } else {
        console.log(er);
    }

});

app.listen(3000);
// localhost:3000