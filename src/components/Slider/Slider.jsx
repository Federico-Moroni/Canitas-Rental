import React from 'react'
import './Slider.scss'

const slides = [
  {
    title: "Horses",
    subtitle: "Nature",
    description: "Adventure is never far away",
    image:
      "https://res.cloudinary.com/dfprmjlir/image/upload/v1662422869/CANITAS%20RENTAL/caballobosqueactivities_qm22w6.jpg"
  },
  {
    title: "River",
    subtitle: "Rocks",
    description: "Let your dreams come true",
    image:
      "https://res.cloudinary.com/dfprmjlir/image/upload/v1662422868/CANITAS%20RENTAL/river_bm66rw.jpg"
  },
  {
    title: "Autumn",
    subtitle: "Fall",
    description: "A piece of heaven",
    image:
      "https://res.cloudinary.com/dfprmjlir/image/upload/v1662323994/CANITAS%20RENTAL/home__picture3_ngvn0c.jpg"
  },
  {
    title: "Horseride",
    subtitle: "View",
    description: "A piece of heaven",
    image:
      "https://res.cloudinary.com/dfprmjlir/image/upload/v1662422863/CANITAS%20RENTAL/caballogauchoactivities_kj7fvt.jpg"
  },
  {
    title: "Bridges",
    subtitle: "Woods",
    description: "A piece of heaven",
    image:
      "https://res.cloudinary.com/dfprmjlir/image/upload/v1662660825/CANITAS%20RENTAL/pexels-kaique-rocha-775201_aoaqbs.jpg"
  }
];

function useTilt(active) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}

const initialState = {
  slideIndex: 0
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1
    };
  }
};

function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    <div
      ref={ref}
      className="slide"
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
      }}
    >
      <div
        className="slideContent"
        style={{
          backgroundImage: `url('${slide.image}')`
        }}
      >
        <div className="slideContentInner">
          <h2 className="slideTitle">{slide.title}</h2>
          <h3 className="slideSubtitle">{slide.subtitle}</h3>
          <p className="slideDescription">{slide.description}</p>
        </div>
      </div>
    </div>
  );
}

const Slider = () => {
  const [state, dispatch] = React.useReducer(slidesReducer, initialState);
  return (
    <>
      <div className="slides">
        <button className='previousButton' onClick={() => dispatch({ type: "PREV" })}>‹</button>
          {[...slides, ...slides, ...slides].map((slide, i) => {
            let offset = slides.length + (state.slideIndex - i);
            return <Slide slide={slide} offset={offset} key={i} />;
          })}
        <button className='nextButton' onClick={() => dispatch({ type: "NEXT" })}>›</button>
      </div>
    </>
  )
}

export default Slider