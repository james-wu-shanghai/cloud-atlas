/**
 * Created by jameswu on 16-12-19.
 */
var jsonConvert = {
    pics: ['blue.png',
        'dark-red.png',
        'golden.png',
        'green-white.png',
        'pink.png',
        'red-black.png',
        'solar.jpg',
        'very-red.png',
        'white.png',
        'yellow.png'],
    valid_suffix: ["-gw", "-app", "-svc", "-srv", "-web"],
    convert: function (entityJson) {
        var domains = [];

        for (var i = 0; i < entityJson.length; i++) {
            var entity = entityJson[i];
            for (var j = 0; j < this.valid_suffix.length; j++) {
                if (this.endWith(entity.key, this.valid_suffix[j])) {
                    var planet = this.generatePlanet(entity);
                    if (planet.domainName != null)
                        this.insertPlanet(domains, planet);
                }
            }
        }
        for (var i = 0; i < domains.length; i++) {
            var domain = domains[i];

            domain.pic = this.pics[i % this.pics.length]
            domain.x = 250 / 8 * (i % 8) - 125;
            domain.y = 250 / 8 * (i / 8) - 125;
        }

        return domains;
    }
    ,
    endWith: function (original, suffix) {
        if (suffix == null || suffix == "" || this.length == 0 || suffix.length > this.length)
            return false;
        if (original.substring(original.length - suffix.length) == suffix)
            return true;
        else
            return false;
        return true;
    }
    ,

    generatePlanet: function (entity) {
        var planet = {};
        planet.name = entity.key;
        planet.size = 1;
        planet.domainName = entity.attributes.module;
        return planet;
    }
    ,

    insertPlanet: function (domains, planet) {
        for (var i = 0; i < domains.length; i++) {
            var domain = domains[i];
            if (domain.name == planet.domainName) {
                domains[i].planets.push(planet);
                return;
            }
        }
        var domain = {};
        domain.name = planet.domainName;
        domain.planets = [planet];
        domains.push(domain);
    }
}
