const jwt=require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    const token=req.headers.token
    if(token)
    {
        jwt.verify(token, 'masai', function(err, decoded) {
            if(decoded)
            {
                req.body.author=decoded.author
                next();
            }
            else res.send({'msg':'Please Login'})
          });
    }
    else res.send({'msg':'Please Login'})
}

module.exports={authenticate}