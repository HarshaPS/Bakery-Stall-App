require('babel-register')({
    "presets": [
        [
            "env", {
                "targets": {
                    "node": "current"
            }
        }
        ]
    ]
})
require("babel-core/register");
require("babel-polyfill");