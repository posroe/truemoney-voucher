# truemoney-voucher

[![npm version](https://img.shields.io/npm/v/truemoney-voucher.svg)](https://www.npmjs.com/package/truemoney-voucher)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight TypeScript package for redeeming TrueMoney vouchers (อั่งเปาทรูมันนี่) using Bun.

## Installation

Using [Bun](https://bun.sh):

```bash
bun add truemoney-voucher
```

## Usage

```typescript
import { VoucherRedeem, VoucherError } from "truemoney-voucher";

// Basic usage
async function redeemTrueMoneyVoucher() {
  try {
    // Parameters: recipient phone number and voucher code
    const result = await VoucherRedeem(
      "0891234567",
      "v=ABCDE12345FGHIJ67890KLMNO12345PQRST67890",
    );

    console.log(`Received ฿${result.amount} from ${result.name}`);
    return result; // { amount: number, name: string, code: string }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === VoucherError.INVALID_PHONE) {
        console.error("Invalid phone number format");
      } else if (error.message === VoucherError.INVALID_VOUCHER) {
        console.error("Invalid voucher code format");
      } else {
        console.error("API Error:", error.message);
      }
    }
  }
}
```

## API Reference

### `VoucherRedeem(phone: string, voucherCode: string)`

Redeems a voucher and returns the result.

| Parameter     | Type   | Description                                                               |
| ------------- | ------ | ------------------------------------------------------------------------- |
| `phone`       | string | Recipient phone number (digits only)                                      |
| `voucherCode` | string | Voucher code in either direct format or URL parameter format (v=XXXXX...) |

**Returns:**
Promise resolving to a `VoucherReturn` object: `{ amount: number, name: string, code: string }`

### `VoucherError` (Enum/Constants)

- `INVALID_PHONE`: Phone number format is incorrect.
- `INVALID_VOUCHER`: Voucher code format is incorrect.
