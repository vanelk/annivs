const checkAuth = require("../../utils/checkAuth")

module.exports = {
    Query:{
        listAvatars: async (_, o, context)=>{
            await checkAuth(context);
            const result = [];
            for(i = 0; i < 8; i++){
                result.push("/avatars/"+i);
            }
            return result;
        }
    }
}