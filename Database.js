require('dotenv').config();
const mongoose = require('mongoose');

class Database {
	constructor() {
		this.connection = null;
	}

	connect() {
		console.log('Connecting to database...');
		const dbUrl = process.env.DB_URL;
		mongoose.connect(dbUrl, {
			useNewUrlParser:true,
			useUnifiedTopology:true,
		}).then(() => {
			console.log('Succesfully connected to database!');
			this.connection = mongoose.connection;
		}).catch(err => {
			console.error(err);
		});
	}
}

module.exports = Database;
