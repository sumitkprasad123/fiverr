// import React from 'react'
import CatCard from "../../components/catCard/CatCard"
import Featured from "../../components/featured/Featured"
import Slide from "../../components/slide/Slide"
import TrustedBy from "../../components/trustedBy/TrustedBy"
import "./Home.scss"
import {cards} from "../../data"


const Home = () => {
  return (
    <div className='home'>
       <Featured />
       <TrustedBy />
       <Slide slidesToShow={5} arrowsScroll={5}>
          {cards.map((card) => (
            <CatCard card={card} key={card.id}/>
          ))}
       </Slide>
    </div>
  )
}

export default Home