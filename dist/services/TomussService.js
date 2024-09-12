"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TomussTransformer_1 = require("../util/TomussTransformer");
const TomussParser_1 = require("../util/TomussParser");
class TomussService {
    constructor(authService) {
        this.authService = authService;
    }
    /**
     * Get the TOMUSS page for the given semester
     *
     * @param semester The semester
     */
    getTomussPage(semester) {
        return __awaiter(this, void 0, void 0, function* () {
            const regexUrl = /window.location = "(.*)"/;
            const regexCountdown = /id="t">(\d+\.\d+)/;
            const redirectUrl = yield this.authService.serviceRedirect(semester.getTomussHomeUrl());
            const tomussPageContent = yield this.authService.getPage(redirectUrl.match(regexUrl)[1]);
            const countdownMatch = tomussPageContent.data.match(regexCountdown);
            if (!countdownMatch)
                return tomussPageContent;
            // Wait for the countdown to end
            if (parseFloat(countdownMatch[1]) > 0)
                yield new Promise(resolve => setTimeout(resolve, parseFloat(countdownMatch[1]) * 1000));
            return yield this.authService.getPage(redirectUrl.match(regexUrl)[1]);
        });
    }
    /**
     * Get the modules of the given semesters
     *
     * @param semester The semesters
     */
    getModules(...semester) {
        return __awaiter(this, void 0, void 0, function* () {
            const modules = [];
            for (const sem of semester) {
                const page = yield this.getTomussPage(sem);
                modules.push(...(0, TomussTransformer_1.tomussGradesToModules)((0, TomussParser_1.extractGradesArray)(page.data)));
            }
            return modules;
        });
    }
}
exports.default = TomussService;
//# sourceMappingURL=TomussService.js.map