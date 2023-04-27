import React, { useEffect, useState } from 'react'
import useAxios from '../hooks/UseAxios'
import { motion} from "framer-motion"
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

function Carousel({theme}) {

    const {data, loading} = useAxios('https://api.jikan.moe/v4/seasons/upcoming')
    
    const CarouselRef = useRef()
    const [windowSize, setWindowSize] = useState({width: undefined,});

    useEffect(()=>
    {
        function handleResize(){
        setWindowSize({width: CarouselRef?.current.scrollWidth-CarouselRef?.current.offsetWidth})}
        window.addEventListener('resize',handleResize)
        setTimeout(() => {
            handleResize()
        }, 100);
        return()=>window.removeEventListener('resize',handleResize)
    },[])


    const navigate = useNavigate()
    const NavigateToAnime = (id) =>
    {
        navigate(`/singleanime/anime/${id}`)
    }

  return (
    <div 
    style={theme==='Light'? {background:'white', color:'#212121'}:{background:'#212121', color:'white'}}
    className='pt-10' id='Upcoming'>
        <div className='overflow-hidden'
        ref={CarouselRef}>
            <div className='pb-10 flex items-end max-w-[1240px] mx-auto'>
                <h1 className='font-bold text-lg sm:text-3xl text-left uppercase px-4'>Upcoming Anime</h1>
                <p className='text-gray-400'>(click a title)</p>
            </div>         
                {loading === false ? 
                <motion.div
                whileTap={{cursor:'grabbing'}}
                drag='x'
                dragConstraints={{
                right: 0,
                left:-windowSize.width}}
                key={windowSize.width}
                className='grid gap-x-2 grid-flow-col px-4'>
                        {data.map((item,index)=>
                        (
                            <div
                            key={index} className='hover:scale-105 duration-300 w-[200px]'>
                                <img src={item.images.jpg.image_url} alt='' className='pointer-events-none'/>
                                <h1 className='font-bold pt-2  cursor-pointer'
                                onClick={()=>NavigateToAnime(item.mal_id)}>{item.title}</h1>
                            </div>
                        ))}
                </motion.div> :'Loading...'}
        </div>
    </div>
  )
}

export default Carousel