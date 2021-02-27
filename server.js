var express = require('express');
var app = express();

app.use(function(req, res, next)
{
    if (!req.subdomains.length || req.subdomains.slice(-1)[0] === 'www')
    {
        return next();        
    }     
    var subdomain = req.subdomains.slice(-1)[0];
    // keep it
    req.subdomain = subdomain;
    next();
 });

app.get('/', function(req, res) 
{
    // no subdomain
    if (!req.subdomain)
    {
        res.send('No sub domain continue with default page.');
    } // found subdomain
    else if (req.subdomain === 'web')
    {
        //res.send('Redirect to website.');
        res.redirect('http://demo.dev.loc');
    }
    else
    {
        res.send('To do for : ' + req.subdomain);   
    }
});


process.env.PORT=5000;

app.listen(process.env.PORT, () =>
{
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
});