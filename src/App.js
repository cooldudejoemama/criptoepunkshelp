import React, {useEffect, useState, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import Matter from 'matter-js';
import {StarField} from './components/starfield/starfield';
import Web3 from 'web3';
import image1 from './assets/images/image1.png';
import image2 from './assets/images/image2.png';
import image3 from './assets/images/image3.png';
import image4 from './assets/images/image4.png';
import image5 from './assets/images/image5.png';
import image6 from './assets/images/image6.png';
import image7 from './assets/images/image7.png';
import image8 from './assets/images/image8.png';
import image9 from './assets/images/image9.png';
import image10 from './assets/images/image10.png';
import image11 from './assets/images/image11.png';
import image12 from './assets/images/image12.png';
import image13 from './assets/images/image13.png';
import image14 from './assets/images/image14.png';
import image15 from './assets/images/image15.png';
import image16 from './assets/images/image16.png';
import image17 from './assets/images/image17.png';
import image18 from './assets/images/image18.png';
import image19 from './assets/images/image19.png';
import image20 from './assets/images/image20.png';
import image21 from './assets/images/image21.png';
import image22 from './assets/images/image22.png';
import image23 from './assets/images/image23.png';
import image24 from './assets/images/image24.png';
import image25 from './assets/images/image25.png';
import image26 from './assets/images/image26.png';
import image27 from './assets/images/image27.png';
import image28 from './assets/images/image28.png';
import image29 from './assets/images/image29.png';
import image30 from './assets/images/image30.png';

const imagesArray = [
  image1, image2, image3, image4, image5,
  image6, image7, image8, image9, image10,
  image11, image12, image13, image14, image15,
  image16, image17, image18, image19, image20,
  image21, image22, image23, image24, image25,
  image26, image27, image28, image29, image30
];



const ConnectWalletButton = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [connected, setConnected] = useState(false);
  
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          const web3 = new Web3(window.ethereum);
          const address = accounts[0];
  
          setWalletAddress(address);
          setConnected(true);
        } catch (error) {
          console.error('User rejected account access', error);
        }
      } else {
        console.error(
          'No Ethereum provider found. Please install MetaMask or another wallet provider.'
        );
      }
    };
  
    const disconnectWallet = () => {
        setWalletAddress('');
        setConnected(false);
      };
      
  
    const shortenAddress = (address) => {
      if (!address) return '';
      const start = address.slice(0, 5);
      const end = address.slice(-2);
      return `${start}...${end}`;
    };
  
    return (
      <button
        className={`connect-wallet${connected ? ' connected' : ''}`}
        onClick={connected ? disconnectWallet : connectWallet}
      >
        {walletAddress
          ? `Connected: ${shortenAddress(walletAddress)}`
          : 'Connect Wallet'}
      </button>
    );
  };

