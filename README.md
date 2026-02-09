# Folica: AI-Powered Hair Analysis Kiosk

![Folica Prototype](https://via.placeholder.com/800x450?text=Folica+App+Demo)

**Folica** is an in-store digital experience prototype designed for retail environments like Ulta Beauty. [cite_start]It utilizes computer vision concepts and an interactive UI to solve a major customer pain point: the "guessing game" of finding the right hair products[cite: 149].

[cite_start]This project was built as a high-fidelity prototype to validate the technical feasibility and user experience of a "Smart Mirror" kiosk for the **TMP 463 Entrepreneurship** capstone project at UCSB[cite: 1].

## 🚀 The Problem
Customers in the hair care aisle often feel overwhelmed by choices and lack professional guidance.
* [cite_start]**The "Guessing Game":** 97% of consumers search for products based on specific benefits, yet many still rely on trial-and-error, leading to wasted money and dissatisfaction[cite: 156, 169].
* [cite_start]**Generic Advice:** Shoppers rely on social media or generic Google searches that don't account for their specific hair biology[cite: 152].
* [cite_start]**Retail Gap:** Store associates cannot physically analyze every customer's scalp health or porosity in real-time[cite: 238].

## 💡 The Solution
[cite_start]Folica is a tablet-based kiosk experience that provides lab-grade hair analysis in under a minute[cite: 178].
1.  [cite_start]**Smart Capture:** Uses the device camera (MediaDevices API) to capture macro shots of the scalp and hair texture[cite: 225].
2.  [cite_start]**AI Analysis:** Simulates a computer vision model to score attributes like hydration, breakage risk, and curl pattern[cite: 188].
3.  [cite_start]**Algorithmic Matching:** Maps unique hair profiles to specific, in-stock inventory at the retailer, increasing basket size and customer confidence[cite: 189, 200].

## 🛠️ Tech Stack
* **Frontend Framework:** Next.js (React)
* **Styling:** Custom CSS / CSS Modules (matching Ulta Brand Guidelines)
* **Hardware Integration:** Browser `navigator.mediaDevices` API for real-time camera streaming.
* **Deployment:** Vercel

## ✨ Key Features
* **Real-time Camera Handling:** Custom implementation to manage video streams, freeze frames for analysis, and handle permission states.
* **State Management:** A step-based state machine manages the user flow from Onboarding → Consent → Capture → Analysis → Results.
* **Responsive Kiosk UI:** Designed specifically for tablet viewports (iPad Pro / Galaxy Tab) to mimic the in-store hardware constraints.
* **Dynamic Product Cards:** A flexible component structure that renders product recommendations based on the "diagnosis" state.

## 📊 Business Viability
* [cite_start]**Total Addressable Market (TAM):** $104B global hair-care market[cite: 247].
* **Business Model:** B2B Technology-as-a-Service (TaaS). [cite_start]Retailers pay a monthly hardware lease + software subscription[cite: 293].
* [cite_start]**Projected Margins:** Estimated ~80% gross margin on software subscriptions per store[cite: 304].

## 📸 Usage & Screenshots

| Step 1: Consent | Step 2: Camera Capture | Step 3: AI Results |
|:---:|:---:|:---:|
| | | |

## 📦 Installation
To run this prototype locally:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/nickidelgado363/folica-v1.git](https://github.com/nickidelgado363/folica-v1.git)
    cd folica-v1
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the app**
    Navigate to `http://localhost:3000` in your browser.
    *Note: Camera features require HTTPS or localhost to function correctly.*

## 👥 The Team
* **Nicki Delgado** - Product Strategy & Frontend Development
* **Nicolla Eddy** - User Research
* **Adailton Nali Junior** - Financial Modeling
* **Julie Vang** - Competitive Analysis
* **Penny Wei** - Go-To-Market Strategy
[cite_start][cite: 318-323]

---
*Prototype developed for UCSB Technology Management Program.*