// <script src="/js/fundebug.0.0.4.js"
        // apikey="" silent="true"></script>
!function(win) {
    function loaded() {
        isPending = false
    }
    function getCurrentScript() {
        var script = document.currentScript;
        if (!script && isPending) {
            var scripts = document.scripts;
            script = scripts[scripts.length - 1]
        }
        return script
    }
    function addEvent(obj, eventType, fn) {
        var oldFn = obj[eventType];
        obj[eventType] = fn(oldFn)
    }
    function inject(e) {
        return "function" != typeof e ? e : (e.__injected__ || (e.__injected__ = function() {
            try {
                return e.apply(this, arguments)
            } catch (err) {
                throw report(err),
                g = true,
                err
            }
        }
        ),
        e.__injected__)
    }
    function queryString() {
        return win.location.href.slice(win.location.href.indexOf("?") + 1)
    }
    function hasApikey(str) {
        var regx = /^[0-9a-z]{64}$/i;
        return !(!str || !str.match(regx))
    }
    function getErrorInfo(err) {
        return err ? {
            name: err && err.name,
            message: err && err.message,
            fileName: err && err.fileName || err && err.sourceURL,
            lineNumber: err && err.lineNumber || err && err.line,
            columnNumber: err && err.columnNumber || err && err.column
        } : null
    }
    function getEmptyStack() {
        var stack;
        try {
            throw new Error("")
        } catch (err) {
            stack = err.stack
        }
        if (stack)
            return stack = stack.replace(/(.*?)fundebug(.*?)\.js(.*)\n?/gm, ""),
            stack = stack.replace(/^Error\n/g, ""),
            stack = "generated-stack:\n" + stack
    }
    function getErrStack() {
        for (var funcName, funcStack = [], fn = arguments.callee.caller.caller; fn && funcStack.length < 10; ) {
            var match = fn.toString().match(/function\s*([\w\_$]+)?\s*\(/i);
            funcName = match && match[1] || "[anonymous]",
            funcStack.push(funcName),
            fn = fn.caller
        }
        return "generated-stack:\n" + funcStack.join("\n")
    }
    function report(err) {
        if (err) {
            var stack = err.stack;
            stack = stack.replace(/(.*?)fundebug(.*?)\.js(.*)\n?/gm, "");
            var errInfo = getErrorInfo(err);
            send({
                name: errInfo.name || "uncaught error",
                message: errInfo.message,
                fileName: errInfo.fileName,
                lineNumber: errInfo.lineNumber,
                columnNumber: errInfo.columnNumber,
                stacktrace: stack,
                severity: "error",
                type: "uncaught"
            })
        }
    }
    function stringify(obj) {
        var result = [];
        for (var key in obj)
            if (obj.hasOwnProperty(key)) {
                var item = '"' + key + '":'
                  , value = obj[key];
                value && ("object" == typeof value ? item += stringify(value) : "number" == typeof value ? item += value : item = item + '"' + value.replace(/\n/g, "\\n") + '"',
                result.push(item))
            }
        return "{" + result.join(",") + "}"
    }
    function send(data) {
        if (hasApikey(currentScript.getAttribute("apikey") || fundebug.apikey) && fundebug.maxEventNumber && !fundebug.silent || data.shouldReport) {
            fundebug.maxEventNumber -= 1;
            var info = {
                notifierVersion: "0.0.5",
                userAgent: win.navigator.userAgent,
                locale: win.navigator.language || win.navigator.userLanguage,
                url: win.location.href,
                queryString: queryString(),
                appVersion: currentScript.getAttribute("appversion") || fundebug.appversion,
                apiKey: currentScript.getAttribute("apikey") || fundebug.apikey,
                releaseStage: currentScript.getAttribute("releasestage") || fundebug.releasestage,
                metaData: data.metaData || fundebug.metaData,
                user: data.user || fundebug.user,
                name: data.name,
                time: (new Date).getTime(),
                message: data.message,
                fileName: data.fileName,
                lineNumber: data.lineNumber,
                columnNumber: data.columnNumber,
                stacktrace: data.stacktrace,
                type: data.type,
                severity: data.severity
            };
            for (var r in info)
                ;
            var infoStr, img = new Image;
            infoStr = "undefined" == typeof JSON ? stringify(info) : JSON.stringify(info),
            img.src = "https://fundebug.com/javascript?event=" + encodeURIComponent(infoStr)
        }
    }

    win.fundebug = {};
    var g = false
      , isPending = "complete" !== document.readyState;

    document.addEventListener ? document.addEventListener("DOMContentLoaded", loaded, true) : win.attachEvent("onload", loaded);

    var currentScript = getCurrentScript();

    fundebug.silent = currentScript.getAttribute("silent") || false;
    fundebug.maxEventNumber = currentScript.getAttribute("maxEventNumber") || 10;

    addEvent(win, "onerror", function() {
        return function(message, file, lineNumber, columnNumber, err) {
            if (g) {
                return void (g = false);
            }

            if (0 !== lineNumber || !/Script error\.?/.test(message)) {
                void 0 === columnNumber && win.event && (columnNumber = win.event.errorCharacter);

                var fileName;

                fileName = file && file !== win.location.href ? file : null;

                var errInfo = getErrorInfo(err);

                send({
                    message: message,
                    lineNumber: lineNumber,
                    columnNumber: columnNumber,
                    fileName: fileName || errInfo && errInfo.fileName,
                    name: errInfo && errInfo.name || "uncaught error",
                    stacktrace: err.stack || getErrStack(),
                    severity: "error",
                    type: "uncaught"
                })
            }
        }
    });

    var shouldCatch = true;
    if (win.atob) {
        if (win.ErrorEvent) {
            try {
                win.ErrorEvent.prototype.hasOwnProperty("error") && (shouldCatch = false)
            } catch (e) {}
        }
    } else {
        shouldCatch = false;
    }

    "EventTarget Window Node ApplicationCache AudioTrackList ChannelMergerNode CryptoOperation EventSource FileReader HTMLUnknownElement IDBDatabase IDBRequest IDBTransaction KeyOperation MediaController MessagePort ModalWindow Notification SVGElementInstance Screen TextTrack TextTrackCue TextTrackList WebSocket WebSocketWorker Worker XMLHttpRequest XMLHttpRequestEventTarget XMLHttpRequestUpload".replace(/\w+/g, function(type) {
        if (shouldCatch) {
            var proto = win[type] && win[type].prototype;
            proto && proto.hasOwnProperty && proto.hasOwnProperty("addEventListener") && (addEvent(proto, "addEventListener", function(e) {
                return function(t, n, r, u) {
                    return n && n.handleEvent && (n.handleEvent = inject(n.handleEvent)),
                    e.call(this, t, inject(n), r, u)
                }
            }),
            addEvent(proto, "removeEventListener", function(e) {
                return function(t, n, r) {
                    return e.call(this, t, n, r),
                    e.call(this, t, inject(n), r)
                }
            }))
        }
    });

    fundebug.notify = function(name, message, option) {
        if (name) {
            send({
                name: name || option && option.name,
                message: message || option && option.message,
                severity: option && option.message || "warning",
                stacktrace: getEmptyStack(),
                type: "notification",
                user: option && option.user,
                metaData: option && option.metaData,
                shouldReport: true
            })
        }
    };

    fundebug.notifyError = function(error, option) {
        if (error) {
            var errInfo = getErrorInfo(error);
            send({
                name: errInfo.name || option && option.name || "caught error",
                message: errInfo.message || option && option.message,
                stacktrace: error.stack,
                fileName: errInfo.fileName,
                lineNumber: errInfo.lineNumber,
                columnNumber: errInfo.columnNumber,
                severity: option && option.severity || "error",
                type: "caught",
                user: option && option.user,
                metaData: option && option.metaData,
                shouldReport: true
            })
        }
    };
}(window);
