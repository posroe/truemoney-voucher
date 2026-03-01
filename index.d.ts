/**
 * Represents the result of a successful voucher redemption.
 */
export interface VoucherReturn {
    /** The redeemed amount in Thai Baht. */
    amount: number;
    /** The full name of the voucher owner. */
    name: string;
    /** The extracted voucher hash code. */
    code: string;
}
/**
 * Represents the raw API response from the TrueMoney voucher redemption endpoint.
 */
export interface VoucherResponse {
    status: {
        /** The response status code, e.g. `"SUCCESS"`. */
        code: string;
    };
    data?: {
        my_ticket: {
            /** The redeemed amount as a formatted string, e.g. `"50.00"`. */
            amount_baht: string;
        };
        owner_profile: {
            /** The full name of the voucher owner. */
            full_name: string;
        };
    };
}
/**
 * Error codes thrown during voucher redemption.
 */
export declare enum VoucherError {
    /** The provided phone number is empty or contains non-numeric characters. */
    INVALID_PHONE = "INVALID_PHONE",
    /** The voucher code is missing or does not meet the required 35-character length. */
    INVALID_VOUCHER = "INVALID_VOUCHER"
}
/**
 * Redeems a TrueMoney voucher for the given phone number.
 *
 * Accepts either a raw 35-character voucher hash or a full URL containing `v=<hash>`.
 *
 * @param phone - The recipient's phone number (digits only).
 * @param voucherCode - The voucher link or raw hash code.
 * @returns A {@link VoucherReturn} object containing the amount, owner name, and code.
 * @throws {Error} {@link VoucherError.INVALID_PHONE} if the phone number is empty or non-numeric.
 * @throws {Error} {@link VoucherError.INVALID_VOUCHER} if the voucher code is invalid.
 * @throws {Error} The API status code if the redemption fails.
 */
export declare function VoucherRedeem(phone?: string, voucherCode?: string): Promise<VoucherReturn>;
