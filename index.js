/**
 * Error codes thrown during voucher redemption.
 */
export var VoucherError;
(function (VoucherError) {
    /** The provided phone number is empty or contains non-numeric characters. */
    VoucherError["INVALID_PHONE"] = "INVALID_PHONE";
    /** The voucher code is missing or does not meet the required 35-character length. */
    VoucherError["INVALID_VOUCHER"] = "INVALID_VOUCHER";
})(VoucherError || (VoucherError = {}));
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
export async function VoucherRedeem(phone = "", voucherCode = "") {
    phone = phone.trim();
    if (!phone.length || /\D/.test(phone)) {
        throw new Error(VoucherError.INVALID_PHONE);
    }
    const parts = voucherCode.split("v=");
    const extractedCode = (parts[1] || parts[0]).match(/[0-9A-Za-z]+/)?.[0];
    if (!extractedCode || extractedCode.length !== 35) {
        throw new Error(VoucherError.INVALID_VOUCHER);
    }
    const response = await fetch(`https://gift.truemoney.com/campaign/vouchers/${extractedCode}/redeem`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mobile: phone, voucher_hash: extractedCode })
    }).then(res => res.json());
    if (response.status.code === "SUCCESS" && response.data) {
        return {
            amount: Number(response.data.my_ticket.amount_baht.replace(/,/g, '')),
            name: response.data.owner_profile.full_name,
            code: extractedCode
        };
    }
    throw new Error(response.status.code);
}
;
