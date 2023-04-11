# Helper : Configuration

## Use
```javascript
import {conf} from 'cypress-example/helpers'
```

## Methods
### retry(times)
Return retry part configuration for both runMode and openMode.

#### Use
```javascript
it('Should test and retry 3 times', conf.retry(3), () => {
    //...
})
```

| Param | Type | Description |
| ----- | :--: | ----------- |
| times | `number` | Number of retries |
