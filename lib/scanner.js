/**
 * User: Hui Xie
 * Date: 14-3-9
 * Time: 下午3:17
 * To change this template use File | Settings | File Templates.
 */

var router = require('koa-router'),
    path = require('path'),
    fsutil = require('./fsutil')();

module.exports = function (app) {
    var exports = {};
    app.use(router(app));
    this.r = app;

    exports.scan = function(dir) {
        fsutil.recurse(dir, function(abspath, rootdir, subdir, filename) {
            if (path.extname(abspath) === '.js') {
                abspath = path.resolve(abspath);
                require(abspath.substring(0, abspath.length - 3))(app);
            }
        });
    };

    return exports;
}

