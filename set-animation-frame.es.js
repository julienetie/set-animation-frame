/**
 *  set-animation-frame - Delay function calls without setTimeout.
 *     License:  MIT
 *      Copyright Julien Etienne 2016 All Rights Reserved.
 *        github:  https://github.com/julienetie/set-animation-frame
 *‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 */


/**
 * clearAnimationFrame allows you to
 * interrupt setAnimationFrame and cancel
 * further loops. Similar to clearTimeout.
 * @param {Number} clearId
 */
export const clearAnimationFrame = (id) => {
  if(setAnimationFrame[id] === true){
    delete setAnimationFrame[id];
  }
}


/**
 * @param {Function} callback
 * @param {Number} delay
 */
export const setAnimationFrame = (callback, delay) => {
    let duration = 0;
    let terminate = false;
    let requestId;
    const canceId = Date.now();


    /**
     * Polyfill requestAnimationFrame & cancelAnimationFrame using
     * request-frame if available.
     */
    const hasRequestFrame = typeof requestFrame === 'function';
    const request = hasRequestFrame ? requestFrame('request') : requestAnimationFrame;
    const cancel = hasRequestFrame ? requestFrame('cancel') : cancelAnimationFrame;


    /**
     * The cancelId is a unique identifier for the execution.
     * It is used because it is not possible to calculate
     * the request Id time as this will always be an approximate 
     * value.
     */
    setAnimationFrame[canceId] = true;


    /**
     * The duration increments until it satisfys the delay.
     * Once the delay is ready to be terminated, the requestID
     * is returned. Whilst unsatisfied requestAnimationFrame
     * calls the loop with the incremented timestamp
     */
    const loop = (timestamp) => {
        if (!duration) {
            duration = timestamp;
        }

        if (timestamp > duration + delay && !terminate) {
            if (callback) callback(timestamp);
            terminate = true;
        } else {
            requestId = request(loop);
            
            if(!setAnimationFrame[canceId]){
                cancel(requestId);
            }
        }
    }


    /**
     * Start the loop. 
     */
    loop(1);


    /**
     * Returns the unique property name of the execution.
     * @return {Number} - milliseconds.
     */
    return canceId;
}