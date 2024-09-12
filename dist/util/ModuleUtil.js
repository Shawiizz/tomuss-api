"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeModulesWithSameUeId = void 0;
/**
 * Merge modules with the same UE ID
 * Example : UE-XXXXX and UE-XXXXX@1 are the same UE
 *
 * @param modules The modules array
 */
const mergeModulesWithSameUeId = (modules) => {
    const treatedModules = [];
    for (const module of modules) {
        const treatedModule = treatedModules.find(treatedModule => treatedModule.ue.split('@')[0] === module.ue.split('@')[0]);
        if (!treatedModule) {
            treatedModules.push(module);
            continue;
        }
        treatedModule.notes.push(...module.notes);
    }
    return treatedModules;
};
exports.mergeModulesWithSameUeId = mergeModulesWithSameUeId;
//# sourceMappingURL=ModuleUtil.js.map