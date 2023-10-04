import { Container } from "@/components/Container";
import Image from "next/image";

const About = ({}) => {
  return (
    <Container>
      <div>
        <Image
          alt="Oliver"
          src="/img/oliver.jpg"
          width="1200"
          height="809"
          className="max-w-full mb-8"
        />
        <div className="text-2xl font-bold mb-6">Hi, I'm Oliver.</div>
        <div className="text-base xl:text-lg mb-6">
          I'm the founder of{" "}
          <a
            href="https://or-innovation.com"
            target="new"
            className="underline md:hover:text-blue-700"
          >
            OR/innovation
          </a>
          , a company working on problems at the intersection of psychology and
          technology.
        </div>
        <div className="text-base xl:text-lg mb-6">
          I speak about disruptive technology & innovation, and have a
          background in coding, marketing and psychology.
        </div>
        <div className="text-base xl:text-lg">
          <a href="/contact">Send me an email</a> if you'd like to find out more
          or just say hi..
        </div>
      </div>
    </Container>
  );
};

export default About;
