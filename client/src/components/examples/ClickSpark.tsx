import ClickSpark from '../ClickSpark';
import StarBorder from '../StarBorder';

export default function ClickSparkExample() {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-black">
      <ClickSpark
        sparkColor='#ffffff'
        sparkSize={30}
        sparkRadius={75}
        sparkCount={8}
        duration={400}
      >
        <StarBorder
          as="button"
          color="cyan"
          speed="5s"
          thickness={4}
          data-testid="button-click-me"
        >
          Click Me
        </StarBorder>
      </ClickSpark>
    </div>
  );
}
