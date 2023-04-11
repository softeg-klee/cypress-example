"use strict";

export const GTM_SCRIPT_LOAD_ID = 'gtm_script_load';
export const ALIAS_GTM_SCRIPT_LOAD = `@${GTM_SCRIPT_LOAD_ID}`;

/**
 * Init the GTM script loader listener.
 *
 * GTM data layer test cannot be made before script has load.
 * Therefor, we have to intercept the request and use the
 * ALIAS_GTM_SCRIPT_LOAD before testing GTM behaviors.
 */
export const listenGTMScriptLoad = (url = 'https://www.googletagmanager.com/gtm.js?*') => {
    cy.intercept(
        url,
        {middleware: true},
        (req) => {
            req.on('before:response', (res) => {
                // force all API responses to not be cached
                res.headers['cache-control'] = 'no-cache';
            });
        }
    ).as(GTM_SCRIPT_LOAD_ID);
};


/**
 * Test the GTM behavior.
 *
 * Check window.dataLayer object keys and value.
 *
 * @param data
 *   The DataLayer attempted object part
 */
export const dataLayerShouldContain = (data, verbose = false) => {
    cy.window().then(win => {
        verbose && console.info("===========================");
        verbose && console.info("Data Layer should contain ", data);
        verbose && console.log("Data layer values ", win.dataLayer);

        assert.isDefined(win.dataLayer);

        // Change data in json.
        const search = {};
        const keys = Object.keys(data);
        keys.forEach(key => {
            search[key] = JSON.stringify(data[key]);
        });


        const dataLayerShouldContainDataPart = win.dataLayer.find(x => {
            verbose && console.log('------------');
            verbose && console.log('Data Layer Item ', x);
            const logs = {};
            const includes = keys.filter(key => {
                // Logs (verbose).
                const log = {};
                log['Value'] = x[key];
                log['Wanted'] = data[key];
                log['Comparison : Value (JSON)'] = JSON.stringify(x[key]);
                log['Comparison : Data (JSON)'] = search[key];
                log['Matches ?'] = x[key] && JSON.stringify(x[key]) === search[key];
                logs[key] = log;

                return log['Matches ?'];
            });
            logs.null = {};

            const itemMatches = includes.length === keys.length;
            verbose && console.table(logs);
            verbose && (itemMatches ?
                console.log('%c Matching', 'background: #4B9A48; color: white') :
                console.log('%c Not matching ', 'background: #D53B3B; color: white'));

            return itemMatches;
        })

        assert.isDefined(dataLayerShouldContainDataPart);
    });
};
