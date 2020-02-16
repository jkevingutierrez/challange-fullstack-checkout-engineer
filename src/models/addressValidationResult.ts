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
import { AddresValidationSuggestion } from './addresValidationSuggestion';


export interface AddressValidationResult { 
    suggestionList?: Array<AddresValidationSuggestion>;
    /**
     * It shows if address is valid
     */
    isValid?: boolean;
    /**
     * It shows if address is corrected
     */
    isCorrected?: boolean;
    /**
     * It's a token returned by address validation service (optional)
     */
    jobToken?: string;
    /**
     * It shows how many times we can reuse jobtoken (optional)
     */
    jobTokenRemainingUsage?: number;
}
