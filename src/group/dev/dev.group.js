class DevGroup {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            id: "dev",
            title: "Outils de développement",
            description: "",
            weight: "10",
        };
    }
}

module.exports = DevGroup;