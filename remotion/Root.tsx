import { Composition } from "remotion";
import { HeroAnimation } from "./HeroAnimation";
import { SimpleOutro } from "./SimpleOutro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroAnimation"
        component={HeroAnimation}
        durationInFrames={300} // 10 Sekunden bei 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="SimpleOutro"
        component={SimpleOutro}
        durationInFrames={150} // 5 Sekunden bei 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
