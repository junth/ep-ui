import React from 'react'
import { Box, Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'
import Slider from 'react-slick'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface AboutOurTeamSliderProps {
  children: React.ReactNode
}

interface ArrowProps {
  ArrowIcon?: IconType
  isNext?: boolean
  onClick?: () => void
}

const ArrowBtn = ({ ArrowIcon, onClick, isNext }: ArrowProps) => (
  <Box
    top="50%"
    position="absolute"
    transform="translate(0, -50%)"
    display="grid"
    placeItems="center"
    onClick={onClick}
    cursor="pointer"
    borderWidth="1px"
    borderColor="carouselArrowBorderColor"
    zIndex={99}
    bgColor="carouselArrowBg"
    borderRadius="50%"
    w="40px"
    h="40px"
    right={isNext ? '-20px' : 'unset'}
    left={isNext ? 'unset' : '-20px'}
  >
    <Icon as={ArrowIcon} color="grey" />
  </Box>
)

const AboutOurTeamSlider = ({ children }: AboutOurTeamSliderProps) => {
  const sliderResponsiveSettings = {
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  }
  return (
    <>
      <Slider
        nextArrow={<ArrowBtn ArrowIcon={FaChevronRight} isNext />}
        prevArrow={<ArrowBtn ArrowIcon={FaChevronLeft} />}
        centerMode={true}
        infinite={true}
        slidesToShow={3}
        autoplay={true}
        speed={500}
        {...sliderResponsiveSettings}
      >
        {children}
      </Slider>
      <style jsx global>{`
        .slick-center .teamMember__about {
          display: block;
        }
        .slick-center .teamMember__image {
          width: 200px;
          height: 200px;
          margin-top: 0;
        }
        @media only screen and (max-width: 820px) {
          .teamMember__about {
            display: block;
          }
        }
      `}</style>
    </>
  )
}
export default AboutOurTeamSlider
