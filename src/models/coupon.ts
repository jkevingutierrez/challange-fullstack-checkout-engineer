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


export interface Coupon { 
    /**
     * The unique id of coupon
     */
    id?: string;
    /**
     * The voucher code consumers can apply on basket
     */
    couponCode: string;
    /**
     * Enum of string
     */
    statusCode?: Coupon.StatusCodeEnum;
    /**
     * A flag indicating whether the coupon item is valid. A coupon line item is valid if the status code is 'applied' or 'no_applicable_promotion'.
     */
    valid?: boolean;
    /**
     * Localized message regarding status code. It's a plain text
     */
    message?: string;
}
export namespace Coupon {
    export type StatusCodeEnum = 'coupon_code_already_in_basket' | 'coupon_code_already_redeemed' | 'coupon_code_unknown' | 'coupon_disabled' | 'redemption_limit_exceeded' | 'customer_redemption_limit_exceeded' | 'timeframe_redemption_limit_exceeded' | 'no_active_promotion' | 'coupon_already_in_basket' | 'no_applicable_promotion' | 'applied' | 'adhoc';
    export const StatusCodeEnum = {
        CouponCodeAlreadyInBasket: 'coupon_code_already_in_basket' as StatusCodeEnum,
        CouponCodeAlreadyRedeemed: 'coupon_code_already_redeemed' as StatusCodeEnum,
        CouponCodeUnknown: 'coupon_code_unknown' as StatusCodeEnum,
        CouponDisabled: 'coupon_disabled' as StatusCodeEnum,
        RedemptionLimitExceeded: 'redemption_limit_exceeded' as StatusCodeEnum,
        CustomerRedemptionLimitExceeded: 'customer_redemption_limit_exceeded' as StatusCodeEnum,
        TimeframeRedemptionLimitExceeded: 'timeframe_redemption_limit_exceeded' as StatusCodeEnum,
        NoActivePromotion: 'no_active_promotion' as StatusCodeEnum,
        CouponAlreadyInBasket: 'coupon_already_in_basket' as StatusCodeEnum,
        NoApplicablePromotion: 'no_applicable_promotion' as StatusCodeEnum,
        Applied: 'applied' as StatusCodeEnum,
        Adhoc: 'adhoc' as StatusCodeEnum
    }
}
