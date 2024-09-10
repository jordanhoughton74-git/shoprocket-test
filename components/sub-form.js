"use client";
import { useRef, useState } from "react";

export default function NewsLetterSignUpForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [marketingPermissions, setMarketingPermissions] = useState(false);

  const subscribeUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/subscribeUser", {
      body: JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
        marketingPermissions: marketingPermissions
      }),

      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
    });
    if (res.ok) {
      setEmail("");
      setFirstName("");
      setLastName("");
    } else {
      const errorMessage = await res.json();
      if (errorMessage === "Member Exists") {
        alert("Email has already subscribed");
      } else {
        alert("There appears to be error, email us at");
      }
    }
  };

  return (
    <form onSubmit={subscribeUser}>
      <label htmlFor="email-input" className="form__label">
        Your Best Email
      </label>

      <input
        type="email"
        id="email-input"
        name="email"
        placeholder="your best email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoCapitalize="off"
        autoCorrect="off"
      />
      <input
        type="text"
        id="first-name"
        name="first-name"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        autoCapitalize="off"
        autoCorrect="off"
      />
      <input
        type="text"
        id="last-name"
        name="last-name"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        autoCapitalize="off"
        autoCorrect="off"
      />
      <input
        type="checkbox"
        id="marketing-permission"
        name="marketing-permission"
        placeholder="Marketing Permissions"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        autoCapitalize="off"
        autoCorrect="off"
      />

      <button type="submit" value="" name="subscribe">
        Subscribe
      </button>
    </form>
  );
}
