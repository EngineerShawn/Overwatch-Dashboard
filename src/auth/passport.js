const passport = require('passport');
var DiscordStrategy = require('passport-discord').Strategy;
const path = require('path'); // For robust path construction
const config = require(path.join(__dirname, '..', 'config', 'config.json')); // Correctly load config relative to this file's parent directory

module.exports = function (passport) {
    const scopes = ['identify', 'email', 'guilds', 'guilds.join'];

    console.log('[AuthDebug] Initializing Passport Discord Strategy.');
    console.log('[AuthDebug] ClientID from config:', config.clientID);
    console.log('[AuthDebug] CallbackURL from config:', config.callbackURL);

    if (!config.clientID || config.clientID === "YOUR_CLIENT_ID_PLACEHOLDER" || !config.clientSecret || !config.callbackURL) {
        console.error("CRITICAL PASSPORT SETUP ERROR: Discord clientID, clientSecret, or callbackURL is missing or a placeholder in config.json when read by passport.js. Please verify src/config/config.json.");
        // You might want to throw an error here to prevent the app from starting with invalid OAuth config
        throw new Error("Passport Strategy: Discord OAuth credentials are not configured properly.");
    }

    passport.use(new DiscordStrategy({
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
        scope: scopes
    },
        function (accessToken, refreshToken, profile, cb) {
            if (config.Admin.includes(profile.id)) {
                return cb(null, profile);
            } else {
                return cb(null, false, { message: 'Unauthorized! Your Discord account is not authorized to access this dashboard.' })
            }
        }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}
