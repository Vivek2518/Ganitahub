from pathlib import Path

path = Path(__file__).resolve().parent.parent / "src" / "data" / "calculators.ts"
text = path.read_text(encoding="utf-8")

replacements = {
    '"category": "Finance"': '"category": "loans"',
    '"category": "Investment"': '"category": "investment"',
    '"category": "Tax"': '"category": "tax"',
    '"category": "Savings"': '"category": "savings"',
    '"category": "Government"': '"category": "government"',
    '"category": "Creator Economy"': '"category": "creator"',
    '"category": "Business"': '"category": "business"',
}

for old, new in replacements.items():
    text = text.replace(old, new)

# Also fix the types at the top if needed
text = text.replace(
    'export type CalculatorCategory =\n  | "Finance"\n  | "Investment"\n  | "Tax"\n  | "Savings"\n  | "Government"\n  | "Creator Economy"\n  | "Business";\n',
    'export type CalculatorCategory =\n  | "loans"\n  | "investment"\n  | "savings"\n  | "tax"\n  | "government"\n  | "business"\n  | "creator"\n  | "utility"\n  | "health";\n'
)

path.write_text(text, encoding="utf-8")
print("Updated category values in calculators.ts")
