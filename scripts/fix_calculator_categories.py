from pathlib import Path

path = Path(__file__).resolve().parent.parent / "src" / "data" / "calculators.ts"
text = path.read_text(encoding="utf-8")

# Update category values to the new SEO-friendly keys.
replacements = {
    'category: "Finance"': 'category: "loans"',
    'category: "Investment"': 'category: "investment"',
    'category: "Tax"': 'category: "tax"',
    'category: "Savings"': 'category: "savings"',
    'category: "Government"': 'category: "government"',
    'category: "Creator Economy"': 'category: "creator"',
    'category: "Business"': 'category: "business"',
}

for old, new in replacements.items():
    text = text.replace(old, new)

path.write_text(text, encoding="utf-8")
print("Updated category values in calculators.ts")
