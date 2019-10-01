import { Link } from '../routes';


export function IndicatorLink(props) {
  const { id, ...other } = props;

  return (
    <Link href="/indicator/[id]" as={`/indicator/${id}`} passHref {...other} />
  )
}


export function ActionLink(props) {
  const { id, ...other } = props;

  return (
    <Link href="/action/[id]" as={`/action/${id}`} passHref {...other} />
  )
}
