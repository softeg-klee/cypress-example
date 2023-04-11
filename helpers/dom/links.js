/**
 * Callback that avoid page change when a is clicked.
 *
 * @param evt
 * @returns {boolean}
 */
const muteLinkCb = (evt) => {
    evt.preventDefault();
    return false;
}

/**
 * Mute all links in context.
 *
 * @param context
 */
export function muteLinks(context) {
    (context || document).querySelectorAll('a').forEach(item => {
        item.addEventListener('click', muteLinkCb);
    });
}

/**
 * Unmute all links in context.
 *
 * @param context
 */
export function unmuteLinks(context) {
    (context || document).querySelectorAll('a').forEach(item => {
        item.removeEventListener('click', muteLinkCb);
    });
}
