const   bodyParser      = require("body-parser"),
        methodOverride  = require("method-override"),
        express         = require("express");

const PORT = 3000;

module.exports = {

    config : function(app) {
        app.use('/upload', express.static(__dirname + '/public'));
        app.use(express.static(__dirname + '/public'));
        app.use(bodyParser.json());
        app.use(methodOverride('_method'));
        app.use((req,res,next)=>{
            const allowedOrigins = [
			'http://127.0.0.1', 
			'http://localhost', 
			'http://127.0.0.1:3003', 
			'http://localhost:3003',
			'http://127.0.0.1:3002', 
			'http://localhost:3002',
			'http://127.0.0.1:3001', 
			'http://localhost:3001',
			'http://127.0.0.1:3000', 
            'http://localhost:3000',
			'http://127.0.0.1:5500', 
            'http://localhost:5500'
			];
            const origin = req.headers.origin;
            if(allowedOrigins.indexOf(origin) > -1){
                 res.setHeader('Access-Control-Allow-Origin', origin);
            }

            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,authorization');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            next();
        });

        app.listen(PORT,()=>{
            console.log('server started');
        })
    },

    secret: 'azertyyuuiopsffgdhghjghj'

}