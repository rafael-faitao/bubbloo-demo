import "./Circle.scss";

export default function BubbleBurst ({anim = false}) {

    return (
    <svg className={anim ? "anim" : ''} style={{width:'100%',height:'100%', display:'flex'}}>
    <circle className="c-center st0" cx="35.5" cy="34.3" r="4.7">
  </circle>

  <circle className="c-tr st0" cx="52.8" cy="31.7" r="3.3">
  </circle>

  <circle className="c-bl st0" cx="36.5" cy="51.9" r="1.5">
  </circle>

  <circle className="c-br st0" cx="53.9" cy="56.3" r="3.3">
  </circle>

  <circle className="c-center-2 st0" cx="46.9" cy="44.8" r="7.1">
  </circle>
</svg>)
}