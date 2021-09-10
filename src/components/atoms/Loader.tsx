import '../../styles/components.css'

type props = {
  show : boolean
}

export default function Loader({ show }: props) {
  return show ? <div className="loader"></div> : null;
}