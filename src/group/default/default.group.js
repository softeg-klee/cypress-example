class DefaultGroup {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            id: 'default',
            title: "Autre",
            description: "Autres actions",
            weight: 100,
        };
    }
}

module.exports = DefaultGroup;