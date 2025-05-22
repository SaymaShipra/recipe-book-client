import React, { useState } from "react";
import { toast } from "sonner";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple email validation
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-primary/5 py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-3">Stay Updated</h2>
          <p className="text-gray-600 text-base mb-6">
            Subscribe to our newsletter for new recipes, cooking tips, and
            exclusive content
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered sm:flex-1"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className={`btn text-white bg-amber-500 ${
                isSubmitting ? "loading" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <p className="text-xs text-gray-700 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
