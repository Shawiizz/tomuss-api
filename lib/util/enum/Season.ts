export enum Season {
    AUTOMNE = "Automne", // First semester of school year
    PRINTEMPS = "Printemps" // Second semester of school year
}

export const asSeason = (season: string): Season => {
    switch (season) {
        case "Automne":
            return Season.AUTOMNE
        case "Printemps":
            return Season.PRINTEMPS
        default:
            throw new Error(`Invalid season: ${season}`)
    }
}