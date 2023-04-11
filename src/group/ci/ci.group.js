class CiGroup {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            id: "ci",
            title: "CI / CD",
            description: "Utilitaire de CI",
            weight: "50",
        };
    }
}

module.exports = CiGroup;