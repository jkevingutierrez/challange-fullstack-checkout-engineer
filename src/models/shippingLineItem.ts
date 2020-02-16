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
import { Discount } from './discount';
import { LineItemPricing } from './lineItemPricing';
import { TimeInterval } from './timeInterval';


export interface ShippingLineItem { 
    /**
     * The name of shipping method
     */
    name: string;
    /**
     * The explanation of shipping method
     */
    description?: string;
    /**
     * The unique shipping method id
     */
    id: string;
    /**
     * The price information
     */
    pricing: LineItemPricing;
    /**
     * The collection of discount. Shipping line item can have multiple discount.
     */
    discountList?: Array<Discount>;
    /**
     * Carier service name
     */
    carrierServiceName?: string;
    /**
     * The delivery range of shipment
     */
    delivery?: TimeInterval;
}
