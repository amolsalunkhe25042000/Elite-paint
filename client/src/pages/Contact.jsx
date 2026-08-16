import { useState } from "react";
import { addCustomerRequest } from "../utils/documentStorage";
import "./Contact.css";

export default function Contact() {
  const [data, setData] = useState({ name: "", phone: "", service: "Interior painting", message: "" });
  const [sent, setSent] = useState(false);
  const change = (event) => setData({ ...data, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();

    const newRequest = {
      name: data.name,
      phone: data.phone,
      service: data.service,
      message: data.message,
      source: "free-quote",
    };

    addCustomerRequest(newRequest);

    const text = encodeURIComponent(`Hello Elite Paint!\n\nName: ${data.name}\nPhone: ${data.phone}\nService: ${data.service}\nProject details: ${data.message}`);
    window.open(`https://wa.me/919356535803?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
    window.location.hash = "/admin";
  };
  return <main><section className="page-hero"><div className="container"><p className="eyebrow">Let's make it happen</p><h1>Tell us about<br />your space.</h1><p>Get friendly advice and a free, no-pressure quote.</p></div></section>
    <section className="contact-wrap"><div className="container contact-grid-new"><aside><p className="eyebrow">Get in touch</p><h2 className="section-heading">We'd love to hear what you're planning.</h2><p className="section-copy">Big plans, small refreshes and everything in between — drop us a note and we'll get back to you shortly.</p><div className="contact-method"><span>Phone</span><a href="tel:9356535803">+91 93565 35803</a></div><div className="contact-method"><span>WhatsApp</span><a href="https://wa.me/919356535803" target="_blank" rel="noreferrer">Start a conversation ↗</a></div><div className="contact-method"><span>Hours</span><p>Monday – Saturday<br />9:00 AM – 7:00 PM</p></div></aside>
      <div className="quote-form"><p className="eyebrow">Request your free quote</p><h2>Let's get started.</h2>{sent && <div className="form-success" role="status">Thanks, {data.name.split(" ")[0] || "there"}! WhatsApp has opened with your request.</div>}<form onSubmit={submit}><label>Full name<input required name="name" value={data.name} onChange={change} placeholder="Your name" /></label><label>Phone number<input required type="tel" name="phone" value={data.phone} onChange={change} placeholder="Your phone number" /></label><label>I'm interested in<select name="service" value={data.service} onChange={change}><option>Interior painting</option><option>Exterior painting</option><option>Textures & effects</option><option>Waterproofing</option><option>Repainting & renovation</option><option>Commercial painting</option><option>Other</option></select></label><label>Tell us a little more<textarea name="message" value={data.message} onChange={change} placeholder="Which rooms are you planning to transform?" rows="4" /></label><button className="btn btn-primary" type="submit">Send my request <b>→</b></button></form></div>
    </div></section></main>;
}
