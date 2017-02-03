/**
 * Created by jameswu on 17-1-30.
 */
(function () {
    function LinkPlugin() {
        this.name = 'linkView'
        var inited = LinkPlugin.prototype.inited = false;


        this.init = function () {
            if (inited)
                return this;
            var linkUrl = globalConfig.localMode ?
                'src/plugins/linkPlugin/data/all-dependencies.json' : globalConfig.contextPath + '/service/sso/domains/all-dependencies';
            d3.json(linkUrl, function (error, edgesJson) {
                progressUtils.progress(50, '加载域依赖中')
                if (error)
                    alert(error)
                atlas.edges = edgesJson;
                atlas.edgesMap = function (edgesJson) {
                    var map = {}
                    for (var i = 0; i < edgesJson.length; i++) {
                        var edges = edgesJson[i];
                        map[edges.name] = edges;
                    }
                    return map;
                }(edgesJson);
            })
            inited = true;
            return this;
        }
    }

    window.LinkPlugin = new LinkPlugin();
    cp.register(window.LinkPlugin);

}).call(this)
