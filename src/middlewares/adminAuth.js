const adminAuth = (req,res,next)=>{
    
    const adminAuth="xyz";
    const isAdmin =adminAuth==="xyz"

    if(!isAdmin){
        res.status(401).send("Unauthorized request")

    }
    else{
        next();
    }
};

const userAuth = (req,res,next)=>{
    
    const adminAuth="xyz";
    const isAdmin =adminAuth==="xyz"

    if(!isAdmin){
        res.status(401).send("Unauthorized request")

    }
    else{
        next();
    }
}





module.exports={
    adminAuth,
    userAuth
}