# **App Name**: PharmaFlow Dashboard

## Core Features:

- Secure User Authentication & Access Control: Implement robust authentication for the Director and Assistant, including encrypted passwords, .env variable storage for credentials, session management with timeouts, and a clear login page. Access to specific sections (like data update) will be restricted and password-protected.
- Comprehensive Financial Overview: Provide a central dashboard displaying real-time financial KPIs such as total sales (ENTRÉES) and total orders (SORTIES) for the current day/month, along with a synthetic graph for immediate trend visualization.
- Dynamic Financial & Supplier Analytics: Enable in-depth analysis of recettes (revenue), fournisseurs (suppliers), DCSSA/Koundjouré, and Implants through interactive tables and dynamic multi-line/grouped bar charts with period filtering (daily, monthly, quarterly, annual). Allow for inline editing of data where applicable.
- Insurance Management & Rejection Tracking: Provide a system for managing various insurance accounts with dynamic sub-tabs for detailed consumption tracking, period selection (monthly/bi-monthly), and a transversal tab for aggregated rejection and loss reporting across all insurers.
- Streamlined Data Entry & Bulk Import: Offer a protected 'Data Update' section with dedicated web forms for each data category (revenues, orders, invoices, etc.) and a user-friendly Excel import utility for mass data entry. Both methods include validation and clear feedback.
- Professional PDF Reporting & Export: Generate comprehensive, customizable PDF reports with a professional layout, including cover page, executive summary, table of contents, and all selected data tables and graphs, adhering to strict confidentiality markings.
- AI-Powered Financial Insights Tool: An AI tool that analyzes generated report data (trends in sales, rejections, consumption patterns) to identify key anomalies, growth/decline indicators, and generate concise 'points d'attention' or 'recommandations' for the Executive Summary and specific report sections during PDF generation.

## Style Guidelines:

- A professional and calming primary blue (#418CBA) to signify trust and clarity, consistent with healthcare contexts.
- A very light, desaturated blue (#F0F5F8) as the background, promoting a clean, modern aesthetic and minimizing eye strain over long viewing periods.
- An invigorating teal accent color (#4DB8BF) to highlight interactive elements and draw attention to key data points, providing contrast while maintaining harmony.
- Body and headline font: 'Inter' (sans-serif) for its modern, legible, and objective aesthetic, ensuring clear readability across all data displays and textual content, even for users with low internet mastery.
- Use a set of clear, minimalist line-art icons that are universally understandable, reducing reliance on text and aiding intuitive navigation for non-tech-savvy users. Emphasize icons that represent financial actions, pharmacy items, and user management (e.g., 💰, 📦, 💊, 🏥, ⚙️, 📄).
- Adopt a clean, grid-based dashboard layout with generous spacing and strong visual hierarchy. Critical data and KPIs will be prominent. Navigation will be intuitive with large, clearly labeled buttons and tabs. The design prioritizes ease of use and reduces visual clutter to avoid overwhelming users.
- Incorporate subtle, functional animations such as smooth transitions for tab switching, hover effects on interactive elements like buttons and table rows, and gentle loading indicators. These animations should enhance user experience without being distracting, signaling system responses and state changes clearly.