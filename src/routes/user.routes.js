const { Router } = require("express");

const router = Router();

router.post ("/", (req, res)=> {
    console.log(req.body);
    res.json({isOk:true})
} );


module.exports = router;