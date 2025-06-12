import { DescriptionTable } from "@/features/description/components/DescriptionTable";
import { Description } from "@/features/description/types/description";
import ImageAnnotatorContainer from "@/features/image-upload/components/ImageAnnotationContainer";
import { useMarkers } from "@/features/image-upload/hooks/useMarkers";

// <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

export default function Home() {
  // const { markers } = useMarkers();
  const arr: Description[] = [
    {
      id: 1,
      name: "qwerty",
      type: "qwerty",
      displayData: "qwerty",
      displayEvent: "qwerty",
      note: "qwerty",
    },
    {
      id: 2,
      name: "asdfgh",
      type: "asdfgh",
      displayData: "asdfgh",
      displayEvent: "asdfgh",
      note: "asdfgh",
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <ImageAnnotatorContainer width="w-64" height="h-64" />
      <DescriptionTable dataArr={arr} />
    </div>
  );
}
