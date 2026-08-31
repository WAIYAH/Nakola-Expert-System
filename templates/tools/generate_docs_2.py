"""
Generates the remaining 14 templates (client-documents/, branding/,
marketing/) as branded Word (.docx) files, matching the style of
generate_docs.py.

Usage:
    pip install -r requirements.txt
    python generate_docs_2.py
"""

from doc_helpers import (
    COMPANY, new_document, doc_title, h2, h3, body, bullet, numbered,
    field, placeholder_legend, legal_notice, make_table, signature_block,
    checklist_item, color_swatch_row, copy_block, save, PLACEHOLDER_COLOR,
)

PH = lambda s: f"[{s}]"


# ─────────────────────────────────────────────────────────────────
# CLIENT DOCUMENTS
# ─────────────────────────────────────────────────────────────────
def client_onboarding_checklist():
    doc = new_document()
    doc_title(doc, "Client Onboarding Checklist")
    placeholder_legend(doc)

    h2(doc, "1. Client and Project Setup")
    checklist_item(doc, f"Confirm client legal name: {PH('Client Legal Name')}", True)
    checklist_item(doc, "Confirm primary contact person and role")
    checklist_item(doc, "Confirm project name and internal code")
    checklist_item(doc, "Confirm project objectives and expected outcomes")

    h2(doc, "2. Commercial Documentation")
    for i in ["Signed proposal received", "Signed service agreement received",
              "Quotation approved", "Initial invoice issued", "Initial payment confirmed"]:
        checklist_item(doc, i)

    h2(doc, "3. Compliance and Legal")
    checklist_item(doc, "NDA signed (if required)")
    checklist_item(doc, "Data processing expectations documented")
    checklist_item(doc, f"Regulatory requirements captured: {PH('Industry/Region Requirements')}", True)

    h2(doc, "4. Communication and Governance")
    checklist_item(doc, "Kickoff meeting scheduled")
    checklist_item(doc, "Communication channels agreed (Email / WhatsApp / Teams)")
    checklist_item(doc, f"Reporting cadence agreed: {PH('Weekly/Bi-weekly')}", True)
    checklist_item(doc, "Escalation contacts documented")

    h2(doc, "5. Discovery Inputs")
    for i in ["Business goals and KPIs captured", "Existing systems and tools documented",
              "User personas or target customer segments shared", "Competitor/references shared"]:
        checklist_item(doc, i)

    h2(doc, "6. Access and Technical Readiness")
    for i in ["Domain/hosting access (if applicable)", "Repository access",
              "Cloud/platform credentials", "Analytics and tracking access",
              "Brand assets (logos, fonts, colors)"]:
        checklist_item(doc, i)

    h2(doc, "7. Delivery Planning")
    for i in ["Final scope baseline confirmed", "Milestone plan approved",
              "Dependencies and risks logged", "Acceptance criteria documented"]:
        checklist_item(doc, i)

    h2(doc, "8. Post-Launch Planning")
    checklist_item(doc, f"Support model selected: {PH('Essential/Professional/Enterprise/Custom')}", True)
    checklist_item(doc, "Warranty period expectations aligned")
    checklist_item(doc, "Handover artifacts agreed")

    save(doc, "templates/client-documents/CLIENT_ONBOARDING_CHECKLIST.docx")


