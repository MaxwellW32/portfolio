"use client"
import styles from "./page.module.css"

import React, { useState } from 'react'
import { useEffect } from 'react'
import Link from "next/link"
import Image from "next/image"

interface RatingStarProps {
    rating: number,
    maxRating?: number
}

const RatingStar: React.FC<RatingStarProps> = ({ rating, maxRating=5 }) => {
    // Calculate the number of full stars
    const fullStars = Math.floor(rating);
  
    // Calculate the remaining decimal value for half stars
    const halfStar = (rating - fullStars) >= 0.5 ? 1 : 0;
  
    // Calculate the number of empty stars
    const emptyStars = maxRating - fullStars - halfStar;
  
    // Create an array to hold the star images
    const stars = [];
  
    // Append full star images
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
      );
    }
  
    // Append half star image if necessary
    if (halfStar) {
      stars.push(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L320.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L320.1 439.8 191.8 508.3C181 514 167.9 513.1 158 506s-14.9-19.3-12.9-31.3L169.8 329 65.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L227 150.3 291.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L470.5 329l24.6 145.7z"/></svg>
      );
    }
  
    // Append empty star images
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>
      );
    }

  
    return (
      <div className={styles.ratingStar}>
        {stars.map((each, index)=>{
            return (
                <div key={index}>
                {each}
                </div>
            )
        })}
      </div>
    );
  };


  interface pdStr {
    chosen: string
  }
