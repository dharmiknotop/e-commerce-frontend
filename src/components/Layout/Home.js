import React, { useEffect, useRef } from 'react'
import './home.css'

import Typewriter from 'typewriter-effect'
import { Link } from 'react-router-dom'
import { gsap, Power4 } from 'gsap/dist/gsap'
import logo from '../parth-logo.webp'
import MainImg from '../MainImage.webp'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Home = () => {
  const tl = useRef()

  useEffect(() => {
    tl.current = gsap
      .timeline()
      .from('.LeftDiv', 2, {
        duration: 0.5,
        width: '0',
        ease: Power4.easeOut,
      })
      .from('.RightDiv', 2, {
        duration: 0.1,
        opacity: 0,
        width: '0',
        ease: Power4.easeOut,
      })
      .from(
        '.TitleImg',
        2,
        {
          duration: 0.5,
          opacity: 0,
          width: '0',
          ease: Power4.easeOut,
        },
        '-=.5',
      )
      .fromTo(
        '.SlideAnimation',
        {
          autoAlpha: 0,
          x: '-100%',
          duration: 1,
        },
        {
          autoAlpha: 1,

          x: '0%',
          duration: 1,
          ease: Power4.easeOut,
        },
        '-=1',
      )
      .fromTo(
        '.SlideAnimation1',
        {
          autoAlpha: 0,
          x: '-100%',
          duration: 0.5,
        },
        {
          autoAlpha: 1,
          delay: 0.4,
          x: '0%',
          duration: 0.5,
          ease: Power4.easeOut,
        },
        '<',
      )
  }, [])

  return (
    <>
      <div className="Home">
        <div className="TransitionDiv"></div>
        <div className="TitleImgDiv">
          <div
            className="TitleImg"
            style={{ backgroundImage: `url(${MainImg})` }}
          ></div>
        </div>

        <div className="LeftDiv">
          <div className=" d-flex">
            {' '}
            <div className="SlideAnimation">
              <Link to="/">Help us</Link>
            </div>
            <div className="SlideAnimation1">
              {' '}
              <Link to="/">FAQ'S</Link>
            </div>
          </div>
        </div>
        <div className="RightDiv">
          <div className="Title">
            <div className="Logo">
              <LazyLoadImage style={{ width: '100%' }} src={logo} alt="" />
            </div>
            <h1 className="mainclr">Parth Enterprise </h1>
            <Typewriter
              className="Typewriter"
              options={{
                autoStart: true,
                loop: true,
                strings: [
                  '     Get Amazing Visting cards for Your Startup.',
                  'Start your Startup with perfect Place to Print your stuff',
                  'Android developer',
                ],
                delay: 40,
              }}
            />
            <Link to="products">
              {' '}
              <button className="btn btn-outline-primary"> Shop now</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
