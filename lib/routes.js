module.exports = function routes (app)
{

	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  	host     : 'localhost',
	  	database : 'assettracking',
	  	user     : 'root',
	  	password : 'welcome'
	})


	//Queries
	var get_Assets = 'select id,assetnumber,equipmentid,manufacturerid,modeltype,serialnumber,servicetag,servicecode,locationid,description,purchasedate,statusid,warrantystartdate,warrantyenddate,leasestartdate,leaseenddate,leasecontractnumber,needsretrieval,leaseid,retrievaldate,ponumber,isleased from assettracking.asset '


	app.get('/assets', function getall(req,res,next) {
		if(connection){
			connection.query(get_Assets + 'limit 5', function(err, rows, fields) {
	  			if (err) return next(err);
	  			res.json("Returned Assets", {"assets" : rows});
			});
		}
	});

	app.get('/assets/:id', function getone (req,res,next) {
		if(connection){
			connection.query(get_Assets + 'limit 1' , function(err, rows, fields) {
	  			if (err) return next(err);
	  			res.json("Returned Asset", {"asset" : rows});
			});
		}
	});

	app.get('/staffs', function getall(req,res,next) {
		if(connection){
			connection.query('select staffid as id,fullname, designation as userdesignation,mobilenumber as phone, lastactivity from swstaff where isenabled = 1 and enabledst = 1 Order by fullname', function(err, rows, fields) {
	  			if (err) return next(err);
	  			res.json("Returned Staff", {"staffs" : rows});
			});
		}
	});
	
	app.get('/tickets',function getall(req,res,next){
		if(connection){
			connection.query('Select ticketID as id, subject from swtickets where ownerStaffID = 11 and ticketstatusid != 6', function(err, rows, fields) {
	  			if (err) return next(err);
	  			res.json("Returned Tickets", {"tickets" : rows});
			});
		}
	});

};

