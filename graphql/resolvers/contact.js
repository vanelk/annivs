const { UserInputError } = require("apollo-server-errors");
const Contact = require("../../models/Contacts");
const checkAuth = require("../../utils/checkAuth");
const { validateContactCreate, validateContactUpdate } = require("../../utils/validate");
const resolvers = {
    Query: {
        getContactById: async (_, { id }, context) => {
            await checkAuth(context);
            const contact = await Contact.findById(id);
            return contact;
        },

        getContactsByName: async (_, { name }, context) => {
            const { id } = await checkAuth(context);
            try{
                const regexString = name.split('').map(c=>`(${c}|${c.toLocaleUpperCase()})`).join('')
                const contacts = await Contact.find({user: id, name: new RegExp(regexString, "i")});
                return contacts;
            } catch(e){
                return [];
            }
        }
    },
    Mutation: {
        createContact: async (_, { name, birthdate, picture }, context) => {
            const { valid, errors } = validateContactCreate(name, birthdate);
            if (!valid) throw new UserInputError('Errors', { errors })
            let{id: user} = await checkAuth(context);
            const contact = new Contact({
                name,
                birthdate,
                user,
                picture
            })
            return await contact.save();
        },

        updateContact: async (_, { id, name, birthdate, picture }, context) => {
            const { valid, errors } = validateContactUpdate(name, birthdate, picture);
            if (!valid) throw new UserInputError('Errors', { errors })
            const {id: user } = await checkAuth(context);
            const updates = {};
            if(name){
                updates.name = name
            }
            if(birthdate){
                updates.birthdate = birthdate;
            }
            if(picture){
                updates.picture = picture;
            }
            const contact = await Contact.findOneAndUpdate({_id: id, user}, updates);
            return contact;
            
        },

        deleteContact: async (_, { id }, context) => {
            const {id: user } = await checkAuth(context);
            const response = await Contact.findOneAndDelete({ _id : id, user});
            return response;
        },
    }
}
module.exports = resolvers;