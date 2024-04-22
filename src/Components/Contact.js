import React, { useState, useEffect, useCallback, useMemo } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

function Contact() {
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [captcha, setCaptcha] = useState({ question: "", answer: "" });
  const [userCaptchaInput, setUserCaptchaInput] = useState("");

  
  const questions = useMemo(
    () => [
      { question: "The color of the sky on a clear day", answer: "blue" },
      { question: "5 times 2 equals", answer: "10" },
      { question: "Number of fingers on a hand", answer: "5" },
      {
        question: "Fill in the blank: Ice is to cold as fire is to __?",
        answer: "hot",
      },
      { question: "What is the opposite of 'up'?", answer: "down" },
      { question: "How many days are there in a leap year?", answer: "366" },
      { question: "If you freeze water, what do you get?", answer: "ice" },
      { question: "What is 10 divided by 2?", answer: "5" },
      { question: "What do bees produce?", answer: "honey" },
      {
        question:
          "What is the boiling point of water? Answer in degrees Celsius.",
        answer: "100",
      },
      {
        question: "If today is Sunday, what is the day after tomorrow?",
        answer: "Tuesday",
      },
      { question: "What planet do we live on?", answer: "Earth" },
      { question: "How many colors are in a rainbow?", answer: "7" },
      { question: "What is the capital of France?", answer: "Paris" },
      { question: "What do you call water in its solid state?", answer: "ice" },
      {
        question:
          "Which is heavier: 1 kilogram of feathers or 1 kilogram of rocks?",
        answer: "neither",
      },
      { question: "What is the largest mammal?", answer: "blue whale" },
      { question: "How many seconds are in a minute?", answer: "60" },
      { question: "What is the square root of 16?", answer: "4" },
      { question: "What is the term for a baby dog?", answer: "puppy" },
      { question: "Which season comes after summer?", answer: "autumn" },
      {
        question: "What do you use to write on a blackboard?",
        answer: "chalk",
      },
      {
        question: "What is the hardest natural substance on Earth?",
        answer: "diamond",
      },
      {
        question: "What gas do plants absorb from the atmosphere?",
        answer: "carbon dioxide",
      },
      { question: "How many continents are there?", answer: "7" },
      { question: "Who invented the light bulb?", answer: "Thomas Edison" },
      {
        question: "What is the largest planet in our solar system?",
        answer: "Jupiter",
      },
      { question: "What is the chemical symbol for water?", answer: "H2O" },
      { question: "What do you call a house made of ice?", answer: "igloo" },
      { question: "What is the currency of Japan?", answer: "Yen" },
      { question: "Who wrote 'Hamlet'?", answer: "William Shakespeare" },
      { question: "What is the longest river in the world?", answer: "Nile" },
      {
        question: "What instrument measures temperature?",
        answer: "thermometer",
      },
      { question: "What is the capital of Egypt?", answer: "Cairo" },
      { question: "What is the main ingredient in bread?", answer: "flour" },
      { question: "How many legs does a spider have?", answer: "8" },
      { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
      { question: "What is the largest ocean?", answer: "Pacific" },
      { question: "What device do you use to call people?", answer: "phone" },
      {
        question:
          "What is the freezing point of water? Answer in degrees Celsius.",
        answer: "0",
      },
      { question: "What season follows Spring?", answer: "Summer" },
      { question: "What is the chemical symbol for gold?", answer: "Au" },
      { question: "How many sides does an octagon have?", answer: "8" },
      {
        question: "In what city is the Eiffel Tower located?",
        answer: "Paris",
      },
      {
        question: "What animal is known as the King of the Jungle?",
        answer: "Lion",
      },
      { question: "What is the primary color of a banana?", answer: "Yellow" },
      { question: "What is the capital city of Japan?", answer: "Tokyo" },
      {
        question: "How many days are there in February during a leap year?",
        answer: "29",
      },
      {
        question: "What gas do living creatures need to breathe?",
        answer: "Oxygen",
      },
      { question: "What is the largest continent?", answer: "Asia" },
      { question: "What do you call a baby cat?", answer: "Kitten" },
      { question: "Who discovered gravity?", answer: "Isaac Newton" },
      { question: "What is the opposite of hot?", answer: "Cold" },
      {
        question: "What is the device used to measure an earthquake?",
        answer: "Seismograph",
      },
      {
        question: "What is the hardest known natural material?",
        answer: "Diamond",
      },
      {
        question: "What is the currency used in the United Kingdom?",
        answer: "Pound",
      },
      { question: "What planet is known as the Red Planet?", answer: "Mars" },
      {
        question: "What is the name of the fairy in Peter Pan?",
        answer: "Tinker Bell",
      },
      {
        question: "What liquid is known as the universal solvent?",
        answer: "Water",
      },
      { question: "What is the tallest mammal?", answer: "Giraffe" },
      {
        question:
          "What is the process plants use to convert sunlight into food?",
        answer: "Photosynthesis",
      },
      {
        question: "What is the largest organ of the human body?",
        answer: "Skin",
      },
      {
        question: "What is the only mammal capable of true flight?",
        answer: "Bat",
      },
      { question: "What is the capital of Italy?", answer: "Rome" },
      {
        question: "What natural disaster is measured with the Richter scale?",
        answer: "Earthquake",
      },
      { question: "What is the fastest land animal?", answer: "Cheetah" },
      {
        question: "What instrument is used to measure atmospheric pressure?",
        answer: "Barometer",
      },
      {
        question: "What is the smallest bone in the human body?",
        answer: "Stapes",
      },
      {
        question: "What is the main ingredient in guacamole?",
        answer: "Avocado",
      },
      {
        question: "What is the name of the world's longest river?",
        answer: "Amazon",
      }, // Adjusted for accuracy.
      {
        question: "Who is the author of Harry Potter books?",
        answer: "J.K. Rowling",
      },
      {
        question: "What is the periodic table symbol for sodium?",
        answer: "Na",
      },
      {
        question: "What is the first element on the periodic table?",
        answer: "Hydrogen",
      },
      { question: "What galaxy is Earth located in?", answer: "Milky Way" },
      { question: "What is the capital of Australia?", answer: "Canberra" },
    ],
    []
  );

 const generateCaptcha = useCallback(() => {
    const captchaType = Math.random() > 0.5 ? 'math' : 'question';
    if (captchaType === 'math') {
        const num1 = Math.ceil(Math.random() * 12);
        const num2 = Math.ceil(Math.random() * 12);
        const operators = ["+", "-", "*"];
        const operator =
          operators[Math.floor(Math.random() * operators.length)];
        const question = `${num1} ${operator} ${num2}`;
        let answer;
        switch (operator) {
          case "+":
            answer = num1 + num2;
            break;
          case "-":
            answer = num1 - num2;
            break;
          case "*":
            answer = num1 * num2;
            break;
          default:
            answer = num1 + num2;
        }
        setCaptcha({ question, answer: answer.toString() });
       } else {
      const selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
      setCaptcha(selectedQuestion);
    }
  }, [questions]);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userCaptchaInput.toLowerCase() !== captcha.answer.toLowerCase()) {
      setFeedbackMsg("Captcha incorrect, please try again.");
      generateCaptcha();
      return;
    }

    try {
      const result = await emailjs.sendForm(
        "service_mwc8i97",
        "template_9ww8iev",
        e.target,
        "CB7dvR43nn84ecNTh"
      );
      console.log(result.text);
      setFeedbackMsg("Message sent successfully!");
      e.target.reset();
      generateCaptcha();
    } catch (error) {
      console.error("Failed to send message:", error.text);
      setFeedbackMsg("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="user_name" placeholder="Your Name" required />
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
        />
        <textarea name="message" placeholder="Your Message" required></textarea>
        <div>
          <p>{captcha.question}</p>
          <input
            type="text"
            onChange={(e) => setUserCaptchaInput(e.target.value)}
            placeholder="Your answer"
            required
          />
        </div>
        <button id="formButton" type="submit">
          Send Message
        </button>
      </form>
      {feedbackMsg && <p className="feedback-message">{feedbackMsg}</p>}
    </div>
  );
}

export default Contact;
