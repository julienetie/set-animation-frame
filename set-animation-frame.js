(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.SAF = global.SAF || {})));
}(this, (function (exports) { 'use strict';

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
var clearAnimationFrame = function clearAnimationFrame(id) {
  if (setAnimationFrame[id] === true) {
    delete setAnimationFrame[id];
  }
};

/**
 * @param {Function} callback
 * @param {Number} delay
 */
var setAnimationFrame = function setAnimationFrame(callback, delay) {
  var duration = 0;
  var terminate = false;
  var requestId = void 0;
  var canceId = Date.now();

  /**
   * Polyfill requestAnimationFrame & cancelAnimationFrame using
   * request-frame if available.
   */
  var hasRequestFrame = typeof requestFrame === 'function';
  var request = hasRequestFrame ? requestFrame('request') : requestAnimationFrame;
  var cancel = hasRequestFrame ? requestFrame('cancel') : cancelAnimationFrame;

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
  var loop = function loop(timestamp) {
    if (!duration) {
      duration = timestamp;
    }

    if (timestamp > duration + delay && !terminate) {
      if (callback) callback(timestamp);
      terminate = true;
    } else {
      requestId = request(loop);

      if (!setAnimationFrame[canceId]) {
        cancel(requestId);
      }
    }
  };

  /**
   * Start the loop. 
   */
  loop(1);

  /**
   * Returns the unique property name of the execution.
   * @return {Number} - milliseconds.
   */
  return canceId;
};

exports.clearAnimationFrame = clearAnimationFrame;
exports.setAnimationFrame = setAnimationFrame;

Object.defineProperty(exports, '__esModule', { value: true });

})));
