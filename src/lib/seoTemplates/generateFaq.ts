import type { CalculatorConfig, CalculatorFAQ } from "@/lib/loadCalculator";

/**
 * Generates comprehensive FAQ content using calculator metadata
 * Combines provided FAQs with template-generated common questions
 */
export function generateFaqSections(config: CalculatorConfig): CalculatorFAQ[] {
  const { name, fields, computationType, category } = config;

  // Start with provided FAQs
  const faqs: CalculatorFAQ[] = [...(config.faqs || [])];

  // Add template-generated common questions
  const templateFaqs = getTemplateFaqs(name, fields, computationType, category);
  
  // Merge, removing duplicates based on question similarity
  const mergedFaqs = [...faqs];
  
  for (const templateFaq of templateFaqs) {
    const isDuplicate = mergedFaqs.some(faq =>
      faq.question.toLowerCase().includes(templateFaq.question.toLowerCase().split('?')[0])
    );
    if (!isDuplicate) {
      mergedFaqs.push(templateFaq);
    }
  }

  return mergedFaqs.slice(0, 15); // Limit to 15 FAQs for reasonable size
}

/**
 * Generate template-based FAQ entries
 */
function getTemplateFaqs(
  name: string,
  fields: any[],
  computationType: string,
  category: string
): CalculatorFAQ[] {
  const faqs: CalculatorFAQ[] = [];
  const nameWithoutCalculator = name.replace(/\s*Calculator\s*$/i, '').trim();

  // Universal questions applicable to all calculators
  faqs.push({
    question: `What is a ${nameWithoutCalculator}?`,
    answer: `A ${nameWithoutCalculator} is a free online tool that helps you quickly compute ${category.toLowerCase()} calculations without manually working through complex formulas. It's designed to be accurate, fast, and easy to use.`,
  });

  faqs.push({
    question: `How does the ${nameWithoutCalculator} work?`,
    answer: `Enter your values in the input fields provided, and the calculator automatically processes them using the appropriate mathematical formula. The results are displayed instantly with no need to submit or wait.`,
  });

  faqs.push({
    question: `Is this ${nameWithoutCalculator} calculator free?`,
    answer: `Yes, this calculator is completely free to use. There are no hidden charges, subscriptions, or premium versions. You can perform as many calculations as you need at no cost.`,
  });

  faqs.push({
    question: `How accurate are the results from this ${nameWithoutCalculator}?`,
    answer: `The calculator uses standard financial formulas and performs calculations with high precision. Results are rounded to 2 decimal places for practical use. However, actual outcomes may vary based on real-world factors not accounted for in the calculation.`,
  });

  // Category-specific questions
  if (category === "Finance" || category === "Investment") {
    faqs.push({
      question: `Can I use this ${nameWithoutCalculator} for financial planning?`,
      answer: `Yes, this calculator is useful for budgeting and financial planning. However, for comprehensive financial advice, consult with a qualified financial advisor who can consider your complete financial situation.`,
    });
  }

  if (category === "Tax") {
    faqs.push({
      question: `Are the tax calculations current for the latest tax year?`,
      answer: `This calculator uses standard tax formulas and rates. However, tax laws change frequently. Please verify rates with official government resources or consult a tax professional for current, accurate information.`,
    });
  }

  if (category === "Government") {
    faqs.push({
      question: `Can I use this for official government benefit applications?`,
      answer: `This calculator provides estimates for informational purposes. For official benefit calculations or applications, always refer to government resources or contact the relevant government agency directly.`,
    });
  }

  // Input-specific questions
  if (fields.length > 0) {
    const firstField = fields[0];
    faqs.push({
      question: `What should I enter for ${firstField.label.toLowerCase()}?`,
      answer: `Enter your actual or estimated value for ${firstField.label.toLowerCase()}. Use precise numbers for more accurate results. If you're unsure about the value, consider the scenario most relevant to your needs.`,
    });
  }

  // Type-specific questions
  const typeQuestions = getTypeSpecificFaqs(nameWithoutCalculator, computationType);
  faqs.push(...typeQuestions);

  // Usage and accessibility questions
  faqs.push({
    question: `Can I share my calculation results?`,
    answer: `While there's no built-in sharing feature, you can screenshot the results or note down the values to share with others. You can also send someone a link to the calculator so they can perform their own calculations.`,
  });

  faqs.push({
    question: `Is this calculator mobile-friendly?`,
    answer: `Yes, this calculator is fully responsive and works on all devices including smartphones, tablets, and desktop computers. You can use it anytime, anywhere.`,
  });

  faqs.push({
    question: `Is my data stored or saved when using this ${nameWithoutCalculator}?`,
    answer: `No, your data is processed locally in your browser and is not stored on any server. Your privacy is fully protected, and no information is collected or transmitted.`,
  });

  return faqs;
}

/**
 * Generate computation type-specific FAQ questions
 */
function getTypeSpecificFaqs(name: string, type: string): CalculatorFAQ[] {
  const faqs: CalculatorFAQ[] = [];

  const typeQuestions: Record<string, CalculatorFAQ[]> = {
    "emi": [
      {
        question: "Can I change the loan tenure?",
        answer: "Yes, use the tenure input field to see how different loan periods affect your EMI. A longer tenure reduces monthly payments but increases total interest paid.",
      },
      {
        question: "What if interest rates change?",
        answer: "This calculator uses the interest rate you provide. If rates change, adjust the rate field to see the impact on your EMI. Most real loans have fixed rates, but some adjust periodically.",
      },
    ],

    "sip": [
      {
        question: "What's the difference between SIP and lumpsum investment?",
        answer: "SIP involves investing a fixed amount regularly (like ₹5,000 monthly), while lumpsum is a one-time investment. SIP reduces risk through averaging, even if markets are volatile.",
      },
      {
        question: "When should I start investing through SIP?",
        answer: "The earlier you start, the more time your money has to compound and grow. Even small SIP amounts started early can result in substantial corpus due to compound interest over decades.",
      },
    ],

    "compound": [
      {
        question: "What's the difference between compound and simple interest?",
        answer: "Compound interest earns returns on both your principal and accumulated interest, while simple interest only earns on the principal. Compound interest typically results in higher final amounts.",
      },
    ],

    "tax": [
      {
        question: "Are there deductions I should consider?",
        answer: "Yes, many deductions are available under various sections. Common deductions include Life Insurance (Section 80C), Education expenses (Section 80E), and Home Loan Interest (Section 80EE). Consult a tax professional for your specific situation.",
      },
    ],

    "gst": [
      {
        question: "Why do different products have different GST rates?",
        answer: "The government classifies products/services into different GST brackets. Essentials like food have lower rates (0-5%), while luxury items have higher rates (18-28%), to promote fairness in taxation.",
      },
    ],
  };

  return typeQuestions[type] || [];
}

/**
 * Format FAQs for display in structured data (schema.org format)
 */
export function formatFaqForSchema(faqs: CalculatorFAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}
