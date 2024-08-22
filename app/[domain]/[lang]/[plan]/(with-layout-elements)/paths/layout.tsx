'use client';
import React from 'react';

const emptySubscribe = () => () => {};

function ClientGate({ children }) {
  const isServer = React.useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true
  );

  return isServer ? null : children;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientGate>{children}</ClientGate>;
}
