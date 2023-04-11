class <%= class_name %> {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            id: "<%= id %>",
            title: "<%= name %>",
            description: "<%= description %>",
            weight: "<%= weight %>",
        };
    }
}

module.exports = <%= class_name %>;