import { ScrollViewStyleReset } from 'expo-router/html';

const Root = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

      {/* 
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native. 
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
      <ScrollViewStyleReset />

      {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
      {/* Add any additional <head> elements that you want globally available on web... */}
    </head>
    <body className="bg-white">{children}</body>
  </html>
);

export default Root;
