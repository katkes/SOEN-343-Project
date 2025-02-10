import * as dotenv from "dotenv";
// config dotenv such that all imported files can use it
dotenv.config()

// flag to check if all variables are properly defined
let areEnvsDefinedProperly = true

/**
 * Function to check if the environment variable was properly set.
 * 
 * @param variableName variable name in the .env file
 * @param defaultValue define a default value to accept if variable is not defined
 * @returns {string}
 */
function checkEnvironmentVar(variableName: string, defaultValue?: string): string {
    let envVar = process.env[variableName]
    if (!envVar) {
        if (defaultValue == undefined) {
            console.error(`${variableName} was not defined in the environment variables. Please make sure to defined it.`)
            areEnvsDefinedProperly = false
            return ""
        }
        return defaultValue
    }
    return envVar
}


// Define environment variables needed here
export const ENV_VARS = {
    DB_CONN_STRING: checkEnvironmentVar("DB_CONN_STRING"),
    DB_NAME: checkEnvironmentVar("DB_NAME"),
    PORT: checkEnvironmentVar("PORT", "3000")
} as const


// safeguard to not run the program in case env variables are not properly set
if (!areEnvsDefinedProperly) {
    console.error("Environment variables are not all properly defined")
    process.exit(1)
}