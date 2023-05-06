"use client"
import styles from "./page.module.css"
import Image from "next/image";

import React from "react";
import cRock from "../../public/artDrawStuff/cRock.svg";
import land from "../../public/artDrawStuff/land.svg";
import planet from "../../public/artDrawStuff/planet.svg";
import sky from "../../public/artDrawStuff/sky.svg";

function ArtDraw() {
  return (
    <div className={styles.artDrawDiv}>
      <div className={styles.wrapper}>
        <header>
          <Image alt="rock" src={cRock} className={styles.cRock} />
          <Image alt="land" src={land} className={styles.land} />
          <Image alt="planet" src={planet} className={styles.planet} />
          <Image alt="skys" src={sky} className={styles.sky} />
          <h1>Welcome to Mars!</h1>
        </header>

      <section>
        Mars is the fourth planet from the Sun and is known as the Red Planet
        due to its reddish appearance. It is the second smallest planet in the
        solar system and is about half the size of Earth. Mars is a rocky planet
        that is similar to Earth in many ways, which is why it has long been a
        subject of fascination for humans.
        <div id="sd1" style={{"--bgImage" : `url("https://images.pexels.com/photos/8474484/pexels-photo-8474484.jpeg")`} as React.CSSProperties} className={styles.ADSectionImage}></div>
      </section>

      <section>
        One of the most interesting things about Mars is that it may have had
        liquid water on its surface in the past. There is strong evidence that
        Mars had a much thicker atmosphere and a stable climate in the past,
        which would have allowed liquid water to exist on the planet&apos;s surface.
        The presence of water on Mars is significant because it is a key
        ingredient for life as we know it.
        <div id="sd2" style={{"--bgImage" : `url("https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg")`} as React.CSSProperties} className={styles.ADSectionImage}></div>
      </section>
      <section>
        Another reason why Mars is so interesting is because it has the largest
        volcano and the longest canyon in the solar system. Olympus Mons is a
        massive shield volcano on Mars that is almost three times as tall as
        Mount Everest. Valles Marineris is a massive canyon on Mars that
        stretches more than 4,000 miles across the planet&apos;s surface, making it
        longer than the United States. Both of these geological features are
        truly awe-inspiring and provide valuable insights into the history and
        evolution of Mars.
        <div id="sd3" style={{"--bgImage" : `url("https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg")`} as React.CSSProperties} className={styles.ADSectionImage}></div>
      </section>
      <section>
        In recent years, Mars has garnered even more attention due to the
        numerous missions to the planet by NASA and other space agencies. These
        missions have revealed that Mars is a dynamic and complex planet with a
        fascinating geology and a history of dramatic climate changes. From
        rover missions that have explored the planet&apos;s surface to orbiter
        missions that have mapped the planet&apos;s surface and atmosphere, we are
        constantly learning new things about Mars. Overall, Mars is a truly
        remarkable and fascinating planet that continues to captivate our
        imaginations and inspire us to explore the universe. From its potential
        to support life to its stunning geological features, there is much we
        can learn from Mars and much more that we have yet to discover.
        <div id="sd4" style={{"--bgImage" : `url("https://images.pexels.com/photos/8474701/pexels-photo-8474701.jpeg")`} as React.CSSProperties} className={styles.ADSectionImage}></div>
      </section>
      </div>

    </div>
  );
}

export default ArtDraw;
