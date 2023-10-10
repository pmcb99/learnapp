"use client";
import { JC_BUCKET_NAME, LC_BUCKET_NAME } from "@/app/constants";
import { useExamDocumentStore } from "@/hooks/pdf-viewer-page";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Page, Document, pdfjs } from "react-pdf";
import { SizeMe } from "react-sizeme";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export type BucketName = typeof LC_BUCKET_NAME | typeof JC_BUCKET_NAME;

export interface PresignedUrl {
  url: string;
  bucket: BucketName;
  key: string;
}


export default function PDFViewer(props: {
  presignedUrls: PresignedUrl[];
  bucket: BucketName; 
  paperName: string;
  year: string;
  documentId: string;
  viewId: string;
  linkId: string;
}) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1); // start on first page
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);

  const startTimeRef = useRef(Date.now());
  const pageNumberRef = useRef<number>(pageNumber);
  const isInitialPageLoad = useRef(true);

  // Update the previous page number after the effect hook has run
  useEffect(() => {
    pageNumberRef.current = pageNumber;
  }, [pageNumber]);

  useEffect(() => {
    startTimeRef.current = Date.now(); // update the start time for the new page

    // when component unmounts, calculate duration and track page view
    return () => {
      const endTime = Date.now();
      const duration = Math.round(endTime - startTimeRef.current);
      trackPageView(duration);
    };
  }, [pageNumber]); // monitor pageNumber for changes

  useEffect(() => {
    if (numPages > 0) {
      updateNumPages(numPages);
    }
  }, [numPages]); // monitor numPages for changes

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) {
    setNumPages(nextNumPages);
  }

  // Send the last page view when the user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      const endTime = Date.now();
      const duration = Math.round(endTime - startTimeRef.current);
      trackPageView(duration);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  function onPageLoadSuccess() {
    setPageWidth(window.innerWidth);
    setLoading(false);
  }

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };

  // Go to next page
  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    // setPageNumber((prevPageNumber) => 24);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }

  async function trackPageView(duration: number = 0) {
    // If this is the initial page load, don't send the request
    if (isInitialPageLoad.current) {
      isInitialPageLoad.current = false;
      return;
    }

    await fetch("/api/record_view", {
      method: "POST",
      body: JSON.stringify({
        linkId: props.linkId,
        documentId: props.documentId,
        viewId: props.viewId,
        duration: duration,
        pageNumber: pageNumberRef.current,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function updateNumPages(numPages: number) {
    await fetch(`/api/documents/update`, {
      method: "POST",
      body: JSON.stringify({
        documentId: props.documentId,
        numPages: numPages,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const isExamPaperVisible = useExamDocumentStore(
    (state) => state.examPaperIsShown
  );
  console.log(isExamPaperVisible);

  var examPaperOrMarkingScheme: "exam-paper" | "marking-scheme" = "exam-paper";
  if (isExamPaperVisible) {
    examPaperOrMarkingScheme = "exam-paper";
  } else {
    examPaperOrMarkingScheme = "marking-scheme";
  }

  const thisFileKeySuffix = `${props.year}/${examPaperOrMarkingScheme}`;
  var matchingPresignedUrl: PresignedUrl | undefined;
  if (props.presignedUrls) {
    console.log(props.presignedUrls[0])
    matchingPresignedUrl = props.presignedUrls.find((file) =>
      file.key.includes(thisFileKeySuffix)
    );
  }

  
  console.log(thisFileKeySuffix)
  console.log(matchingPresignedUrl)

  // if (!fileUrl) {
  //   throw new Error("[ERROR] File not found.");
  // }



  return (
    <div className="flex-col w-full h-full relative overflow-hidden">
      {/* <Nav pageNumber={pageNumber} numPages={numPages} pdfName={props.documentId}/> */}

      <SizeMe
        monitorHeight
        refreshRate={128}
        refreshMode={"debounce"}
        render={({ size }) => (
          <div hidden={loading} className="flex items-center h-full">
            <div
              className={`flex items-center justify-between w-full absolute z-10 px-2`}
            >
              <button
                onClick={goToPreviousPage}
                disabled={pageNumber <= 1}
                className="relative h-[calc(100vh - 64px)] px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-10 w-10" aria-hidden="true" />
              </button>
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages!}
                className="relative px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-10 w-10" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center justify-center overflow-hidden">
              <Document
                file={matchingPresignedUrl?.url || ""} // Pass the presignedUrl here
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) =>
                  console.error("Document failed to load", error)
                }
                options={options}
                renderMode="canvas"
                className="flex items-center justify-center"
              >
                <Page
                  className="overflow-hidden w-full items-center"
                  key={pageNumber}
                  pageNumber={pageNumber}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  onLoadSuccess={onPageLoadSuccess}
                  onRenderError={() => setLoading(false)}
                  width={size.width}
                />
              </Document>
            </div>
          </div>
        )}
      />
    </div>
  );
}