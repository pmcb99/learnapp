"use client";
import { JC_BUCKET_NAME, LC_BUCKET_NAME } from "@/app/constants";
import { useExamDocumentStore } from "@/hooks/pdf-viewer-page-store";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Page, Document, pdfjs } from "react-pdf";
import { SizeMe } from "react-sizeme";
import { Nav } from "./pdf-viewer-navbar";
import { PresignedUrl } from "@/types/global";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export type BucketName = typeof LC_BUCKET_NAME | typeof JC_BUCKET_NAME;



interface CachedUrls {
  [key: string]: string;
}

export default function PDFViewer(props: {
  presignedUrls: PresignedUrl[];
  bucket: BucketName; 
  paperName: string;
  year: number;
  documentId: string;
  viewId: string;
  linkId: string;
}) {


  const { examPaperIsShown, flipDocumentShown, examPaperPage, setExamPaperPage, markingSchemePage, setMarkingSchemePage,
  paperVersion, setPaperVersion, currentPresignedUrl, setCurrentPresignedUrl } = useExamDocumentStore(
    (state) => ({
      examPaperIsShown: state.examPaperIsShown,
      flipDocumentShown: state.flipDocumentShown,
      examPaperPage: state.examPaperPage,
      setExamPaperPage: state.setExamPaperPage,
      markingSchemePage: state.markingSchemePage,
      setMarkingSchemePage: state.setMarkingSchemePage,
      paperVersion: state.paperVersion,
      setPaperVersion: state.setPaperVersion,
      currentPresignedUrl: state.currentPresignedUrl,
      setCurrentPresignedUrl: state.setCurrentPresignedUrl,
    })
  );

  if (!currentPresignedUrl.url && props.presignedUrls[0]) {
    setCurrentPresignedUrl(props.presignedUrls[0]);
  }
  console.log(currentPresignedUrl)

  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(null);
  const [cachedUrls, setCachedUrls] = useState<CachedUrls>({});
  const [localUrl, setLocalUrl] = useState<string>("");

  // const visiblePage = examPaperIsShown ? examPaperPage : markingSchemePage;

  // check if visiblePage = exam-paper or sample-paper, set to 1 if so else set to 2
  const visiblePage = (paperVersion.includes("exam-paper") || paperVersion.includes("sample-paper")) ? examPaperPage : markingSchemePage;


  const startTimeRef = useRef(Date.now());
  const pageNumberRef = useRef<number>(visiblePage);
  const isInitialPageLoad = useRef(true);

  // Update the previous page number after the effect hook has run
  useEffect(() => {
    pageNumberRef.current = visiblePage;
  }, [visiblePage]);

  useEffect(() => {
    startTimeRef.current = Date.now(); // update the start time for the new page

    // when component unmounts, calculate duration and track page view
    return () => {
      const endTime = Date.now();
      const duration = Math.round(endTime - startTimeRef.current);
      trackPageView(duration);
    };
  }, [visiblePage]); // monitor pageNumber for changes


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
    if (isExamPaperVisible) {
      setExamPaperPage(examPaperPage + 1);
    }
    else {
      setMarkingSchemePage(markingSchemePage + 1);
    }
  }

  function goToPreviousPage() {
    if (isExamPaperVisible) {
      setExamPaperPage(examPaperPage - 1);
    }
    else {
      setMarkingSchemePage(markingSchemePage - 1);
    }
  }

  async function trackPageView(duration: number = 0) {
    // If this is the initial page load, don't send the request
    if (isInitialPageLoad.current) {
      isInitialPageLoad.current = false;
      return;
    }
  }

  const isExamPaperVisible = useExamDocumentStore(
    (state) => state.examPaperIsShown
  );

  const paperVersionVisible = useExamDocumentStore(
    (state) => state.paperVersion
  );

  const thisFileKeySuffix = `${props.year}/${paperVersionVisible}`;

  useEffect(() => {
    async function downloadAndCachePdfs() {
      const urls = await Promise.all(
        props.presignedUrls.map(async (presignedUrl) => {
          const response = await fetch(presignedUrl.url);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        })
      );
      const urlObject = Object.fromEntries(
        urls.map((url, index) => [props.presignedUrls[index].key, url])
      );
      setCachedUrls(urlObject);
    }
    downloadAndCachePdfs();

    return () => {
      // Cleanup function to clear the cache when the component is unmounted
      setCachedUrls({});
    };

  }, [props.presignedUrls]);


  
  // const matchingUrl = cachedUrls[thisFileKeySuffix];
  // find the matching URL in the cache that contains thisFileKeySuffix
  var matchingUrl: string = "";
  if (cachedUrls) {
    const matchingKey = Object.keys(cachedUrls).find((key) =>
      key.includes(thisFileKeySuffix)
    );
    matchingUrl = matchingKey ? cachedUrls[matchingKey] : "";
  }

  const currentPresignedUrlKey = currentPresignedUrl ? currentPresignedUrl.url : "";


  const LoadingAnimation = () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
    </div>
  );

  return (
    <div className="flex-col w-full h-full relative overflow-hidden">
      <Nav pageNumber={visiblePage} numPages={numPages} pdfName={`${props.year} - ${paperVersionVisible.replaceAll('-',' ').toUpperCase()}`}/>
  
      <SizeMe
        monitorHeight
        refreshRate={128}
        refreshMode="debounce"
        render={({ size }) => (
          <div hidden={loading} className="flex items-center justify-center h-full">
            <div className="flex items-center justify-between w-full absolute z-10 px-2">
              <button
                onClick={goToPreviousPage}
                disabled={visiblePage <= 1}
                className="relative h-[calc(100vh - 64px)] px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-10 w-10" aria-hidden="true" />
              </button>
              <button
                onClick={goToNextPage}
                disabled={visiblePage >= numPages!}
                className="relative px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-10 w-10" aria-hidden="true" />
              </button>
            </div>
  
            <div className="flex items-center justify-center w-full h-full">
              <div className="flex items-center justify-center w-full h-full">
                <Document
                  file={currentPresignedUrlKey}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={(error) => console.error("Document failed to load", error)}
                  loading={<LoadingAnimation />}
                  options={options}
                  renderMode="canvas"
                  className="flex items-center justify-center"
                >
                  <Page
                    className="flex overflow-hidden w-full items-center"
                    key={visiblePage}
                    pageNumber={visiblePage}
                    loading={<LoadingAnimation />}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    onLoadSuccess={onPageLoadSuccess}
                    onRenderError={() => setLoading(false)}
                    width={size.width}
                  />
                </Document>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
