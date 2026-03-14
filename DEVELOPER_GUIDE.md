# InsightCalculator Platform - Developer Guide

## Quick Start for New Developers

Welcome to the InsightCalculator platform! This guide helps you understand the architecture, add new calculators, and maintain the system.

---

## 1. System Architecture Overview

### The Three-Layer Architecture

```
┌─────────────────────────────────────────┐
│   User Interface Layer (React/TSX)      │
│   - CalculatorEngine.tsx (Universal UI) │
│   - Parses inputs, displays results      │
└────────────────┬──────────────────────┘
                 │ config prop
                 ▼
┌─────────────────────────────────────────┐
│   Data Layer (JSON Files)               │
│   - /public/calculators/*.json          │
│   - Defines fields, formula, outputs    │
│   - loadCalculator() fetches these      │
└────────────────┬──────────────────────┘
                 │ formula + values
                 ▼
┌─────────────────────────────────────────┐
│   Calculation Engine (TypeScript)       │
│   - formulaEngine.ts                    │
│   - evaluateCalculator() routes calls   │
│   - Computes results mathematically     │
└─────────────────────────────────────────┘
```

---

## 2. Adding a New Calculator

### Step 1: Create JSON Definition

Create `/public/calculators/{slug}.json`:

```json
{
  "slug": "personal-loan-calculator",
  "name": "Personal Loan Calculator",
  "description": "Calculate EMI for personal loans with flexible tenure",
  "category": "Finance",
  "fields": [
    {
      "key": "principal",
      "label": "Loan Amount (₹)",
      "type": "number",
      "placeholder": "5,00,000"
    },
    {
      "key": "rate",
      "label": "Interest Rate (%)",
      "type": "number",
      "placeholder": "10.5"
    },
    {
      "key": "tenure",
      "label": "Tenure (Years)",
      "type": "number",
      "placeholder": "5"
    }
  ],
  "formula": "EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)",
  "computationType": "emi",
  "outputs": [
    {
      "key": "monthlyEMI",
      "label": "Monthly EMI (₹)",
      "format": "currency"
    },
    {
      "key": "totalAmount",
      "label": "Total Amount Payable (₹)",
      "format": "currency"
    },
    {
      "key": "totalInterest",
      "label": "Total Interest (₹)",
      "format": "currency"
    }
  ],
  "example": {
    "inputs": {
      "principal": 500000,
      "rate": 10.5,
      "tenure": 5
    },
    "outputs": {
      "monthlyEMI": 10625,
      "totalAmount": 6375000,
      "totalInterest": 1375000
    }
  },
  "faqs": [
    {
      "question": "Can I pay EMI online?",
      "answer": "Yes, most banks offer online EMI payment through net banking or auto-debit."
    },
    {
      "question": "Is there prepayment penalty?",
      "answer": "No penalty for prepayment in personal loans after first 6 months."
    }
  ]
}
```

### Step 2: Add Computation Type (If New)

If `computationType` is new (not emi/sip/compound/gst/etc.):

Edit `src/lib/formulaEngine.ts`:

```typescript
function evaluateCalculator(input: ComputeInput): any {
  const { computationType, values } = input;

  // ... existing cases ...

  case 'personal-loan':
    return {
      monthlyEMI: EMI(
        values.principal,
        values.rate / 12 / 100,
        values.tenure * 12
      ),
      totalAmount: /* calculation */,
      totalInterest: /* calculation */
    };

  // Add more cases as needed
}
```

### Step 3: Update Calculator List

Edit `src/lib/loadCalculator.ts`:

```typescript
const CALCULATOR_SLUGS = [
  'home-loan-emi',
  'personal-loan-calculator', // Add here
  'sip',
  // ... rest
];
```

### Step 4: Create Markdown Content

Create `/public/content/calculators/{slug}.md`:

- 2,000-4,000 words
- Include: introduction, formula breakdown, examples, FAQs
- Follow structure of existing markdown files
- Add internal links to related calculators

