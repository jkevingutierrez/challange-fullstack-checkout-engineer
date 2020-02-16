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


export interface AddresValidationSuggestion { 
    /**
     * postal code
     */
    zipCode?: string;
    /**
     * city
     */
    city?: string;
    /**
     * house number
     */
    houseNumber?: string;
    /**
     * street
     */
    street?: string;
    /**
     * province
     */
    province?: string;
    /**
     * formatted address
     */
    formattedAddress?: string;
}