def maintenance_agreement():
    doc = new_document()
    doc_title(doc, "Maintenance Agreement")
    legal_notice(doc)
    placeholder_legend(doc)

    h2(doc, "Agreement Overview")
    body(doc, "This Maintenance Agreement is between:")
    bullet(doc, f"Service Provider: {COMPANY['name']}")
    bullet(doc, f"Client: {PH('Client Name')}")
    field(doc, "Effective Date", PH("Effective Date"), True)
    field(doc, "Agreement Term", f"{PH('Start Date')} to {PH('End Date/Rolling Monthly')}", True)

    h2(doc, "1. Scope of Maintenance Services")
    body(doc, "Covered services may include:")
    for i in ["Proactive monitoring and uptime checks", "Security updates and dependency patching",
              "Bug fixes and issue resolution", "Performance optimization",
              "Minor feature enhancements (as agreed)"]:
        bullet(doc, i)
    field(doc, "Detailed scope for this client", PH("Client-specific scope"), True)

    h2(doc, "2. Support Plan")
    field(doc, "Plan Type", PH("Essential / Professional / Enterprise / Custom"), True)
    field(doc, "Monthly Fee", PH("Amount and Currency"), True)
    field(doc, "Included Hours/Sprints", PH("Details"), True)
    field(doc, "Additional Work Rate", PH("Rate"), True)

    h2(doc, "3. Service Levels (SLA)")
    make_table(
        doc,
        ["Priority", "Example Issue", "First Response", "Target Resolution"],
        [
            ["Critical", "Production outage", "[X hours]", "[X hours/day]"],
            ["High", "Major functionality issue", "[X hours]", "[X days]"],
            ["Medium", "Minor defect", "[X business day]", "[X days]"],
            ["Low", "Cosmetic/improvement request", "[X business days]", "[Backlog/Sprint]"],
        ],
    )

    h2(doc, "4. Client Responsibilities")
    for i in ["Provide timely access and approvals", "Share required credentials and system context",
              "Nominate a primary technical/business contact",
              "Keep third-party subscriptions active (where applicable)"]:
        bullet(doc, i)

    h2(doc, "5. Exclusions")
    body(doc, "Unless explicitly included, this agreement excludes:")
    for i in ["New module development beyond maintenance scope", "Third-party license costs",
              "Major re-architecture", "Onsite support (unless separately contracted)"]:
        bullet(doc, i)

    h2(doc, "6. Billing and Payment")
    field(doc, "Billing Cycle", PH("Monthly/Quarterly"), True)
    field(doc, "Payment Terms", PH("Net 7/14/30"), True)
    field(doc, "Late Payment Terms", PH("Terms"), True)

    h2(doc, "7. Confidentiality and Data Protection")
    body(doc, "Both parties shall maintain confidentiality and handle data according to "
              "applicable privacy and security obligations.")

    h2(doc, "8. Termination")
    field(doc, "Notice period", PH("X days"), True)
    field(doc, "Transition support on termination", PH("Details"), True)

    h2(doc, "9. Signatures")
    signature_block(doc, "Client", PH("Name, Title"), COMPANY["name"], COMPANY["founder"])

    save(doc, "templates/client-documents/MAINTENANCE_AGREEMENT_TEMPLATE.docx")


def project_brief():
    doc = new_document()
    doc_title(doc, "Project Brief")
    placeholder_legend(doc)

    field(doc, "Project Name", PH("Project Name"), True)
    field(doc, "Client Organization", PH("Client Name"), True)
    field(doc, "Prepared By", PH("Name/Role"), True)
    field(doc, "Date", PH("Date"), True)
    field(doc, "Version", PH("Version"), True)

    h2(doc, "1. Business Context")
    field(doc, "Industry", PH("Industry"), True)
    field(doc, "Current Business Situation", PH("Context"), True)
    field(doc, "Problem Statement", PH("What challenge are we solving?"), True)

    h2(doc, "2. Project Goals")
    field(doc, "Primary Goal", PH("Goal"), True)
    h3(doc, "Secondary Goals")
    for i in range(1, 4):
        numbered(doc, PH(f"Goal {i}"))

    h2(doc, "3. Target Users")
    field(doc, "Primary User Group", PH("User Group"), True)
    field(doc, "Secondary User Group", PH("User Group"), True)
    field(doc, "Key User Needs", PH("Needs"), True)

    h2(doc, "4. Proposed Scope")
    h3(doc, "In Scope")
    for i in range(1, 4):
        bullet(doc, PH(f"Scope Item {i}"))
    h3(doc, "Out of Scope")
    for i in range(1, 3):
        bullet(doc, PH(f"Out-of-scope item {i}"))

    h2(doc, "5. Service and Delivery Model")
    field(doc, "Service Needed", PH("Custom Software / Consulting / Transformation / Cloud / QA / Support"), True)
    field(doc, "Engagement Model", PH("Fixed-Price / Agile Retainer / Dedicated Team"), True)
    field(doc, "Preferred Collaboration Model", PH("Onsite / Remote / Hybrid"), True)

    h2(doc, "6. Budget and Timeline")
    field(doc, "Budget Range", PH("Budget Range"), True)
    field(doc, "Target Start Date", PH("Date"), True)
    field(doc, "Target Delivery Date", PH("Date"), True)
    field(doc, "Critical Milestones", PH("Milestones"), True)

    h2(doc, "7. Success Criteria")
    for i in range(1, 4):
        bullet(doc, f"KPI {i}: {PH('Metric + target')}")

    h2(doc, "8. Stakeholders")
    make_table(
        doc,
        ["Name", "Role", "Responsibility", "Contact"],
        [["[Name]", "[Role]", "[Responsibility]", "[Email/Phone]"],
         ["[Name]", "[Role]", "[Responsibility]", "[Email/Phone]"]],
    )

    h2(doc, "9. Risks and Dependencies")
    field(doc, "Risks", PH("Known risks"), True)
    field(doc, "Dependencies", PH("Dependencies"), True)
    field(doc, "Constraints", PH("Time/Budget/Compliance constraints"), True)

    save(doc, "templates/client-documents/PROJECT_BRIEF_TEMPLATE.docx")


