"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asSeason = exports.Season = void 0;
var Season;
(function (Season) {
    Season["AUTOMNE"] = "Automne";
    Season["PRINTEMPS"] = "Printemps"; // Second semester of school year
})(Season || (exports.Season = Season = {}));
const asSeason = (season) => {
    switch (season) {
        case "Automne":
            return Season.AUTOMNE;
        case "Printemps":
            return Season.PRINTEMPS;
        default:
            throw new Error(`Invalid season: ${season}`);
    }
};
exports.asSeason = asSeason;
//# sourceMappingURL=Season.js.map