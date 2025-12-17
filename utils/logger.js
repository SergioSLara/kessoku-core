module.exports = {
    info(message) {
        console.log(`[INFO]: ${message}`);
    },
    error(err) {
        console.error(`[ERROR]: ${err}`);
    }
}