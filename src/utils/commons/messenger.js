const colors = require('colors');

/**
 * Utilitaire de log.
 */
class MessengerClass {
    /**
     * Titre.
     * @param message
     */
    title(message) {
        console.log();
        console.log(colors.bgGreen(`********* ${message} *********`))
    }

    /**
     * Message
     * @param message
     */
    message(message) {
        console.log(message);
    }

    /**
     * Erreurs;
     * @param message
     */
    error(message) {
        console.log(colors.bgRed(message));
    }

    /**
     * Warnings.
     * @param message
     */
    warn(message) {
        console.log(colors.yellow(message));
    }

    /**
     * Affiche une info
     * @param message
     */
    info(message) {
        console.log(colors.bgCyan(message));
    }
}

module.exports = new MessengerClass();
