# AI Interest Rate Optimizer - User Guide

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Accessing the Application](#accessing-the-application)
  - [Understanding the Interface](#understanding-the-interface)
  - [Role Switching](#role-switching)
  - [Dark Mode](#dark-mode)
- [Dashboard Overview](#dashboard-overview)
  - [KPI Cards](#kpi-cards)
  - [Savings Chart](#savings-chart)
  - [Sensitivity Analysis](#sensitivity-analysis)
  - [Model Performance](#model-performance)
- [TBW View (Wholesale Banking)](#tbw-view-wholesale-banking)
  - [Customer List](#customer-list)
  - [Interest Rate Recommendations](#interest-rate-recommendations)
  - [Customer Details](#customer-details)
- [RDPS View (Retail Banking)](#rdps-view-retail-banking)
  - [Segment List](#segment-list)
  - [Churn Heatmap](#churn-heatmap)
  - [Segment Details](#segment-details)
- [What-if Simulator](#what-if-simulator)
  - [Creating Scenarios](#creating-scenarios)
  - [Adjusting Interest Rates](#adjusting-interest-rates)
  - [Interpreting Results](#interpreting-results)
  - [Comparing Scenarios](#comparing-scenarios)
- [Tips & Best Practices](#tips--best-practices)

---

## Introduction

The AI Interest Rate Optimizer is a powerful web application designed to help banking professionals optimize interest rates for both wholesale (TBW) and retail (RDPS) customers. Using machine learning algorithms, the application provides data-driven recommendations to maximize cost savings while minimizing customer churn risk.

**Key Features:**
- Real-time interest rate recommendations
- Customer and segment analysis
- What-if scenario simulation
- Churn risk assessment
- Cost savings projections
- Interactive dashboards and visualizations

---

## Getting Started

### Accessing the Application

1. Open your web browser (Chrome, Firefox, Safari, or Edge recommended)
2. Navigate to the application URL provided by your administrator
3. The application will load with the Dashboard view by default

**Note:** The application is currently in MVP (Minimum Viable Product) demo mode, using mock data for demonstration purposes.

### Understanding the Interface

The application interface consists of four main areas:

1. **Header** (Top bar)
   - Application title and MVP badge
   - Role switcher (TBW/RDPS toggle)
   - Dark mode toggle
   - User profile information

2. **Sidebar** (Left navigation)
   - Dashboard link
   - TBW View (visible when TBW role is selected)
   - RDPS View (visible when RDPS role is selected)
   - What-if Simulator
   - Version information

3. **Main Content Area** (Center)
   - Displays the current page content
   - Contains charts, tables, and interactive elements

4. **Data Mode Indicator** (Bottom-right, development only)
   - Shows whether the app is using MOCK or API data mode

### Role Switching

The application supports two banking division roles:

**TBW (Transaction Banking Wholesale)**
- Focus on individual wholesale customers
- View customer-specific recommendations
- Analyze large deposit accounts

**RDPS (Retail Deposit Product & Solution)**
- Focus on retail customer segments
- View segment-level recommendations
- Analyze churn risk across segments

**To switch roles:**
1. Locate the role switcher in the header (between the title and dark mode toggle)
2. Click on either "TBW" or "RDPS" button
3. The interface will update to show role-specific views and navigation options

### Dark Mode

The application supports both light and dark themes for comfortable viewing in different lighting conditions.

**To toggle dark mode:**
1. Click the sun/moon icon in the header (next to the role switcher)
2. The theme will switch immediately
3. Your preference is saved automatically and will persist across sessions

**Benefits of dark mode:**
- Reduced eye strain in low-light environments
- Lower screen brightness for nighttime use
- Modern, professional appearance

---

## Dashboard Overview

The Dashboard provides a high-level overview of key metrics and trends for the selected role (TBW or RDPS).

### KPI Cards

Four key performance indicator cards are displayed at the top of the dashboard:

1. **Total DPK (Dana Pihak Ketiga / Third-Party Funds)**
   - Shows the total deposit amount
   - Displays trend compared to previous month
   - Green up arrow indicates growth

2. **Rata-rata Suku Bunga (Average Interest Rate)**
   - Shows the current average interest rate across all customers/segments
   - Lower rates indicate better cost efficiency
   - Trend shows rate changes over time

3. **Proyeksi Penghematan (Projected Savings)**
   - Displays estimated cost savings from AI recommendations
   - Shows potential reduction in cost of funds
   - Trend indicates savings growth

4. **Nasabah Risiko Tinggi (High-Risk Customers)**
   - Shows count of customers/segments with high churn risk
   - Format: "High Risk / Total"
   - Lower numbers indicate better retention

**Interpreting trends:**
- Green up arrow (↑) with positive percentage = favorable increase
- Red down arrow (↓) with negative percentage = unfavorable decrease
- For interest rates and risk counts, downward trends are positive

### Savings Chart

The "Tren Penghematan Cost of Funds" chart shows savings over the past 12 months.

**Chart elements:**
- **Blue area**: Actual savings achieved
- **Green area**: Projected savings from AI recommendations
- **X-axis**: Months (last 12 months)
- **Y-axis**: Savings amount in Rupiah (T = Trillion, M = Million)

**How to read:**
- Hover over any point to see exact values
- Compare blue (actual) vs green (projected) to see potential gains
- Upward trends indicate increasing savings over time

### Sensitivity Analysis

The "Distribusi Sensitivitas Nasabah" pie chart shows customer sensitivity distribution.

**Sensitivity levels:**
- **Low (Green)**: Customers unlikely to churn with rate changes
- **Medium (Orange)**: Moderate churn risk with rate adjustments
- **High (Red)**: High churn risk, requires careful rate management

**How to use:**
- Larger green segment = more flexibility in rate adjustments
- Larger red segment = need for cautious rate strategies
- Hover over segments to see exact counts and percentages

### Model Performance

The Model Performance section displays AI model accuracy metrics:

**Metrics shown:**
- **Accuracy**: Overall prediction correctness
- **Precision**: Accuracy of positive predictions
- **Recall**: Ability to find all positive cases
- **F1 Score**: Balance between precision and recall

**Trend chart:**
- Shows model performance over the past 6 months
- Upward trends indicate improving model accuracy
- Helps assess confidence in AI recommendations

---

## TBW View (Wholesale Banking)

The TBW View is designed for managing wholesale customer interest rates.

### Customer List

The customer list displays all wholesale customers with key information:

**Columns:**
- **Customer Name**: Business name
- **Current Rate**: Current interest rate (%)
- **Recommended Rate**: AI-suggested optimal rate (%)
- **DPK Amount**: Total deposit amount
- **Churn Risk**: Risk level (Low/Medium/High)
- **Potential Savings**: Estimated monthly savings

**How to use:**
1. Scroll through the list to view all customers
2. Click on any customer row to view detailed information
3. Sort by clicking column headers (if available)
4. Look for customers with high potential savings

**Color coding:**
- Green badge = Low churn risk
- Orange badge = Medium churn risk
- Red badge = High churn risk

### Interest Rate Recommendations

When you select a customer, recommendations appear on the right side.

**Recommendation card includes:**
- Recommended interest rate
- Confidence score (how certain the AI is)
- Expected impact on churn probability
- Projected monthly savings
- Rationale for the recommendation

**How to interpret:**
- Higher confidence scores = more reliable recommendations
- Check churn impact before implementing rate changes
- Consider savings vs. churn risk trade-offs

### Customer Details

The customer detail card shows comprehensive information:

**Information displayed:**
- Customer name and ID
- Industry sector
- Current deposit amount (DPK)
- Current interest rate
- Account tenure (how long they've been a customer)
- Historical rate changes
- Relationship manager contact

**Using customer details:**
- Review account history before making rate decisions
- Consider industry trends and competitive landscape
- Longer tenure customers may have different sensitivities
- Contact relationship manager for additional context

---

## RDPS View (Retail Banking)

The RDPS View focuses on retail customer segments rather than individual customers.

### Segment List

The segment list displays retail customer segments:

**Segments typically include:**
- Young Professionals
- Mass Market
- Affluent
- High Net Worth
- Senior Citizens

**Information shown:**
- Segment name
- Customer count in segment
- Average deposit per customer
- Current average rate
- Recommended rate
- Churn risk level

**How to use:**
1. Review all segments to identify optimization opportunities
2. Click on a segment to view detailed analysis
3. Focus on segments with high customer counts for maximum impact
4. Balance rate adjustments across segments

### Churn Heatmap

The churn risk heatmap visualizes risk across different dimensions:

**Heatmap features:**
- Color intensity indicates risk level (darker = higher risk)
- Compares segments across multiple factors
- Helps identify patterns in churn behavior

**How to interpret:**
- Dark red areas = immediate attention needed
- Light green areas = stable, low-risk segments
- Use to prioritize which segments need rate adjustments
- Look for unexpected patterns that may indicate issues

### Segment Details

Detailed segment information includes:

**Metrics displayed:**
- Total customers in segment
- Total DPK for segment
- Average balance per customer
- Current and recommended rates
- Churn probability
- Segment characteristics and behavior patterns

**Strategic insights:**
- Understand segment demographics
- Review historical performance
- Assess competitive positioning
- Plan targeted rate strategies

---

## What-if Simulator

The What-if Simulator allows you to test different interest rate scenarios before implementation.

### Creating Scenarios

**To create a new scenario:**
1. Navigate to "What-if Simulator" from the sidebar
2. The simulator loads with current baseline rates
3. You can create multiple scenarios to compare

**Scenario types:**
- Conservative: Small rate adjustments
- Moderate: Balanced approach
- Aggressive: Larger rate changes for maximum savings

### Adjusting Interest Rates

**Using the rate sliders:**
1. Each customer or segment has an adjustable slider
2. Drag the slider left to decrease rates
3. Drag the slider right to increase rates
4. The current value is displayed next to the slider
5. Changes are reflected immediately in the results

**Tips for adjustments:**
- Start with small changes (0.1-0.2% increments)
- Consider churn risk when lowering rates
- Test multiple scenarios before deciding
- Review the impact on both savings and churn

### Interpreting Results

**Results panel shows:**
- **Total Revenue Impact**: Change in interest expense
- **Projected Savings**: Cost reduction from rate changes
- **Churn Probability**: Estimated customer loss risk
- **Net Benefit**: Savings minus churn cost

**Key metrics to watch:**
- Positive savings with low churn increase = good scenario
- High savings with high churn = risky scenario
- Negative net benefit = scenario not recommended

**Color indicators:**
- Green = Favorable outcome
- Yellow = Moderate risk
- Red = High risk or negative impact

### Comparing Scenarios

**Side-by-side comparison:**
1. Create multiple scenarios with different rate strategies
2. View them in the comparison table
3. Compare key metrics across scenarios
4. Identify the optimal balance

**Comparison metrics:**
- Total savings
- Churn risk
- Number of customers affected
- Implementation complexity

**Making decisions:**
- Choose scenarios with best risk-reward balance
- Consider implementation feasibility
- Review with stakeholders before executing
- Start with pilot segments/customers

---

## Tips & Best Practices

### General Usage

1. **Start with the Dashboard**
   - Always review overall metrics before diving into details
   - Check for any unusual trends or alerts
   - Understand the current state before making changes

2. **Use Role Switching Effectively**
   - Switch between TBW and RDPS to get complete picture
   - Different roles may reveal different insights
   - Coordinate strategies across both divisions

3. **Leverage Dark Mode**
   - Use dark mode for extended viewing sessions
   - Switch based on ambient lighting conditions
   - Reduces eye fatigue during long analysis sessions

### Working with Recommendations

4. **Trust but Verify**
   - AI recommendations are data-driven but not infallible
   - Always review the rationale behind recommendations
   - Consider factors the AI may not capture (relationships, strategic accounts)
   - Consult with relationship managers for context

5. **Start Conservative**
   - Begin with small rate adjustments
   - Test on lower-risk customers/segments first
   - Monitor results before scaling up
   - Build confidence in the AI recommendations gradually

6. **Monitor Churn Risk**
   - Always check churn probability before implementing changes
   - High-risk customers need special attention
   - Balance savings goals with retention objectives
   - Consider non-rate retention strategies for sensitive customers

### Using the Simulator

7. **Test Multiple Scenarios**
   - Don't settle on the first scenario
   - Create at least 3-4 different approaches
   - Compare conservative vs. aggressive strategies
   - Document your assumptions and results

8. **Consider Timing**
   - Some rate changes are better at certain times
   - Avoid changes during market volatility
   - Coordinate with marketing campaigns
   - Plan implementation in phases

9. **Document Decisions**
   - Keep records of why you chose specific rates
   - Note any deviations from AI recommendations
   - Track actual vs. projected outcomes
   - Use learnings to improve future decisions

### Data Analysis

10. **Look for Patterns**
    - Review trends over time, not just snapshots
    - Identify seasonal patterns in customer behavior
    - Compare performance across segments
    - Spot anomalies that need investigation

11. **Cross-Reference Data**
    - Compare dashboard metrics with detailed views
    - Verify consistency across different reports
    - Check if segment trends align with individual customer data
    - Investigate discrepancies

### Collaboration

12. **Share Insights**
    - Discuss findings with colleagues
    - Coordinate rate strategies across teams
    - Share successful approaches
    - Learn from others' experiences

13. **Escalate When Needed**
    - Flag unusual patterns to management
    - Seek approval for large rate changes
    - Consult risk management for high-risk scenarios
    - Involve legal/compliance for policy questions

### Performance Optimization

14. **Regular Reviews**
    - Check the dashboard daily for updates
    - Review recommendations weekly
    - Analyze trends monthly
    - Assess strategy effectiveness quarterly

15. **Continuous Improvement**
    - Provide feedback on AI recommendations
    - Report any inaccuracies or issues
    - Suggest new features or improvements
    - Stay updated on system enhancements

---

## Glossary

**DPK (Dana Pihak Ketiga)**: Third-party funds; customer deposits

**Churn**: Customer attrition; when customers close accounts or move funds

**Sensitivity**: How responsive customers are to interest rate changes

**TBW**: Transaction Banking Wholesale division

**RDPS**: Retail Deposit Product & Solution division

**Cost of Funds**: The interest expense paid to depositors

**Confidence Score**: AI model's certainty level in its recommendation

**Net Benefit**: Total savings minus estimated churn costs

---

## Support

For technical issues, questions, or feedback:
- Contact your system administrator
- Refer to the technical README.md for developer information
- Report bugs or request features through your organization's IT support channels

---

**Version**: 1.0.0  
**Last Updated**: 2025  
**Application**: AI Interest Rate Optimizer