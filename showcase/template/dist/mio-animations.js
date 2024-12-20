this.MiOAnimations = (function () {
    'use strict';

    class Constellation {
    }

    const MiOAnimations = {
        MiOConstellation: Constellation
    };
    // @ts-ignore
    window.MiOAnimations = {
        MiOConstellation: Constellation
    };

    return MiOAnimations;

})();
