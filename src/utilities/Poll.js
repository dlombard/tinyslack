/**
  * Class: Poll
  * Handles polling any passed method,
  * and provides means of termination, etc.
  *
  * Parameters:
  *   method: Function
  *   Called on a regular interval
  *
  *   options: object (optional)
  *   {
  *     interval: integer
  *       default: 10000
  *       The interval at which the polling function executes.
  *     maxIterations: integer
  *       The number of times to poll before exiting.
  *     maxRetries: integer
  *       The number of times to retry failed calls before exiting.
  *   }
  */


 export default class Poll {
  validator = {
    set: function(obj, prop, value) {
      switch (prop) {
        case 'method': {
          if (!value) {
            throw new ReferenceError(`${prop} must have a value.`)
          }

          if (typeof value !== 'function') {
            throw new TypeError(`${prop} must be a function.`)
          }

          break
        }

        case 'clientOptions': {
          if (value && typeof value !== 'object') {
            throw new TypeError('Options passed to LongPoll must be an object.')
          }

          break
        }

        case 'interval':
        case 'maxIterations':
        case 'maxRetries': {
          if (value && !Number.isInteger(value)) {
            throw new TypeError(`${prop} must be an Integer.`)
          }
        }
      }

      obj[prop] = value

      return true
    },
  }


  constructor(method, options) {
    const proxy = new Proxy(this, this.validator)

    if (!method) {
      throw 'Method cannot be undefined'
    }

    proxy.method = method

    // Options
    proxy.clientOptions = options
    proxy.interval = options.interval || 10000
    proxy.maxIterations = options.maxIterations
    proxy.maxRetries = options.maxRetries || 3

    return proxy
  }


  state = {
    iterationCount: 0,
    retryCount: 0,
    paused: false,
    stopped: false,
  }


  // Tries to call passed function until it either
  // succeeds or it attempts to call the function
  // more than than specified with this.maxRetries.
  // eslint-disable-next-line consistent-return
  try = async (func) => {
    const attemptFunction = async () => {
      this.state.retryCount++
      try {
        return await func()
      }
      catch (error) {
        throw error
      }
    }

    try {
      const result = await attemptFunction()
      this.state.retryCount = 0
      return result
    }
    catch (error) {
      if (this.maxRetries > this.state.retryCount) {
        this.tryTimeout = window.setTimeout(() => {
          this.try(func)
        }, this.interval / 2)
      }
      else {
        throw error
      }
    }
  }


  poll = () => {
    if (this.state.stopped || this.state.paused) {
      return
    }

    if (this.maxIterations || this.state.iterationCount >= this.maxIterations) {
      this.stop()
    }

    this.pollTimeout = window.setTimeout(async () => {
      try {
        await this.try(this.method)
        this.state.iterationCount++
        this.poll()
      }
      catch (error) {
        this.stop()
      }
    }, this.interval)
  }


  start() {
    this.state.stopped = false
    // If browser supports it, listen if browser tab is active
    if (typeof document.hidden !== 'undefined') {
      this.visibilityListener =
        document.addEventListener(this.getVisibilityEventName(), this.handleVisibilityChange)

      this.offlineListener = window.addEventListener('offline', () => {
        this.pause()

        this.onlineListener = window.addEventListener('online', () => {
          window.removeEventListener('online', this.onlineListener)
          this.resume()
        })
      })
    }

    this.poll()
  }


  pause() {
    this.state.paused = true
    this.clearPollingTimeouts()
  }


  resume() {
    this.state.paused = false
    this.poll()
  }


  stop() {
    this.state.stopped = true
    this.clearPollingTimeouts()
    this.removeEventListeners()
  }


  clearPollingTimeouts() {
    window.clearTimeout(this.pollTimeout)
    window.clearTimeout(this.tryTimeout)
  }


  removeEventListeners() {
    document.removeEventListener(this.getVisibilityEventName(), this.handleVisibilityChange)
    window.removeEventListener('offline', this.offlineListener)
    window.removeEventListener('online', this.onlineListener)
  }


  handleVisibilityChange = () => {
    const hidden = this.getHiddenProperty()
    // Slows polling speed to 25% of original if tab
    // is inactive
    if (document[hidden]) {
      this.setInterval(this.clientOptions.interval * 4)
    }
    else {
      this.setInterval(this.clientOptions.interval)
      this.clearPollingTimeouts()
      this.poll()
    }
  }


  getVisibilityEventName() {
    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
      return 'visibilitychange'
    }
    else if (typeof document.msHidden !== 'undefined') {
      return 'msvisibilitychange'
    }
    else if (typeof document.webkitHidden !== 'undefined') {
      return 'webkitvisibilitychange'
    }

    return null
  }


  getHiddenProperty() {
    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
      return 'hidden'
    }
    else if (typeof document.msHidden !== 'undefined') {
      return 'msHidden'
    }
    else if (typeof document.webkitHidden !== 'undefined') {
      return 'webkitHidden'
    }

    return null
  }


  setMethod(method) {
    this.method = method
  }


  setInterval(int) {
    this.interval = int
  }


  setMaxIterations(int) {
    this.maxIterations = int
  }


  setMaxRetries(int) {
    this.maxRetries = int
  }
}
