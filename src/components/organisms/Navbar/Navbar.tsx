import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 text-sm text-gray-700">
      <span className="font-semibold text-gray-800">Posts CRUD</span>
      <Link className="font-medium text-blue-600 hover:text-blue-700" href="/posts">
        Posts
      </Link>
    </nav>
  );
}
