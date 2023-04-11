# Helper : GTM

## Use

```javascript
import {gtm} from 'cypress-example/helpers'

describe('GTM Events', () => {
    it('Should add Event in GTM', () => {
        // This will define a gtm.ALIAS_GTM_SCRIPT_LOAD alias for request.
        gtm.listenGTMScriptLoad();

        // Visit url.
        cy.visit('/');
        // Wait for script to be loaded.
        cy.wait(gtm.ALIAS_GTM_SCRIPT_LOAD);

        // Test DataLayer.
        gtm.dataLayerShouldContain({event: 'page'});
    });
})
```

## Methods

### listenGTMScriptLoad(url)
Intercept GTM script load and disable cache.


#### Options
| Param | Type | Description |
| ----- | :--: | ----------- |
| url | `string` | GTM script url pattern (default: `'https://www.googletagmanager.com/gtm.js?*'` ) |


### dataLayerShouldContain(data)
Test if window.dataLayer contains passed data.

#### Options
| Param | Type | Description |
| ----- | :--: | ----------- |
| data | `object` | Object to test |
| verbose | `Boolean` | Display verbose |

