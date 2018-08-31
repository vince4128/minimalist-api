const   bodyParser      = require("body-parser"),
        methodOverride  = require("method-override");

const PORT = 3000;

module.exports = {

    config : function(app) {
        app.use(bodyParser.json());
        app.use(methodOverride('_method'));
        app.use((req,res,next)=>{
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3003');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            next();
        });

        app.listen(PORT,()=>{
            console.log('server started');
        })
    }

}