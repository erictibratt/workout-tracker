import { ScrollViewStyleReset, useServerDocumentContext } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  const { htmlAttributes, bodyAttributes, headNodes, bodyNodes } = useServerDocumentContext();
  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>Workout Tracker</title>
        <meta name="description" content="Your personal workout tracker. Track sets, reps and time, even offline." />
        <meta name="theme-color" content="#2d2d2d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Workout" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/icons/icon-192.png" />
        <ScrollViewStyleReset />
        <style>{`html,body,#root{background:#39393a;height:100%;height:100dvh}body{margin:0}input{font-size:16px}*{-webkit-tap-highlight-color:transparent}`}</style>
        {headNodes}
        {process.env.NODE_ENV === 'production' && <script src="/register-sw.js" defer />}
      </head>
      <body {...bodyAttributes}>{children}{bodyNodes}</body>
    </html>
  );
}
