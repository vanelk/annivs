class Hasher{
    static toBase64(cell){
        return Buffer.from(cell).toString('base64');
    }
    static toString(data){
        try{
            return Buffer.from(data, 'base64').toString();
        } catch(e){
            return -1;
        }
    }
    static dayOfYear (date){
        date = new Date(new Date(date).setFullYear(2000))
        if(isNaN(date)) return;
        return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    }
    static getColumnName(n)
    {
        var result = "";
        while (n > 0)
        {
            var index = (n - 1) % 26;
            result = String.fromCharCode(index + 'A'.charCodeAt(0)) + result;
            n = (n - 1) / 26 | 0;
        }
     
        return result;
    }
}
module.exports = Hasher;