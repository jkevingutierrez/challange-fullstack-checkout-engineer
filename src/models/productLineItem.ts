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
import { AllowedAction } from './allowedAction';
import { Discount } from './discount';
import { LineItemPricing } from './lineItemPricing';
import { ProductId } from './productId';


export interface ProductLineItem { 
    /**
     * The unique id of product line items
     */
    itemId: string;
    productId: ProductId;
    productName: string;
    canonicalProductName: string;
    productImage: string;
    quantity: number;
    pricing: LineItemPricing;
    gender: string;
    color: string;
    /**
     * size information
     */
    size: string;
    discountList?: Array<Discount>;
    allowedActions?: AllowedAction;
    personalizationFields?: any;
    /**
     * It determines the quantity consumer can add
     */
    maxQuantityAllowed?: number;
    /**
     * It determines whether product is a bonus product.
     */
    isBonusProduct?: boolean;
    /**
     * It determines the type of product
     */
    productType?: ProductLineItem.ProductTypeEnum;
    /**
     * It is the link of PDP where consumer can edit customized products
     */
    editLinkCustomizableProduct?: string;
    /**
     * It shows ATS value of inventory. In CHK-API, we should set to 15 if ATS is 15 or more than 15. We should set to actual value of ATS if ATS is less than 15. Therefore we're align with the logic of PDP. We don't want to expose exact stock information to client side.
     */
    availableStock?: number;
    /**
     * true when product line item was added last. Optional, only available after add item request.
     */
    lastAdded?: boolean;
    /**
     * true when the product is a flash product
     */
    isFlashProduct: boolean;
}
export namespace ProductLineItem {
    export type ProductTypeEnum = 'INLINE' | 'PRE_ORDER' | 'MIADIDAS' | 'YOURREEBOK' | 'PERSONALIZED';
    export const ProductTypeEnum = {
        INLINE: 'INLINE' as ProductTypeEnum,
        PREORDER: 'PRE_ORDER' as ProductTypeEnum,
        MIADIDAS: 'MIADIDAS' as ProductTypeEnum,
        YOURREEBOK: 'YOURREEBOK' as ProductTypeEnum,
        PERSONALIZED: 'PERSONALIZED' as ProductTypeEnum
    }
}
