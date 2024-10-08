class apiErrorHandler extends Error {
    constructor(
        status,
        message="Something Went Wrong",
        error=[],
        stack=""){
            super(message)
            this.message=message
            this.success=false
            this.status=status,
            this.data=null,
            this.stack=stack
            this.error=error
            
            if(stack){
                this.stack=stack
            }
            else{
                Error.captureStackTrace(this, this.constructor)
            }

    }

}
export {apiErrorHandler};