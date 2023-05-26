import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { Local } from '../../common';
FingerprintJS.load().then(fp => {
    if (!Local('finger')) {
        fp.get().then(result => {
            const visitorId = result.visitorId;
            Local('finger', visitorId)
        });
    }
});
