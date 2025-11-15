# Requirements Document

## Introduction

AI Interest Rate Optimizer adalah aplikasi web dashboard MVP/prototype yang mendemonstrasikan konsep optimasi suku bunga berbasis machine learning untuk divisi TBW (Transaction Banking Wholesale) dan RDPS (Retail Deposit Product & Solution). Dashboard ini berfokus pada visualisasi dan user experience untuk mempresentasikan ide kepada stakeholder, dengan tampilan modern dan menarik. Sistem menggunakan data simulasi untuk mendemonstrasikan prediksi sensitivitas nasabah dan rekomendasi suku bunga optimal.

## Glossary

- **Dashboard**: AI Interest Rate Optimizer web-based user interface
- **MVP**: Minimum Viable Product - prototype untuk demonstrasi konsep
- **Mock Data**: Data simulasi yang digunakan untuk demonstrasi fitur
- **TBW View**: Tampilan dashboard untuk use case Transaction Banking Wholesale
- **RDPS View**: Tampilan dashboard untuk use case Retail Deposit Product & Solution
- **Rate Sensitivity**: Tingkat sensitivitas nasabah terhadap perubahan suku bunga (rendah/sedang/tinggi)
- **Churn Risk**: Persentase risiko nasabah menarik dana (0-100%)
- **Cost of Funds**: Biaya bunga simpanan yang ditampilkan dalam dashboard
- **Customer Segment**: Kategori nasabah (Corporate, Commercial, GVI, SME untuk wholesale; berbagai tier untuk retail)
- **Confidence Score**: Tingkat keyakinan prediksi yang ditampilkan (0-100%)
- **What-if Simulator**: Fitur interaktif untuk simulasi skenario perubahan suku bunga
- **External API**: API backend yang disediakan tim lain untuk data dan prediksi ML (jika tersedia)

## Requirements

### Requirement 1

**User Story:** Sebagai stakeholder yang melihat demo, saya ingin melihat tampilan rekomendasi suku bunga untuk nasabah wholesale, sehingga saya dapat memahami value proposition sistem untuk TBW

#### Acceptance Criteria

1. THE Dashboard SHALL display a TBW View with a list of wholesale customers using Mock Data
2. WHEN a user selects a wholesale customer, THE Dashboard SHALL display the recommended interest rate with visual indicators
3. THE Dashboard SHALL display the predicted churn risk percentage with color-coded visualization (green/yellow/red)
4. THE Dashboard SHALL display the projected cost of funds savings in IDR currency format
5. THE Dashboard SHALL display the Confidence Score with a progress bar or gauge visualization
6. THE Dashboard SHALL allow filtering of wholesale customers by segment (Corporate, Commercial, GVI, SME) using dropdown or tabs

### Requirement 2

**User Story:** Sebagai stakeholder yang melihat demo, saya ingin melihat tampilan rekomendasi suku bunga untuk segmen nasabah ritel, sehingga saya dapat memahami value proposition sistem untuk RDPS

#### Acceptance Criteria

1. THE Dashboard SHALL display an RDPS View with retail customer segments using Mock Data
2. THE Dashboard SHALL display segments grouped by balance tier (e.g., <10M, 10M-50M, 50M-100M, >100M)
3. WHEN a user selects a retail segment, THE Dashboard SHALL display adaptive interest rate recommendations with visual charts
4. THE Dashboard SHALL display churn risk analysis for each segment using bar charts or heatmaps
5. THE Dashboard SHALL display the expected retention rate percentage for each segment with visual indicators

### Requirement 3

**User Story:** Sebagai stakeholder yang melihat demo, saya ingin melihat visualisasi performa model ML, sehingga saya dapat memahami kredibilitas sistem

#### Acceptance Criteria

1. THE Dashboard SHALL display a Model Performance section with mock performance metrics
2. THE Dashboard SHALL display model accuracy, precision, and recall metrics using gauge charts or cards
3. THE Dashboard SHALL display a trend chart showing model performance over time using Mock Data
4. THE Dashboard SHALL display the last update timestamp for the model
5. THE Dashboard SHALL use modern, professional visualization components for displaying metrics

### Requirement 4

**User Story:** Sebagai stakeholder yang melihat demo, saya ingin mencoba fitur simulasi what-if interaktif, sehingga saya dapat memahami bagaimana sistem membantu decision making

#### Acceptance Criteria

1. THE Dashboard SHALL provide an interactive what-if scenario simulator interface
2. THE Dashboard SHALL allow users to adjust interest rate values using sliders or input fields
3. WHEN a user adjusts interest rate, THE Dashboard SHALL immediately update projected churn risk visualization
4. WHEN a user adjusts interest rate, THE Dashboard SHALL immediately update projected cost of funds impact
5. THE Dashboard SHALL display comparison of multiple scenarios (baseline, optimistic, pessimistic) in a side-by-side card layout
6. THE Dashboard SHALL use smooth animations and transitions for an engaging user experience

### Requirement 5

