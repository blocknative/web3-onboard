import { Title } from "@solidjs/meta";

export default function NotFound() {
  return (
    <>
      <Title>Page Not Found</Title>
      <h1>Not Found</h1>
      <p>Sorry, the page you’re looking for doesn't exist</p>
      <a
        href="/"
        class="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
      >
        Go Home
      </a>
    </>
  );
}
