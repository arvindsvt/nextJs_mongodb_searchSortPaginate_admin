import './globals.css';
import Sidebar from './components/Sidebar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="ml-64 w-full p-6 bg-gray-100 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
