import React from "react";

const PricingFaqs = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto mt-24">
        <SectionTitle
          title="Frequently Asked Questions"
          description="Find answers to common questions about our membership plans and services."
          align="center"
        />

        <div className="space-y-4">
          {[
            {
              question: "Can I upgrade or downgrade my plan later?",
              answer:
                "Yes, you can change your plan at any time. Any price difference will be prorated.",
            },
            {
              question: "Is there a contract or long-term commitment?",
              answer:
                "No, all our plans are month-to-month with no long-term contracts. You can cancel anytime.",
            },
            {
              question: "Do you offer student or military discounts?",
              answer:
                "Yes, we offer 15% off for students and military personnel with valid ID.",
            },
            {
              question: "Can I freeze my membership?",
              answer:
                "Yes, you can freeze your membership for up to 3 months per year for medical or travel reasons.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-2 text-base-300">
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingFaqs;
