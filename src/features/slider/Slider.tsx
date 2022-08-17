import './Slider.scss';
import React, { ReactNode, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import anime from 'animejs';

interface SliderComponentProps {
  children: ReactNode,
  perPage: number,
};

const Slider = (props: SliderComponentProps) => {
  const sliderElRef = React.useRef<HTMLDivElement>(null);
  const slidesContainerElRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number>(1);
  const [slideCount, setSlideCount] = useState<number>(0);

  useEffect(() => {
    if (sliderElRef.current && slidesContainerElRef.current) {
      const slides = Array.from(slidesContainerElRef.current.children);

      if (slides.length) {
        setSlideCount(slides.length);

        const imageLoadPromises: any = [];

        slides.forEach((slide: any) => {
          Array.from(slide.querySelectorAll('img')).map((imgEl: any) => {
            imageLoadPromises.push(new Promise((resolve: any) => {
              if (imgEl.complete) {
                resolve();
              } else {
                imgEl.onload = resolve;
                imgEl.onerror = resolve;
              }
            }))
          });
        });

        Promise.all(imageLoadPromises).then(initialize);
      }
    }
  }, [props.children]);

  useEffect(() => {
    position();
  }, [index]);

  const initialize = () => {
    if (sliderElRef.current && slidesContainerElRef.current) {
      const slides = Array.from(slidesContainerElRef.current.children);
      let maxSlideHeight = 0;

      if (slides.length) {
        slides.forEach((slide: any) => {
          slide.style.width = (1 / props.perPage) * 100 + '%';
          
          if (slide.offsetHeight > maxSlideHeight) {
            maxSlideHeight = slide.offsetHeight;
          }
        });

        sliderElRef.current.style.height = maxSlideHeight + 'px';

        for (let i = 0; i < slides.length; i++) {
          const slide: any = slides[i];

          slide.style.left = i * slide.offsetWidth + 'px';
        }
      }
    }
  };

  const position = () => {
    if (sliderElRef.current && slidesContainerElRef.current) {
      const slides = Array.from(slidesContainerElRef.current.children);

      if (slides.length) {
        let k = 1;
        for (let i = 0; i < index - 1; i++) {
          const slide: any = slides[i];

          anime({
            targets: slide.style,
            left: -(k * slide.offsetWidth) + 'px',
            easing: 'easeInOutCubic',
            duration: 350,
          });
          
          k++;
        }

        k = 0;
        for (let i = index - 1; i < slides.length; i++) {
          const slide: any = slides[i];

          anime({
            targets: slide.style,
            left: k * slide.offsetWidth + 'px',
            easing: 'easeInOutCubic',
            duration: 350,
          });
          
          k++;
        }

        enableSlideAnimations(slides[index - 1]);
      }
    }
  };

  const enableSlideAnimations = (slide: any) => {
    const animatingElements = Array.from(slide.querySelectorAll('.animate__animated'));

    animatingElements.forEach((animatingElement: any) => {
      const elementClasses = Array.from(animatingElement.classList);
      elementClasses.forEach((cssClass: any) => {
        if (cssClass.includes('animate__')) {
          animatingElement.classList.remove(cssClass);
        }
      });

      setTimeout(() => {
        elementClasses.forEach((cssClass: any) => {
          if (cssClass.includes('animate__')) {
            animatingElement.classList.add(cssClass);
          }
        });
      });
    });
  };

  const previous = () => {
    if (index > 1) {
      setIndex(index - 1);
    } else {
      setIndex(slideCount);
    }
  };

  const next = () => {
    if (index < slideCount) {
      setIndex(index + 1);
    } else {
      setIndex(1);
    }
  };

  return (
    <div className="Slider" ref={sliderElRef}>
      <div className="arrows">
        <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" onClick={previous} />
        <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x" onClick={next} />
      </div>

      <div className="slides" ref={slidesContainerElRef}>
        {props.children}
      </div>
    </div>
  );
};

export default Slider;