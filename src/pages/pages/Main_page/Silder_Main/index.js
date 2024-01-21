import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

const spanStyle = {
  padding: '20px',
  backgroundColor: 'rgba(239, 239, 239, 0.2)',
  color: '#000000',
  transition: 'background 0.3s ease',
  cursor: 'pointer',
  borderRadius: '10px',

  '&:hover': {
    backgroundColor: 'rgba(239, 239, 239, 1)'
  }
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px',
  position: 'relative'
}

const imgStyle = {
  maxWidth: '100%',
  maxHeight: '100%',
  width: 'auto',
  height: 'auto'
}

const slideImages = [
  {
    url: 'https://webs.rmutl.ac.th/assets/upload/logo/website_logo_th_20230602105958.png',
    caption: 'ชอบตื่นเช้าอ่ะ เพราะไม่อยากรักเธอในวันที่สายเกินไป'
  },
  {
    url: 'https://media.licdn.com/dms/image/D4E12AQHLfbH_EiinHA/article-cover_image-shrink_720_1280/0/1689098380402?e=2147483647&v=beta&t=NA7o6o-ZMwya5Iz-wqmircAg8hZfXgcAbPlgIpHu3xE',
    caption: 'ใส่แมสก์คือหน้าที่ของคุณ ส่วนใส่ใจคุณคือหน้าที่ของเรา'
  },
  {
    url: 'https://media.wired.com/photos/59266b71f3e2356fd80092ff/master/pass/RaspberryPiHP.jpg',
    caption: 'ไม่ต้องเก่งเคมีมากมาย ก็รู้ว่าเธอคือตัวทำละลายใจเรา'
  }
]

const Slider_Main = () => {
  return (
    <div className='slide-container'>
      <Slide style={{ margin: '10px' }}>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}>
              {/* <img src={slideImage.url} alt={slideImage.caption} style={imgStyle} /> */}
              {/* <span style={spanStyle}>{slideImage.caption}</span> */}
            </div>
          </div>
        ))}
      </Slide>
    </div>
  )
}

export default Slider_Main
