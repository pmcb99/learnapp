
import React from 'react'
import { Button } from './ui/button';
import { PresignedUrl } from '@/types/global';
import { useExamDocumentStore } from '@/hooks/pdf-viewer-page-store';

interface PaperVersionAndTypeTogglesProps {
    presignedUrls: PresignedUrl[];
}

function getPaperVersionAndType(presignedUrl: PresignedUrl) {
    // name of version as a heading 
    var resultObject: {[key: string]: string} = {}
    if (presignedUrl.key.includes('paper-one')) {
        resultObject['paperVersion'] = 'Paper One';
    } else if (presignedUrl.key.includes('paper-two')) {
        resultObject['paperVersion'] = 'Paper Two';
    } else if (presignedUrl.key.includes('sample-paper')) {
        resultObject['paperVersion'] = 'Sample Paper';
    } else if (presignedUrl.key.includes('coursework-project')) {
        resultObject['paperVersion'] = 'Coursework Project';
    } 

    // name of the paper displayed in the button
    if (presignedUrl.key.includes('exam-paper')) {
        resultObject['paperType'] = 'Exam Paper';
    } else if (presignedUrl.key.includes('marking-scheme')) {
        resultObject['paperType'] = 'Marking Scheme';
    }
    else {
        resultObject['paperType'] = 'Paper';
    }
    return resultObject
}

function getUniquePaperVersions(presignedUrls: PresignedUrl[]) {
    // Get unique paper versions from presignedUrls and return array
    var uniquePaperVersions: string[] = [];
    presignedUrls.forEach(presignedUrl => {
        var paperVersion = getPaperVersionAndType(presignedUrl).paperVersion;
        if (!uniquePaperVersions.includes(paperVersion)) {
            uniquePaperVersions.push(paperVersion);
        }
    })
    return uniquePaperVersions
}


function PaperVersionAndTypeToggles(
    props: PaperVersionAndTypeTogglesProps
) {

  const uniquePaperVersions = getUniquePaperVersions(props.presignedUrls);

  // create an object with keys as uniquePaperVersions and values as an array of presignedUrls where paperVersion matches the key
  const presignedUrlsByPaperVersion: {[key: string]: PresignedUrl[]} = {};

  uniquePaperVersions.forEach((uniquePaperVersion: string) => {
    presignedUrlsByPaperVersion[uniquePaperVersion] = props.presignedUrls.filter((presignedUrl: PresignedUrl) => getPaperVersionAndType(presignedUrl).paperVersion === uniquePaperVersion);
  });


  const { currentPresignedUrl, setCurrentPresignedUrl} = useExamDocumentStore(
    (state) => ({
      currentPresignedUrl: state.currentPresignedUrl,
      setCurrentPresignedUrl: state.setCurrentPresignedUrl,
    })
  );
  
  return (
    <>
      {uniquePaperVersions.map((uniquePaperVersion: string) => (
        <div key={uniquePaperVersion} className='flex flex-col items-center font-bold p-2'>
          <h3 className=''>{uniquePaperVersion}</h3>
          <div className='flex gap-x-2'>
            {presignedUrlsByPaperVersion[uniquePaperVersion].map((presignedUrl: PresignedUrl) => (
              <Button 
                key={presignedUrl.key} 
                onClick={() => setCurrentPresignedUrl(presignedUrl)}
                disabled={currentPresignedUrl?.key === presignedUrl.key} 
                > 
                {getPaperVersionAndType(presignedUrl).paperType}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
            }
    
export default PaperVersionAndTypeToggles;