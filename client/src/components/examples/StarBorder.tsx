import StarBorder from '../StarBorder';

export default function StarBorderExample() {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-black">
      <StarBorder
        as="button"
        color="cyan"
        speed="5s"
        thickness={4}
      >
        Hover Over Me
      </StarBorder>
    </div>
  );
}
