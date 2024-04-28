"use client";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Product", href: "#" },
  { name: "School", href: "/School" },
  { name: "Business", href: "http://127.0.0.1:8000/admin/login/?next=/admin/account/user/" },
  { name: "Contact", href: "/Contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const router = useRouter();
  const token = localStorage.getItem("token");

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      closeMobileMenu();
      setLogout(true);
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

  useEffect(() => {
    if(logout){
      router.push("/Login");
    }
  },[logout]);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 p-1.5 text-white text-xl font-semibold leading-6"
              style={{fontSize:'1.7rem'}}
              onClick={closeMobileMenu}
            >
              <span className="sr-only">Your Company</span>
              booKStore
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white"
                style={{fontSize:'17px'}}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {!token ? (
              <Link
                href="/Login"
                className="text-sm font-semibold leading-6 text-white"
                style={{fontSize:'17px'}}
              >
                LogIn <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : (
              <>
                <Link
                  href="#"
                  className="text-sm font-semibold leading-6 text-white"
                  style={{fontSize:'17px'}}
                  onClick={handleLogout}
                >
                  LogOut &nbsp;
                </Link>
                <Link
                  href="/Profile"
                  className="text-sm font-semibold leading-6 text-white"
                  style={{fontSize:'17px'}}
                >
                  Profile
                </Link>
              </>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="-m-1.5 p-1.5 text-white"
                onClick={closeMobileMenu}
                style={{fontSize:'1.4rem', color:'black'}}
              >
                <span className="sr-only">Your Company</span>
                booKStore
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {!token ? (
                    <Link
                      href="/Login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={closeMobileMenu}
                    >
                      LogIn
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={handleLogout}
                      >
                        LogOut
                      </Link>
                      <Link
                        href="/Profile"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={closeMobileMenu}
                      >
                        Profile
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default Header;