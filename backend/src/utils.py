from decimal import Decimal


def parse_number(s: str) -> float:
    """
    Handles both number formats:
    - Vietnamese:  '84.544,02' → 84544.02
    - English:     '84,544.02' → 84544.02
    - Plain:       '84544.02'
    """

    s = s.strip()

    # Case 1: Vietnamese format: decimal = ',', thousands = '.'
    if "," in s and s.rfind(",") > s.rfind("."):
        s = s.replace(".", "").replace(",", ".")
        return float(s)

    # Case 2: English format: decimal = '.', thousands = ','
    if "." in s and s.rfind(".") > s.rfind(","):
        s = s.replace(",", "")
        return float(s)

    # Case 3: Only comma, no dot → treat comma as decimal
    if "," in s and "." not in s:
        s = s.replace(",", ".")
        return float(s)

    # Case 4: Only dot → normal float
    if "." in s and "," not in s:
        return float(s)

    # Fallback: no separators at all
    return float(s)


def to_decimal(value):
    if value is None:
        return None
    return Decimal(str(value))