import apiClient from "./apiClient.js";

/*
 * This is a sdk for an existing Lord of the Rings API.
 *
 */
// declare
var oneSDK = {};

// init function
oneSDK.init = function () {
    apiClient(process.env.ONE_API_TOKEN);
};

export default oneSDK