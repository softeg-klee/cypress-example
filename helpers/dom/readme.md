# Helper : dom

Provides tools to handle dom.

## Use

```javascript
import {dom} from 'cypress-example/helpers';
```

## Links

Tools for handle links.

### Methods

### muteLinks(context)

Mute all links in context element.

Ex:

```javascript
import {dom} from 'cypress-example/helpers';

describe('Event on click', () => {
    it('Should trigger event on click', () => {

        cy.visit('/');

        cy.document().then((_document) => {
            // 1. Mute link on click.
            dom.links.muteLinks(_document);
            
            // 2. test
            ...
        });
    });
})

```

#### Options

| Param | Type | Description | | ----- | :--: | ----------- | 
| context | `DOMElement` | The context in which links should be muted |

### unmuteLinks(context)

Unmute all links in context, after they have been muted by muteLinks

Ex:

```javascript
import {dom} from 'cypress-example/helpers';

describe('Event on click', () => {
    it('Should trigger event on click', () => {

        cy.visit('/');

        cy.document().then((_document) => {
            // 1. Mute link on click.
            dom.links.muteLinks(_document);
            
            // 2. test
            ...
            
            // 3. Un mute links. 
            dom.links.unmuteLinks(_document);
        });
    });
})

#### Options

| Param | Type | Description | | ----- | :--: | ----------- | 
| context | `DOMElement` | The context in which links should be muted |

