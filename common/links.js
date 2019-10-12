import React from 'react';
import { Link } from '../routes';


export function IndicatorLink(props) {
  const { id, ...other } = props;

  return (
    <Link href="/indicators/[id]" as={`/indicators/${id}`} passHref {...other} />
  );
}

export function ActionLink(props) {
  const { id, ...other } = props;

  return (
    <Link href="/actions/[id]" as={`/actions/${id}`} passHref {...other} />
  );
}

export function ActionListLink(props) {
  return <Link href="/actions" passHref {...props} />;
}

export function IndicatorListLink(props) {
  return <Link href="/indicators" passHref {...props} />;
}
