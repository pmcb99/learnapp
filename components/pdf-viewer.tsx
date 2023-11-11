"use client";
import { JC_BUCKET_NAME, LC_BUCKET_NAME } from "@/app/constants";
import { useExamDocumentStore } from "@/hooks/pdf-viewer-page-store";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Page, Document, pdfjs } from "react-pdf";
import { Nav } from "./pdf-viewer-navbar";
import { PresignedUrl } from "@/types/global";
import toast from "react-hot-toast";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

type BucketName = typeof LC_BUCKET_NAME | typeof JC_BUCKET_NAME;


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



  const { examPaperPage, setExamPaperPage, markingSchemePage, setMarkingSchemePage,
  currentPresignedUrl, setCurrentPresignedUrl, samplePaperPage, setSamplePaperPage,
  projectPaperPage, setProjectPaperPage } = useExamDocumentStore(
    (state) => ({
      examPaperPage: state.examPaperPage,
      setExamPaperPage: state.setExamPaperPage,
      markingSchemePage: state.markingSchemePage,
      setMarkingSchemePage: state.setMarkingSchemePage,
      samplePaperPage: state.samplePaperPage,
      setSamplePaperPage: state.setSamplePaperPage,
      projectPaperPage: state.projectPaperPage,
      setProjectPaperPage: state.setProjectPaperPage,
      currentPresignedUrl: state.currentPresignedUrl,
      setCurrentPresignedUrl: state.setCurrentPresignedUrl,
    })
  );



  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);
  const [cachedUrls, setCachedUrls] = useState<CachedUrls>({});

  // const visiblePage = examPaperIsShown ? examPaperPage : markingSchemePage;

  // check if visiblePage = exam-paper or sample-paper, set to 1 if so else set to 2

  function getVisiblePage() {
    var visiblePage = 1;
    if (currentPresignedUrl.key.includes("exam-paper")) {
      visiblePage = examPaperPage;
    }
    else if (currentPresignedUrl.key.includes("sample-paper")) {
      visiblePage = samplePaperPage;
    }
    else if (currentPresignedUrl.key.includes("coursework-project")) {
      visiblePage = projectPaperPage;
    }
    else {
      visiblePage = markingSchemePage;
    }
    if (visiblePage > numPages) {
      visiblePage = 1;
    }
    return visiblePage;
  }

  const visiblePage = getVisiblePage();


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

  function flipToAdjacentPage(increment_or_decrement: string) {
    const adjustmentAmount = increment_or_decrement === "increment" ? 1 : -1;

    if (currentPresignedUrl.key.includes("exam-paper")) {
      setExamPaperPage(examPaperPage + adjustmentAmount)
    }
    else if (currentPresignedUrl.key.includes("sample-paper")) {
      setSamplePaperPage(samplePaperPage + adjustmentAmount)
    }
    else if (currentPresignedUrl.key.includes("project")) {
      setProjectPaperPage(projectPaperPage + adjustmentAmount)
    }
    else if (currentPresignedUrl.key.includes("marking-scheme")) {
      setMarkingSchemePage(markingSchemePage + adjustmentAmount)
    }
    else {
      toast.error("Something went wrong.");
    }
  }

  // Go to next page
  function goToNextPage() {
    flipToAdjacentPage("increment");
  }

  function goToPreviousPage() {
    flipToAdjacentPage("decrement");
  }

  function convertToTitleCase(str: string) {
    return str.replace(/(^|\s)\S/g, function (t) {
      return t.toUpperCase();
    });
  }

  const paperVersionVisible = currentPresignedUrl.key ? `${convertToTitleCase(currentPresignedUrl.key.split('/')[3].replaceAll('-',' '))}` : "";

  const thisFileKeySuffix = `${props.year}/${paperVersionVisible}`;


  useEffect(() => {
    if (!currentPresignedUrl.url && props.presignedUrls[0]) {
        setCurrentPresignedUrl(props.presignedUrls[0]);
    }
}, [currentPresignedUrl.url, props.presignedUrls]);



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

  // console.log("cachedUrls", cachedUrls);

  // render the page only if document is loaded

  
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
  

  // if current presigned url is an empty string, return null
  if (!currentPresignedUrlKey) {
    return null;
  }
  

  



  const LoadingAnimation = () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
    </div>
  );

  return (
    <div className="flex-col w-full h-full relative ">
      <Nav pageNumber={visiblePage} numPages={numPages} pdfName={`${props.year} - ${paperVersionVisible}`}/>
  
      <div>
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
                  // options={options}
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
                  />
                </Document>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
