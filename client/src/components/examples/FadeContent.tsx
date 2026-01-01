import FadeContent from '../FadeContent';

export default function FadeContentExample() {
  return (
    <div className="min-h-[800px] bg-black flex items-center justify-center">
      <FadeContent blur={true} duration={2200} easing="ease-out" initialOpacity={0}>
        <div className="text-white text-4xl p-8">
          This content fades in with blur effect
        </div>
      </FadeContent>
    </div>
  );
}
