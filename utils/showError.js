export const showError= (res,code,message)=>{
    res.status(code).json({success: false,message});
}