"use client"
// components/FAQAccordion.jsx

import React, { useState } from 'react';

const FAQAccordion = () => {
  const [accordions, setAccordions] = useState([
    {
      id: 1,
      question: 'What types of farm products do you offer?',
      answer:
        'We offer a wide variety of fresh farm products including meats, dairy products, and more. All our products are sourced directly from local farms to ensure freshness and quality.',
      isOpen: true,
    },
    {
      id: 2,
      question: 'How do I place an order?',
      answer:
        "You can place an order through our website by browsing our products, adding them to your cart, and proceeding to checkout. It's a simple and straightforward process.",
      isOpen: false,
    },
    {
      id: 3,
      question: 'Is there a minimum order amount for delivery?',
      answer:
        'Yes, there is a minimum order amount of $[X] for delivery. Orders below this amount may incur a delivery fee.',
      isOpen: false,
    },
    {
      id: 4,
      question: 'How do you ensure the freshness of your products?',
      answer:
        'Our products are sourced directly from trusted local farms. We prioritize freshness by minimizing the time between harvest and delivery. Additionally, our delivery process is designed to maintain the quality and integrity of your products.',
      isOpen: false,
    },
  ]);

  const toggleAccordion = (id) => {
    setAccordions((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  return (
    <section className="pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
            Frequently asked questions
          </h2>
        </div>
        <div className="accordion-group" data-accordion="default-accordion">
          {accordions.map((item) => (
            <div
              key={item.id}
              className={`accordion border border-solid border-gray-300 p-4 rounded-xl ${
                item.isOpen
                  ? 'bg-blue-50 border-blue-500 text-blue-700 '
                  : ''
              } mb-8 lg:p-4`}
            >
              <button
                className={`accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8  w-full transition duration-500 hover:text-blue-600   ${
                  item.isOpen ? "text-blue-600 font-medium" : ""}`}
                aria-controls={`basic-collapse-${item.id}`}
                onClick={() => toggleAccordion(item.id)}
              >
                <h5>{item.question}</h5>
                <svg
                  className={`w-6 h-6 text-gray-900 transition duration-500 ${
                    item.isOpen ? 'hidden' : 'block'
                  } accordion-active:text-blue-600 accordion-active:hidden group-hover:text-blue-600`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className={`w-6 h-6 text-gray-900 transition duration-500 ${
                    item.isOpen ? 'block' : 'hidden'
                  } accordion-active:text-blue-600 accordion-active:block group-hover:text-blue-600`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <div
                id={`basic-collapse-${item.id}`}
                className={`accordion-content w-full overflow-hidden pr-4 ${
                  item.isOpen ? 'max-h-[250px]' : 'max-h-0'
                }`}
                aria-labelledby={`basic-heading-${item.id}`}
              >
                <p className="text-base text-gray-900 font-normal leading-6">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