def project_handover_checklist():
    doc = new_document()
    doc_title(doc, "Project Handover Checklist")
    placeholder_legend(doc)

    h2(doc, "1. Delivery Confirmation")
    for i in ["Final scope delivered and demonstrated", "Client acceptance documented",
              "Open issues list reviewed and agreed"]:
        checklist_item(doc, i)

    h2(doc, "2. Code and Infrastructure")
    for i in ["Source code repository transferred/shared", "Branching and release notes documented",
              "Environment details shared (dev/staging/production)", "Hosting/cloud access handed over"]:
        checklist_item(doc, i)

    h2(doc, "3. Credentials and Security")
    for i in ["Admin accounts transferred", "Shared passwords rotated",
              "MFA enabled where applicable", "Security checklist completed"]:
        checklist_item(doc, i)

    h2(doc, "4. Documentation Pack")
    for i in ["Technical architecture summary", "API documentation", "Deployment/runbook guide",
              "User manual or SOPs", "Known limitations and roadmap items"]:
        checklist_item(doc, i)

    h2(doc, "5. Quality and Performance")
    for i in ["QA summary report shared", "Test coverage summary shared",
              "Performance benchmark report shared", "Monitoring/alerting setup confirmed"]:
        checklist_item(doc, i)

    h2(doc, "6. Training and Enablement")
    for i in ["Admin training completed", "End-user training completed", "Recording/materials shared"]:
        checklist_item(doc, i)

    h2(doc, "7. Commercial and Support Transition")
    for i in ["Final invoice issued", "Payment reconciliation completed",
              "Warranty period start and end dates confirmed"]:
        checklist_item(doc, i)
    checklist_item(doc, f"Support agreement activated: {PH('Plan Name')}", True)

    h2(doc, "8. Closure")
    for i in ["Project retrospective completed", "Reference/testimonial request sent (optional)",
              "Handover sign-off"]:
        checklist_item(doc, i)

    h2(doc, "Sign-Off")
    signature_block(doc, "Client Representative", PH("Name"), f"{COMPANY['name']} Representative", COMPANY["founder"])

    save(doc, "templates/client-documents/PROJECT_HANDOVER_CHECKLIST.docx")


