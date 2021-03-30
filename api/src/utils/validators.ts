import {validationResult,check, ValidationChain} from 'express-validator';
import {Request,Response} from 'express';
import {StatusCodes} from 'http-status-codes';

const validate = validations => {
    return async(req,res,next) =>{
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }

        res.status(400).json({errors:errors.array()});
    }
}



const loginValidator = (request:Request,response:Response,next) =>{
    var emailPhoneNo = request.body.emailPhoneNo;
    let password = request.body.password;

    console.log(emailPhoneNo);

    if(emailPhoneNo == undefined || password == undefined) {
        return response.status(StatusCodes.BAD_REQUEST).json({error:"Invalid email/phone or Password"});
    }

    if((emailPhoneNo.includes("@") || emailPhoneNo.length == 10) && (password.length > 4)){
        console.log("success jfhjghj");
        next();
    } else {
       return response.status(StatusCodes.BAD_REQUEST).json({error:"Invalid email/phone or Password"});
    }
}


const addCategoryValidator: Array<ValidationChain> = [
    check('name').isLength({min:2}),
    check('pictureLink').isURL()
]

const addItemValidator: Array<ValidationChain> =[
    check('itemName').isLength({min:2}),
    check('price').isNumeric(),
    check('description').isLength({min:2}),
    check('ratings').isNumeric(),
    check('pictureLink').isURL()
]

const addOrderValidator: Array<ValidationChain> =[
    check('itemId').notEmpty().isNumeric()
]


const signupValidator: Array<ValidationChain> = [
    check('name').isLength({min:2}),
    check('emailPhoneNo').isLength({min:5}),
    check('password').isLength({min:4}),
];


export{
    validate,
    loginValidator,
    signupValidator,
    addCategoryValidator,
    addItemValidator,
    addOrderValidator
}