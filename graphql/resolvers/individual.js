const { UserInputError } = require("apollo-server-errors");
const sheet = require("../../lib/api/GoogleSheet");
const Hasher = require("../../lib/Hasher");
const checkAuth = require("../../utils/checkAuth");
const onAPIError = require("../../utils/onAPIError");
const { validateIndividualCreate, validateIndividualUpdate } = require("../../utils/validate");
const resolvers = {
    Query: {
        getIndividual: async (_, { id }, context) => {
            const { spreadsheetId, token } = await checkAuth(context);
            let cell = Hasher.toString(id);
            if (cell === -1) throw new UserInputError("User ID is not valid not found");
            let res = await sheet.getRows(spreadsheetId, cell, JSON.parse(token), onAPIError(context));
            if (!res) throw new UserInputError("User not found");
            var { name, dob } = JSON.parse(res[0]);
            dob = new Date(dob);
            return {
                id,
                name,
                birthdate: {
                    timestamp: dob.getTime(),
                    isoString: dob.toISOString()
                }
            }
        },

        getIndividuals: async (_, { name }, context) => {
            const { spreadsheetId, token } = await checkAuth(context);
            rows = await sheet.getRows(spreadsheetId, '1:998', JSON.parse(token), onAPIError(context));
            results = [];
            for (let i = 0; i < rows.length; i++) {
                let jsons = rows[i];
                for (let x = 0; x < jsons.length; x++) {
                    if (jsons[x].length < 1) continue;
                    let { name: _name, dob } = JSON.parse(jsons[x]);
                    dob = new Date(dob);
                    if (name && _name.toLowerCase().indexOf(name.toLowerCase()) == -1) continue;
                    let id = Hasher.toBase64(Hasher.getColumnName(x + 1) + (i + 1));
                    results.push({
                        id,
                        name: _name,
                        birthdate: {
                            timestamp: dob.getTime(),
                            isoString: dob.toISOString()
                        }
                    });
                }
            }
            return results;
        }
    },
    Mutation: {
        createIndividual: async (_, { name, birthdate }, context) => {
            const { valid, errors } = validateIndividualCreate(name, birthdate);
            if (!valid) throw new UserInputError('Errors', { errors })
            const { spreadsheetId, token } = await checkAuth(context);
            let dob = new Date(birthdate);
            let col = Hasher.getColumnName(Hasher.dayOfYear(dob));
            let data = JSON.stringify({ name, dob })
            let res = await sheet.appendRows(spreadsheetId, `${col}:${col}`, [[data]], JSON.parse(token), onAPIError(context));
            let updated_cell = res.updates.updatedRange.split("!")[1];
            let id = Hasher.toBase64(updated_cell);
            return {
                id,
                name,
                birthdate: {
                    timestamp: dob.getTime(),
                    isoString: dob.toISOString()
                }
            }
        },

        updateIndividual: async (_, { id, name, birthdate }, context) => {
            const { valid, errors } = validateIndividualUpdate(name, birthdate);
            if (!valid) throw new UserInputError('Errors', { errors })
            const { spreadsheetId, token } = await checkAuth(context);
            let cell = Hasher.toString(id);
            if (!name || !birthdate) {
                let raw = await sheet.getRows(spreadsheetId, cell, JSON.parse(token), onAPIError(context));
                if (!raw) return;
                let [[json]] = raw;
                const noBD = !birthdate;
                const noName = !name;
                let {name:_name, dob} = JSON.parse(json);
                dob = new Date(dob); 
                if(noName){
                    name = _name;
                    await sheet.clearRows(spreadsheetId, cell, JSON.parse(token), onAPIError(context));
                    return await resolvers.Mutation.createIndividual(_, { name, birthdate }, context);
                }
                if(noBD){
                    let data = JSON.stringify({name, dob});
                    await sheet.updateRows(spreadsheetId, cell, [[data]], JSON.parse(token), onAPIError(context));
                    return { id, name };
                }
            } else {
                await sheet.clearRows(spreadsheetId, cell, JSON.parse(token), onAPIError(context));
                return await resolvers.Mutation.createIndividual(_, { name, birthdate }, context);
            }
        },

        deleteIndividual: async (_, { id }, context) => {
            const { spreadsheetId, token } = await checkAuth(context);
            let cell = Hasher.toString(id);
            await sheet.clearRows(spreadsheetId, cell, JSON.parse(token), onAPIError(context));
            return { id }
        },
    }
}
module.exports = resolvers;