import React from "react";
import "./PricingCalculator.css";

const PricingCalculator = () => {
  return (
    <section className="pricing-calculator">
      <div className="pricing-calculator__container">
        <div className="pricing-calculator__header">
          <p className="pricing-calculator__eyebrow">Package Customised Sample Explanation</p>
          <h2>Package Calculator</h2>
          <p>
            Craft Your Brand. Control Your Investment. Scale Without Limits.
          </p>
        </div>

        <div className="pricing-calculator__grid">
          {/* Left Form */}
          <div className="pricing-calculator__form-box">
            <h3>Fill the Details for Calculate Package</h3>

            <input type="text" placeholder="Company Name" />
            <input type="text" placeholder="Business Category" />
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Position" />
            <input type="email" placeholder="Mail id" />
            <input type="text" placeholder="Number" />
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="Monthly Budget Range" />

            <p className="pricing-calculator__note">
              If client info is not filled, the calculator will not work.
            </p>
          </div>

          {/* Right Content */}
          <div className="pricing-calculator__content-box">
            <div className="pricing-calculator__select-section">
              <h3>Choose the services you need.</h3>
              <p>
                Build your package step-by-step and see real-time pricing updates.
              </p>

              <select>
                <option>Select Category</option>
              </select>

              <select>
                <option>Select Services</option>
              </select>
            </div>

            <div className="pricing-calculator__summary">
              <h3>Your Custom Package Summary</h3>

              <table>
                <thead>
                  <tr>
                    <th>Selected Service</th>
                    <th>Per Service Price</th>
                    <th>Nos. Of Qnt</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Service 1</td>
                    <td>Price</td>
                    <td>Qnt</td>
                    <td>Price</td>
                  </tr>
                </tbody>
              </table>

              <div className="pricing-calculator__total">
                Total Package Price: 0/-
              </div>
            </div>

            <button className="pricing-calculator__btn">
              Generate My Quotation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;