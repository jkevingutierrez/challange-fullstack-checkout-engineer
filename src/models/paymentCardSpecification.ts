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


export interface PaymentCardSpecification { 
    /**
     * The type of the payment card.
     */
    cardType?: string;
    /**
     * The localized description of the payment card.
     */
    name?: string;
    /**
     * The localized description of the payment card.
     */
    description?: string;
    /**
     * A flag indicating whether the card number is verified using the Luhn checksum algorithm.
     */
    checksumVerificationEnabled?: boolean;
    /**
     * The sorted list of number lengths (individual lengths as well as length ranges).
     */
    numberLengthList?: Array<string>;
    /**
     * The sorted list of number prefixes (individual prefixes as well as prefix ranges).
     */
    numberPrefixes?: Array<string>;
    /**
     * The length of the security code for this card.
     */
    securityCodeLength?: number;
}
