const  Database = require('./app/config/database');
const CONFIG = require('./app/config/config');
const App = require('./app/app');

Database.connect();

App.listen(CONFIG.PORT, function(error){
    if (error) return console.log('Error in running server: '+error);     
    console.log(`Server running in PORT: ${CONFIG.PORT}`);
})