### Step 5: Test

```bash
# Build locally
npm run build

# Check if [slug]/page.tsx generates correctly
# Verify JSON structure
npm run dev  # Open http://localhost:3000/calculators/personal-loan-calculator
```

---

## 3. Formula Engine Computation Types

### Existing Types (Ready to Use)

#### `emi` - Loan EMI Calculation
```typescript
// Inputs: principal, annualRate, months
// Returns: monthlyEMI
case 'emi':
  return EMI(principal, monthlyRate, months);
```

#### `sip` - Systematic Investment Plan
```typescript
// Inputs: monthlyAmount, annualRate, months
// Returns: futureValue
case 'sip':
  return futureValueAnnuity(monthly, monthlyRate, months);
```

#### `compound` - Compound Interest
```typescript
// Inputs: principal, rate, time, frequency
// Returns: maturityAmount
case 'compound':
  return principal * Math.pow(1 + rate/frequency, frequency*time);
```

#### `simple` - Simple Percentage/Math
```typescript
// Inputs: principal, rate, time
// Returns: simple calculation
case 'simple':
  return principal + (principal * rate * time / 100);
```

#### `gst` - Goods and Services Tax
```typescript
// Inputs: amount, gstRate
// Returns: gstAmount, totalWithGST
case 'gst':
  const gstAmount = amount * (gstRate / 100);
  return { gstAmount, totalWithGST: amount + gstAmount };
```

#### `cagr` - Compound Annual Growth Rate
```typescript
// Inputs: initialValue, finalValue, years
// Returns: cagr percentage
case 'cagr':
  return (Math.pow(finalValue/initialValue, 1/years) - 1) * 100;
```

#### `annuity` - Future Value of Annuity
```typescript
// Inputs: payment, rate, periods
// Returns: futureValue
case 'annuity':
  return futureValueAnnuity(payment, rate, periods);
```

### Adding New Computation Types

1. **Check if existing type applies**
   - Many calculators reuse same math (e.g., EMI, SIP, compound)

2. **If truly new**, implement in `formulaEngine.ts`:
   ```typescript
   function myNewCalculation(a: number, b: number): number {
     // Your math here
     return result;
   }
   ```

3. **Add case in evaluateCalculator()**:
   ```typescript
   case 'my-new-type':
     return myNewCalculation(values.a, values.b);
   ```

---

## 4. Component Usage

### Using CalculatorEngine Component

```tsx
import { CalculatorEngine } from '@/components/CalculatorEngine';
import { loadCalculator } from '@/lib/loadCalculator';

export default async function CalculatorPage({ params }: Props) {
  const config = await loadCalculator(params.slug);
  
  return (
    <CalculatorEngine 
      config={config}
      addToRecent={(slug) => {
        // Track recently viewed
      }}
    />
  );
}
```

### Component Props

```typescript
interface CalculatorEngineProps {
  config: CalculatorConfig;           // JSON configuration
  addToRecent?: (slug: string) => void; // Optional recent tracker
}
```

### CalculatorConfig Interface

```typescript
interface CalculatorConfig {
  slug: string;
  name: string;
  description: string;
  category: string;
  fields: CalculatorField[];
  formula: string;
  computationType: string;
  outputs: CalculatorOutput[];
  example: CalculatorExample;
  faqs: CalculatorFAQ[];
}

interface CalculatorField {
  key: string;
  label: string;
  type: 'number' | 'percentage' | 'text' | 'select';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

interface CalculatorOutput {
  key: string;
  label: string;
  format: 'currency' | 'percentage' | 'number' | 'text';
}
```

---

## 5. Common Tasks

### Task: Add a new calculator type that exists

**Example**: Adding "property-tax-calculator" (uses `gst` computation)

1. Create `/public/calculators/property-tax.json`
2. Set `"computationType": "gst"` (reuses tax calculation)
3. Define fields: property-value, tax-rate
4. Define outputs: tax-amount, total-cost
5. Create markdown content
6. Test and deploy

