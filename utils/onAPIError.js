module.exports = function onAPIError(context){
    return function(error){
        switch(error.message){
            case 'invalid_grant':
            case 'Invalid Credentials':
                context.res.clearCookie("jid");
                return new Error("Something went wrong in our end. You are about to get disconnected. Please use button to continue");
            default:
                console.error(error.message)
                return;
        }
    }
}