def project_requirements_form():
    doc = new_document()
    doc_title(doc, "Project Requirements Form")
    placeholder_legend(doc)

    h2(doc, "Client Information")
    field(doc, "Full Name", PH("Full Name"), True)
    field(doc, "Work Email", PH("Work Email"), True)
    field(doc, "Company/Organization", PH("Company"), True)
    field(doc, "Phone Number", PH("Phone Number"), True)

    h2(doc, "Project Qualification")
    h3(doc, "Service Needed")
    for i in ["Custom Software Development", "Technology Consulting", "Digital Transformation",
              "Cloud and DevOps", "Quality Assurance and Testing", "Managed Support and Maintenance",
              "Other / Not Sure"]:
        checklist_item(doc, i)

    h3(doc, "Estimated Budget")
    for i in ["Under $10,000", "$10,000 to $25,000", "$25,000 to $50,000",
              "$50,000 to $100,000", "$100,000+", "Not sure yet"]:
        checklist_item(doc, i)

    h3(doc, "Ideal Timeline")
    for i in ["ASAP", "1 to 3 months", "3 to 6 months", "6 to 12 months", "Flexible / Planning stage"]:
        checklist_item(doc, i)

    h2(doc, "Business and Product Requirements")
    field(doc, "Project Name", PH("Project Name"), True)
    field(doc, "Project Description", PH("Goals, challenges, desired outcomes"), True)
    field(doc, "Business Objective", PH("Primary objective"), True)
    field(doc, "Reference Links", PH("URL 1, URL 2"), True)

    h2(doc, "Functional Requirements")
    for i in range(1, 4):
        numbered(doc, PH(f"Requirement {i}"))

    h2(doc, "Non-Functional Requirements")
    field(doc, "Performance requirements", PH("Details"), True)
    field(doc, "Availability requirements", PH("Details"), True)
    field(doc, "Security requirements", PH("Details"), True)
    field(doc, "Scalability requirements", PH("Details"), True)

    h2(doc, "Data and Integration Requirements")
    field(doc, "Existing systems to integrate", PH("System list"), True)
    field(doc, "APIs needed", PH("API details"), True)
    field(doc, "Data migration required", PH("Yes/No + details"), True)

    h2(doc, "Design and Brand Requirements")
    field(doc, "Existing brand guidelines available", PH("Yes/No"), True)
    field(doc, "Required pages/screens", PH("List"), True)
    field(doc, "Accessibility requirements", PH("Details"), True)
    field(doc, "Language/localization requirements", PH("Details"), True)

    h2(doc, "Governance and Approvals")
    field(doc, "Decision makers", PH("Name/Role"), True)
    field(doc, "Approval flow", PH("Process"), True)
    field(doc, "Compliance requirements", PH("Requirements"), True)
    field(doc, "NDA required before deep discovery", PH("Yes/No"), True)

    save(doc, "templates/client-documents/PROJECT_REQUIREMENTS_FORM.docx")


# ─────────────────────────────────────────────────────────────────
# BRANDING
# ─────────────────────────────────────────────────────────────────
def brand_guidelines():
    doc = new_document()
    doc_title(doc, "Brand Guidelines")

    h2(doc, "1. Brand Identity")
    field(doc, "Brand Name", COMPANY["name"])
    field(doc, "Primary Tagline", "Build Smarter. Scale Faster. Innovate Globally.")
    field(doc, "Alternate Tagline", "Built in Africa. Delivering Globally.")
    field(doc, "Core Positioning", "African-grounded technical expertise with global-standard delivery.")

    h2(doc, "2. Brand Promise")
    body(doc, "We help ambitious organizations transform ideas into reliable digital products "
              "with measurable business outcomes.")

    h2(doc, "3. Brand Voice")
    for i in ["Confident and professional", "Strategic and business-outcome focused",
              "Transparent and collaborative", "Technically credible without unnecessary jargon"]:
        bullet(doc, i)

    h2(doc, "4. Messaging Pillars")
    for i in ["Measurable outcomes over vanity output", "Senior-led delivery and accountability",
              "African market understanding with global execution standards",
              "Long-term partnership mindset"]:
        numbered(doc, i)

    h2(doc, "5. Color Palette")
    h3(doc, "Primary")
    color_swatch_row(doc, "Primary Blue", "2563EB", "Primary action color, links, key CTAs")
    color_swatch_row(doc, "Accent Purple", "7C3AED", "Blue-to-purple gradients for hero/premium highlights")
    h3(doc, "Supporting")
    color_swatch_row(doc, "Success Green", "10B981", "Success states and positive metrics")
    color_swatch_row(doc, "Premium Gold", "F59E0B", "Highlights and premium accents")
    color_swatch_row(doc, "Teal Accent", "14B8A6", "Secondary supporting accent")
    color_swatch_row(doc, "Dark Neutral", "0A0F1A", "Contrast and enterprise tone")

    h2(doc, "6. Typography")
    field(doc, "Heading Font", "Inter")
    field(doc, "Body Font", "Inter")
    field(doc, "Monospace Accent", "JetBrains Mono")
    body(doc, "Headings: bold and concise. Body: clear, readable, business-friendly. "
              "Monospace: technical snippets or data callouts.")

    h2(doc, "7. Logo Usage")
    field(doc, "Primary logo", "NES logo with wording (full company name)")
    field(doc, "Symbol-only mark", "Gear + security icon, with or without NES wordmark/stars")
    field(doc, "Clear space", PH("Define clear space rule"), True)
    field(doc, "Minimum size", PH("Define minimum size"), True)
    body(doc, "Do not distort, recolor without brand approval, or place on low-contrast backgrounds.")

    h2(doc, "8. Imagery and Visual Direction")
    body(doc, "Use high-clarity visuals that communicate modern technology, business impact, "
              "and African-global relevance. Prefer authentic project/product visuals over "
              "stock-heavy storytelling.")

    h2(doc, "9. Tone Examples")
    p = doc.add_paragraph()
    r1 = p.add_run("Preferred: ")
    r1.bold = True
    p.add_run('"We deliver software that drives measurable revenue and operational impact."')
    p2 = doc.add_paragraph()
    r2 = p2.add_run("Avoid: ")
    r2.bold = True
    p2.add_run('"We build amazing solutions for everything."')

    h2(doc, "10. Contact Signature Block Standard")
    copy_block(doc, [
        COMPANY["name"],
        "Nairobi, Kenya | Serving clients globally",
        f"{COMPANY['email']} | {COMPANY['phone']}",
    ])

    save(doc, "templates/branding/BRAND_GUIDELINES.docx")


