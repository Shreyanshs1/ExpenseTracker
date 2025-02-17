const router = require('express').Router();
const Auth = require('../Middleware/Auth')

router.get('/',Auth,(req,res)=>{
    return res.status(200)
    .json([{
        name:"Mobile",
        price:200
    },
    {
        name:"TV",
        price:2000
    }
])
});

module.exports = router;