**No code changes needed!** ✓

### Task: Add a new computation type

**Example**: Adding "depreciation" calculation for accountants

1. Implement math function in `formulaEngine.ts`:
   ```typescript
   function depreciation(cost: number, salvage: number, years: number, method: string) {
     if (method === 'straight-line') {
       return (cost - salvage) / years;
     }
     // ... other methods
   }
   ```

2. Add case in `evaluateCalculator()`:
   ```typescript
   case 'depreciation':
     return {
       annualDepreciation: depreciation(/* ... */),
       // ... outputs
     };
   ```

3. Create calculator JSON with `"computationType": "depreciation"`
4. Test with example values
5. Document in this file

### Task: Update input validation

**Example**: Personal loan calculator should reject negative amounts

Edit `CalculatorEngine.tsx`:

```typescript
// Add validation in handleInputChange
if (key === 'principal' && value < 0) {
  setError('Loan amount cannot be negative');
  return;
}
```

### Task: Update markdown content

1. Edit `/public/content/calculators/{slug}.md`
2. Follow existing structure (intro, formula, examples, FAQs)
3. Ensure 2,000+ words for SEO
4. Add internal links to related calculators
5. Redeploy (markdown cached 1 week)

### Task: Add new output format

**Example**: Add "time" format (hours:minutes:seconds)

1. Update `OutputFormat` type in interfaces
2. Add case in formatter:
   ```typescript
   case 'time':
     return formatTime(value);
   ```
3. Use in calculator JSON: `"format": "time"`

---

## 6. Testing Checklist

### Before Deploying New Calculator

- [ ] JSON file valid (use online JSON validator)
- [ ] All required fields present
- [ ] Example calculation verified manually
- [ ] Formula description clear
- [ ] FAQs answer common questions
- [ ] Markdown content 2,000+ words
- [ ] Internal links to related calculators
- [ ] Build succeeds: `npm run build`
- [ ] Page renders: `npm run dev` → `/calculators/{slug}`
- [ ] All inputs parse correctly
- [ ] Results match expected calculation
- [ ] Mobile responsive layout works
- [ ] Schema.org structured data validates

---

## 7. Performance Optimization

### Bundle Size Impact

Each new **calculator JSON** adds:
- ~2-3KB per file (at /public/calculators)
- Minimal impact (cached 1 year)

Each new **computation type** adds:
- ~500 bytes of function code
- Only loaded once at runtime
- Not bundled for each calculator

Each new **markdown file** adds:
- ~10-20KB when fetched
- Not in client bundle (server-side)
- Cached 1 week in browser

### Optimization Tips

1. **Reuse computation types** when possible
   - Don't create new type for minor variations
   - Use parameters to handle differences

2. **Keep JSON compact**
   - Remove unnecessary fields
   - Use short, clear labels
   - Compress with gzip (automatic)

3. **Lazy load markdown**
   - Only fetch when needed
   - Cache aggressively
   - Use static generation when possible

4. **Monitor bundle size**
   ```bash
   npm run build
   # Check .next/static/chunks size
   ```

---

## 8. Debugging Guide

### Issue: Calculator page throws error

1. Check JSON syntax:
   ```bash
   cat public/calculators/{slug}.json # Should output valid JSON
   ```

2. Check required fields in JSON:
   - slug, name, description ✓
   - category, fields ✓
   - formula, computationType ✓
   - outputs, example, faqs ✓

3. Check computation type exists:
   ```typescript
   // In formulaEngine.ts, case should handle computationType value
   ```

4. Check field keys match formula:
   ```json
   // Formula references values.principal, values.rate
   // Fields must have keys: "principal", "rate"
   ```

### Issue: Results are incorrect

1. Verify formula in documentation is correct
2. Test math manually:
   ```javascript
   const result = EMI(500000, 0.00875, 60);
   // Should equal ~10,625 for personal loan example
   ```