def business_card_content():
    doc = new_document()
    doc_title(doc, "Business Card Content")
    placeholder_legend(doc)

    h2(doc, "Front Side")
    copy_block(doc, [
        "[NES Logo]",
        "[Full Name]",
        "[Job Title]",
        COMPANY["name"],
        "Build Smarter. Scale Faster. Innovate Globally.",
    ])

    h2(doc, "Back Side")
    copy_block(doc, [
        COMPANY["phone"],
        COMPANY["email"],
        COMPANY["website"],
        "Nairobi, Kenya",
        "Serving clients globally",
        "[QR Code: Website/Portfolio/Contact]",
    ])

    h2(doc, "Optional Back Side Variant (Capabilities)")
    for i in ["Custom Software Development", "Technology Consulting", "Digital Transformation",
              "Cloud and DevOps", "QA and Managed Support"]:
        bullet(doc, i)

    save(doc, "templates/branding/BUSINESS_CARD_CONTENT.docx")


def email_signature():
    doc = new_document()
    doc_title(doc, "Email Signature")
    placeholder_legend(doc)

    h2(doc, "Standard Signature")
    copy_block(doc, [
        "[Full Name]",
        "[Job Title]",
        COMPANY["name"],
        "Build Smarter. Scale Faster. Innovate Globally.",
        "",
        f"Phone: {COMPANY['phone']}",
        f"Email: {COMPANY['email']}",
        f"Web: {COMPANY['website']}",
        "Location: Nairobi, Kenya (Serving clients globally)",
        "",
        f"LinkedIn: {COMPANY['linkedin']}",
        f"GitHub: {COMPANY['github']}",
    ])

    h2(doc, "Compact Mobile Signature")
    copy_block(doc, [
        f"[Name] | [Title] | {COMPANY['name']}",
        f"{COMPANY['email']} | {COMPANY['phone']}",
        COMPANY["website"],
    ])

    h2(doc, "Sales/Proposal Signature Variant")
    copy_block(doc, [
        "[Full Name]",
        "[Role - e.g., Growth and Partnerships]",
        COMPANY["name"],
        "",
        "Helping startups, SMEs, and enterprises build scalable software across Africa and global markets.",
        "",
        "Book a discovery call: [Scheduling Link]",
    ])

    save(doc, "templates/branding/EMAIL_SIGNATURE.docx")


