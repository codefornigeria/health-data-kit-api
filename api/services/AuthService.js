/*
 * Auth service
 */

module.exports = {
    generateCode: function(length, chars) {
        if (!chars){
            chars = '0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ';
        }
        var result = '';
        for (var i = length; i > 0; --i){
            result += chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return result;
    },

    /*
     * @param address - array of addresses
     */
    validateAddresses: function(address) {
        //
    },

    /*
     * @param profile - validate profile information
     */
    validateProfile: function(profile) {
        //
    }

}
