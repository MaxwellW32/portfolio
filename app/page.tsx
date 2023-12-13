"use client"
import styles from './page.module.css'
// import { Inter } from 'next/font/google'
import TitleText from '../Components/home/TitleText';
import MyPlayer from "../Components/home/MyPlayer"

import Link from 'next/link'
import ContactForm from '../Components/home/ContactForm';
import { useEffect, useState } from 'react';


function Socials(
  { name, heading, children }
    :
    { name: string; heading: string; children: React.ReactNode }
) {

  return (
    <Link href="/portfolio">
      <div className={styles.indivSocialCont}>
        <div className={styles.indivSocialContSvgCont}>{children}</div>
        <p>{name}</p>
        <p>{heading}</p>
      </div>
    </Link>
  );
}

function Home() {

  const skillsGroup = [
    {
      imgUrl:
        "https://images.pexels.com/photos/9822732/pexels-photo-9822732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "SEO Optimization",
      description: "desc",
    },

    {
      imgUrl:
        "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "React",
      description: "desc",
    },

    {
      imgUrl:
        "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "JavaScript",
      description: "desc",
    },

    {
      imgUrl:
        "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Django",
      description: "desc",
    },

    {
      imgUrl:
        "https://images.pexels.com/photos/11035474/pexels-photo-11035474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Python",
      description: "desc",
    },

    {
      imgUrl:
        "https://www.zend.com/sites/default/files/image/2020-04/image-blog-mysql-php.jpg",
      title: "MySQL",
      description: "desc",
    },

    {
      imgUrl:
        "https://images.pexels.com/photos/11035539/pexels-photo-11035539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Git",
      description: "desc",
    },

    {
      imgUrl:
        "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "HTML & CSS",
      description: "desc",
    },

    {
      imgUrl:
        "https://www.101computing.net/wp/wp-content/uploads/responsive-layout-website-design.png",
      title: "Responsive design",
      description: "desc",
    },

    {
      imgUrl:
        "https://images.pexels.com/photos/10376172/pexels-photo-10376172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Accessibility optimization",
      description: "desc",
    },
  ];

  const skillsGroupMap = skillsGroup.map((eachItem) => {
    return (
      <div className={styles.homeSkillsContIndiv} key={eachItem.title}>
        <img src={eachItem.imgUrl} />
        <strong>{eachItem.title}</strong>
      </div>
    );
  });

  const projectGroup = [
    {
      imgUrl:
        "https://images.pexels.com/photos/7886853/pexels-photo-7886853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Video downloader",
      link: "/downloader",
    },
    {
      imgUrl:
        "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Video Generator",
      link: "/videoGenerator",
    },
    {
      imgUrl:
        "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Art Canvas",
      link: "/artDraw",
    },
    {
      imgUrl:
        "https://images.pexels.com/photos/1370293/pexels-photo-1370293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Dictionary",
      link: "/dictionary",
    },
    {
      imgUrl:
        "https://images.pexels.com/photos/929280/pexels-photo-929280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Perspective Playground",
      link: "/perspectivePlayground",
    },
    {
      imgUrl:
        "https://images.pexels.com/photos/6927334/pexels-photo-6927334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Calculator",
      link: "/calculator",
    },
    {
      imgUrl:
        "https://images.pexels.com/photos/268351/pexels-photo-268351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "To Do App",
      link: "/toDo",
    },

    {
      imgUrl:
        "https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Eccomerce",
      link: "/ecommerce",
    },
    {
      imgUrl:
        "https://images.pexels.com/photos/3653849/pexels-photo-3653849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Blog",
      link: "#",
    },

    {
      imgUrl:
        "https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Weather App",
      link: "#",
    },
  ];

  const projectGroupMap = projectGroup.map((eachItem, index) => {
    return (
      <div
        style={{ backgroundImage: `url(${eachItem.imgUrl})` }}
        className={styles.homeSecWorkIndiv}
        key={index}
      >
        <h3>
          <Link href={eachItem.link}>{eachItem.text}</Link>
        </h3>
        {eachItem.link === "#" ? <p>Coming soon</p> : null}
      </div>
    );
  });


  return (
    <div id="homeContDiv">
      {/* <MyPlayer /> */}

      <div className={styles.hmBackgroundImgCont}>
        <TitleText />
      </div>
      <main id="homeMain">
        <section id="whatIOffer" className={`${styles.homeSection} ${styles.homeSecAbout}`}>
          <h1 className={styles.BigHeader}>ABOUT ME</h1>
          <p className={styles.homeSecAboutWho}>
            I am a certified full stack developer that provides end-to-end web
            solutions to businesses and organizations of all sizes. I focus on
            creating high-quality websites and applications that are tailored to
            meet the specific needs of any client I work with. I use
            cutting-edge technologies and design trends to deliver exceptional
            results. I specialize in React, JavaScript, HTML, CSS, Next.js, and
            AI integration, allowing me to provide fast and efficient solutions
            that exceed expectations.
          </p>

          <article className={styles.featuresCont}>
            <div className={styles.featuresContIndiv}>
              <img src="https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              <h3 className={styles.makeBold}>App Development</h3>
              <p>
                I specialize in creating high-quality, customizable mobile apps
                for iOS and Android platforms. I use the latest technologies to
                create intuitive and user-friendly applications
              </p>
            </div>

            <div className={styles.featuresContIndiv}>
              <img src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              <h3 className={styles.makeBold}>UI Design</h3>
              <p>
                I am also an expert in UI design, and create visually stunning
                and engaging user interfaces. My goal is to create designs that
                drive user engagement and increase conversion rates.
              </p>
            </div>

            <div className={styles.featuresContIndiv}>
              <img src="https://images.pexels.com/photos/7386013/pexels-photo-7386013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              <h3 className={styles.makeBold}>Brand & Identity</h3>
              <p>
                I work with you to develop logos, color schemes, and other brand
                elements that reflect your unique values and identity.
              </p>
            </div>

            <div className={styles.featuresContIndiv}>
              <img src="https://images.pexels.com/photos/9301741/pexels-photo-9301741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              <h3 className={styles.makeBold}>Consultancy</h3>
              <p>
                I also offer consultancy services to any businesses looking to
                improve their online presence. I provide advice on web design,
                development, and digital marketing strategies.
              </p>
            </div>
          </article>
        </section>

        <section
          style={{
            "--customBackground":
              "url(https://images.pexels.com/photos/4079948/pexels-photo-4079948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
          } as React.CSSProperties}
          className={`${styles.homeSection} ${styles.mottoSec}`}>
          <h1 className={styles.BigHeader}>MY PHILOSOPHY</h1>
          <p>
            I believe that the key to success is{" "}
            <span className={styles.makeHighlighted}>collaboration.</span> I work
            closely with clients to understand their unique needs and
            objectives, and use my{" "}
            <span className={styles.makeHighlighted}>experience</span> to turn their
            vision into a reality. I value transparency, communication, and
            accountability, and strive to build long-term relationships with my
            clients based on trust and mutual respect. Our goal is not just to
            deliver a website or application, but to create a lasting solution
            that drives business <span className={styles.makeHighlighted}>growth</span>{" "}
            and <span className={styles.makeHighlighted}>success</span>.
          </p>
        </section>

        <section style={{ textAlign: "center" }} className={styles.homeSection}>
          <h1 className={styles.BigHeader}>Skills</h1>
          <p>
            I specialize in getting the best to my clients across multiple
            frameworks and libraries.
          </p>
          <article className={styles.homeSkillsCont}>{skillsGroupMap}</article>
        </section>

        <section
          style={{
            "--customBackground":
              "url(https://images.pexels.com/photos/2701434/pexels-photo-2701434.jpeg)",
          } as React.CSSProperties}
          className={`${styles.homeSection} ${styles.funfactsSec}`}>
          <h1 className={styles.BigHeader}>fun facts</h1>
          <p>
            The future of web development is bright, exciting and full of
            opportunities for meeting your needs. By leveraging new technologies
            and optimizing for user experience, web developers can stay ahead of
            the curve and provide our clients with the best possible results.
          </p>
          <article className={styles.funFactsCont}>
            <div>
              <strong>137%</strong>
              <p>
                Progressive Web Apps (PWAs) are becoming more popular and can
                provide a better user experience than traditional websites.
                According to Google, PWAs have a 3x higher conversion rate
                compared to traditional websites, and they can increase user
                engagement by up to 137%.
              </p>
            </div>

            <div>
              <strong>$125 billion</strong>
              <p>
                Augmented Reality (AR) and Virtual Reality (VR) technologies are
                becoming more accessible and can provide a more immersive user
                experience. According to a report by MarketsandMarkets, the AR
                and VR market is expected to reach $125 billion by 2026.
              </p>
            </div>

            <div>
              <strong>27%</strong>
              <p>
                Voice search is becoming more prevalent, and websites that are
                optimized for voice search can drive more traffic. According to
                Google, 27% of the global online population is using voice
                search on mobile.
              </p>
            </div>

            <div>
              <strong>41%</strong>
              <p>
                Artificial Intelligence (AI) and Machine Learning (ML) can be
                used to provide personalized content and recommendations to
                website visitors. This can increase engagement and drive more
                traffic to the website. According to a study by Salesforce,
                personalized emails have a 29% higher open rate and a 41% higher
                click-through rate compared to non-personalized emails.
              </p>
            </div>
          </article>
        </section>

        <section className={`${styles.homeSection} ${styles.dropLine}`}>
          <div className={styles.borderAnimation}>
            <h1 className={styles.BigHeader}>
              <Link href="#ContactUsStart">Drop me a Line</Link>
            </h1>
          </div>
        </section>

        <section
          style={{
            "--customBackground":
              "url(https://images.pexels.com/photos/389818/pexels-photo-389818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
          } as React.CSSProperties}
          id="ServiceStart"
          className={`${styles.homeSection} ${styles.serviceSec}`}
        >
          <h1 className={styles.BigHeader}>My Services</h1>

          <p style={{ textAlign: "center" }}>
            My quality standards apply also in terms of service, technical
            expertise and advice. I are happy to assist you with know-how and
            experience in your daily business.
          </p>

          <article className={styles.servicesCont}>
            <div>
              <img
                className={styles.servicesContImg}
                src="https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />

              <strong>Consulting</strong>

              <p>
                I also go beyond just offering advice. I work with clients to
                identify opportunities for growth and improvement. I can provide
                insights on everything from web design and development, to
                digital marketing and SEO.
              </p>
            </div>

            <div className={styles.goRight}>
              <img
                className={styles.servicesContImg}
                src="https://images.pexels.com/photos/3865544/pexels-photo-3865544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <strong>Systems Integration</strong>
              <p>
                I also specialize in systems integration, allowing my clients to
                connect and streamline their business processes across different
                platforms and technologies. I have extensive experience in
                integrating complex systems and APIs, ensuring seamless
                communication between applications and platforms.
              </p>
            </div>

            <div>
              <img
                className={styles.servicesContImg}
                src="https://images.pexels.com/photos/45842/clasped-hands-comfort-hands-people-45842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />

              <strong>Support</strong>

              <p>
                My commitment goes beyond project delivery. I offer ongoing
                support and maintenance services to ensure that our clients&apos;
                websites and applications are always up-to-date and functioning
                optimally. My support services include bug fixing, security
                updates, and performance optimization.
              </p>
            </div>

            <div className={styles.goRight}>
              <img
                className={styles.servicesContImg}
                src="https://images.pexels.com/photos/13801629/pexels-photo-13801629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />

              <strong>Satisfaction Gurantee</strong>

              <p>
                I am confident in my ability to deliver exceptional results.
                That&apos;s why I offer a satisfaction guarantee to everyone I work
                with. If for any reason you are not satisfied with my services,
                we&apos;ll make sure we get it right. My goal is to build long-term
                relationships with our clients based on trust, transparency, and
                exceptional service.
              </p>
            </div>
          </article>
        </section>

        <section id="projectListStart" className={`${styles.homeSection} ${styles.workSec}`}>
          <h1 className={styles.BigHeader}>Projects</h1>
          <p>
            I believe my work speaks for itself. Browse my most recent projects
            below.
          </p>
          <div className={styles.homeSecWorkCont}>{projectGroupMap}</div>
        </section>

        <section
          style={{
            "--customBackground":
              "url(https://images.pexels.com/photos/1714203/pexels-photo-1714203.jpeg)",
          } as React.CSSProperties}
          id="ContactUsStart"
          className={`${styles.homeSection} ${styles.contactSec}`}
        >

          <ContactForm />

          <article className={styles.contactSocialCont}>
            <Socials name="Twitter" heading="Check me out">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
              </svg>
            </Socials>

            <Socials name="Facebook" heading="See Our Latest Posts">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
              </svg>
            </Socials>

            <Socials name="TikTok" heading="The Best Content">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
              </svg>
            </Socials>

            <Socials name="Youtube" heading="Watch Now">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
              </svg>
            </Socials>

            <Socials name="Instagram" heading="Take A Look">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </Socials>
          </article>
        </section>

        <section id="testimonialStart" className={`${styles.homeSection} ${styles.clientSec}`}>
          <h1 className={styles.BigHeader}>My Clients</h1>
          <div className={styles.clientSecCont}>
            <div className={styles.clientSecIndiv}>
              <img src="https://images.pexels.com/photos/3781545/pexels-photo-3781545.jpeg" />
              <p>Natalie Simmons</p>
              <p>
                I had the pleasure of working with Maxwell on a complex web
                development project, and I was consistently impressed with his
                technical skill and attention to detail. Maxwell was able to
                quickly understand the requirements of the project and develop
                high-quality code that met our needs. He was also a great
                collaborator, bringing valuable ideas and insights to the table.
                I highly recommend Maxwell as a fullstack web developer.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;