def social_media_bio():
    doc = new_document()
    doc_title(doc, "Social Media Bios")

    h2(doc, "LinkedIn Company Bio")
    copy_block(doc, [
        "Nakola Expert Systems is an African-grounded, globally oriented technology company "
        "delivering custom software, digital transformation, cloud, and consulting services for "
        "startups, SMEs, enterprises, and international organizations.",
    ])

    h2(doc, "X (Twitter) Bio")
    copy_block(doc, [
        "African-grounded. Global-standard software delivery.",
        "Custom software | Consulting | Cloud | QA",
        "Nairobi, Kenya. Serving clients globally.",
    ])

    h2(doc, "Instagram/Facebook Bio")
    copy_block(doc, [
        "Build Smarter. Scale Faster. Innovate Globally.",
        "Software and digital solutions for ambitious businesses.",
        "Nairobi, Kenya | Global delivery.",
    ])

    h2(doc, "Short CTA Options")
    bullet(doc, "Book a discovery call: [Link]")
    bullet(doc, "Request a proposal: https://nakolaexpertsystems.com/contact.html")
    bullet(doc, "View our work: https://nakolaexpertsystems.com/work.html")

    save(doc, "templates/branding/SOCIAL_MEDIA_BIO.docx")


# ─────────────────────────────────────────────────────────────────
# MARKETING
# ─────────────────────────────────────────────────────────────────
def capability_statement():
    doc = new_document()
    doc_title(doc, "Capability Statement")

    h2(doc, "Company Overview")
    body(doc, f"{COMPANY['name']} is a Nairobi-based technology company delivering "
              "global-standard software and digital transformation services for organizations "
              "operating in African and international markets.")

    h2(doc, "Core Capabilities")
    for i in ["Custom Software Development", "Technology Consulting", "Digital Transformation",
              "Cloud and DevOps", "Quality Assurance and Testing", "Managed Support and Maintenance"]:
        numbered(doc, i)

    h2(doc, "Differentiators")
    for i in ["Senior-led project delivery", "Outcome-focused execution tied to business metrics",
              "Strong African market understanding with global engineering quality",
              "Transparent communication and delivery governance"]:
        bullet(doc, i)

    h2(doc, "Delivery Evidence")
    for i in ["50+ projects delivered", "8+ countries served", "98% client satisfaction",
              "Case experience across e-commerce, healthtech, fintech, enterprise, education, and insurance"]:
        bullet(doc, i)

    h2(doc, "Preferred Engagement Models")
    for i in ["Fixed-Price Projects", "Agile Retainer", "Dedicated Team"]:
        bullet(doc, i)

    h2(doc, "Typical Client Segments")
    for i in ["Startups launching MVPs and scaling products", "SMEs modernizing operations",
              "Enterprises improving reliability, security, and integrations",
              "International organizations building regional digital capacity"]:
        bullet(doc, i)

    h2(doc, "Compliance and Business Information")
    field(doc, "Company Registration Number", PH("Company Registration Number"), True)
    field(doc, "KRA PIN", PH("KRA PIN"), True)
    field(doc, "Registered Address", PH("Registered Address"), True)

    h2(doc, "Contact")
    field(doc, "Email", COMPANY["email"])
    field(doc, "Phone", COMPANY["phone"])
    field(doc, "Website", COMPANY["website"])
    field(doc, "Location", COMPANY["location"])

    save(doc, "templates/marketing/CAPABILITY_STATEMENT.docx")


