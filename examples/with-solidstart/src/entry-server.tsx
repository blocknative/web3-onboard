import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/svg+xml" href="favicon.svg" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          <noscript class="flex flex-col justify-center items-center h-screen px-8 text-center gap-2 select-none">
            <b class="text-2xl font-medium">JavaScript Disabled</b>
            <p class="text-gray-500">Please enable it and refresh the page</p>
          </noscript>
          {scripts}
        </body>
      </html>
    )}
  />
));
