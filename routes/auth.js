
const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken'); // it checks while updating deleting cards , it is belong to client or not.


//REGISTER--->
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // password:req.body.password,     //here we encrypt the password using crypto-js
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),

        // userType is added 
        userType:req.body.userType,
        address:req.body.address

    });
    // it's no gurantee to send message data is stored instantly or not , its depend on server so that we use async function .

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

//LOG IN ------>

router.post('/login', async (req, res) => {
    console.log("hi");
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: req.body.username });
        console.log(username);
        !user && res.status(401).json('wrong credentials');

        const accessToken = jwt.sign({    // insta reel concept.
            id: user._id,
            isAdmin: user.userType,
        },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        OriginalPassword != req.body.password && res.status(401).json('wrong credentials');

        //we don't see the secret key password after log in.
        const { password, ...others } = user._doc;
        res.status(200).json({...others,accessToken});
    }
    catch (err) {
        res.status(500).json(err);
    }
})


//GET ALL ----> 
router.get("/",async(req,res)=>{
    try{
        const carts=await User.find();
        res.status(200).json(carts);
    }
    catch(err){
        res.status(500).json(err);
       
    }
})






module.exports = router;