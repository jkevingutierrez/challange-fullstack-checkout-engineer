/**
 * eCom Checkout API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.3
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface Error400Response { 
    /**
     * A code message in camelCase describing a error category or type (ie. InvalidParameters)
     */
    errorCode?: string;
    /**
     * Additional information, for example a list of missing fields
     */
    messageList?: any;
}