**User Story:** Sebagai stakeholder yang melihat demo, saya ingin melihat dashboard dengan visualisasi yang menarik dan modern, sehingga saya terkesan dengan tampilan dan mudah memahami insights

#### Acceptance Criteria

1. THE Dashboard SHALL use a modern, professional design system with consistent colors and typography
2. THE Dashboard SHALL display key performance indicators (KPI cards) at the top showing total DPK, average interest rate, and projected savings
3. THE Dashboard SHALL display customer sensitivity distribution using interactive charts (pie chart, donut chart, or bar chart)
4. THE Dashboard SHALL display projected cost of funds savings using line charts or area charts
5. THE Dashboard SHALL use a responsive layout that works on desktop screens (1920x1080 and 1366x768)
6. THE Dashboard SHALL use smooth animations and transitions for data updates and page navigation

### Requirement 6

**User Story:** Sebagai stakeholder yang melihat demo, saya ingin melihat rekomendasi yang actionable dan mudah dipahami, sehingga saya dapat membayangkan bagaimana user akan menggunakan sistem ini

#### Acceptance Criteria

1. THE Dashboard SHALL display actionable recommendation cards with clear text (e.g., "Optimal rate for >90% retention is 3.75%")
2. THE Dashboard SHALL use visual badges or tags to highlight high-priority customers or segments
3. THE Dashboard SHALL display alert icons or warning colors when recommended rate changes are significant
4. THE Dashboard SHALL show confidence levels using visual indicators (high/medium/low with icons or colors)
5. WHEN a user clicks on a recommendation, THE Dashboard SHALL display a modal or expanded view with detailed rationale

### Requirement 7

**User Story:** Sebagai stakeholder yang melihat demo, saya ingin melihat konsep role-based views, sehingga saya dapat memahami bagaimana sistem akan digunakan oleh divisi yang berbeda

#### Acceptance Criteria

1. THE Dashboard SHALL provide a simple role selector or navigation menu to switch between TBW View and RDPS View
2. WHEN a user selects TBW View, THE Dashboard SHALL display wholesale-focused features and data
3. WHEN a user selects RDPS View, THE Dashboard SHALL display retail-focused features and data
4. THE Dashboard SHALL display a user profile indicator showing the current selected role
5. THE Dashboard SHALL use different color themes or visual cues to distinguish between TBW and RDPS views

### Requirement 8

**User Story:** Sebagai stakeholder yang melihat demo, saya ingin melihat bagaimana dashboard dapat terintegrasi dengan sistem backend, sehingga saya memahami arsitektur teknis yang fleksibel

#### Acceptance Criteria

1. THE Dashboard SHALL be designed with a modular architecture that separates data layer from presentation layer
2. THE Dashboard SHALL use a data service layer that can easily switch between Mock Data and External API
3. WHERE External API is available, THE Dashboard SHALL fetch data from API endpoints instead of using Mock Data
4. THE Dashboard SHALL display loading states and error handling for API calls
5. THE Dashboard SHALL include configuration options to toggle between mock mode and API mode for development purposes

### Requirement 9

**User Story:** Sebagai stakeholder yang melihat demo, saya ingin melihat data yang realistis dan proper dalam dashboard, sehingga demo terlihat profesional dan meyakinkan

#### Acceptance Criteria

1. THE Dashboard SHALL use Mock Data that represents realistic banking scenarios with proper Indonesian bank customer profiles
2. THE Mock Data SHALL include realistic customer names, company names, balance amounts in IDR (ranging from hundreds of millions to trillions)
3. THE Mock Data SHALL include realistic interest rate values (ranging from 2% to 8% per annum)
4. THE Mock Data SHALL include varied sensitivity levels (low, medium, high) with realistic distribution across customer segments
5. THE Mock Data SHALL include realistic churn risk percentages that correlate logically with sensitivity levels and interest rates
6. THE Mock Data SHALL include realistic cost of funds calculations and projected savings in IDR
7. THE Mock Data SHALL include time-series data for charts showing trends over the past 6-12 months
8. THE Mock Data SHALL maintain data consistency across different views and features (e.g., totals match aggregated values)

### Requirement 10

**User Story:** Sebagai stakeholder yang melihat demo, saya ingin berinteraksi dengan fitur analisis AI untuk mendapatkan rekomendasi suku bunga optimal, sehingga saya dapat memahami bagaimana sistem bekerja secara interaktif

#### Acceptance Criteria

1. THE Dashboard SHALL display an "Analyze" button or similar action button in customer detail cards and segment detail cards
2. WHEN a user clicks the "Analyze" button, THE Dashboard SHALL display a loading state indicating the predictive model is running
3. WHEN the analysis is complete, THE Dashboard SHALL display the AI-suggested optimal interest rate with smooth animation
4. THE Dashboard SHALL display the analysis results including updated churn risk prediction and projected savings
5. THE Dashboard SHALL show a visual indicator that distinguishes analyzed results from initial static recommendations
6. THE Dashboard SHALL simulate realistic processing time (1-3 seconds) to demonstrate the ML model execution