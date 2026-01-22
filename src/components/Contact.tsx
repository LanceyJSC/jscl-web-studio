import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side - Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-mono text-muted-foreground tracking-wide block mb-4">
              // GET IN TOUCH
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Let's build
              <br />
              something
              <br />
              <span className="text-muted-foreground">iconic.</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Currently available for freelance projects and full-time opportunities.
              Let's create something extraordinary together.
            </p>

            {/* Direct email */}
            <a
              href="mailto:hello@jscl.design"
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-muted-foreground block">
                  Direct email
                </span>
                <span className="text-foreground font-medium group-hover:text-accent transition-colors duration-200">
                  hello@jscl.design
                </span>
              </div>
            </a>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div>
                <label
                  htmlFor="name"
                  className="text-xs font-mono text-muted-foreground tracking-wide block mb-2"
                >
                  01 // NAME
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-border focus:border-foreground rounded-none h-12 text-foreground placeholder:text-muted-foreground/50"
                />
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-mono text-muted-foreground tracking-wide block mb-2"
                >
                  02 // EMAIL
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-border focus:border-foreground rounded-none h-12 text-foreground placeholder:text-muted-foreground/50"
                />
              </div>

              {/* Message field */}
              <div>
                <label
                  htmlFor="message"
                  className="text-xs font-mono text-muted-foreground tracking-wide block mb-2"
                >
                  03 // MESSAGE
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-transparent border-border focus:border-foreground rounded-none text-foreground placeholder:text-muted-foreground/50 resize-none"
                />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-foreground text-background hover:bg-accent rounded-none font-medium tracking-wide transition-all duration-300 group"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
