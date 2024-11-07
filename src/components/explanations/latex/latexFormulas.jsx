export const latexFormulas = [
    {
      name: "Fraction",
      syntax: "\\frac{numerator}{denominator}",
      example: "\\frac{1}{2}",
      rendered: "½",
      description: "Creates a fraction with the first argument as numerator and second as denominator.",
      tips: [
        "Use \\dfrac for display-style (larger) fractions",
        "Nested fractions are supported: \\frac{1}{\\frac{2}{3}}",
      ],
      category: "basic"
    },
    {
      name: "Square Root",
      syntax: "\\sqrt{content}",
      example: "\\sqrt{16}",
      rendered: "√16",
      description: "Creates a square root symbol over the content.",
      tips: [
        "Use \\sqrt[n]{x} for nth roots",
        "Nested roots are supported",
      ],
      category: "basic"
    },
    {
      name: "Summation",
      syntax: "\\sum_{lower}^{upper}",
      example: "\\sum_{i=1}^{n} x_i",
      rendered: "Σ(from i=1 to n) xi",
      description: "Creates a summation symbol with lower and upper bounds.",
      tips: [
        "Use _ for subscript (lower bound)",
        "Use ^ for superscript (upper bound)",
      ],
      category: "advanced"
    },
    {
      name: "Integral",
      syntax: "\\int_{lower}^{upper}",
      example: "\\int_{0}^{\\infty} e^{-x} dx",
      rendered: "∫(from 0 to ∞) e^(-x) dx",
      description: "Creates an integral symbol with optional bounds.",
      tips: [
        "Use \\iint for double integrals",
        "Use \\iiint for triple integrals",
      ],
      category: "advanced"
    },
    {
      name: "Matrix",
      syntax: "\\begin{matrix} a & b \\\\ c & d \\end{matrix}",
      example: "\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}",
      rendered: "( 1 2 )",
      description: "Creates a matrix. Use pmatrix for parentheses, bmatrix for square brackets, etc.",
      tips: [
        "Use & to separate columns",
        "Use \\\\ for new rows",
        "Different matrix environments: pmatrix, bmatrix, vmatrix",
      ],
      category: "advanced"
    }
  ];
  
  export const categories = [
    {
      id: "basic",
      name: "Basic Operations",
      description: "Fundamental LaTeX commands for common mathematical operations"
    },
    {
      id: "advanced",
      name: "Advanced Mathematics",
      description: "Complex mathematical notation including integrals, series, and matrices"
    }
  ];