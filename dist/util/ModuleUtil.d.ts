import { Module } from "../models/ModuleModel";
/**
 * Merge modules with the same UE ID
 * Example : UE-XXXXX and UE-XXXXX@1 are the same UE
 *
 * @param modules The modules array
 */
export declare const mergeModulesWithSameUeId: (modules: Module[]) => Module[];
