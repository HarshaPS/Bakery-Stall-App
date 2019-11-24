// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
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

const runApplication = () => {
    require('./index.js');  
}

runApplication();