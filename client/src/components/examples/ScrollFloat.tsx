import ScrollFloat from '../ScrollFloat';

export default function ScrollFloatExample() {
  return (
    <div className="min-h-[150vh] bg-black flex items-center justify-center">
      <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
        containerClassName="text-white"
      >
        राधे राधे ! Aarohi ! राधे कृष्ण ! :)
      </ScrollFloat>
    </div>
  );
}
