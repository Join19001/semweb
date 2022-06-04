var express = require('express');
var router = express.Router();
var d3 = require('d3-sparql');

/* GET Data */
router.get('/', async(req, res) => {
    try {
        var myQuery = `
        prefix : <http://www.semanticweb.org/user/ontologies/2022/4/untitled-ontology-10#> 
        prefix owl: <http://www.w3.org/2002/07/owl#> 
        prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
        prefix xml: <http://www.w3.org/XML/1998/namespace>
        prefix xsd: <http://www.w3.org/2001/XMLSchema#> 
        prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> 

        SELECT ?nama_pemeran ?fullname ?tempat_lahir ?tanggal_lahir ?usia ?profesi WHERE { 

            ?idKarakter_Film :berteman ?id .
            ?idKarakter_Film :nama_pemeran ?nama_pemeran .
            
            ?id :nama_pemeran ?fullname . 
            ?id :tempat_lahir ?tempat_lahir . 
            ?id :tanggal_lahir ?tanggal_lahir . 
            ?id :usia ?usia .
            ?id :profesi ?profesi .
        }
        ORDER BY ?idKarakter_Film`;
        
        var sparqlEndpoint = 'http://localhost:3030/semweb/sparql';

        d3.sparql(sparqlEndpoint, myQuery).then((results) => {
            console.log(results); 
            res.render('hubungan 3', { title: 'Data', chars: results });
        });
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.error('Error', err.message);
        }
    }
});

module.exports = router;