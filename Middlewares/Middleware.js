function logger(req, res, next){

    console.log('logging')
    next();
    }
    module.export = logger;