3. Check output formatting:
   ```typescript
   // currency format might hide decimals
   // number format shows all decimals
   ```

4. Check for rounding errors:
   ```typescript
   // Use round(value, 2) for 2 decimal places
   ```

### Issue: Build fails

```bash
# Check TypeScript errors
npm run build -- --debug

# Check import errors
grep -r "cannot find module" .next

# Clear cache and retry
rm -rf .next
npm run build
```

### Issue: Page loads but no calculator visible

1. Check console for errors: F12 → Console
2. Check network tab for failed requests
3. Verify calculator slug in URL matches JSON filename
4. Check loadCalculator() successfully fetches JSON

---

## 9. Code Style & Conventions

### Naming Conventions

- **Calculator slug**: kebab-case (personal-loan, sip-calculator)
- **JSON files**: {slug}.json
- **Variables**: camelCase (monthlyEMI, principal)
- **Functions**: camelCase (EMI(), futureValue())
- **Constants**: UPPER_SNAKE_CASE (CANONICAL_DOMAIN)

### TypeScript Style

- Always type function parameters
- Use `interface` for configs
- Export types for external use
- Document complex functions

```typescript
/**
 * Calculate EMI for loan
 * @param principal - Loan amount in rupees
 * @param monthlyRate - Monthly interest rate (as decimal)
 * @param months - Tenure in months
 * @returns Monthly EMI amount
 */
function EMI(principal: number, monthlyRate: number, months: number): number {
  // ...
}
```

### File Organization

```
src/
├── app/
│   ├── calculators/[slug]/page.tsx    (Page component)
│   └── calculators/page.tsx           (List page)
├── components/
│   └── CalculatorEngine.tsx           (Universal UI)
├── lib/
│   ├── formulaEngine.ts               (Calculations)
│   ├── loadCalculator.ts              (JSON loader)
│   └── utils.ts                       (Helpers)
public/
├── calculators/                       (JSON definitions)
│   └── *.json
└── content/calculators/               (SEO markdown)
    └── *.md
```

---

## 10. Deployment Process

### Before Pushing

```bash
# Format code
npm run format

# Type check
npm run type-check

# Build
npm run build

# Test calculations
npm run test:math  # If test file exists
```

### After Pushing to GitHub

1. GitHub Actions builds automatically
2. Vercel deploys on main branch
3. Check deployment logs for errors
4. Test on staging environment
5. Verify Lighthouse scores >90

### Rollback if Issues

```bash
git log --oneline
git revert <commit-hash>
git push origin main
```

---

## 11. FAQ for Developers

**Q: Can I use external libraries for calculations?**
A: Yes, but prefer native JS for small formulas. Avoid large libraries.

**Q: How do I handle currency conversion?**
A: Create new calculation type with exchange rates. Store rates in config JSON.

**Q: Should calculators support multiple currencies?**
A: Yes, add `currency` field to JSON, update formatter to use selected currency symbol.

**Q: How do I add calculator permissions/access control?**
A: Not yet implemented. Future enhancement for premium features.

**Q: Can calculators call external APIs?**
A: Not recommended. Calculations should be deterministic and run client-side.

**Q: How do I add real-time data (like live rates)?**
A: Consider separate data service. May impact performance.

---

## 12. Resources

- [Financial Formulas Reference](https://www.investopedia.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Schema.org Documentation](https://schema.org/)

---

## 13. Getting Help

- **Architecture questions**: Check REFACTORING_COMPLETE.md
- **Formula implementation**: Review formulaEngine.ts examples
- **Component usage**: See CalculatorEngine.tsx implementation
- **JSON structure**: Examine existing .json files in /public/calculators
- **Markdown format**: Follow patterns in /public/content/calculators

---

**Last Updated**: 2024
**Maintained By**: InsightCalculator Team
**Next Review**: Q2 2024