def client_outreach_email():
    doc = new_document()
    doc_title(doc, "Client Outreach Email Templates")
    placeholder_legend(doc)

    h2(doc, "Template 1: Cold Outreach")
    copy_block(doc, [
        "Subject: Helping [Client Company] accelerate [Goal/Initiative]",
        "",
        "Hi [First Name],",
        "",
        f"I am reaching out from {COMPANY['name']}, a Nairobi-based technology partner "
        "delivering global-standard software for startups, SMEs, and enterprises.",
        "",
        "I noticed [specific context about client] and thought we could support your team "
        "with [relevant service: software, consulting, cloud, QA, support].",
        "",
        "If useful, we can schedule a short discovery call and share practical "
        "recommendations tailored to your roadmap.",
        "",
        "Would [Day/Time Option 1] or [Day/Time Option 2] work for you?",
        "",
        "Best regards,",
        "[Your Name]",
        "[Title]",
        COMPANY["name"],
        f"{COMPANY['email']} | {COMPANY['phone']}",
    ])

    h2(doc, "Template 2: Follow-Up")
    copy_block(doc, [
        "Subject: Re: [Previous Subject]",
        "",
        "Hi [First Name],",
        "",
        "Following up in case this is still relevant. We recently helped teams improve "
        "[example outcome: delivery speed, reliability, revenue impact] through focused "
        "software execution.",
        "",
        "If now is not the right time, I can share a short capability summary for future reference.",
        "",
        "Best,",
        "[Your Name]",
    ])

    h2(doc, "Template 3: Referral Introduction")
    copy_block(doc, [
        "Subject: Introduction from [Referrer Name] - Nakola Expert Systems",
        "",
        "Hi [First Name],",
        "",
        "[Referrer Name] suggested we connect regarding [project/challenge].",
        "",
        f"At {COMPANY['name']}, we build and scale digital products for organizations "
        "operating across African and global markets. I would be glad to understand your "
        "priorities and propose a practical next step.",
        "",
        "Are you available for a 20-minute call this week?",
        "",
        "Regards,",
        "[Your Name]",
    ])

    save(doc, "templates/marketing/CLIENT_OUTREACH_EMAIL.docx")


def project_case_study():
    doc = new_document()
    doc_title(doc, "Project Case Study")
    placeholder_legend(doc)

    h2(doc, "1. Case Study Summary")
    field(doc, "Project Name", PH("Project Name"), True)
    field(doc, "Client", PH("Client Name or Anonymous Label"), True)
    field(doc, "Industry", PH("Industry"), True)
    field(doc, "Region", PH("Country/Market"), True)
    field(doc, "Service Category", PH("Service"), True)

    h2(doc, "2. Client Challenge")
    body(doc, PH("Describe the client's business and technical challenge."), italic=True)

    h2(doc, "3. Objectives")
    for i in range(1, 4):
        numbered(doc, PH(f"Objective {i}"))

    h2(doc, "4. Solution Delivered")
    field(doc, "Approach", PH("Discovery / Build / Transform / Support model"), True)
    h3(doc, "Key Capabilities Implemented")
    for i in range(1, 4):
        bullet(doc, PH(f"Capability {i}"))

    h2(doc, "5. Delivery Snapshot")
    field(doc, "Timeline", PH("Duration"), True)
    field(doc, "Team Composition", PH("Roles"), True)
    field(doc, "Engagement Model", PH("Fixed-Price / Retainer / Dedicated Team"), True)

    h2(doc, "6. Measurable Results")
    make_table(
        doc,
        ["Metric", "Before", "After", "Impact"],
        [["[Metric 1]", "[Value]", "[Value]", "[Impact]"],
         ["[Metric 2]", "[Value]", "[Value]", "[Impact]"],
         ["[Metric 3]", "[Value]", "[Value]", "[Impact]"]],
        align_right_cols={1, 2, 3},
    )

    h2(doc, "7. Client Testimonial")
    body(doc, f'"{PH("Insert approved client quote")}"', italic=True)
    body(doc, PH("Name, Title"), italic=True, color=PLACEHOLDER_COLOR)

    h2(doc, "8. Key Takeaways")
    for i in range(1, 4):
        bullet(doc, PH(f"Insight {i}"))

    h2(doc, "9. Call to Action")
    body(doc, f"If your organization faces a similar challenge, contact {COMPANY['name']} "
              f"at {COMPANY['email']}.")

    save(doc, "templates/marketing/PROJECT_CASE_STUDY_TEMPLATE.docx")


