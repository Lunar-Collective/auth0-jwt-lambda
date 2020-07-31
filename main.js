const jwksRsa = require('jwks-rsa');
const jsonwebtoken = require("jsonwebtoken");


/**
 * 
 * @param {string} token 
 * @param {string} domain 
 * @param {boolean} shouldCache 
 * @param {number} cacheMaxAge 
 * @param {boolean} shouldRateLimit 
 * @param {boolean} requestsPerMinute 
 * @param {boolean} shouldStrictSsl 
 */
exports.verify = (
    token, 
    domain, 
    shouldCache = true, 
    cacheMaxAge = 86400000, 
    shouldRateLimit = true, 
    requestsPerMinute = 10,
    shouldStrictSsl = true) => {

        console.log(token);
    const keyClient = jwksRsa({
        cache: shouldCache,
        cacheMaxAge: shouldCache,
        rateLimit: shouldRateLimit,
        jwksRequestsPerMinute: requestsPerMinute,
        strictSsl: shouldStrictSsl,
        jwksUri: `${domain}/.well-known/jwks.json`
    });
    

    const getSigningKey = (header = decoded.header, callback) => {
        keyClient.getSigningKey(header.kid, function(err, key) {
            const signingKey = key.publicKey || key.rsaPublicKey;
            callback(null, signingKey);
        })
    }

    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(
            token, 
            getSigningKey,
            { "algorithms": "RS256"},
            (error, decoded) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(decoded);
                }
            }
        );
    })
}