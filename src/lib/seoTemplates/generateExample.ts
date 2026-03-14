import type { CalculatorConfig } from "@/lib/loadCalculator";

/**
 * Generates a readable example calculation text from calculator's example data
 * Shows a practical scenario with inputs and expected output
 */
export function generateExample(config: CalculatorConfig): string {
  const { name, example, outputs } = config;
  
  if (!example || !example.inputs) {
    return "";
  }

  // Build input description
  const inputDescriptions = Object.entries(example.inputs)
    .map(([key, value]) => {
      const field = config.fields.find(f => f.key === key);
      if (!field) return null;
      
      return formatValueDescription(field.label, value, field.type);
    })
    .filter(Boolean)
    .join("\n");

  // Build output description from example outputs
  let outputDescriptions = "";
  if (example.outputs && typeof example.outputs === 'object') {
    outputDescriptions = Object.entries(example.outputs)
      .map(([key, value]) => {
        const output = outputs.find(o => o.key === key);
        if (!output) return null;
        
        return formatOutputDescription(output.label, value, output.format);
      })
      .filter(Boolean)
      .join("\n");
  }

  // Construct the example text
  const exampleText = `## Example Calculation

**Scenario:** ${getScenarioDescription(config.category, example.inputs)}

**Inputs:**
${inputDescriptions}

**Results:**
${outputDescriptions}

${getScenarioInterpretation(config, example)}`;

  return exampleText;
}

/**
 * Format a value with its corresponding unit/label
 */
function formatValueDescription(label: string, value: any, type: string): string {
  if (typeof value === 'number') {
    const formatted = value.toLocaleString('en-IN');
    
    if (type === 'percentage' || label.includes('%')) {
      return `• ${label}: ${formatted}%`;
    } else if (label.includes('₹') || label.includes('(')) {
      return `• ${label}: ₹${formatted}`;
    } else if (label.includes('Year') || label.includes('Month') || label.includes('(')) {
      return `• ${label}: ${formatted}`;
    } else {
      return `• ${label}: ${formatted}`;
    }
  }
  return `• ${label}: ${value}`;
}

/**
 * Format output value with proper formatting
 */
function formatOutputDescription(label: string, value: any, format: string): string {
  if (typeof value === 'number') {
    let formatted = '';
    
    if (format === 'currency') {
      formatted = `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
    } else if (format === 'percentage') {
      formatted = `${value.toFixed(2)}%`;
    } else {
      formatted = value.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    }
    
    return `• ${label}: ${formatted}`;
  }
  return `• ${label}: ${value}`;
}

/**
 * Generate a contextual scenario description based on calculator category
 */
function getScenarioDescription(category: string, inputs: Record<string, number>): string {
  const scenarios: Record<string, (inputs: Record<string, number>) => string> = {
    "Finance": () => "A typical financial planning scenario",
    "Investment": () => "A practical investment strategy scenario",
    "Tax": () => "A realistic tax calculation scenario",
    "Savings": () => "A common savings scenario",
    "Government": () => "A typical government benefit scenario",
    "Creator Economy": () => "A creator earnings scenario",
    "Business": () => "A business planning scenario",
  };

  const generator = scenarios[category];
  return generator ? generator(inputs) : "A practical calculation scenario";
}

/**
 * Generate interpretation text for the example results
 */
function getScenarioInterpretation(config: CalculatorConfig, example: any): string {
  const { name, computationType } = config;
  
  const interpretations: Record<string, () => string> = {
    "emi": () => {
      const monthlyEMI = example.outputs?.monthlyEMI;
      const totalAmount = example.outputs?.totalAmount;
      
      if (monthlyEMI && totalAmount) {
        return `**What This Means:** You would pay approximately **₹${monthlyEMI.toLocaleString('en-IN')}** every month for the loan tenure. Over the complete loan period, the total amount paid would be **₹${totalAmount.toLocaleString('en-IN')}**.`;
      }
      return "";
    },
    
    "sip": () => {
      const futureValue = example.outputs?.futureValue;
      if (futureValue) {
        return `**What This Means:** By investing consistently through SIP, your investment would grow to approximately **₹${futureValue.toLocaleString('en-IN')}** at the end of the investment period, accounting for regular compounding of returns.`;
      }
      return "";
    },
    
    "compound": () => {
      const finalAmount = example.outputs?.maturityAmount || example.outputs?.finalAmount;
      if (finalAmount) {
        return `**What This Means:** Your initial investment would grow to approximately **₹${finalAmount.toLocaleString('en-IN')}** through the power of compound interest over the specified period.`;
      }
      return "";
    },

    "gst": () => {
      const gstAmount = example.outputs?.gstAmount;
      const totalWithGST = example.outputs?.totalWithGST;
      if (gstAmount && totalWithGST) {
        return `**What This Means:** The GST amount would be **₹${gstAmount.toLocaleString('en-IN')}**, making the final price **₹${totalWithGST.toLocaleString('en-IN')}** including tax.`;
      }
      return "";
    },

    "default": () => {
      const firstOutput = Object.values(example.outputs || {})[0];
      if (typeof firstOutput === 'number') {
        return `**What This Means:** Based on the inputs provided, the calculated result demonstrates how the ${name.toLowerCase()} operates with realistic values.`;
      }
      return "";
    },
  };

  const interpreter = interpretations[computationType] || interpretations["default"];
  return interpreter ? interpreter() : "";
}
