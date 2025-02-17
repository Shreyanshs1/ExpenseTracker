const UserModel = require("../Model/UserModel");

const fetchExpense = async (req,res)=>{
    const{_id}=req.user; //put to user by ensureAuthenticated function
    try{
        const userData = await UserModel.findById(_id).select('expenses');
        return res.status(201).json({
            message:"Fetch Successful",
            success:true,
            data:userData.expenses  //ye wala pata karo ?.expenses kyu likhte hai
        })
    }catch(err){
        return res.status(500).json({
            message:"Fetch failed",
            success:false,
            error:err
        })
    }
}

const addExpense=async (req,res)=>{
    const body=req.body;
    const{_id}=req.user; //put to user by ensureAuthenticated function
    const{text,amount}=body;
    if(!text || !amount){
        return res.status(422).json({
            message:"All Fields reuired",
            success:false,
        })
    }
    try{
        const userData=await UserModel.findByIdAndUpdate(
            _id,  //user id
            {
                $push:{expenses:body}
            },
            {new:true}   // it is used for returning updated document
            //return data will be stored in userData
        )
        return res.status(200).json({
            message:"Added Successfully",
            success:true,
            data:userData?.expenses  //ye wala pata karo ?.expenses kyu likhte hai
        })
    }catch(err){
        return res.status(500).json({
            message:"Failed adding Expense",
            success:false,
            error:err
        })
    }
}

const deleteExpense=async (req,res)=>{
    const{_id}=req.user; //put to user by ensureAuthenticated function
    const {expenseId} =req.params;
    try{
        const userData=await UserModel.findByIdAndUpdate(
            _id,  //user id
            {
                $pull:{expenses:{_id:expenseId}}
            },
            {new:true}   // it is used for returning updated document
            //return data will be stored in userData
        )
        return res.status(201).json({
            message:"Deleted Successfully",
            success:true,
            data:userData?.expenses  //ye wala pata karo ?.expenses kyu likhte hai
        })
    }catch(err){
        return res.status(500).json({
            message:"Fetch failed",
            success:false,
            error:err
        })
    }
}

module.exports = {
    fetchExpense,
    addExpense,
    deleteExpense
}