const ProductDisplay:React.FC<pdStr> = ()=>{

    const desktopProducts = [
        {
            title: "Lenovo ThinkBook 15 Premium Business Laptop",
            desc: `Processor: AMD Ryzen 5 5500U 2.10GHz 6-Core Processor (11MB Cache, up to 4.00GHz)

            Graphics: AMD Radeon Graphics
            
            Operating system: Windows 11 Pro 64-bit
            
            Memory: 12GB DDR4 SDRAM 
            
            Hard Drive: 512GB PCIe NVMe M.2 Solid State Drive
            
            Optical Drive: No
            
            Display: 15.6" FHD (1920x1080) TN 220nits Anti-glare, 45% NTSC
            
            Connectivity: Wi-Fi 6, (802.11ax) + Bluetooth 5.1
            
            Audio: High Definition (HD) Audio, Stereo speakers, 2W x2, Dolby Audio
            
            Keyboard: US English, Backlit Full Size Keyboard
            
            Built-in HD Webcam: HD 720p with Privacy Shutter
            
            Media Drive: Multi-format SD media card reader
            
            Ports: 
            
            2 x USB 3.2 Gen 1
            2 x USB-C 3.2 Gen 2 (support data transfer, Power Delivery 3.0 and DisplayPort 1.4)
            1 x HDMI 1.4b
            1 x Ethernet (RJ-45)
            1 x Headphone / Mic Combo Jack
            Battery: Up to 7.5 Hours
            
            Color: Mineral Grey
            
            Dimensions L x W x H (inches): 14.1 x 9.25 x 0.74
            
            Weight: 3.75 lbs`,
            imgSrc: "https://m.media-amazon.com/images/I/81xOIY45QwL._AC_UY327_FMwebp_QL65_.jpg",
            rating: 4.7,
            price: 547.36,
        },
        {
            title: "HP Elite Desktop PC Computer Intel Core i5 3.1-GHz, 8 gb Ram",
            desc: `This custom bundle includes 5 items...

            - RENEWED HP Professional Desktop PC with Intel Quad Core i5 3.1 GHz processor, 8 GB RAM, 1 TB Hard Drive, DVD, Windows 10 Home (with all necessary cables)
          
            - WiFi Adapter - USB WiFi (300Mbps, compatible with Windows 10, WPA2 encryption)
          
            - RENEWED 19" LCD Monitor (Brand May Vary)
          
            - USB Keyboard (Brand May Vary)
          
            - USB Mouse (Brand May Vary)
          
          Every component is tested for full functionality and compatibility to ensure years of ongoing performance and reliability. Exterior cosmetics are restored to a like-new condition with little to no visible signs of previous use. A fresh and authentic installation of Microsoft Windows 10 is performed with the new activation license digitally rendered in the PC for an easy and secure start upon first use.
          
           
          
          PC Custom Configuration Specs
          
             -Model: HP Professional Desktop
          
             - CPU: Intel Quad Core i5 Processor
          
             - RAM: 8 GB DDR3
          
             - Hard Drive: 1 TB SATA
          
             - Operating System: Windows 10 Home
          
             - Optical: DVD
          
             - USB: (10) USB 2.0 ports for connectivity
          
             - Network: Onboard Gigabit Network Adapter
          
          * This computer bundle will arrive at your doorstep ready to use right out of the box with all necessary cables included.`,
            imgSrc: "https://m.media-amazon.com/images/I/718sn7oOcfL._AC_SL1500_.jpg",
            rating: 3.9,
            price: 826.21,
        },
        {
            title: "TechMaster Desktop",
            desc: "Powerful desktop computer with Intel Core i9 processor, 32GB RAM, 1TB SSD, and NVIDIA GeForce RTX 3080 graphics card.",
            imgSrc: "https://m.media-amazon.com/images/I/71B5z0eg2NL._AC_SL1500_.jpg",
            rating: 4.8,
            price: 2499.99
        },
        {
            title: "Gaming Beast Desktop",
            desc: "High-performance gaming desktop with AMD Ryzen 9 processor, 64GB RAM, 2TB SSD, and NVIDIA GeForce RTX 3090 graphics card.",
            imgSrc: "https://m.media-amazon.com/images/I/91Fb+Pcxe-L._AC_SL1500_.jpg",
            rating: 4.9,
            price: 3999.99
        },
        {
            title: "OfficePro Desktop",
            desc: "Efficient desktop computer for office use with Intel Core i5 processor, 16GB RAM, 512GB SSD, and integrated Intel UHD Graphics 630.",
            imgSrc: "https://m.media-amazon.com/images/I/61QGMX0Qy6L._AC_SL1352_.jpg",
            rating: 4.5,
            price: 899.99
        },
        {
            title: "Dell XPS 8930 Desktop Computer",
            desc: "Powerful desktop computer with Intel Core i7 processor, 16GB DDR4 RAM, 512GB SSD + 2TB HDD storage, NVIDIA GeForce GTX 1660 Ti graphics, and Windows 10 operating system.",
            imgSrc: "https://m.media-amazon.com/images/I/61PLUeR9MoS._AC_SL1500_.jpg",
            rating: 4.5,
            price: 1199.99
        },
        {
            title: "HP ENVY Desktop Computer",
            desc: "Elegant desktop computer with Intel Core i5 processor, 8GB DDR4 RAM, 256GB SSD + 1TB HDD storage, NVIDIA GeForce GTX 1650 graphics, and Windows 10 operating system.",
            imgSrc: "https://m.media-amazon.com/images/I/7183K6XIaeL._AC_SL1500_.jpg",
            rating: 4.3,
            price: 899.99
        },
        {
            title: "Apple iMac 27-inch Retina 5K Display",
            desc: "Sleek all-in-one desktop computer with Intel Core i5 processor, 8GB DDR4 RAM, 512GB SSD storage, AMD Radeon Pro 5500 XT graphics, and macOS operating system.",
            imgSrc: "https://m.media-amazon.com/images/I/717q8QReNaL._AC_SX679_.jpg",
            rating: 4.8,
            price: 1799.00
        },
        {
            title: "Lenovo IdeaCentre AIO 3 Desktop",
            desc: "Space-saving all-in-one desktop computer with AMD Ryzen 5 processor, 8GB DDR4 RAM, 256GB SSD storage, AMD Radeon Graphics, and Windows 10 operating system.",
            imgSrc: "https://m.media-amazon.com/images/I/71Ezvxd+uiL._AC_SL1500_.jpg",
            rating: 4.4,
            price: 649.99
        },
        {
            title: "Acer Aspire TC-895-UA92 Desktop",
            desc: "Affordable desktop computer with Intel Core i5 processor, 12GB DDR4 RAM, 512GB SSD storage, Intel UHD Graphics 630, and Windows 10 operating system.",
            imgSrc: "https://m.media-amazon.com/images/I/718V28DwSjL._AC_SL1500_.jpg",
            rating: 4.2,
            price: 599.99
        }
        
    ]
   
    const mobileProducts = [
        {
            title: "TechGuru Smartphone",
            desc: "Latest smartphone with 6.5-inch Super AMOLED display, Snapdragon 888 processor, 12GB RAM, 256GB storage, and quad-camera setup.",
            imgSrc: "https://m.media-amazon.com/images/I/61MBRtrVz9L._AC_SL1500_.jpg",
            rating: 4.7,
            price: 999.99
        },
        {
            title: "PowerMax Pro Smartphone",
            desc: "High-capacity battery smartphone with 7-inch display, MediaTek Dimensity 1200 processor, 8GB RAM, 128GB storage, and 64MP triple-camera setup.",
            imgSrc: "https://m.media-amazon.com/images/I/61BgDOd6ViL._AC_SL1000_.jpg",
            rating: 4.6,
            price: 699.99
        },
        {
            title: "CameraPro Smartphone",
            desc: "Smartphone with advanced camera features, including a 108MP main camera, 8K video recording, Snapdragon 865 processor, 12GB RAM, and 512GB storage.",
            imgSrc: "https://m.media-amazon.com/images/I/61ePWSuIfwL._AC_SL1500_.jpg",
            rating: 4.8,
            price: 1199.99
        },
        {
            title: "Samsung Galaxy S21 Ultra",
            desc: "Flagship smartphone with 6.8-inch QHD+ Dynamic AMOLED display, Exynos 2100 processor, 12GB RAM, 256GB storage, and quad-camera setup with 108MP main camera.",
            imgSrc: "https://m.media-amazon.com/images/I/61muVHB96cS._AC_SL1500_.jpg",
            rating: 4.8,
            price: 1299.99
        },
        {
            title: "iPhone 13 Pro Max",
            desc: "Top-of-the-line iPhone with 6.7-inch Super Retina XDR display, A15 Bionic chip, 128GB storage, and triple-camera system with ProRAW support.",
            imgSrc: "https://m.media-amazon.com/images/I/71hIjJkMqFL._AC_SL1500_.jpg",
            rating: 4.9,
            price: 1399.99
        },
        {
            title: "Google Pixel 6 Pro",
            desc: "Google's flagship smartphone with 6.7-inch LTPO OLED display, Google Tensor chip, 12GB RAM, 256GB storage, and dual-camera system with new computational photography features.",
            imgSrc: "https://m.media-amazon.com/images/I/71iQQmucjgL._AC_SL1500_.jpg",
            rating: 4.7,
            price: 999.99
        },
        {
            title: "OnePlus 9 Pro",
            desc: "High-performance smartphone with 6.7-inch Fluid AMOLED display, Snapdragon 888 processor, 8GB RAM, 128GB storage, and Hasselblad quad-camera system.",
            imgSrc: "https://m.media-amazon.com/images/I/81v-fUYu6zS._AC_SL1500_.jpg",
            rating: 4.6,
            price: 999.99
        },
        {
            title: "Xiaomi Mi 11 Ultra",
            desc: "Premium smartphone with 6.81-inch AMOLED display, Snapdragon 888 processor, 12GB RAM, 256GB storage, and triple-camera system with 50MP main camera and 120x zoom.",
            imgSrc: "https://m.media-amazon.com/images/I/41wKBxAos4L._AC_.jpg",
            rating: 4.8,
            price: 1199.99
        }
        
    ]

    const cameraProducts = [
        {
            title: "Nikon D850 DSLR Camera",
            desc: "Professional-grade DSLR camera with 45.7MP full-frame sensor, EXPEED 5 image processor, 4K UHD video, and built-in Wi-Fi and Bluetooth.",
            imgSrc: "https://m.media-amazon.com/images/I/617sGSjmC1L._AC_SL1500_.jpg",
            rating: 4.9,
            price: 2999.99
        },
        {
            title: "Canon EOS R5 Mirrorless Camera",
            desc: "High-resolution mirrorless camera with 45MP full-frame sensor, DIGIC X image processor, 8K video, and advanced autofocus system.",
            imgSrc: "https://m.media-amazon.com/images/I/61FGU+Wyn4L._AC_SL1000_.jpg",
            rating: 4.7,
            price: 3499.99
        },
        {
            title: "Fujifilm X-T4 Mirrorless Camera",
            desc: "Advanced mirrorless camera with 26.1MP X-Trans CMOS 4 sensor, X-Processor 4 image processor, 5-axis in-body image stabilization, and 4K video recording.",
            imgSrc: "https://m.media-amazon.com/images/I/71EWRyqzw0L._AC_SL1500_.jpg",
            rating: 4.8,
            price: 1699.99
        },
        {
            title: "Sony A7S III Mirrorless Camera",
            desc: "Full-frame mirrorless camera optimized for video with 12.1MP sensor, BIONZ XR image processor, 4K video at up to 120fps, and 9.44 million-dot OLED EVF.",
            imgSrc: "https://m.media-amazon.com/images/I/711seEoUM9L._AC_SL1500_.jpg",
            rating: 4.9,
            price: 3499.99
        },
        {
            title: "Nikon Z7 II Mirrorless Camera",
            desc: "High-resolution mirrorless camera with 45.7MP full-frame CMOS sensor, Dual EXPEED 6 image processors, 4K UHD video recording, and 5-axis in-body image stabilization.",
            imgSrc: "https://m.media-amazon.com/images/I/71zs+RZUggL._AC_SL1500_.jpg",
            rating: 4.7,
            price: 2999.99
        },
        {
            title: "Panasonic Lumix GH5 Mark II Mirrorless Camera",
            desc: "Professional mirrorless camera with 20.3MP Micro Four Thirds sensor, Venus Engine image processor, 4K video recording at up to 60fps, and 5-axis Dual I.S. II image stabilization.",
            imgSrc: "https://m.media-amazon.com/images/I/81depb5FkhL._AC_SL1500_.jpg",
            rating: 4.8,
            price: 1799.99
        },
        {
            title: "Sony RX100 VII Compact Camera",
            desc: "Advanced compact camera with 1-inch Exmor RS CMOS sensor, BIONZ X image processor, 24-200mm zoom lens, and Real-time Eye AF for humans and animals.",
            imgSrc: "https://m.media-amazon.com/images/I/71LG276t3aL._AC_SL1500_.jpg",
            rating: 4.9,
            price: 1299.99
        },
        {
            title: "Canon EOS R6 Mirrorless Camera",
            desc: "Full-frame mirrorless camera with 20.1MP CMOS sensor, DIGIC X image processor, 4K video recording, and 5-axis in-body image stabilization with up to 8 stops of shake correction.",
            imgSrc: "https://m.media-amazon.com/images/I/71VzbJ7oZLL._AC_SL1500_.jpg",
            rating: 4.7,
            price: 2499.99
        },
        {
            title: "Olympus OM-D E-M1 Mark III Mirrorless Camera",
            desc: "Pro-level mirrorless camera with 20.4MP Live MOS sensor, TruePic IX image processor, 5-axis in-body image stabilization, and weather-sealed construction for durability.",
            imgSrc: "https://m.media-amazon.com/images/I/71zTX1iQWSL._AC_SL1500_.jpg",
            rating: 4.6,
            price: 1799.99
        }
        
    ]
    const [chosenName, setChosenName] = useState(desktopProducts)
   
    //focus at start of image scroll
    useEffect(() => {
    const imageScrollContainer = document.querySelector('#thProductsCont') as HTMLElement;
    
    imageScrollContainer.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }, [chosenName]);

    const showChosenProducts = chosenName?.map(eachItemObj => {
        return (
            <Link href="/techHaven" key={eachItemObj.title} className={styles.thIndivProduct}>
                <h4>{eachItemObj.title}</h4>
                <Image alt="" src={eachItemObj.imgSrc} fill={true}/>
                <p>${eachItemObj.price}</p>
                <RatingStar rating={eachItemObj.rating}/>
            </Link>
        )
    })

    const changeOption = (option:string)=>{
        if (option === "desktop"){
            setChosenName(desktopProducts)
        }else if (option === "mobile"){
            setChosenName(mobileProducts)
        }
        else if (option === "camera"){
            setChosenName(cameraProducts)
        }
    }

    return (
        <>
            <article id = "thProductsCont" className={styles.thProductsCont}>
                {showChosenProducts}
            </article>

            <div className={styles.thOptionsCont}>
                <article className={styles.thOptionsArticle}>
                    <h3 style={{textAlign: "start"}}>Browse Our Extensive Range of Electronics</h3>
                    <p>At Tech Haven, we offer a comprehensive catalog of electronic products. From the latest smartphones to powerful laptops and cutting-edge cameras, we have something for everyone. Each product comes with detailed information, including images, descriptions, specifications, and pricing, to help you make an informed decision. Browse our extensive range of electronics and find the perfect gadget that suits your needs.</p>
                    <button>Learn More</button>
                </article>
                <div className={styles.thOptions}>
                    <div onClick={()=>{changeOption("desktop")}}>
                        <p>see desktop options</p>
                        <Image src="https://images.pexels.com/photos/5082554/pexels-photo-5082554.jpeg?auhref=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" fill={true}/>

                    </div>
                    <div onClick={()=>{changeOption("mobile")}}>
                        <p>see mobile options</p>
                        <Image alt="" src='https://m.media-amazon.com/images/I/71Sa3dqTqzL._AC_SL1500_.jpg' fill={true}/>
                    </div>
                    <div onClick={()=>{changeOption("camera")}}>
                        <p>see cameras options</p>
                        <Image alt="" src='https://m.media-amazon.com/images/I/71avwaBMVDL._AC_SL1500_.jpg' fill={true}/>
                    </div>
                </div>
            </div>
        </>
    )
}


