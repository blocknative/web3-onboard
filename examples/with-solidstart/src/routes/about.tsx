import { Title } from "@solidjs/meta";

export default function About() {
  return (
    <>
      <Title>About Page</Title>
      <h1>Template</h1>
      <div class="flex gap-12 items-center">
        <a href="https://start.solidjs.com">
          <img src="favicon.svg" alt="start logo" class="w-20" />
        </a>
        <span class="text-slate-500 text-6xl">×</span>
        <a href="https://web3onboard.thirdweb.com">
          <img src="onboard.svg" alt="onboard logo" class="w-20" />
        </a>
      </div>
    </>
  );
}