function App() {

    const [imageCount, setImageCount] = useState(0);
    const addImageRef = useRef(null);

    useEffect(() => {

        if (document.querySelector(".punkdisplay")) {
        // Matter.js module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;

        // Create the Matter.js engine
        const engine = Engine.create();
        engine.world.gravity.y = 9.81 * 0.015; // Set gravity to Earth's gravity
        for (let i = 0; i < 30; i++) {
            addImage();
          }
        const render = Render.create({
            element: document.querySelector(".punkdisplay"),
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: "transparent",
            },
            
        });


        // Generate random coordinates within the bordered section
        let punkDisplayRect = document.querySelector(".punkdisplay").getBoundingClientRect();
        const randomCoordinates = () => {
            const x = Math.random() * (window.innerWidth - 50) + 25;
            const y = Math.random() * (window.innerHeight - 50) + 25;
            return { x, y };
        };


        // Create image bodies
        const images = Array.from(document.querySelectorAll(".image")).map(
            (image) => {
                const coords = randomCoordinates();
                const body = Bodies.rectangle(
                    coords.x,
                    coords.y,
                    108,
                    108,
                    {
                        render: {
                            sprite: {
                                texture: imagesArray,
                                xScale: 0.1,
                                yScale: 0.1,
                            },
                        },
                        restitution: 0.9,
                        friction: 0.8,
                        frictionAir: 0.01,
                        slop: 0.5,
                    }
                );

                image.style.display = "none";
                return body;
            }
        );

        // Add image bodies to the world
        World.add(engine.world, images);

        // Add mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        });

        World.add(engine.world, mouseConstraint);
        render.mouse = mouse;

// Create floor
        const floor = Bodies.rectangle(
            window.innerWidth / 2,
            window.innerHeight + 5,
            window.innerWidth,
            10,
            {
                isStatic: true,
                restitution: 0.5,
                friction: 0.5,
                render: {
                    visible: false,
                },
            }
        );

// Create left and right walls
        const leftWall = Bodies.rectangle(-5, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true, render: { visible: false } });
        const rightWall = Bodies.rectangle(window.innerWidth + 5, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true, render: { visible: false } });


        // Add the walls to the world
// Add the walls and floor to the world
        World.add(engine.world, [leftWall, rightWall, floor]);


        // Update
// Update gravity function
// Update gravity function
        function updateGravity() {
            const punkDisplayHeight = document.documentElement.clientHeight;
            const baseGravity = 9.81 * 0.02;
            const gravityScale = punkDisplayHeight / window.innerHeight;
            engine.world.gravity.y = baseGravity * gravityScale;
        }


        // Event listeners
        window.addEventListener("resize", () => {
            setTimeout(updateGravity, 100);
        });

        // Fullscreen change event listener
        const fullscreenEvents = [
            "fullscreenchange",
            "webkitfullscreenchange",
            "mozfullscreenchange",
            "msfullscreenchange"
        ];

        fullscreenEvents.forEach(event => {
            document.addEventListener(event, () => {
                setTimeout(updateGravity, 100);
            });
        });

        updateGravity(); // Call the function initially to set the proper gravity

        Engine.run(engine);
        Render.run(render);

        // Add image function
        // Add image function
        function addImage() {
            if (imageCount >= 30) {
              // If the maximum number of images is reached, restart the count
              setImageCount(0);
            } else {
              const coords = randomCoordinates();
          
              const randomTextureIndex = Math.floor(Math.random() * imagesArray.length); // Randomly select an index from the images array
              const texture = imagesArray[randomTextureIndex]; // Get the texture corresponding to the selected index
          
              const body = Bodies.rectangle(
                coords.x,
                coords.y,
                108,
                108,
                {
                  render: {
                    sprite: {
                      texture: texture, // Use the selected texture
                      xScale: 0.1,
                      yScale: 0.1,
                    },
                  },
                  restitution: 0.9,
                  friction: 0.8,
                  frictionAir: 0.01,
                  slop: 0.5,
                }
              );
              // Add the new image body to the world
              World.add(engine.world, body);
          
              // Update gravity after adding a new image
              updateGravity();
          
              // Increment the image count
              setImageCount((prevCount) => prevCount + 1);
            }
        }
        addImageRef.current = addImage;
  

// Add click event listener
        document.getElementById("generate").addEventListener("click", () => {
            addImage();
        });
        window.addEventListener("resize", () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            punkDisplayRect = document.querySelector(".punkdisplay").getBoundingClientRect();

            Matter.Body.setPosition(floor, {
                x: window.innerWidth / 2,
                y: window.innerHeight + 27,
            });
            Matter.Body.setPosition(leftWall, {
                x: -5,
                y: window.innerHeight / 2,
            });
            Matter.Body.setPosition(rightWall, {
                x: window.innerWidth + 5,
                y: window.innerHeight / 2,
            });

            setTimeout(updateGravity, 100);
        });
    }
    

    });
    return (
        <div className="App">
          <StarField></StarField>
          <div className="main">
            <ConnectWalletButton />
                <div className="side1">
                    <h1 className="text1">
                <span className="letter-container">
                    <span className="letter">C</span>
                  </span>
                        <span className="letter-container">
                    <span className="letter">R</span>
                  </span>
                        <span className="letter-container">
                    <span className="letter">I</span>
                  </span>
                        <span className="letter-container">
                    <span className="letter">P</span>
                  </span>
                        <span className="letter-container">
                    <span className="letter">T</span>
                  </span>
                        <span className="letter-container">
                    <span className="letter">O</span>
                  </span>
                        <span className="letter-container">
                    <span className="letter">E</span>
                  </span>
                        <span className="letter-container">
                    <span className="letter">P</span>
                  </span>
                        <span className="letter-container">
                    <span className="letter">U</span>
                  </span>
                        <span className="letter-container">
                    <span className="letter">N</span>
                  </span>
                        <span className="letter-container">
                    <span className="letter">K</span>
                  </span>
                        <span className="letter-container">
                    <span className="letter">S</span>
                  </span>
                    </h1>
                    <h1 className="heading1">ABOUT</h1>
                    <div className="aboutwriting">
                        <p1 className="writing1">Last summer, I came up with the idea for Criptoepunks. I thought the name was
                            goofy, but I had no clue how to make an NFT project out of it. Fast forward to now, and I've got a bit
                            more dev experience under my belt. So I made this site and contract out of boredom. It's not the fanciest
                            NFT project out there, but that's kinda the point. It's for the degens, by a degen. GLHF!
                        </p1>
                    </div>
                    <h1 className="text2">Info</h1>
                    <div className="aboutwriting2">
                        <p1 className="writing2 blinking">1 FREE, 1 PAID (0.003), 2 PER WALLET<br/>10,000 Supply</p1>
                    </div>
                    <div className="punkdisplay">
                    <button id="generate" onClick={addImageRef.current}>Generate</button>

                        <img src="assets/images/criptoppunk.png" className="image" alt="Image 1"/>
                            <img src="assets/images/criptoppunk.png" className="image" alt="Image 2"/>
                                <img src="assets/images/criptoppunk.png" className="image" alt="Image 3"/>
                                    <img src="assets/images/criptoppunk.png" className="image" alt="Image 4"/>
                                        <img src="assets/images/criptoppunk.png" className="image" alt="Image 5"/>
                    </div>
                </div>
            </div>
        </div>);
}

export default App;