def service_packages():
    doc = new_document()
    doc_title(doc, "Service Packages")
    placeholder_legend(doc)

    body(doc, "These sample packages are designed for startups, SMEs, enterprises, and "
              "international organizations. Final scope and pricing should be customized per "
              "client needs.")

    h2(doc, "1. Discovery and Strategy Package")
    body(doc, "Best for: Organizations planning a new product or major transformation.", bold=True)
    for i in ["Business and technical discovery workshops", "Architecture and implementation roadmap",
              "Delivery timeline and budget model", "Risk and dependency assessment"]:
        bullet(doc, i)
    field(doc, "Estimated Timeline", "2-4 weeks")
    field(doc, "Investment Range", PH("Insert range"), True)

    h2(doc, "2. Build and Launch Package")
    body(doc, "Best for: MVPs and production-ready product launches.", bold=True)
    for i in ["Product design and engineering", "Backend, frontend, and integrations",
              "Quality assurance and release readiness", "Deployment and launch support"]:
        bullet(doc, i)
    field(doc, "Estimated Timeline", "4-16 weeks+")
    field(doc, "Investment Range", PH("Insert range"), True)

    h2(doc, "3. Scale and Optimize Package")
    body(doc, "Best for: Growing products needing performance, reliability, and growth support.", bold=True)
    for i in ["Cloud and DevOps optimization", "Performance tuning and monitoring",
              "Security and compliance improvements", "Ongoing sprint-based enhancements"]:
        bullet(doc, i)
    field(doc, "Estimated Timeline", "Rolling monthly/quarterly")
    field(doc, "Investment Range", PH("Insert range"), True)

    h2(doc, "Engagement Model Options")
    bullet(doc, "Fixed-Price Project: Defined scope, fixed budget")
    bullet(doc, "Agile Retainer: Flexible scope, continuous delivery")
    bullet(doc, "Dedicated Team: Embedded long-term team support")

    h2(doc, "Optional Add-Ons")
    for i in ["CTO-as-a-Service", "Security and compliance audit",
              "Advanced analytics and reporting", "Team training and documentation"]:
        bullet(doc, i)

    h2(doc, "Notes")
    bullet(doc, "All packages should include clear deliverables and acceptance criteria.")
    bullet(doc, "Use placeholders for regulatory or financial details until verified.")

    save(doc, "templates/marketing/SERVICE_PACKAGES.docx")


def whatsapp_business_message():
    doc = new_document()
    doc_title(doc, "WhatsApp Business Message Templates")
    placeholder_legend(doc)

    h2(doc, "1. New Inquiry Auto-Reply")
    copy_block(doc, [
        f"Hello and thank you for contacting {COMPANY['name']}.",
        "",
        "We build software and digital solutions for startups, SMEs, enterprises, and "
        "international organizations.",
        "",
        "Please share:",
        "1. Your name and company",
        "2. The type of project/service needed",
        "3. Your timeline and budget range",
        "",
        "Our team will respond as soon as possible.",
    ])

    h2(doc, "2. Discovery Prompt Message")
    copy_block(doc, [
        "Thanks, [Client Name].",
        "To prepare an accurate proposal, could you share:",
        "- Project goals",
        "- Current challenges",
        "- Any reference links",
        "- Whether an NDA is required before deeper discussions",
    ])

    h2(doc, "3. Proposal Follow-Up")
    copy_block(doc, [
        "Hello [Client Name], just checking in on the proposal we shared for [Project Name].",
        "",
        "If helpful, we can schedule a short call to walk through scope, timeline, and budget options.",
    ])

    h2(doc, "4. Post-Launch Support Check-In")
    copy_block(doc, [
        "Hi [Client Name], we hope everything is running smoothly.",
        "",
        "Would you like us to activate a support plan for proactive monitoring, updates, "
        "and ongoing improvements?",
    ])

    save(doc, "templates/marketing/WHATSAPP_BUSINESS_MESSAGE.docx")


if __name__ == "__main__":
    client_onboarding_checklist()
    maintenance_agreement()
    project_brief()
    project_handover_checklist()
    project_requirements_form()
    brand_guidelines()
    business_card_content()
    email_signature()
    social_media_bio()
    capability_statement()
    client_outreach_email()
    project_case_study()
    service_packages()
    whatsapp_business_message()
    print("\nAll 14 remaining documents generated successfully.")
