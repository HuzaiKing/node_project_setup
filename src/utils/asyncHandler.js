                //using Promises
const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve((requestHandler(req,res,next)))
        .reject((err)=>next(err))
    }
}
// const asyncHandler = (requestHandler) => {}
// const asyncHandler = (requestHandler) => () => {}
// const asyncHandler = (requestHandler) => async() => {}

                //using Try Catch and Async
// const asyncHandler = (requestHandler) => async(req,res,next) => {
//     try {
//         await requestHandler(req,res,next)     
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }

// }
export {asyncHandler}