import { useEffect, useRef } from "react";

// export default function useSnappyScroll(stickyness = 0.01) {
//   let scrollTimeout = useRef<any>(null);
//   let isTouching = useRef(false);
//   let lastScrollTop = useRef(0);

//   useEffect(()=> {
//     function handleSnap() {
//       console.log("Snapping!")

//       // move to current position
//       window.scrollTo({
//         top: window.scrollY,
//         behavior: "smooth",
//       })
//     }

//     function handleTouchEnd() {
//       console.log("Touch ended!");
//       handleSnap();
//       isTouching.current = true;
//     }

//     window.addEventListener("touchend", handleTouchEnd);
    
//     return () => {
//       window.removeEventListener("touchend", handleTouchEnd);
//     }


//   }, [])

  // useEffect(() => {
  //   function handleScroll() {
  //     const scroll = window.scrollY;
  //     const direction = scroll - lastScrollTop.current;
  //     lastScrollTop.current = scroll;
  //     const height = window.innerHeight;

  //     console.log(scroll, direction);

  //     // test touch, scroll to the position
  //     window.scrollTo({
  //       top: scroll,
  //       behavior: "instant",
  //     })

  //     // //  |     |
  //     // //  |-----| <- checkPosition
  //     // //  |     |
  //     // //  |     |

  //     // const checkPosition = Math.floor((scroll - 1 + height) / height) * height;
  //     // const fromCheckposition = direction > 0
  //     //   ? scroll + height - checkPosition
  //     //   : checkPosition - scroll;
  //     // const margin = height * stickyness;

  //     // const optimalScroll = (Math.abs(fromCheckposition) > margin)
  //     //   ? direction > 0 ? checkPosition : checkPosition - height
  //     //   : direction > 0
  //     //   ? checkPosition - height
  //     //   : checkPosition;
  //     // console.log(checkPosition, fromCheckposition);

  //     // // // scroll to the position
  //     // window.scrollTo({
  //     //   top: optimalScroll,
  //     //   behavior: "smooth",
  //     // });
  //   }

    

  //   const handleTouchStart = () => {
  //     if (scrollTimeout.current) {
  //       clearTimeout(scrollTimeout.current);
  //       scrollTimeout.current = null; // Explicitly set to null
  //     }
  //     isTouching.current = true;
  //   };

  //   const handleTouchEnd = () => {
  //     if (scrollTimeout.current !== null) {
  //       clearTimeout(scrollTimeout.current);
  //       scrollTimeout.current = window.setTimeout(handleScroll, 100);
  //     }
  //     // isTouching.current = false;
  //   };

  //   window.addEventListener("touchstart", handleTouchStart);
  //   window.addEventListener("touchend", handleTouchEnd);
  //   window.addEventListener("scroll", () => {
  //     if (isTouching.current) {
  //       return;
  //     }
  //     if (scrollTimeout.current) {
  //       clearTimeout(scrollTimeout.current);
  //     }
  //     scrollTimeout.current = window.setTimeout(handleScroll, 100);
  //   });

  //   return () => {
  //     window.removeEventListener("scroll", () => {});
  //     window.removeEventListener("touchstart", handleTouchStart);
  //     window.removeEventListener("touchend", handleTouchEnd);
  //   };
  // });
// }