export default function TechHaven() {

  return (
    <div id='techHavenMainDiv' className={styles.techHavenMainDiv}>
        <section className={styles.thTopSection}>
            <div className={styles.thtopsectionLeft}>
                <h1 className={styles.mainHeadTh}>Welcome to Tech Haven</h1>
                <h3 className={styles.mainSubHeadTh}>Your Destination for Electronics Shopping</h3>
                <p className={styles.thtopsectionLeftP}>Welcome to Tech Haven, your one-stop destination for all your 
                    electronics shopping needs. We offer a wide range of products 
                    including smartphones, laptops, cameras, smartwatches, and accessories. 
                    With our user-friendly interface and secure checkout process, you can shop with 
                    confidence knowing that your personal information is safe. Stay up-to-date with the 
                    latest gadgets and electronics at Tech Haven, where your tech dreams come true!
                </p>

                <Image alt="" fill={true} className={styles.thtopsectionLeftImg} src={require('../../public/techHavenStuff/smallpc.png')}/>
                <p className={styles.thtopsectionLeftSecP}>Explore the Latest Gadgets and Electronics at Tech Haven</p>
            </div>
        </section>
        <section>
            <ProductDisplay chosen='desktop'/>
        </section>
        <section>
            
        </section>
    </div>
  )
}
