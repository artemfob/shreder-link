const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post(
    '/register',
    [
        check('email','Invalid email').isEmail(),
        check('password', 'Error password'), isLength({min: 6})
    ],
    async (request, responses)=>{
    try{
        const errors = validationResult(request)
        if(!errors.isEmpty()){
            return response.status(400).json(
                {   errors: errors.array(),
                    message:'Invalid registration data'})
        }
        const {email, password} = request.body
        const candidate = await User.findOne({email})
        if(candidate){
            return responses.status(400).json({message:'User already exist'})
        }
        const hashedPassword = bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: 'User created'})

    }catch(e){
        res.status(500).json({message: 'something went wrong, try it again'})
    }
})
router.post(
    '/login',
        [
            check('email','Enter correct email').normalizeEmail().isEmail(),
            check('password', 'Enter correct password'), exists()
        ],
        async (request, responses)=>{
        try{
            const errors = validationResult(request)
            if(!errors.isEmpty()){
                return response.status(400).json(
                    {   errors: errors.array(),
                        message:'Invalid login data'})
            }
            const {email, password} = request.body
            const user = await User.findOne({email})
            if(!user){
                return responses.status(400).json({message:'User has not exist'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            
            if(!isMatch){
                return response.status(400).json({message: 'Wrong password'})
            }
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
                )
            res.json({token, userId: user.id})

        }catch(e){
            res.status(500).json({message: 'something went wrong, try it again'})
        }
})

module.exports = router