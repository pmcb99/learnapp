import { Button } from "./ui/button";

export function Nav({
    pageNumber,
    numPages,
    pdfName,
  }: {
    pageNumber: number;
    numPages: number;
    pdfName: string;
  }) {
    return (
      <nav className="bg-primary w-full h-24 rounded-xl">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <p className="text-2xl font-bold tracking-tighter text-white dark:text-black">
                  {pdfName.replace("_", " ")}
                </p>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="bg-primary/60 text-white rounded-md px-3 py-2 text-sm font-medium">
                <span>{pageNumber}</span>
                <span className="text-gray-400"> / {numPages}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }